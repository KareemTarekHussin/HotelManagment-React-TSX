import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import ChairIcon from '@mui/icons-material/Chair';
import GroupWorkIcon from '@mui/icons-material/GroupWork';
import AdsClickIcon from '@mui/icons-material/AdsClick';
import { Stack } from "@mui/material";

ChartJS.register(ArcElement, Tooltip, Legend);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(5),
  textAlign: "center",
  background: "#1a1b1e",
  color: theme.palette.text.secondary,
}));

interface datadashboard {
  success: boolean;
  message: string;
  data: {
    rooms: number;
    facilities: number;
    bookings: {
      pending: number;
      completed: number;
    };
    ads: number;
    users: {
      user: number;
      admin: number;
    };

  };

}

export default function Dashboard() {
  const { requestHeaders }: any = useContext(AuthContext);
  const [dashlist, setDashList] = useState<datadashboard | null>(null);

  const getListOfRooms = async () => {
    try {
      const response = await axios.get(
        "https://upskilling-egypt.com:3000/api/v0/admin/dashboard",
        {
          headers: requestHeaders,
        }
      );

      setDashList(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getListOfRooms();
  }, []);
  const roomNumber = dashlist?.data.rooms;
  const facilitiesNumber = dashlist?.data.facilities;
  const ADSNumber = dashlist?.data.ads;
  //Variables for Bookings Chart
  const pendingNumber = dashlist?.data.bookings.pending;
  const completedNumber = dashlist?.data.bookings.completed;

  const userNumber = dashlist?.data.users.user;
  const AdminNumber = dashlist?.data.users.admin;

  const data = {
    labels: [`Users:${userNumber}`, `Admins:${AdminNumber}`],
    datasets: [
      {
        label: "Count",
        data: [userNumber, AdminNumber],
        backgroundColor: ["#42A5F5", "#66BB6A"],
        hoverBackgroundColor: ["#64B5F6", "#81C784"],
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
      },
      title: {
        display: true,
        text: "Users and Admins",
      },
    },
  };


  const booking = {
    labels: [
      'Pending', 'Completed'
    ],
    datasets: [{
      label: 'count',
      data: [pendingNumber, completedNumber],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)'
      ],


      hoverOffset: 4
    }]
  };
  const stylesItem = {
    display: "flex", color: "#fff", justifyContent: "space-between", fontSize: "17px", marginBottom:
      "50px"
  }
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={7}>
          <Grid item xs={12} md={4}>
            <Item style={stylesItem}>
              <div>
                <div>
                  {roomNumber}
                </div>
                <div>
                  Rooms
                </div>

              </div>
              <ChairIcon sx={{ fontSize: "35px", color: "#1d359a" }} />

            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item style={stylesItem}>
              <div>
                <div>
                  {facilitiesNumber}
                </div>
                <div>
                  Facilities
                </div>

              </div>
              <GroupWorkIcon sx={{ fontSize: "35px", color: "#1d359a" }} />

            </Item>
          </Grid>
          <Grid justifyContent="center" item xs={12} md={4}>
            <Item style={stylesItem}>
              <div>
                <div>
                  {ADSNumber}
                </div>
                <div>
                  ADS
                </div>

              </div>
              <AdsClickIcon sx={{ fontSize: "35px", color: "#1d359a" }} />

            </Item>
          </Grid>
        </Grid>
      </Box>
      <Stack spacing={{ xs: 5, sm: 7 }} direction="row" useFlexGap flexWrap="wrap"
        justifyContent={"space-around"}

      >
        <Item sx={{
          backgroundColor: "#0000", padding: 5, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", textAlign:
            "center"
        }}>
          {/* DONE: Chart of Bookings */}
          <Pie data={booking} booking={booking} />
        </Item>
        <Item sx={{
          backgroundColor: "#0000", padding: 5, boxShadow: "rgba(0, 0, 0, 0.1) 0px 4px 12px", textAlign:
            "center"
        }}>
          <Pie data={data} options={options} />
        </Item>
      </Stack>
    </>
  );
}
