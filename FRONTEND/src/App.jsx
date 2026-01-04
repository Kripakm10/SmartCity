import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Signup from './components/Signup'
import Registration from './components/Registration'
import Home from './components/Home'
import About from './components/About'
import Contact from './components/Contact'
import Mission from './components/Mission'
import WasteManagement from './components/WasteManagement'
import WaterManagement from './components/WaterManagement'
import Grievance from './components/Grievance'
import UserDashboard from './components/UserDashboard'
import AdminDashboard from './components/AdminDashboard'
import Reset from './components/Reset'
import AdminLocations from './components/AdminLocations'
import UserRegistrations from './components/UserRegistrations'



function App() {
  const [count, setCount] = useState(0)

  return (
   <>
   <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/r' element={<Registration/>}></Route>
        <Route path='/about' element={<About/>}></Route>
        <Route path='/contact' element={<Contact/>}></Route>
        <Route path='/co' element={<Contact/>}></Route>
        <Route path='/mi' element={<Mission/>}></Route>
        <Route path='/user' element={<UserDashboard/>}></Route>
         <Route path='/waste' element={<WasteManagement/>}></Route>
        <Route path='/water' element={<WaterManagement/>}></Route>
        <Route path='/grievance' element={<Grievance/>}></Route>
          <Route path='/admin' element={<AdminDashboard/>}></Route>
        <Route path='/admin/locations' element={<AdminLocations/>}></Route>
        <Route path='/user/registrations' element={<UserRegistrations/>}></Route>
         <Route path='/res' element={<Reset/>}></Route>
      </Routes>
   </>
  )
}

export default App
