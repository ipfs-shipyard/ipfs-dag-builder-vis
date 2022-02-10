import React, { Component, createRef } from 'react'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import { UnixFS } from 'ipfs-unixfs'
import { validate } from '@ipld/dag-pb'
import { getIpfs } from './lib/ipfs'
import DagGraphOptions from './DagGraphOptions'

cytoscape.use(dagre)

export default class Dag extends Component {
  constructor () {
    super()
    this._graphRoot = createRef()
  }

  componentDidMount () {
    this._updateGraph()
  }

  componentDidUpdate (prevProps) {
    if (String(prevProps.rootCid) !== String(this.props.rootCid)) {
      this._updateGraph()
    }
  }

  async _updateGraph () {
    if (this._graph) this._graph.destroy()
    if (this.props.onNodeFocus) this.props.onNodeFocus(null)

    const { rootCid } = this.props
    if (!rootCid) return

    const nodeMap = await this._getGraphNodes(rootCid)

    // ...could have taken a while, did we get a new root node?
    if (String(rootCid) !== String(this.props.rootCid)) return

    const container = this._graphRoot.current
    const elements = Array.from(nodeMap.values())

    const cy = this._graph = cytoscape({ elements, container, ...DagGraphOptions })

    const focusElement = element => {
      cy.nodes('.focused').removeClass('focused')
      element.addClass('focused')
      this.props.onNodeFocus(element.data())
    }

    cy.on('tapdragover', e => {
      if (!this.props.onNodeFocus || e.target.group() !== 'nodes') return
      focusElement(e.target)
    })

    cy.layout(DagGraphOptions.layout).run()

    if (this.props.onNodeFocus) focusElement(cy.getElementById(rootCid))
    if (this.props.onGraphRender) this.props.onGraphRender()
  }

  async _getGraphNodes (cid, nodeMap = new Map()) {
    if (nodeMap.get(cid.toString())) return

    const ipfs = await getIpfs()
    const { value: source } = await ipfs.dag.get(cid)
    const classes = []
    let nodeData = {}

    if (isDagPb(source)) {
      try {
        // it's a unix system?
        const unixfsData = UnixFS.unmarshal(source.Data)
        nodeData = {
          type: 'unixfs',
          isLeaf: Boolean(source.Links.length),
          length: (await ipfs.block.get(cid)).byteLength,
          unixfsData
        }
      } catch (err) {
        // dag-pb but not a unixfs.
        console.log(err)
      }

      for (let i = 0; i < source.Links.length; i++) {
        await this._getGraphNodes(source.Links[i].Hash, nodeMap)
      }

      if (!source.Links.length) classes.push('leaf')
      if (nodeData) classes.push('unixfs', nodeData.unixfsData.type)
    } else if (source instanceof Uint8Array) {
      classes.push('raw')
      nodeData = { type: 'raw', isLeaf: true, length: source.length }
    } else {
      // TODO: What IPLD node is this? How to extract the links?
      classes.push('leaf')
      nodeData = { type: 'unknown', isLeaf: true }
    }

    nodeMap.set(cid.toString(), {
      group: 'nodes',
      data: { id: cid.toString(), ...nodeData },
      classes
    })

    ;(source.Links || []).forEach(link => {
      nodeMap.set(`${cid}->${link.Hash}`, {
        group: 'edges',
        data: { source: cid.toString(), target: link.Hash.toString() }
      })
    })

    return nodeMap
  }

  render () {
    return <div ref={this._graphRoot} className='bg-snow-muted h-100' />
  }
}

function isDagPb (node) {
  try {
    validate(node)
    return true
  } catch {
    return false
  }
}
