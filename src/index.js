import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

// normalize to .tech tld
// https://github.com/protocol/bifrost-infra/issues/2018
const { href } = window.location
if (href.includes('dag.ipfs.io')) {
  window.location.replace(href.replace('dag.ipfs.io', 'dag.ipfs.tech'))
}
if (href.includes('dag-ipfs-io')) {
  window.location.replace(href.replace('dag-ipfs-io', 'dag-ipfs-tech'))
}

ReactDOM.render(<App />, document.getElementById('root'))
