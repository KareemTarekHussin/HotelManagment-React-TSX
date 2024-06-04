import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, Button, CircularProgress, Modal } from "@mui/material";
import { useState } from "react";
import ChangePass from "../../../AuthenticationModule/components/ChangePass/ChangePass";
import { useToast } from "../../../Context/ToastContext";
import { useNavigate } from 'react-router-dom';

export default function SideBar() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const logout = ()=>{
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/login');
      showToast("success", 'Logged out successfully');
      setLoading(false);
    }, 1000);
  }
  
  return (
    <>
  
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
      
    {/* <Box>
      <Sidebar>
        <Menu>

          <MenuItem onClick={handleOpen}> 
            <Button
              sx={{
                '&:hover': {
                  backgroundColor: 'transparent',
                }
              }}
            >
              Change Password
            </Button>
          </MenuItem>

          <MenuItem> 
              <Button 
                onClick={logout} 
                disabled={loading}
                sx={{
                  '&:hover': {
                    backgroundColor: 'transparent',
                  }
                }}
                >
                {loading ? <CircularProgress size={20} /> : "Logout"}
              </Button>
          </MenuItem>
          
        </Menu>
      </Sidebar>

    </Box> */}
      
    </>
  );
}
