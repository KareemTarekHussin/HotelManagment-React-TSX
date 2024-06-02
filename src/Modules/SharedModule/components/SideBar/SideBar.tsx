import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { Box, Drawer, List, ListItem, ListItemText, Toolbar } from '@mui/material';
import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import ChangePass from "../../../AuthenticationModule/components/ChangePass/ChangePass";


export default function SideBar() {

  const navigate = useNavigate();
 
  
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [iconRotation, setIconRotation] = useState(1);
  let [isCollapse, setIsCollapse] = useState(true);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

  const updateCollapsedWidth = () => {
    const width = window.innerWidth;
    if (width <= 576) {
      setCollapsedWidth("60px");
    } else if (width <= 768) {
      setCollapsedWidth("80px");
    } else if (width <= 992) {
      setCollapsedWidth("80px");
    } else {
      setCollapsedWidth("80px");
    }
  };

  useEffect(() => {
    updateCollapsedWidth();
    window.addEventListener('resize', updateCollapsedWidth);
    return () => window.removeEventListener('resize', updateCollapsedWidth);
  }, []);

  
  // ?============================================================================================


  // const togglePassword = (field: keyof PasswordState) => {
  //   setShowPassword((prevState) => ({ ...prevState, [field]: !prevState[field] }));
  // };
  
  const handleCollapse = () => {
    setIsCollapse(!isCollapse);
    setIconRotation(prevRotation => prevRotation === 1 ? -1 : 1);
  }
  
  // const onSubmit = async (data: any) => {
  //   try{
      
  //     let response = await axios.put(`${baseUrl}/Users/ChangePassword`, data,
  //       {
  //         headers: requestHeaders
  //       });
     
     
     
  //    getToast("success", response.data.message)
  //     logout()
  //     console.log(data);
      
  //   }
  //   catch (error) {
      
  //     console.log(error);
  //   }
  // }
  

  // *========================================><=============================================//
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            width: 400,
            bgcolor: "white",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            px: 3,
            py: 5,
            borderRadius: 2
          }}
        >
          <ChangePass />
        </Box>
      </Modal>
      <Button onClick={handleOpen}>Change Password</Button>
    </div>
  );
}
