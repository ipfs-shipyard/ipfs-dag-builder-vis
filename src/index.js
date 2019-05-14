/* eslint-env browser */

import IPFS, { Buffer } from 'ipfs'
import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import unixfs from 'ipfs-unixfs'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'

class HelloMessage extends Component {
  render () {
    return <div>Hello {this.props.name}</div>
  }
}

ReactDOM.render(<HelloMessage name='Jane' />, document.querySelector('main'))

/*

cytoscape.use(dagre)

const graphOpts = {
  layout: {
    name: 'dagre',
    rankSep: 80,
    nodeSep: 1
  },
  style: [
    {
      selector: 'node',
      style: {
        shape: 'ellipse',
        width: '14px',
        height: '14px',
        'background-color': '#244e66'
      }
    },
    {
      selector: '.leaf',
      style: {
        shape: 'square',
        width: '14px',
        height: '14px',
        'background-color': '#28CA9F'
      }
    },
    {
      selector: 'edge',
      style: {
        'source-distance-from-node': 3,
        'target-distance-from-node': 4,
        'curve-style': 'bezier',
        'control-point-weight': 0.5,
        'width': 1,
        'line-color': '#979797',
        'line-style': 'dotted',
        // 'target-label': 'data(index)',
        'font-family': 'Consolas, monaco, monospace',
        'font-size': '8px',
        'target-text-margin-x': '-5px',
        'color': '#ccc',
        'target-text-margin-y': '-2px',
        'text-halign': 'center',
        'text-valign': 'bottom'
      }
    }
  ]
}

const ipfs = new IPFS()

const getAllNodes = async (nodeMap, cid) => {
  if (nodeMap.get(cid.toString())) return

  const { value: source } = await ipfs.dag.get(cid)

  let nodeData = {}

  try {
    // it's a unix system?
    nodeData = unixfs.unmarshal(source.data)
  } catch (err) {
    // dag-pb but not a unixfs.
    console.log(err)
  }

  for (let i = 0; i < source.links.length; i++) {
    await getAllNodes(nodeMap, source.links[i].cid)
  }

  nodeMap.set(cid.toString(), {
    group: 'nodes',
    data: {
      id: cid.toString(),
      ...nodeData
    },
    classes: source.links.length ? [] : ['leaf']
  })

  source.links.map(link => {
    nodeMap.set(cid.toString() + '->' + link.cid.toString(), {
      group: 'edges',
      data: {
        source: cid.toString(),
        target: link.cid.toString()
      }
    })
  })
}

const show = el => { el.style.visibility = 'visible' }
const hide = el => { el.style.visibility = 'hidden' }

const rootEl = document.getElementById('root')
const fileEl = document.getElementById('file')
const chunkerEl = document.getElementById('chunker')
const strategyEl = document.getElementById('strategy')
const maxChildrenEl = document.getElementById('max-children')
const layerRepeatEl = document.getElementById('layer-repeat')

function updateAvailableOptions () {
  if (['balanced', 'trickle'].includes(strategyEl.value)) {
    show(maxChildrenEl)
  } else {
    hide(maxChildrenEl)
  }

  if (strategyEl.value === 'trickle') {
    show(layerRepeatEl)
  } else {
    hide(layerRepeatEl)
  }
}

updateAvailableOptions()

strategyEl.addEventListener('change', updateAvailableOptions)

ipfs.on('ready', () => {
  console.log('IPFS is ready!')

  show(fileEl)

  let vis
  const rawFiles = []

  ;[chunkerEl, strategyEl, maxChildrenEl, layerRepeatEl].forEach(el => {
    el.addEventListener('change', addAndRender)
  })

  async function addAndRender () {
    if (!rawFiles.length) return

    if (vis) {
      vis.container().parentNode.removeChild(vis.container())
      vis = null
    }

    const files = rawFiles.map(({ path, content }) => ({ path, content }))
    const res = await ipfs.add(files, {
      chunker: chunkerEl.value,
      strategy: strategyEl.value,
      maxChildrenPerNode: parseInt(maxChildrenEl.value),
      layerRepeat: parseInt(layerRepeatEl.value),
      wrapWithDirectory: files.length > 1
    })

    console.log('added', res[res.length - 1].hash)

    const nodeMap = new Map()
    await getAllNodes(nodeMap, res[res.length - 1].hash)
    renderVis(nodeMap)
  }

  function renderVis (nodeMap) {
    const container = document.createElement('div')
    container.style.height = '100%'
    rootEl.appendChild(container)
    const elements = Array.from(nodeMap.values())
    const cy = cytoscape({ elements, container, ...graphOpts })
    cy.layout(graphOpts.layout).run()
    vis = cy
  }

  fileEl.addEventListener('change', e => {
    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.onload = async e => {
      rawFiles.push({ path: file.name, content: Buffer.from(e.target.result) })
      addAndRender()
    }

    fileReader.readAsArrayBuffer(file)
  })
})
*/
