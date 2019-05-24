import IPFS from 'ipfs'

let ipfs, ipfsReady

export function getIpfs () {
  if (ipfsReady) return ipfsReady

  ipfsReady = new Promise((resolve, reject) => {
    ipfs = new IPFS()
    ipfs.on('ready', () => resolve(ipfs)).on('error', reject)
  })

  return ipfsReady
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
