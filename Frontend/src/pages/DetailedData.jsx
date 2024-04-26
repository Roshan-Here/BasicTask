import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

function DetailedData() {
    const { id } = useParams()
    const {Edatas} = useSelector((state)=> state.Edata)
    const [curdata, setcurdata]=useState([])

    useEffect(()=>{
        try{
            let curdata =  Edatas.filter((items)=>items.id===parseInt(id))
            setcurdata(curdata)
            console.log(curdata)
        }
        catch(er){
            console.log(er)
        }
    },[id])

  return (
    <div className='bg-gradient-to-tr from-indigo-300 to-lime-300 h-screen w-full'>
      <div className='flex flex-col justify-center items-center text-xl text-stone-950'>
        <div className='mt-3'>
            <p>Detailed Employee Data</p>
        </div>
        <div className='mt-3 text-red-800'>
            {
                curdata.length > 0 && (
                    <div>
                        <p>ID: {curdata[0].id}</p>
                        <p>Name: {curdata[0].employee_name}</p>
                        <p>Salary: {curdata[0].employee_salary}</p>
                        {/* Render other properties as needed */}
                    </div>
                )
            }
        </div>
      </div>
    </div>
  )
}

export default DetailedData
