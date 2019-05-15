import React from 'react'

export default function Controls ({
  chunker,
  onChunkerChange,
  rawLeaves,
  onRawLeavesChange,
  strategy,
  onStrategyChange,
  maxChildren,
  onMaxChildrenChange,
  layerRepeat,
  onLayerRepeatChange,
  onReset
}) {
  return (
    <div className='flex flex-row items-center pa3 bg-white'>
      <div className='mr3'>
        <select
          value={chunker}
          onChange={e => onChunkerChange(e.target.value)}
          className='charcoal ba b--black-20 br1 pv1 ph2 db center focus-outline'>
          <option value='size-32'>32 byte chunks</option>
          <option value='size-512'>512 byte chunks</option>
          <option value='size-1024'>1,024 byte chunks</option>
          <option value='size-16384'>16,384 byte chunks</option>
          <option value='size-262144'>26,2144 byte chunks</option>
        </select>
      </div>
      <div className='mr3'>
        <select
          value={rawLeaves}
          onChange={e => onRawLeavesChange(e.target.value === 'true')}
          className='charcoal ba b--black-20 br1 pv1 ph2 db center focus-outline'>
          <option value='false'>UnixFS leaves</option>
          <option value='true'>Raw leaves</option>
        </select>
      </div>
      <div className='mr3'>
        <select
          value={strategy}
          onChange={e => onStrategyChange(e.target.value)}
          className='charcoal ba b--black-20 br1 pv1 ph2 db center focus-outline'>
          <option value='balanced'>Balanced DAG</option>
          <option value='trickle'>Trickle DAG</option>
          <option value='flat'>Flat DAG</option>
        </select>
      </div>
      {['balanced', 'trickle'].includes(strategy) ? (
        <div className='mr3'>
          <select
            value={maxChildren}
            onChange={e => onMaxChildrenChange(parseInt(e.target.value))}
            className='charcoal ba b--black-20 br1 pv1 ph2 db center focus-outline'>
            <option value='11'>11 children max</option>
            <option value='44'>44 children max</option>
            <option value='174'>174 children max</option>
          </select>
        </div>
      ) : null}
      {strategy === 'trickle' ? (
        <div className='mr3'>
          <select
            value={layerRepeat}
            onChange={e => onLayerRepeatChange(parseInt(e.target.value))}
            className='charcoal ba b--black-20 br1 pv1 ph2 db center focus-outline'>
            <option value='1'>1 layer repeat</option>
            <option value='4'>4 layer repeats</option>
            <option value='16'>16 layer repeats</option>
          </select>
        </div>
      ) : null}
      <div className='flex-auto' />
      <button
        type='button'
        onClick={e => onReset()}
        className='transition-all sans-serif dib v-mid fw5 nowrap lh-copy bn br1 ph4 pv1 pointer focus-outline bg-gray hover-bg-red white'
        title='Clear file(s) and reset controls to defaults'>
        Reset
      </button>
    </div>
  )
}
