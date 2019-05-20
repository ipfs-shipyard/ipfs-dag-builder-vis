export default {
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
      selector: '.raw',
      style: {
        shape: 'square',
        width: '14px',
        height: '14px',
        'background-color': '#ea5037'
      }
    },
    {
      selector: '.unixfs.directory',
      style: {
        shape: 'round-rectangle',
        'background-color': '#34373f'
      }
    },
    {
      selector: '.unixfs.hamt-sharded-directory',
      style: {
        shape: 'round-rectangle',
        'background-color': '#34373f'
      }
    },
    {
      selector: '.unixfs.raw',
      style: {
        shape: 'square',
        width: '14px',
        height: '14px',
        'background-color': '#f39021'
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
    },
    {
      selector: '.focused',
      style: {
        'border-width': '1px',
        'border-color': '#f39021'
      }
    }
  ]
}
