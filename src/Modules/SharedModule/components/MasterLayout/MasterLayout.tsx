// import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import SideBar from '../SideBar/SideBar';
// import NewSideBar from '../Drawer/NewSideBar';
// import { NewSideBar } from '../Drawer/NewSideBar';
// import { useAuth } from '../../../Context/AuthContext'


const MasterLayout = () => {

  return (
    
    <>
    <Box display="flex" className="font-main">

        <SideBar/>
        
        
      <Box 
        flex="1" 
        className='Content'
        height="100vh" 
        p={0} 
        px={{ md: 0 }} 
        py={{ md: 0 }} 
        overflow="auto"
      >
        <Outlet />
     
      </Box>
        
        
    </Box>


    
    </>
  )
};

export default MasterLayout;
