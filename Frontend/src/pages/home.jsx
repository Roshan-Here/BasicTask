import React from 'react'
import Card from './../components/Card';

function Home() {
    
  return (
    <div className='bg-gradient-to-tl from-teal-500 to-zinc-700 w-full h-screen  overflow-hidden'>
      <div className='flex justify-center'>
        <div className='mt-3 text-white text-lg font-bold'>
            <p>List of Employees</p>
        </div>
      </div>
    <Card/>
    </div>
  )
}

export default Home
