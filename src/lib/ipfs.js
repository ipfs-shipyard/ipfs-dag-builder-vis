import ipfsProvider from 'ipfs-provider'

let ipfs, provider

export async function getIpfs () {
  if (ipfs) return ipfs

  const res = await ipfsProvider({
    tryWebExt: true,
    tryWindow: true,
    tryApi: true,
    tryJsIpfs: true,
    getJsIpfs: () => import('ipfs')
  })

  ipfs = res.ipfs
  provider = res.provider

  console.log('connected to ipfs through ', provider)
  return ipfs
}

export async function ipfsAdd ({ files, chunker, rawLeaves, strategy, maxChildren, layerRepeat }) {
  const ipfs = await getIpfs()

  console.log('adding', { files, chunker, strategy, maxChildren, layerRepeat })

  const res = await ipfs.add(files, {
    chunker,
    rawLeaves,
    strategy,
    builderOptions: {
      maxChildrenPerNode: maxChildren,
      layerRepeat
    },
    wrapWithDirectory: files.length > 1
  })

  console.log('added', res[res.length - 1].hash)
  return res[res.length - 1].hash
}
