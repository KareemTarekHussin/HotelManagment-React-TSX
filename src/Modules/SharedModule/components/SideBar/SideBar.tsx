import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';
import { Box, CircularProgress, Modal } from "@mui/material";
import { useEffect, useState } from "react";
import ChangePass from "../../../AuthenticationModule/components/ChangePass/ChangePass";
import { useToast } from "../../../Context/ToastContext";
import { useNavigate } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import LogoutIcon from '@mui/icons-material/Logout';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';


export default function SideBar() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [collapsed, setIsCollapsed] = useState(true);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  let [collapsedWidth, setCollapsedWidth] = useState("80px");

  const handleCollapse = ()=>{
    setIsCollapsed(!collapsed)
  }

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
      
    <div className='sidebar-container' >
      <Sidebar collapsed={collapsed} collapsedWidth={collapsedWidth}>
        <Menu style={{backgroundColor:'orang', marginTop:100}}>


          <MenuItem onClick={handleCollapse} style={{textAlign:'center',marginBottom:15}} > 
            <button
              className={`collapse-button ${collapsed ? '' : 'expanded'}`}
            >
              <ArrowForwardIcon sx={{marginTop:1,marginRight:{xs:2,lg:0}}}/>
            </button>
          </MenuItem>


          <MenuItem onClick={handleOpen} icon={<LockOpenIcon sx={{color:'white',marginRight:{xs:2,lg:0}}}/>}> 
            <button
            >
              Change Password
            </button>
          </MenuItem>


          <MenuItem onClick={logout} icon={<ExitToAppIcon sx={{color:'white',marginRight:{xs:2,lg:0}}}/>} > 
              <button 
                
                disabled={loading}
                >
                {loading ? <CircularProgress size={20} /> : "Logout"}
              </button>
          </MenuItem>
          
        </Menu>
      </Sidebar>

    </div>
      
    </>
  );
}
