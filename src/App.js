/* eslint-env browser */
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Controls from './Controls'
import Dag from './Dag'
import { Buffer } from 'ipfs'
import { ipfsAdd } from './lib/ipfs'

export default function App () {
  const [files, setFiles] = useState([])
  const [chunker, setChunker] = useState('size-512')
  const [strategy, setStrategy] = useState('balanced')
  const [maxChildren, setMaxChildren] = useState(11)
  const [layerRepeat, setLayerRepeat] = useState(4)
  const [rootCid, setRootCid] = useState(null)

  useEffect(() => {
    if (!files.length) return
    ipfsAdd({ files, chunker, strategy, maxChildren, layerRepeat }).then(setRootCid)
  }, [files, chunker, strategy, maxChildren, layerRepeat])

  const onFileChange = file => {
    const fileReader = new FileReader()
    fileReader.onload = e => {
      setFiles(files.concat({ path: file.name, content: Buffer.from(e.target.result) }))
    }
    fileReader.readAsArrayBuffer(file)
  }

  return (
    <div className='avenir flex flex-column h-100'>
      <div className='flex-none'>
        <Header />
      </div>
      <div className='flex-none'>
        <Controls
          onFileChange={onFileChange}
          chunker={chunker}
          onChunkerChange={setChunker}
          strategy={strategy}
          onStrategyChange={setStrategy}
          maxChildren={maxChildren}
          onMaxChildrenChange={setMaxChildren}
          layerRepeat={layerRepeat}
          onLayerRepeatChange={setLayerRepeat} />
      </div>
      <div className='flex-auto'>
        <Dag rootCid={rootCid} />
      </div>
    </div>
  )
}
