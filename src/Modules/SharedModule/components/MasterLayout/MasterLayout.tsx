import React from 'react'
import Navbar from '../Navbar/Navbar'
import SideBar from '../SideBar/SideBar'
import { Outlet } from 'react-router-dom'
// import { useAuth } from '../../../Context/AuthContext'


const MasterLayout: React.FC = () => {

  return (
    <div className="d-flex font-main">
        <Navbar/>
        <div>
          <SideBar/>
        </div>
        <div className="w-100 vh-100 p-2 px-md-5 py-md-4 overflow-y-auto">
          <Outlet/>
        </div>
      </div>
  )
};

export default MasterLayout;
