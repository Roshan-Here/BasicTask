import React, { useEffect, useState } from 'react'
import Card from './../components/Card';
import { setEdatas } from '../redux/Employee/setEmployeeSlice';
import { useDispatch, useSelector } from 'react-redux';
import {getdata}  from '../constants/fetchdata'
import Footer from '../components/Footer';

function Home() {
    const dispatch = useDispatch()
    const {Edatas} = useSelector((state)=> state.Edata)
    const [searchValue, setSearchValue] = useState('');
    const [prevdata, setprevdata] = useState([]);
    // console.log(Edatas)
    // const [dataas, setdataas] = useState([])
    console.log(Edatas)
    useEffect(()=>{
        getdata(dispatch)
    },[])

    const handledelete=(eid)=>{
        let newdata = Edatas.filter(item=>item.id!==eid)
        console.log('newdata: ',newdata)
        dispatch(setEdatas(newdata))
        // setdataas(newdata)
    }

    const handleChange = (event) => {
        setprevdata(Edatas)
        const { value } = event.target;
        setSearchValue(value);
        if (value !== '') {
            let searchData = Edatas.filter((item) => item.id === parseInt(value));
            dispatch(setEdatas(searchData));
        } else {

            dispatch(setEdatas(prevdata));
        }
    };


  return (
    <>
    <div className='bg-gradient-to-tl from-teal-500 to-zinc-700 w-full h-screen  overflow-y-auto'>
      <div className='flex flex-col justify-center items-center'>
        <div className='m-4 border border-red-500 rounded-xl'>
                <input
                className='px-12 py-3 bg-zinc-700 hover:bg-cyan-950' 
                placeholder='Enter the id to be searched' 
                type="text"
                onChange={handleChange}
                value={searchValue} />
            </div>
            <div className='mt-3 text-white text-lg font-bold'>
                <p>List of Employees</p>
            </div>
        </div>
                {
                    Edatas.map((data)=>(
                            <Card
                            key={data.id}
                            ename={data.employee_name}
                            eid ={data.id}
                            handledelete={handledelete}
                            />
                    ))
                }
        </div>
        <Footer/>
        </>
  )
}

export default Home
