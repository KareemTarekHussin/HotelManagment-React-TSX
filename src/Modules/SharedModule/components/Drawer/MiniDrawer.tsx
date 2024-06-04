import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
// import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
// import LogoutIcon from '@mui/icons-material/Logout';
// import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import InboxIcon from '@mui/icons-material/MoveToInbox';
// import MailIcon from '@mui/icons-material/Mail';
// import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { AppBar, CircularProgress, Modal, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { Dehaze, LockOpenOutlined } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../Context/ToastContext';
import { useState } from 'react';
import ChangePass from '../../../AuthenticationModule/components/ChangePass/ChangePass';
type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function AnchorTemporaryDrawer() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
  // const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
  

  const logout = ()=>{
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/login');
      showToast("success", 'Logged out successfully');
      setLoading(false);
    }, 1000);
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  const list = (anchor: Anchor) => (
    <Box
      sx={{ 
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 
        isSmallScreen ? 250 : 
        300,
        backgroundColor:'#203FC7',
        height:'100%',
        color:'white'
       }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{backgroundColor:'greenyello', marginTop:{xs:10}}}>  

        <ListItem key="Home" disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{color:'white'}}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Users" disablePadding>
          <ListItemButton>
            <ListItemIcon sx={{color:'white'}}>
              <PeopleOutlineIcon />
            </ListItemIcon>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>

        <ListItem key="Change Password" disablePadding onClick={handleOpen}>
          <ListItemButton>
            <ListItemIcon sx={{color:'white'}}>
              <LockOpenOutlined />
            </ListItemIcon>
            <ListItemText primary="Change Password" />
          </ListItemButton>
        </ListItem>


        <ListItem key="Send email" disablePadding>
          <ListItemButton 
            onClick={logout} 
            disabled={loading} 
            sx={{
              '&.Mui-disabled': {
                backgroundColor: '#273ea8', 
                color: '#fff', 
            },
            }}
            >
              <ListItemIcon sx={{color:'white',marginLeft:0}}>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText primary={loading ? <CircularProgress size={14} sx={{ color: 'white', marginTop:0  }} /> : 'Logout'} />
              {/* <Typography sx={{backgroundColor:'gol'}}>{loading ? <CircularProgress size={16} sx={{ color: 'white', marginTop:0  }} /> : 'Logout'}</Typography> */}

          </ListItemButton>
        </ListItem>

      </List>
    </Box>
  );

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

      <AppBar sx={{display:{md:'none'}}}>
        <Toolbar>
          <Button color="inherit" onClick={toggleDrawer('left', true)}><Dehaze/></Button>
        </Toolbar>
      </AppBar>

      {/* {isLargeScreen && (

      )} */}
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            variant={ 'temporary'}
            // variant={isLargeScreen? 'permanent' : 'temporary'}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
