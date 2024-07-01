import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Login from '../../../AuthenticationModule/components/Login/Login';
import { Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const pages = ['Products', 'Pricing', 'Blog'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];



export default function MainNavbar() {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorElUser(event.currentTarget);
    };
    const handleCloseNavMenu = () => {
      setAnchorElNav(null);
    };
    const handleCloseUserMenu = () => {
      setAnchorElUser(null);
    };
    const navigate = useNavigate();

    // const [activeLink, setActiveLink] = useState('');

    // const handleClick = (link:any) => {
    //   setActiveLink(link);
    //   // Assuming you have a navigate function for navigation
    //   navigate(link);
    // };
  
  return (


    <>
      <AppBar position="static" 
        sx={{
          backgroundColor:'white',
          color:'black',
          boxShadow:'none',
          outline:'2px solid #E5E5E5  '

        }}>
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{
            backgroundColor:'re',
            paddingInline:{md:20}
          }}
          >

          {/* ===============================>> Logo Large screen <<============================================ */}
          <Box
            sx={{
              backgroundColor: "greenyello",
              display: { xs: 'none', md: 'flex' },
              mr: 2,
            }}
          >
            <Typography
              sx={{
                fontSize: { sm: 24 },
                fontWeight: 500,
                display: "inline",
                color: "#3252df",
              }}
            >
              Stay
            </Typography>
            <Typography
              sx={{
                fontSize: { sm: 24 },
                fontWeight: 500,
                display: "inline",
                color: "#152c5b",
              }}
            >
              cation.
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* =================================>> Logo Mobile <<========================================== */}
          <Box
            sx={{
              mr: 2,
              backgroundColor: "gol",
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: { xs: 22 },
                fontWeight: 500,
                display: "inline",
                color: "#3252df",
              }}
            >
              Stay
            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 22 },
                fontWeight: 500,
                display: "inline",
                color: "#152c5b",
              }}
            >
              cation
            </Typography>
          </Box>
          {/* ==================================>> Buttons <<============================================ */}
          <Box 
            sx={{
              flexGrow: 1,
              backgroundColor:'greenyello', 
              display: { xs: 'non', md: 'flex' },
              justifyContent:'end',
              alignItems:'center',
              gap:4,
              fontSize:'14px',
              }}>

              <Link
                onClick={() => navigate('')}
                sx={{
                  color:'#3252df',
                  textDecoration:'none',
                  '&:hover':{
                    cursor:'pointer'
                  }
                }}
                >
                  Home
              </Link>

              <Link
                onClick={() => navigate('explore')}
                sx={{
                  color:'#152c5b',
                  textDecoration:'none',
                  '&:hover':{
                    cursor:'pointer'
                  }
                }}
                >
                  Explore
              </Link>

              <Button
                variant="contained"
                onClick={() => navigate('/login/register')}
                sx={{
                  fontSize:'14px',
                  textTransform:'capitalize'
                }}
                >
                  Register
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/login')}
                  sx={{
                    fontSize:'14px',
                    textTransform:'capitalize'
                  }}
                >
                  Login
              </Button>

              
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
    </>
  )
}
