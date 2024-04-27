import React from 'react'

function Header() {
  return (
    <div className='flex justify-between w-full h-auto bg-gradient-to-r from-stone-500 to-stone-700 rounded-b-lg drop-shadow-2xl '>
      <div className='text-white text-2xl'>
        <p className='p-4'>Weather Dashboard</p>
      </div>
    </div>
  )
}

export default Header
