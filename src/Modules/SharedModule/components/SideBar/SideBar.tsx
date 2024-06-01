import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }



  return (
    <>
      <div>SideBar</div>
      <Button onClick={logout}>
        Logout
      </Button>
    </>
  )
}
