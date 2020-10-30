import React, { Fragment } from 'react'

const NodeContainer = ({ children }) => (
  <div className='pa3' style={{ minHeight: 90 }}>{children}</div>
)

const CidColumn = ({ cid }) => (
  <>
    <span className='f6 charcoal-muted'>CID</span><br />
    <a
      className='code charcoal hover-blue no-underline'
      href={`https://cid.ipfs.io/#${cid}`}
      target={cid}
      title='Inspect this CID'
    >
      {cid}
    </a><br />&nbsp;
  </>
)

const UnixFsFileNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib br-100 bg-navy mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS File</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          {info.unixfsData.blockSizes.length} <span className='charcoal-muted'>links</span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnixFsFileLeafNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib bg-green-muted mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS File</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          {info.unixfsData.blockSizes.length} <span className='charcoal-muted'>links</span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnixFsDirNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib bg-charcoal br2 mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS Directory</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnixFsHamtDirNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib bg-charcoal br2 mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS HAMT Directory</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnixFsRawNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib bg-yellow mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS Raw</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnixFsOtherNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib br-100 bg-navy mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>UnixFS {info.unixfsData.type}</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node (excluding UnixFS wrapper)'>
            {info.unixfsData.data ? info.unixfsData.data.length : 0} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          {info.unixfsData.blockSizes.length} <span className='charcoal-muted'>links</span>
        </div>
      </div>
    </NodeContainer>
  )
}

const RawNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='dib bg-red mr2 v-mid' style={{ width: 30, height: 30 }} />
            <span className='v-mid'>Raw Buffer</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
        <div className='mr4 flex-auto'>
          <span title='Total bytes in this node'>
            {info.length} <span className='charcoal-muted'>bytes total</span>
          </span>
        </div>
        <div className='mr4 flex-auto'>
          <span title='Bytes of data in this node'>
            {info.length} <span className='charcoal-muted'>bytes data</span>
          </span>
        </div>
      </div>
    </NodeContainer>
  )
}

const UnknownNode = ({ info }) => {
  return (
    <NodeContainer>
      <div className='flex flex-row items-center'>
        <div className='mr4 charcoal flex-auto'>
          <h1 className='f4 fw6'>
            <span className='v-mid'>Unknown</span>
          </h1>
        </div>
        <div className='mr4 flex-auto'>
          <CidColumn cid={info.id} />
        </div>
      </div>
    </NodeContainer>
  )
}

export default function NodeInfo ({ info }) {
  if (!info) return <NodeContainer />

  let Node

  if (info.type === 'unixfs') {
    if (info.unixfsData.type === 'file') {
      Node = info.isLeaf ? UnixFsFileNode : UnixFsFileLeafNode
    } else if (info.unixfsData.type === 'directory') {
      Node = UnixFsDirNode
    } else if (info.unixfsData.type === 'hamt-sharded-directory') {
      Node = UnixFsHamtDirNode
    } else if (info.unixfsData.type === 'raw') {
      Node = UnixFsRawNode
    } else { // I have never seen metadata or symlink nodes in the wild
      Node = UnixFsOtherNode
    }
  } else if (info.type === 'raw') {
    Node = RawNode
  } else {
    Node = UnknownNode
  }

  return <Node info={info} />
}
