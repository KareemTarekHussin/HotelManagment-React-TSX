import { Box, Button, Modal } from "@mui/material";
import { useState } from "react";
import ChangePass from "../../../AuthenticationModule/components/ChangePass/ChangePass";

import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();

  const logout = ()=>{
    localStorage.removeItem('token');
    navigate('/login');

  }



  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <>
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
      <Button onClick={logout}>
        Logout
      </Button>
    </>
  );
}
