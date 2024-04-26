import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home';
import Header from './components/Header';
import DetailedData from './pages/DetailedData';

function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/:id' element={<DetailedData/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
