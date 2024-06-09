import * as React from 'react';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import DirectionsIcon from '@mui/icons-material/Directions';
import NotificationsIcon from "@mui/icons-material/Notifications";
import MoreIcon from "@mui/icons-material/MoreVert";
import { Badge, Box, Menu, MenuItem } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useToast } from '../../../Context/ToastContext';
import { useSidebar } from '../../../Context/SidebarContext';

export default function NewNavbar() {

  // ************************************
  const [loading, setLoading] = React.useState(false);
  // const { toggled, setToggled } = useSidebar();
  const { toggleSidebar } = useSidebar();

  const navigate = useNavigate();
  const { showToast } = useToast();
  const logout = ()=>{
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/login');
      showToast("success", 'Logged out successfully');
      setLoading(false);
    }, 1000);
  }
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
    React.useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     
     
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );
  // ********************************************
  //?? ************* Return *********************
  return (
    <Paper
      component="form"
      sx={{ p: '2px 16px',mt:2, display: 'flex', alignItems: 'center', width: '100%',backgroundColor:'#fff' }}
    >
      <IconButton sx={{ p: '10px',display:{md:'none'} }} aria-label="menu" onClick={toggleSidebar}>
        <MenuIcon />
      </IconButton>
      <InputBase
        sx={{ ml: 1, flex: 3,backgroundColor:'greenyello', width: '50%' }}
        placeholder="Search Here"
        inputProps={{ 'aria-label': 'search google maps' }}
      />
      {/* <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" /> */}
      {/* <IconButton color="primary" sx={{ p: '10px' }} aria-label="directions">
        <DirectionsIcon />
        </IconButton> */}
      <Box sx={{ flexGrow: 1,backgroundColor:'orangered' }} />
        {/* <IconButton type="button" sx={{ p: '10px',marginLeft:0,backgroundColor:'orange' }} aria-label="search">
          <SearchIcon />
        </IconButton> */}
            <Box sx={{ display: { xs: "none", md: "flex" },backgroundColor:'gree' }}>
            
            
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
            </Box>
            <Box sx={{ display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="medium"
                aria-label="show more"
                aria-controls={mobileMenuId}
                aria-haspopup="true"
                onClick={handleMobileMenuOpen}
                color="inherit"
              >
                <MoreIcon />
              </IconButton>
            </Box>
          <IconButton
              size="medium"
              aria-label="show 17 new notifications"
              color="inherit"
              sx={{backgroundColor:'gree',marginLeft:{lg:1}}}
            >
              <Badge badgeContent={17} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
    </Paper>
  );
}
