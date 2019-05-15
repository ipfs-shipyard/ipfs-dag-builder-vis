import React from 'react'

export default function Header () {
  return (
    <header className='flex items-center pa3 bg-navy'>
      <a href='https://ipfs.io' title='home' className='w-50'>
        <img src='https://ipfs.io/images/ipfs-logo.svg' style={{ height: 50 }} />
      </a>
      <h1 className='w-50 ma0 tr f3 fw2 montserrat aqua'>DAG builder</h1>
    </header>
  )
}
