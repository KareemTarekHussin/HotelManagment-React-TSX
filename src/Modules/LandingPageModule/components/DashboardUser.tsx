import { useEffect, useState } from 'react'
import Footer from '../../SharedModule/components/Footer/Footer'
import NavbarUser from '../../SharedModule/components/Navbar/NavbarUser'
import MainNavbar from '../../SharedModule/components/Navbar/MainNavbar'
import { Outlet, useNavigate } from 'react-router-dom'

export default function DashboardUser() {
  
  return (
    <>
        <NavbarUser/> 
        {/* <MainNavbar/> */}
        <Outlet/>
        <Footer/>
    </>
  )
}
