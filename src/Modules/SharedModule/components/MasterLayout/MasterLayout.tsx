import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { Box } from '@mui/material'
import SideBar from '../SideBar/SideBar';

import { CheckoutForm } from '../../../PaymentModule/components/CheckoutForm/CheckoutForm';
import { PaymentGetaway } from '../../../PaymentModule/components/PaymentGetaway/PaymentGetaway';
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
        p={{xs:1,md:3}} 
        px={{ md: 5 }} 
        py={{ xs:2,md: 4 }}
        pb={{xs:6}} 
        overflow="auto"
      >
        {/* <Navbar/> */}
        {/* <Outlet /> */}
        <PaymentGetaway/>
     
      </Box>
        
        
    </Box>


    
    </>
  )
};

export default MasterLayout;
