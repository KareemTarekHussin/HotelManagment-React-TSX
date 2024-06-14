import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import header from "../../../assets/Images/landing-page-header.png";
import { AuthContext } from "../../Context/AuthContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { enGB } from "date-fns/locale";
import axios from "axios";
import { Favorite } from "@mui/icons-material";
export default function Home() {
  const { baseUrl }: any = useContext(AuthContext);
  const [capacity, setCapacity] = useState(1);
  const [ads, setAds] = useState([]);
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();

  const [count, setCount] = useState(1);
  const handleIncrement = () => {
    setCount((prevCount) => prevCount + 1);
    setCapacity(count + 1);
  };
  const navigate = useNavigate();
  const goToExplorePage = () => {
    navigate("/explore", {
      state: { capacity: capacity, date: [startDate, endDate] },
    });
  };
  const goToFavPage = () => {
    navigate("/favs");
  };
  const handleDecrement = () => {
    if (count > 1) {
      setCount((prevCount) => prevCount - 1);
      setCapacity(count - 1);
    }
  };
  const getAds = async () => {
    try {
      const response = await axios.get(`${baseUrl}/portal/ads`);
      console.log(response.data.data.ads);
      setAds(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAds();
  }, []);
  const [date, setDate] = useState([
    { startDate: new Date(), endDate: new Date(), key: "selection" },
  ]);

  const handleChange = (e: any) => {
    setDate([e.selection]);
    setStartDate(e[0]);
    console.log(e[0]);
    setEndDate(e[1]);
  };
  return (
    <div>
      <>
        <Grid container display="flex" justifyContent="space-evenly" p={5}>
          <Grid item md={5}>
            <Typography
              fontSize="50px"
              color="#152C5B"
              fontWeight={700}
              variant="h5"
            >
              Forget Busy Work, Start Next Vacation
            </Typography>
            <Typography color="#B0B0B0">
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>
            <Grid item md={12} marginBlock={3}>
              <Typography variant="h6" color="#152C5B">
                Start Booking
              </Typography>
              <Typography color="#152C5B">Pick a Date</Typography>
              <div>
                <Box width="70%" display="flex">
                  <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                  >
                    <CalendarMonthIcon sx={{ fontSize: "40px" }} />
                  </Box>
                  <LocalizationProvider
                    dateAdapter={AdapterDateFns}
                    adapterLocale={enGB}
                  >
                    <DemoContainer components={["SingleInputDateRangeField"]}>
                      <DateRangePicker
                        sx={{ backgroundColor: "#F5F6F8" }}
                        slots={{ field: SingleInputDateRangeField }}
                        name="allowedRange"
                        label="Start - End"
                        onChange={handleChange}
                        format={"yyyy/MM/dd"}
                      />
                    </DemoContainer>
                  </LocalizationProvider>
                </Box>
              </div>
              <Typography color="#152C5B">Capacity</Typography>

              <Box display="flex">
                <Button
                  onClick={() => {
                    handleDecrement();
                  }}
                  color="error"
                  variant="contained"
                >
                  -
                </Button>
                <Typography
                  bgcolor="#F5F6F8"
                  textAlign="center"
                  paddingInline={5}
                  width="50%"
                  py={1}
                >
                  {count} person
                </Typography>

                <Button
                  onClick={() => {
                    handleIncrement();
                  }}
                  color="success"
                  variant="contained"
                >
                  +
                </Button>
              </Box>
              <Button
                onClick={() => goToExplorePage()}
                variant="contained"
                sx={{ marginBlock: 5 }}
              >
                Explore
              </Button>
            </Grid>
          </Grid>
          <Grid item md={5}>
            <Box margin="auto" width="80%" height="80%">
              <img
                style={{
                  width: "100%",
                  height: "100%",
                  borderRadius: "20% 0 0 0",
                }}
                src={header}
                alt="header Image"
              />
            </Box>
          </Grid>

          <Grid display="flex" height="300px" position="relative">
            {ads
              .map((item) => (
                <Grid gap={2} height="75%" md={3}>
                  <img
                    style={{
                      width: "100%",
                      height: "100%",
                      padding: 10,
                      borderRadius: "10%",
                    }}
                    src={item.room.images[0]}
                    alt="ads"
                  />
                </Grid>
              ))
              .slice(6)}
            <Favorite
              onClick={() => goToFavPage()}
              sx={{
                color: "white",
                position: "absolute",
                top: "30%",
                left: "5%",
                cursor: "pointer",
              }}
            />
          </Grid>
        </Grid>
      </>
    </div>
  );
}
