/* global Ipfs, FileReader */

import cytoscape from 'cytoscape'
import dagre from 'cytoscape-dagre'
import unixfs from 'ipfs-unixfs'

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

const ipfs = new Ipfs()
const { Buffer } = Ipfs

const cy = cytoscape({
  elements: [],
  container: document.getElementById('root'),
  ...graphOpts
})

const slowMap = async (items, fn, delay = 10) => {
  const res = []
  for (let i = 0; i < items.length; i++) {
    res.push(await fn(items[i], i))
    await new Promise(resolve => setTimeout(resolve, delay))
  }
  return res
}

const addToVis = async (cy, cid) => {
  const { value: source } = await ipfs.dag.get(cid)
  await slowMap(source.links, async (link) => {
    const { value: target } = await ipfs.dag.get(link.cid)
    let nodeData = {}
    try {
      // it's a unix system?
      nodeData = unixfs.unmarshal(target.data)
    } catch (err) {
      // dag-pb but not a unixfs.
      console.log(err)
    }
    console.log(`adding leaf ${link.cid} to parent ${cid}`, nodeData)
    cy.add([{
      group: 'nodes',
      data: {
        id: link.cid.toString(),
        ...nodeData
      },
      classes: [
        nodeData.blockSizes.length ? 'meta' : 'leaf'
      ]
    }, {
      group: 'edges',
      data: {
        source: cid.toString(),
        target: link.cid.toString()
      }
    }])

    cy.layout(graphOpts.layout).run()

    return addToVis(cy, link.cid)
  })
}

const show = el => { el.style.visibility = 'visible' }
const hide = el => { el.style.visibility = 'hidden' }

const fileEl = document.getElementById('file')
const chunkerEl = document.getElementById('chunker')
const strategyEl = document.getElementById('strategy')
const maxChildrenEl = document.getElementById('max-children')
const layerRepeatEl = document.getElementById('layer-repeat')

strategyEl.addEventListener('change', e => {
  if (['balanced', 'trickle'].includes(e.target.value)) {
    show(maxChildrenEl)
  } else {
    hide(maxChildrenEl)
  }

  if (e.target.value === 'trickle') {
    show(layerRepeatEl)
  } else {
    hide(layerRepeatEl)
  }
})

ipfs.on('ready', () => {
  console.log('IPFS is ready!')

  show(fileEl)

  fileEl.addEventListener('change', e => {
    const file = e.target.files[0]
    const fileReader = new FileReader()

    fileReader.onload = async e => {
      const path = file.name
      const content = Buffer.from(e.target.result)
      const res = await ipfs.add({ path, content }, {
        chunker: chunkerEl.value,
        strategy: strategyEl.value,
        maxChildrenPerNode: parseInt(maxChildrenEl.value),
        layerRepeat: parseInt(layerRepeatEl.value)
      })

      console.log('added', res[0].hash)

      cy.add({
        group: 'nodes',
        data: {
          id: res[0].hash
        }
      })

      addToVis(cy, res[0].hash)
    }

    fileReader.readAsArrayBuffer(file)
  })
})
