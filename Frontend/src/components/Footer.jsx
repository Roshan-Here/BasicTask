import React from 'react'

function Footer() {
    const d = new Date()
    let year = d.getFullYear()
  return (
    <div className='flex justify-center items-center py-3 w-full bg-gray-600'>
      <p className='text-xl font-mono'>@Copyright {year}</p>
    </div>
  )
}

export default Footer
