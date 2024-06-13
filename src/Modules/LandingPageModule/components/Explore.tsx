import React from 'react'
import Footer from '../../SharedModule/components/Footer/Footer'
import { useLocation } from 'react-router-dom'
export default function Explore() {
  const location = useLocation()
  console.log("data",location.state);
  
  return (
    <div>
        
        Explore


    <Footer/>
    </div>
  )
}
