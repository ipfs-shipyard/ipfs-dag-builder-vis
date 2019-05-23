import React from 'react'

export default function Spinner ({ show }) {
  return (
    <div className='w-100 h-100 absolute' style={{ display: show ? 'block' : 'none', zIndex: 1 }}>
      <div className='h-100 flex items-center justify-center'>
        <div className='lolo' />
      </div>
    </div>
  )
}
