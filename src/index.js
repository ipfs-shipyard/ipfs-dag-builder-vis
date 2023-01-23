import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { BrowserMetricsProvider } from '@ipfs-shipyard/ignite-metrics/dist/src/BrowserMetricsProvider'

// normalize to .tech tld
// https://github.com/protocol/bifrost-infra/issues/2018
const { href } = window.location
if (href.includes('dag.ipfs.io')) {
  window.location.replace(href.replace('dag.ipfs.io', 'dag.ipfs.tech'))
}
if (href.includes('dag-ipfs-io')) {
  window.location.replace(href.replace('dag-ipfs-io', 'dag-ipfs-tech'))
}

const telemetry = new BrowserMetricsProvider({ appKey: 'b69bc669768863d8a3cd4628749fae08cd23977b' })

window.telemetry = telemetry
window.removeMetricsConsent = () => telemetry.removeConsent(['minimal'])
window.addMetricsConsent = () => telemetry.addConsent(['minimal'])


ReactDOM.render(<App />, document.getElementById('root'))
