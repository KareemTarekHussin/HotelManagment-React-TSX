
//  بسم الله ...... توكلنا علي الله

import Footer from '../../SharedModule/components/Footer/Footer'
import NavbarUser from '../../SharedModule/components/Navbar/NavbarUser'
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import { Container, Grid, Typography, useStepContext } from '@mui/material';
import image from '../../.././assets/Images/login.png'
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {useFav} from "../../Context/FavsContext"

export default function Favourites() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    flexGrow: 1,
  }));

  // const [Favorite, setFavorite] = useState()


  // const { addToFav } = useFav();
  // console.log(addToFav)

  // get list of favorites from API
  // const getfavorite = async () => {

  //   try {
  //     const responsve = await axios.get('https://upskilling-egypt.com:3000/api/v0/portal/favorite-rooms')
  //     setFavorite(responsve.success)
  //     console.log(Favorite)
  //   }
  //   catch {

  //   }

  // }
  // useEffect(() => {
  //   getfavorite

  // }, [])



  return (
    <>
      <Grid>
        <Box>
          {/* <NavbarUser /> */}
        </Box>
        <Container maxWidth="lg">
          <Box>
            <Typography
              sx={{
                fontSize: { xs: 26, md: 22, lg: 26 },
                fontWeight: 600,
                marginTop: { xs: 3, md: 3, lg: 3 },
                textAlign: "center"
              }}
            >
              Your Favorites
            </Typography>

            <Typography
              sx={{
                fontSize: { xs: 26, md: 22, lg: 20 },
                fontWeight: 200,
                marginTop: { md: 1, lg: 3 },
                marginBottom: { xs: 2, md: 1, lg: 3 },
                color: "#d1d1d1"
              }}
            >
              <Link to="login">
                Home
              </Link>

              <Link to="/register">
                Favorites
              </Link>


            </Typography>
            <Typography
              sx={{
                fontSize: { xs: 18, md: 19, lg: 20 },
                fontWeight: 600,
                marginTop: { xs: 3, md: 1, lg: 3 },
                marginBottom: { xs: 3, md: 3, lg: 3 }
              }}
            >
              Your Rooms
            </Typography>
          </Box>

          <Box>
            <Grid container spacing={5}>
              <Grid item xs={11} sm={5} md={4} lg={3} sx={{ color: 'white' }}>
                <Item sx={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  // backgroundSize: "cover",
                  objectFit: "cover",
                  height: "385px",
                }} >
                </Item>
              </Grid>

              <Grid item xs={11} sm={5} md={4} lg={3} sx={{ color: 'white' }}>
                <Item sx={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  objectFit: "contain",
                  height: "385px",
                }} >
                </Item>
              </Grid>
              <Grid item xs={11} sm={5} md={4} lg={3} sx={{ color: 'white' }}>
                <Item sx={{
                  backgroundImage: `url(${image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "cover",
                  height: "385px",
                }} >
                </Item>
              </Grid>
            </Grid>
          </Box>

        </Container>




      </Grid>
      {/* <Footer /> */}
    </>




  )
}

