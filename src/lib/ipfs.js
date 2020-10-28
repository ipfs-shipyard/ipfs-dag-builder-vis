import IPFS from 'ipfs'

let ipfs

const streamFiles = async (ipfs, files, options) => {
  // Create a stream to write files to
  const stream = new ReadableStream({
    start(controller) {
      for (let i = 0; i < files.length; i++) {
        // Add the files one by one
        controller.enqueue(files[i])
      }

      // When we have no more files to add, close the stream
      controller.close()
    }
  })

  return await ipfs.add(stream, options)
}

export function getIpfs () {
  if (ipfs) return ipfs

  // Create an offline by default node
  ipfs = IPFS.create({
    preload: {
      enabled: false
    },
    config: {
      Bootstrap: [],
      Addresses: {
        Delegates: []
      }
    }
  })
  return ipfs
}

export async function ipfsAdd ({ files, chunker, rawLeaves, strategy, maxChildren, layerRepeat }) {
  const ipfs = await getIpfs()

  console.log('adding', { files, chunker, strategy, maxChildren, layerRepeat })

  const res = await streamFiles(ipfs, files, {
    chunker,
    rawLeaves,
    strategy,
    builderOptions: {
      maxChildrenPerNode: maxChildren,
      layerRepeat
    },
    wrapWithDirectory: files.length > 1
  })

  console.log('added', res.cid.toString())
  return res.cid.toString()
}
