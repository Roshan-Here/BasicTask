import React, { useState } from 'react'
import Header from './Components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

function App() {
  const [searchvalue,setsearchvalue] = useState("")
  const handlechange=(val)=>{
    const {value} = val.target
    setsearchvalue(value)
  }
  console.log(searchvalue)

  const handleSearch=()=>{
    if(searchvalue!==''){
      console.log("her3e at 17")
      fetchData()
    }
    else{
      console.log("her3e at 20")
      toast.error("Provide some city name")
    }
  }

  const fetchData=async()=>{
    try{
      let res = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${searchvalue}&appid=${import.meta.env.VITE_OPENWEATHER_API}`)
      console.log(res.data)
    }
    catch(err){
      toast.error(err)
    }
  }


  return (
    <>
    <div className='w-full h-screen bg-gradient-to-r from-blue-200 to-cyan-200 overflow-hidden'>
      <Header/>
      <Toaster/>
        <div className='flex flex-col justify-center items-center'>
          <div className='p-32'>
            <div className='flex items justify-between h-10 rounded-lg bg-gradient-to-r from-slate-500 to-slate-800'>
              <div className='px-2 py-2 border border-none rounded-lg'>
                  <input 
                  className='px-24 font-bold text-white bg-transparent'
                  placeholder='Enter the city name !'
                  onChange={handlechange}
                  type="text"
                 />
              </div>
              <div onClick={handleSearch} className='p-2 text-white'>
                <FontAwesomeIcon className='text-xl' icon={faMagnifyingGlass} />
              </div>
            </div>
          </div>
          <div className='p-10'>
            <p>wow</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
