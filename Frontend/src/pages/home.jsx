import React, { useEffect, useState } from 'react'
import Card from './../components/Card';
import axios from 'axios';
import datas from './../constants/givendata';

function Home() {
    const [dataas, setdataas] = useState([])
    const getdata = async() =>{
        try{
            const res = await axios.get(import.meta.env.VITE_REQUIRED_API)
            console.log(res.data)
            setdataas(res.data)
        }
        catch(err){
            // getting eroor due to 429 error, to many request so using data same as api ->stored
            console.log(err)
            console.log("setting data as prefetched->using data same as api")
            setdataas(datas)
        }
    }
    console.log(dataas)
    useEffect(()=>{
        getdata()
    },[])

    const handledelete=(eid)=>{
        let newdata = dataas.filter(item=>item.id!==eid)
        console.log('newdata: ',newdata)
        setdataas(newdata)
    }


  return (
    <div className='bg-gradient-to-tl from-teal-500 to-zinc-700 w-full h-screen  overflow-y-auto'>
      <div className='flex justify-center'>
        <div className='mt-3 text-white text-lg font-bold'>
            <p>List of Employees</p>
        </div>
      </div>
        {
            dataas.map((data)=>(
                <Card
                key={data.id}
                 ename={data.employee_name}
                 eid ={data.id}
                 handledelete={handledelete}
                 />
            ))
        }
    </div>
  )
}

export default Home
