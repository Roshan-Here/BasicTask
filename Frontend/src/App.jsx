import React, { useState } from 'react'
import Header from './Components/Header'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faCloudShowersHeavy, faCloudRain, faCloudBolt, faCloudMoon, faCloudSun, faCloudMeatball} from '@fortawesome/free-solid-svg-icons'
import { faCloudflare, faSkyatlas, faSoundcloud} from '@fortawesome/free-brands-svg-icons'
import toast, { Toaster } from 'react-hot-toast';
import axios from 'axios';

// https://openweathermap.org/weather-conditions#How-to-get-icon-URL

function App() {
  const [searchvalue,setsearchvalue] = useState("")
  const [temp, settemp] = useState('')
  const [windeed,setwindspeed] = useState('')
  const [humidity, sethumidity] = useState('')
  const [locationn,setlocationn] = useState('')
  const [time, settime] = useState('')
  const [datee, setdatee] = useState('')
  const [Icon, setIcon] = useState('')
  const [showdata, setshowdata] = useState(false)  

  const kelvinToCelsius = (val) => {
    var celsius = val - 273.15;
    celsius = celsius.toFixed(2);
    return parseFloat(celsius);
}


  const handlechange=(val)=>{
    const {value} = val.target
    setsearchvalue(value)
  }
  console.log(searchvalue)

  const handleSearch=()=>{
    if(searchvalue!==''){
      console.log("her3e at 17")
      getCurrentDateTime()
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
      setshowdata(true)
      setlocationn(res.data.name)
      settemp(kelvinToCelsius(res.data.main.temp))
      sethumidity(res.data.main.humidity)
      setwindspeed(res.data.wind.speed)
      if(res.data.weather[0].icon === "01d" || res.data.weather[0].icon === "01n"){
        setIcon(faCloudflare)
      }
      else if(res.data.weather[0].icon === "02d" || res.data.weather[0].icon === "02n"){
        setIcon(faCloudSun)}
      else if(res.data.weather[0].icon === "03d" || res.data.weather[0].icon === "03n"){
        setIcon(faSoundcloud)  
      }
      else if(res.data.weather[0].icon === "04d" || res.data.weather[0].icon === "04n"){
        setIcon(faSoundcloud)  
      }
      else if(res.data.weather[0].icon === "09d" || res.data.weather[0].icon === "09n"){
      setIcon(faCloudRain) 
      }
      else if(res.data.weather[0].icon === "10d" || res.data.weather[0].icon === "10n"){
      setIcon(faCloudBolt) 
      }
      else if(res.data.weather[0].icon === "13d" || res.data.weather[0].icon === "13n"){
      setIcon(faCloudMeatball) 
      }
      else {
        setIcon(faCloudflare)
    }
  }
    catch(err){
      setshowdata(false)
      toast.error(err)
    }
  }

  function getCurrentDateTime() {
    var currentDate = new Date();

    // Get AM/PM format
    var ampm = currentDate.getHours() >= 12 ? 'PM' : 'AM';

    // Convert hours to 12-hour format
    var hours = currentDate.getHours() % 12;
    hours = hours ? hours : 12; // Handle midnight (0 hours)

    // Get minutes and add leading zero if needed
    var minutes = currentDate.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes;

    // Get day, date, month, and year
    var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    var day = days[currentDate.getDay()];
    var date = currentDate.getDate();
    var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    var month = months[currentDate.getMonth()];
    var year = currentDate.getFullYear();

    // Construct the formatted string
    var formattedTime = hours + ':' + minutes + ' ' + ampm;
    var formattedDate = day + ', ' + date + ' ' + month + ' ' + year;

    // Return an object containing time and date
    settime(formattedTime)
    setdatee(formattedDate)
}


  return (
    <>
    <div className='w-full h-screen bg-gradient-to-r from-blue-200 to-cyan-200 overflow-hidden'>
      <Header/>
      <Toaster/>
        <div className='flex flex-col justify-center items-center'>
          <div className='mt-24'>
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
          {
            showdata?<>
          <div className='mt-8'>
            <p className='text-4xl font-medium text-slate-800'>{locationn}</p>
          </div>
          <div className='flex justify-between items-center'>
            {/* weather status */}
              <FontAwesomeIcon 
              className='text-5xl'
              icon={Icon} />
              <div className='px-3'>
                <p className='text-4xl'>{temp} C</p>
              </div>
          </div>
          <div className='p-3 font-mono text-2xl'>
            <p>Wind speed : {windeed}</p>
            <p>Humidity : {humidity}</p>
          </div>
          <div className='mt-4 py-12'>
              <div className='flex flex-col justify-center items-center rounded-xl px-32  bg-gradient-to-r from-blue-300 to-cyan-300'>
                <p className='py-2 text-3xl'>{time}</p>
                <p className='py-2'>{datee}</p>
              </div>
          </div>
            </>:""
          }
        </div>
      </div>
    </>
  )
}

export default App
