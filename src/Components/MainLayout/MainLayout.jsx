import React from 'react'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import NavBar from '../NavBar/NavBar'

export default function MainLayout({userData,logout}) {

  return (
    <>
    <div className='maindiv'>
  <NavBar userData={userData} logout={logout}/>
    <Outlet></Outlet>
    <Footer/>
    </div>
    </>
  )
}
