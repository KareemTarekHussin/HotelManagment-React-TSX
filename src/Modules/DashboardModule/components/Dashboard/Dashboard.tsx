import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import RoomServiceOutlinedIcon from '@mui/icons-material/RoomServiceOutlined';
import { useContext, useEffect, useState } from "react";
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthContext'





const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(7),
  textAlign: 'center',
  background: '#1a1b1e',
  color: theme.palette.text.secondary,
}));

export default function Dashboard() {
  const [room, setRooms] = useState([])
  const { requestHeaders }: any = useContext(AuthContext);


  // const  getListOfRooms= async (data: FormValue) => {
  // get romms
  const getListOfRooms = async () => {

    try {
      // const registerFormData = appendToFormData(data);


      const response = await axios.get("https://upskilling-egypt.com:3000/api/v0/admin/rooms?page=1&size=10", {
        headers: requestHeaders,
      });

      setRooms(response.data)
      console.log(room)



    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListOfRooms()
  })


  return (

    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={3}>
          <Item sx={{
            display: "flex",
            color: "#fff"
          }}>
            <div className='title-rooms'>
              100

            </div>
            <div className='title-rooms'>

              <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
            </div>
          </Item>
        </Grid>
        <Grid item xs={12} md={3}>
          <Item sx={{
            display: "flex",
            color: "#fff"
          }}>
            <div className='title-rooms'>
              100

            </div>
            <div className='title-rooms'>

              <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
            </div>
            Facilities
          </Item>
        </Grid>
        <Grid justifyContent="center" item xs={12} md={3}>
          <Item sx={{
            display: "flex",
            color: "#fff"
          }}>
            <div className='title-rooms'>
              100


            </div>
            <div className='title-rooms'>

              <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
            </div> 
            Ads
          </Item>
          
        </Grid>
      </Grid>
    </Box>

  )
}
