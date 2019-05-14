import React from 'react'

function kill (e) {
  e.stopPropagation()
  e.preventDefault()
  return false
}

export default function DropTarget ({ onFileDrop, children, ...props }) {
  const onDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    onFileDrop(e.dataTransfer.files[0])
  }

  return (
    <div onDrop={onDrop} onDragEnter={kill} onDragOver={kill} {...props}>
      {children || (
        <div className='h-100 ph3 pb3'>
          <label className='flex items-center justify-center h-100 br4 bw2 b--gray-muted b--dashed bg-snow-muted relative'>
            <div>
              <input
                type='file'
                className='absolute top-0 o-0'
                onChange={e => onFileDrop(e.target.files[0])} />
              <span
                className='f3 transition-all sans-serif dib v-mid lh-copy bn br1 ph4 pv2 pointer focus-outline bg-aqua o-90 glow white mr3'>
                Pick a file
              </span>
              <span className='f2 gray v-mid'>or drop it here</span>
            </div>
          </label>
        </div>
      )}
    </div>
  )
}
