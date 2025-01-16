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
  const [cidVersion, setCidVersion] = useState(1)
  const [chunker, setChunker] = useState('size-1048576')
  const [rawLeaves, setRawLeaves] = useState(true)
  const [strategy, setStrategy] = useState('balanced')
  const [maxChildren, setMaxChildren] = useState(174)
  const [layerRepeat, setLayerRepeat] = useState(4)
  const [rootCid, setRootCid] = useState(null)
  const [focusedNode, setFocusedNode] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!files.length) return
    const addFiles = async () => {
      setRootCid(null)
      setLoading(true)
      const cid = await ipfsAdd({ cidVersion, files, chunker, rawLeaves, strategy, maxChildren, layerRepeat })
      setRootCid(cid)
    }
    addFiles()
  }, [files, cidVersion, chunker, rawLeaves, strategy, maxChildren, layerRepeat])

  const onFileChange = file => {
    setFiles(files.concat({ path: file.name, content: file }))
  }

  const onReset = () => {
    setCidVersion(1)
    setFiles([])
    setChunker('size-1048576')
    setStrategy('balanced')
    setMaxChildren(174)
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
          cidVersion={cidVersion}
          onCidVersionChange={setCidVersion}
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
          onReset={onReset}
        />
      </div>
      <div className='flex-auto'>
        <DropTarget onFileDrop={onFileChange} className='h-100'>
          {files.length
            ? (
              <div className='flex flex-column h-100'>
                <div className='flex-auto relative'>
                  <Spinner show={loading} />
                  <Dag
                    rootCid={rootCid}
                    onNodeFocus={setFocusedNode}
                    onGraphRender={() => setLoading(false)}
                  />
                </div>
                <div className='flex-none'>
                  <NodeInfo info={focusedNode} />
                </div>
              </div>
              )
            : null}
        </DropTarget>
      </div>
    </div>
  )
}
