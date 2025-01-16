import React from 'react'
import Logo from './ipfs-logo.svg'

export default function Header () {
  return (
    <header className='flex items-center pa3 bg-navy'>
      <a href='https://ipfs.tech' title='home' className='w-50'>
        <img src={Logo} style={{ height: 50 }} />
      </a>
      <h1 className='w-50 ma0 tr f3 fw2 montserrat'>
        <a className='aqua' href='https://github.com/ipfs-shipyard/ipfs-dag-builder-vis'>DAG builder</a>
      </h1>
    </header>
  )
}
