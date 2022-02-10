/* eslint-env browser */

import { create } from 'ipfs-core'

/**
 * @param {import('ipfs-core').IPFS} ipfs
 * @param {Array<File>} files
 * @param {import('ipfs-unixfs-importer').UserImporterOptions} options
 */
const streamFiles = async (ipfs, files, options) => {
  // Create a stream to write files to
  const stream = new ReadableStream({
    start (controller) {
      for (let i = 0; i < files.length; i++) {
        // Add the files one by one
        controller.enqueue(files[i])
      }

      // When we have no more files to add, close the stream
      controller.close()
    }
  })

  let last
  for await (const res of ipfs.addAll(stream, options)) {
    last = res
  }
  return last
}

/** @type {Promise<import('ipfs-core').IPFS>} */
let ipfsPromise
export function getIpfs () {
  if (ipfsPromise) return ipfsPromise

  // Create an offline by default node
  ipfsPromise = create({
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
  return ipfsPromise
}

export async function ipfsAdd ({ files, cidVersion, chunker, rawLeaves, strategy, maxChildren, layerRepeat }) {
  const ipfs = await getIpfs()

  console.log('adding', { cidVersion, files, chunker, strategy, maxChildren, layerRepeat })

  const res = await streamFiles(ipfs, files, {
    cidVersion,
    chunker,
    rawLeaves,
    strategy,
    maxChildrenPerNode: maxChildren,
    layerRepeat,
    wrapWithDirectory: files.length > 1
  })

  console.log('added', res.cid.toString())
  return res.cid
}
