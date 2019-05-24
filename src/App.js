/* eslint-env browser */
import React, { useState, useEffect } from 'react'
import Header from './Header'
import Controls from './Controls'
import Dag from './Dag'
import { ipfsAdd } from './lib/ipfs'
import DropTarget from './DropTarget'
import NodeInfo from './NodeInfo'
import Spinner from './Spinner'

export default function App () {
  const [files, setFiles] = useState([])
  const [chunker, setChunker] = useState('size-512')
  const [rawLeaves, setRawLeaves] = useState(false)
  const [strategy, setStrategy] = useState('balanced')
  const [maxChildren, setMaxChildren] = useState(11)
  const [layerRepeat, setLayerRepeat] = useState(4)
  const [rootCid, setRootCid] = useState(null)
  const [focusedNode, setFocusedNode] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!files.length) return
    const addFiles = async () => {
      setRootCid(null)
      setLoading(true)
      const cid = await ipfsAdd({ files, chunker, rawLeaves, strategy, maxChildren, layerRepeat })
      setRootCid(cid)
    }
    addFiles()
  }, [files, chunker, rawLeaves, strategy, maxChildren, layerRepeat])

  const onFileChange = file => {
    setFiles(files.concat({ path: file.name, content: file }))
  }

  const onReset = () => {
    setFiles([])
    setChunker('size-512')
    setStrategy('balanced')
    setMaxChildren(11)
    setLayerRepeat(4)
    setRootCid(null)
    setFocusedNode(null)
  }

  return (
    <div className='avenir flex flex-column h-100'>
      <div className='flex-none'>
        <Header />
      </div>
      <div className='flex-none'>
        <Controls
          chunker={chunker}
          onChunkerChange={setChunker}
          rawLeaves={rawLeaves}
          onRawLeavesChange={setRawLeaves}
          strategy={strategy}
          onStrategyChange={setStrategy}
          maxChildren={maxChildren}
          onMaxChildrenChange={setMaxChildren}
          layerRepeat={layerRepeat}
          onLayerRepeatChange={setLayerRepeat}
          onReset={onReset} />
      </div>
      <div className='flex-auto'>
        <DropTarget onFileDrop={onFileChange} className='h-100'>
          {files.length ? (
            <div className='flex flex-column h-100'>
              <div className='flex-auto relative'>
                <Spinner show={loading} />
                <Dag
                  rootCid={rootCid}
                  onNodeFocus={setFocusedNode}
                  onGraphRender={() => setLoading(false)} />
              </div>
              <div className='flex-none'>
                <NodeInfo info={focusedNode} />
              </div>
            </div>
          ) : null}
        </DropTarget>
      </div>
    </div>
  )
}
