import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import RoomServiceOutlinedIcon from "@mui/icons-material/RoomServiceOutlined";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import { red } from "@mui/material/colors";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Typography } from "@mui/material";
import { Margin } from "@mui/icons-material";

ChartJS.register(ArcElement, Tooltip, Legend);
const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(7),
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
      // console.log(response.data)
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
  return (
    <>
      <Box sx={{ flexGrow: 1, mt: 5 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <Item
              sx={{
                display: "flex",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <div className="title-rooms">{roomNumber}</div>
              <div className="title-rooms">
                <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
              </div>
            </Item>
          </Grid>
          <Grid item xs={12} md={4}>
            <Item
              sx={{
                display: "flex",
                color: "#fff",
              }}
            >
              <div className="title-rooms">{facilitiesNumber}</div>
              <div className="title-rooms">
                <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
              </div>
              Facilities
            </Item>
          </Grid>
          <Grid justifyContent="center" item xs={12} md={4}>
            <Item
              sx={{
                display: "flex",
                color: "#fff",
              }}
            >
              <div className="title-rooms">{ADSNumber}</div>
              <div className="title-rooms">
                <RoomServiceOutlinedIcon sx={{ color: "blue" }} />
              </div>
              Ads
            </Item>
          </Grid>
        </Grid>
      </Box>

      <Grid
        container
        spacing={4}
        sx={{ display: "flex", justifyContent: "between", mt: 5 }}
      >
        <Grid item xs={8} md={6}>
          <Item sx={{ backgroundColor: "#e53935", padding: 10 }}>
            {/* TODO:implement Chart of Bookings */}

            
            Chart of Bookings
          </Item>
        </Grid>
        <Grid item xs={4} md={4}>
          <Item sx={{ backgroundColor: "#0000", padding: 10 }}>
            <Pie data={data} options={options} />
          </Item>
        </Grid>
      </Grid>
    </>
  );
}
