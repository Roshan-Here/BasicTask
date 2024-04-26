import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { setEdatas } from '../redux/Employee/setEmployeeSlice';
import { getdata } from '../constants/fetchdata';

function Header() {
const {Edatas} = useSelector((state)=> state.Edata)
const dispatch = useDispatch()



  return (
    <div className='p-0 bg-zinc-700 w-full h-auto  overflow-hidden'>
      <div className='flex justify-between'>
        <div className='p-6 text-white text-2xl font-bold'>
            <Link to={"/"}>
                <p>Employee Dashboard</p>
            </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
