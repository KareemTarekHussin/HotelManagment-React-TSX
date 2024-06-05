import React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import { AppBar, CircularProgress, IconButton, Modal, Toolbar, useMediaQuery, useTheme } from '@mui/material';
import { ChevronLeft, ChevronRight, Dehaze, LockOpenOutlined } from '@mui/icons-material';
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
  
  
  const handleDrawerToggle = () => { //*=======================//
    setDrawerOpen(!drawerOpen);
  };
    const theme = useTheme();
    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));
    // const isMediumScreen = useMediaQuery(theme.breakpoints.between('sm', 'md'));
    const isLargeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const [drawerOpen, setDrawerOpen] = useState(isLargeScreen ? false: true); //*=======================//
  

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
        width: anchor === 'top' || anchor === 'bottom' ? 'auto' : isSmallScreen ? 250 : drawerOpen ? 300 : 75,
        backgroundColor:'#203FC7',
        height:'100%',
        color:'white',
        transition: 'width 0.3s',
        boxSizing: 'border-box',
        overflowX: 'hidden' // Prevent horizontal overflow
       }}
      role="presentation"
      // onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List sx={{backgroundColor:'greenyello', marginTop:{xs:10},display:'flex', flexDirection:'column', gap:0}}>  


        <ListItem 
          disablePadding 
          onClick={handleDrawerToggle} 
          sx={{backgroundColor:'orang',marginBottom:3,display:{xs:'none',md:'flex'},justifyContent:'center'}}
          >
          <ListItemButton>
            <IconButton  
              sx={{ 
                color: 'white', marginLeft: drawerOpen ? 'auto' : 0,
                '&:hover': {
                  backgroundColor: 'transparent'
                }
               }}>
              {drawerOpen ? <ChevronLeft /> : <ChevronRight />}
            </IconButton>

          </ListItemButton>
        </ListItem>


        <ListItem key="TEST" disablePadding sx={{backgroundColor:'orang',height:50,marginLeft:0}}>
          <ListItemButton>
            <ListItemIcon sx={{color:'white',paddingLeft:1}}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="TEST" sx={{ 
              whiteSpace: 'nowrap', 
              overflow: 'hidden', 
              textOverflow: 'ellipsis',
               }}  />}
          </ListItemButton>
        </ListItem>

        <ListItem key="Home" disablePadding sx={{backgroundColor:'orang',height:50,marginLeft:0}}>
          <ListItemButton>
            <ListItemIcon sx={{color:'white',paddingLeft:1}}>
              <HomeOutlinedIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Home" sx={{ transition: 'all 0.3s', width: drawerOpen ? 'auto' : 0, opacity: drawerOpen ? 1 : 0 }}  />}
          </ListItemButton>
        </ListItem>


        <ListItem key="Users" disablePadding sx={{backgroundColor:'orang',height:50,marginLeft:0}}>
          <ListItemButton>
            <ListItemIcon sx={{color:'white',paddingLeft:1}}>
              <PeopleOutlineIcon />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Users" />}
          </ListItemButton>
        </ListItem>


        <ListItem key="Change Password" disablePadding onClick={handleOpen} sx={{width:400,backgroundColor:'orang',height:50,marginLeft:0}}>
          <ListItemButton>
            <ListItemIcon sx={{color:'white',paddingLeft:1}}>
              <LockOpenOutlined />
            </ListItemIcon>
            {drawerOpen && <ListItemText primary="Change Password" sx={{ transition: 'opacity 3s', opacity: drawerOpen ? 1 : 0 }} />}
          </ListItemButton>
        </ListItem>


        <ListItem key="Send email" disablePadding sx={{backgroundColor:'orang',height:50}}>
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
              <ListItemIcon sx={{color:'white',paddingLeft:1}}>
                <ExitToAppIcon />
              </ListItemIcon>
              {drawerOpen && (loading ? (
                <CircularProgress size={14} sx={{ color: 'white', marginTop: 0 }} />
              ) : (
                <ListItemText primary="Logout"  />
              ))}
              {/* <ListItemText primary={loading ? <CircularProgress size={14} sx={{ color: 'white', marginTop:0  }} /> : 'Logout'} /> */}
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
          {/* <Button onClick={toggleDrawer(anchor, true)} sx={{backgroundColor:'green'}}>{anchor}</Button> */}
          <Drawer
            variant={ 'temporary'}
            // variant={isLargeScreen? 'permanent' : 'temporary'}
            anchor={anchor}
            open={isLargeScreen ? drawerOpen : state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          {/* Button to toggle the drawer only on small screens */}
          {!isLargeScreen && (
            <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
