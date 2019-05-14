import React from 'react'

export default function Controls ({
  onFileChange,
  chunker,
  onChunkerChange,
  strategy,
  onStrategyChange,
  maxChildren,
  onMaxChildrenChange,
  layerRepeat,
  onLayerRepeatChange
}) {
  return (
    <div className='pa3 bg-white'>
      <input type='file' className='input avenir' onChange={e => onFileChange(e.target.files[0])} />
      <select value={chunker} onChange={e => onChunkerChange(e.target.value)}>
        <option value='size-32'>32 byte chunks</option>
        <option value='size-512'>512 byte chunks</option>
        <option value='size-1024'>1,024 byte chunks</option>
        <option value='size-16384'>16,384 byte chunks</option>
        <option value='size-262144'>26,2144 byte chunks</option>
      </select>
      <select value={strategy} onChange={e => onStrategyChange(e.target.value)}>
        <option value='balanced'>Balanced DAG</option>
        <option value='trickle'>Trickle DAG</option>
        <option value='flat'>Flat DAG</option>
      </select>
      {['balanced', 'trickle'].includes(strategy) ? (
        <select value={maxChildren} onChange={e => onMaxChildrenChange(parseInt(e.target.value))}>
          <option value='11'>11 children max</option>
          <option value='44'>44 children max</option>
          <option value='174'>174 children max</option>
        </select>
      ) : null}
      {strategy === 'trickle' ? (
        <select value={layerRepeat} onChange={e => onLayerRepeatChange(parseInt(e.target.value))}>
          <option value='1'>1 layer repeat</option>
          <option value='4'>4 layer repeats</option>
          <option value='16'>16 layer repeats</option>
        </select>
      ) : null}
    </div>
  )
}
