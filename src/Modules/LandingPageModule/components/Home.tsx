import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import header from "../../../assets/Images/landing.png";
import { AuthContext } from "../../Context/AuthContext";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { enGB } from "date-fns/locale";
import axios from "axios";
// import { Favorite } from "@mui/icons-material";
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
  // const goToFavPage = () => {
  //   navigate("/favs");
  // };
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
        <Grid 
        container 
        display="flex" 
        justifyContent="center" 
        sx={{
          backgroundColor:'greenyello',
          p:2,
          py:{xs:0,md:6},
          pt:{xs:6,sm:7},
        }}
        >
          {/*===============================>> Left Content <<=============================== */}
          <Grid item md={6} lg={5}
           sx={{
            backgroundColor:'greenyello',
            display:'flex',
            flexDirection:'column',
            paddingLeft:{md:3},
            alignItems:{xs:'center',lg:'start'}
            }}>

            <Typography
              variant="h5"
              sx={{
                bgcolor:'blu',
                fontWeight:'bold',
                fontSize:{xs:'32px',md:"32px",lg:'48px'}, 
                color:"#152C5B",
                textAlign:{xs:'center',lg:'left'},
                width:{xs:'90%',sm:'40%',md:'100%',lg:'91%'}
              }}
            >
              Forget Busy Work, Start Next Vacation
            </Typography>


            <Typography color="#B0B0B0" sx={{bgcolor:'re',width:{xs:'90%',sm:'50%',lg:'85%'},my:2,textAlign:{xs:'center',lg:'left'}}}>
              We provide what you need to enjoy your holiday with family. Time
              to make another memorable moments.
            </Typography>


            <Grid item md={12} sx={{bgcolor:'re',display:'flex', flexDirection:'column',alignItems:{xs:'center',lg:'start'},gap:{xs:1,sm:1,md:0},mt:2}}>

              <Typography variant="h6" color="#152C5B" fontWeight={600} sx={{textAlign:{xs:'left',md:'left'}}}>
                Start Booking
              </Typography>


              <Typography color="#152C5B" fontWeight={500}>
                Pick a Date
              </Typography>
              
              <Box display="flex">
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                >
                  <CalendarMonthIcon sx={{ fontSize: "40px",backgroundColor:'orang' }} />
                </Box>
                <LocalizationProvider
                  dateAdapter={AdapterDateFns}
                  adapterLocale={enGB}
                >
                  <DemoContainer components={["SingleInputDateRangeField"]}>
                    <DateRangePicker
                      slots={{ field: SingleInputDateRangeField }}
                      name="allowedRange"
                      label="Start - End"
                      onChange={handleChange}
                      format={"yyyy/MM/dd"}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>

              <Typography  color="#152C5B" fontWeight={500} sx={{mb:1,mt:2}}>
                Capacity
              </Typography>

              <Box sx={{display:'flex',alignItems:'cente'}}>
                <Button
                  onClick={() => {
                    handleDecrement();
                  }}
                  color="error"
                  variant="contained"
                >
                  <Typography sx={{bgcolor:'orang'}} > - </Typography>
                </Button>

                <Typography
                  bgcolor="#F5F6F8"
                  paddingInline={{xs:8,lg:17}}
                  borderRadius={1}
                  textAlign="center"
                  // width="50%"
                  py={1}
                >
                  {count} person
                </Typography>

                <Button
                  onClick={() => {
                    handleIncrement();
                  }}
                  sx={{bgcolor:'#1ABC9C'}}
                  variant="contained"
                >
                  +
                </Button>
              </Box>

              <Box sx={{bgcolor:'gol'}}>
                <Button
                  onClick={() => goToExplorePage()}
                  variant="contained"
                  sx={{ marginBlock: 4,px:12,width:'100%' }}
                >
                  Explore
                </Button>
              </Box>
            </Grid>

          </Grid>

          {/*===============================>> Right Image <<=============================== */}
          <Grid 
            item 
            md={6} 
            lg={5} 
            sx={{backgroundColor:'gree',paddingRight:3,display:{xs:'none',lg:'flex'} , justifyContent:'end', alignItems:'center'}}
            
            >
            <Box padding={0}  width="75%" height="75%" 
              sx={{
                bgcolor:'gol',
                position:'relative',
                border:'5px #E5E5E5 solid',
                borderRadius: "25% 22px 22px ",
                // overflow:'hidden'
              }}
              >
              <Box width="100%" height="100%"  sx={{position:'absolute',bottom:'40px',right:'40px'}}>
                <img
                  src={header}
                  alt="header Image"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "28% 22px 22px ",
                  }}
                />
              </Box>

            </Box>
          </Grid>

          {/*===============================>> Ads <<=============================== */}
          <Grid 
          container
            item 
            xs={12} 
            sx={{
              bgcolor:'gol',
              display:'flex',
              justifyContent:'center',
              px:{xs:2,lg:0},
              gap:{xs:3,sm:3},
              my:{xs:5,lg:5},
              mt:{lg:12},
              color:'#fff',
            }}
            
            >
            {ads
              .map((item:any, index) => (
                <Grid xs={11} sm={5} md={3} key={index} item>
                  <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    '&:hover .hoverText': {
                      cursor: 'pointer',
                      transform: 'translateY(0)',
                    },
                    '&:hover .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    '&:hover .image': {
                      cursor: 'pointer',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                    <Box
                      alt=""
                      component='img'
                      src={item.room.images[0]}
                      className="image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none',
                        transition: 'background-color 0.3s ease-in-out',
                      }}
                    />
                    <Box
                      className="hoverText"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        color: 'white',
                        transform: 'translateY(100%)',
                        transition: 'transform 0.3s ease, background-color 0.3s ease-in-out',
                        padding: '20px',
                      }}
                    >
                      <Typography variant="h6">Ocean Land</Typography>
                      <Typography>Bandung, Indonesia</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      backgroundColor: '#FF498B',
                      top: 0,
                      right: 0,
                      width: '50%',
                      zIndex: 101,
                      textAlign: 'center',
                      paddingBlock: 0.8,
                      borderRadius: '0px 0px 0px 15px',
                    }}
                  >
                    <Typography>{item.room.price}$ per night</Typography>
                  </Box>
                </Box>
                  
                  {/* <img
                    style={{
                      width: "100%",
                      // height: "100%",
                      padding: 10,
                      borderRadius: "10%",
                    }}
                    src={item.room.images[0]}
                    alt="ads"
                  /> */}
                </Grid>
              ))
              .slice(4)}
            {/* <Favorite
              onClick={() => goToFavPage()}
              sx={{
                color: "white",
                position: "absolute",
                top: "30%",
                left: "5%",
                cursor: "pointer",
              }}
            /> */}
          </Grid>
        </Grid>
      </>
    </div>
  );
}
