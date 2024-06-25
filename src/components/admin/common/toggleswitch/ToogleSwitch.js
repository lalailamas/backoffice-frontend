import React from 'react'

const ToggleSwitch = ({ isChecked, onToggle }) => (
  <label className='relative inline-block w-12 h-6 align-middle select-none transition duration-200 ease-in'>
    <input
      type='checkbox'
      checked={isChecked}
      onChange={onToggle}
      className='absolute opacity-0 w-0 h-0'
    />
    <span
      className={`block overflow-hidden h-6 rounded-full cursor-pointer ${
        isChecked ? 'bg-green-400' : 'bg-gray-300'
      }`}
    />
    <span
      className={`absolute top-0 left-0 w-6 h-6 bg-white border-2 border-gray-300 rounded-full transition-transform duration-200 ease-in transform ${
        isChecked ? 'translate-x-6' : ''
      }`}
    />
  </label>
)

export default ToggleSwitch
