import React, { Component, createRef } from 'react'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import UnixFs from 'ipfs-unixfs'
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

  componentDidUpdate () {
    this._updateGraph()
  }

  async _updateGraph () {
    if (this._graph) this._graph.destroy()

    const { rootCid } = this.props
    if (!rootCid) return

    const nodeMap = await this._getGraphNodes(rootCid)

    // ...could have taken a while, did we get a new root node?
    if (rootCid !== this.props.rootCid) return

    const container = this._graphRoot.current
    const elements = Array.from(nodeMap.values())

    this._graph = cytoscape({ elements, container, ...DagGraphOptions })
    this._graph.layout(DagGraphOptions.layout).run()
  }

  async _getGraphNodes (cid, nodeMap = new Map()) {
    if (nodeMap.get(cid)) return

    const ipfs = await getIpfs()
    const { value: source } = await ipfs.dag.get(cid)

    let nodeData = {}

    try {
      // it's a unix system?
      nodeData = UnixFs.unmarshal(source.data)
    } catch (err) {
      // dag-pb but not a unixfs.
      console.log(err)
    }

    for (let i = 0; i < source.links.length; i++) {
      await this._getGraphNodes(source.links[i].cid.toString(), nodeMap)
    }

    nodeMap.set(cid, {
      group: 'nodes',
      data: { id: cid, ...nodeData },
      classes: source.links.length ? [] : ['leaf']
    })

    source.links.forEach(link => {
      nodeMap.set(cid + '->' + link.cid, {
        group: 'edges',
        data: { source: cid, target: link.cid.toString() }
      })
    })

    return nodeMap
  }

  render () {
    return <div ref={this._graphRoot} style={{ background: 'pink' }} className='h-100' />
  }
}
