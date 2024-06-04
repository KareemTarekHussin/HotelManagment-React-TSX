// import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import MiniDrawer from '../Drawer/MiniDrawer';
// import { useAuth } from '../../../Context/AuthContext'


const MasterLayout = () => {

  return (
    
    <>
    <Box display="flex" className="font-main">
      <Box>
        <MiniDrawer/>
      </Box>
      <Box 
        flex="1" 
        height="100vh" 
        p={2} 
        px={{ md: 5 }} 
        py={{ md: 4 }} 
        overflow="auto"
      >
        <Outlet />
        <Box sx={{backgroundColor:'greenYellow'}}>
            {/* <Typography variant="h4">Hello</Typography>
            <Typography variant="h4">Hello</Typography>
            <Typography variant="h4">Hello</Typography>
            <Typography variant="h4">Hello</Typography> */}

        </Box>
      </Box>
    </Box>
    
    </>
  )
};

export default MasterLayout;
