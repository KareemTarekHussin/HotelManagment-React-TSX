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
import { useToast } from '../../../Context/ToastContext';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const pages = ['Home', 'Explore', 'Reviews', 'Favorites'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];
export default function NavbarUser() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const { showToast } = useToast();
  const [loading, setLoading] = useState(false);

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
  const logout = () => {
    setLoading(true);
    setTimeout(() => {
      localStorage.removeItem('token');
      navigate('/login');
      showToast("success", 'Logged out successfully');
      setLoading(false);
    }, 1000);
  };
  const navigate = useNavigate();

  return (


    <>
      <AppBar position="static"
        sx={{
          backgroundColor: 'white',
          color: 'black',
          boxShadow: 'none',
          outline: '2px solid #E5E5E5 '

        }}>
        <Container maxWidth="xl">
          <Toolbar
            disableGutters
            sx={{
              backgroundColor: 're',
              paddingInline: { md: 19 }
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
                {/* {pages.map((page) => ( */}

                <MenuItem onClick={() => navigate('/')}>
                  <Link textAlign="center" sx={{ textDecoration: 'none' }}>Home</Link>
                </MenuItem>

                <MenuItem onClick={() => navigate('explore')}>
                  <Link textAlign="center" sx={{ textDecoration: 'none' }}>Explore</Link>
                </MenuItem>

                <MenuItem onClick={() => navigate('favorites')}>
                  <Link textAlign="center" sx={{ textDecoration: 'none' }}>Favorites</Link>
                </MenuItem>

                <MenuItem>
                  <Link textAlign="center" sx={{ textDecoration: 'none' }}>Reviews</Link>
                </MenuItem>
                {/* ))} */}
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
                backgroundColor: 'greenyello',
                display: { xs: 'none', md: 'flex' },
                justifyContent: 'end',
                gap: 4,
                fontSize: '14px',
              }}>

              <Link
                onClick={() => navigate('')}
                sx={{
                  color: '#3252df',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
              >
                Home
              </Link>
              <Link
                onClick={() => navigate('explore')}
                sx={{
                  color: '#152c5b',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
              >
                Explore
              </Link>
              <Link
                onClick={() => navigate('favorites')}
                sx={{
                  color: '#152c5b',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
              >
                Favorites
              </Link>
              <Link
                // onClick={() => navigate('login')}
                sx={{
                  color: '#152c5b',
                  textDecoration: 'none',
                  '&:hover': {
                    cursor: 'pointer'
                  }
                }}
              >
                Reviews
              </Link>
              <ShoppingCartIcon onClick={() => navigate('favorites')}
                sx={{
                  border: "1px solid red",


                }}

              >

              </ShoppingCartIcon>



            </Box>

            {/* =================================>> ProfileImg <<============================================ */}
            <Box sx={{ flexGrow: 0, ml: { md: 8 } }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="Remy Sharp"
                    src="/static/images/avatar/2.jpg"
                    sx={{ width: 34, height: 34 }}
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >

                <MenuItem onClick={handleCloseUserMenu}>
                  <Button onClick={logout}>Logout</Button>
                </MenuItem>

              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      {/* <hr/> */}
    </>
  )
}
