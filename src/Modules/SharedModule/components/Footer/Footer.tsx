import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <>
      <Box sx={{borderTop:'2px solid #E5E5E5',py:6,px:{xs:2,lg:0}}}>
        <Grid container  
          sx={{backgroundColor:'blac',paddingInline:{lg:1.5},display:'flex',justifyContent:'center',gap:{xs:3,md:2}}}>



          <Grid item xs={12} md={6}  lg={3}
            sx={{backgroundColor:'greenyello',display:'flex',flexDirection:'column',alignItems:{xs:'center',lg:'start'},justifyContent:'center'}}>
            <Box sx={{mb:{xs:1,lg:2}}}>
              <Typography
                // variant="h5"
                sx={{
                  fontSize:{xs:'22px'},
                  display: "inline",
                  color: "#3252df",
                  fontWeight:500
                }}
              >
                Stay
              </Typography>
              <Typography
                // variant="h5"
                sx={{
                  fontSize:{xs:'22px'},
                  display: "inline",
                  color: "#152c5b",
                  fontWeight:500
                }}
              >
                cation.
              </Typography>
            </Box>
            <Typography sx={{ color: "#B0B0B0",textAlign:{xs:'center',lg:'left'},width:{xs:'60%',sm:'40%',md:'60%',lg:'80%'} }} component="div">
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>


          <Grid item xs={12} md={6} lg={2} sx={{backgroundColor:'blu',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Box sx={{backgroundColor:'gra',textAlign:{xs:'center',lg:'left'}}}>
              <Typography sx={{ color: "#152C5B",mb:{xs:1,lg:2},fontWeight:500,fontSize:'18px'}} component="div">
                For Beginners
              </Typography>

              <Box sx={{display:'flex',flexDirection:'column',gap:{xs:0.3,lg:0.5}}}>
                <Typography sx={{ color: "#B0B0B0",fontWeight:300 }} component="div">
                  New Account
                  {/* TODO:Link Register  */}
                </Typography>
                <Typography sx={{ color: "#B0B0B0",fontWeight:300 }} component="div">
                  Start Booking a Room
                  {/* TODO:Go to Booking  */}
                </Typography>
                <Typography sx={{ color: "#B0B0B0",fontWeight:300 }} component="div">
                  Use Payments
                  {/* TODO:Go to Payments  */}
                </Typography>
              </Box>

            </Box>
          </Grid>


          <Grid item xs={12} md={6} lg={2} sx={{backgroundColor:'gree',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Box sx={{backgroundColor:'gra',textAlign:{xs:'center',lg:'left'}}}>
              <Typography
                sx={{   color: "#152C5B", fontWeight: 500,mb:{xs:1,lg:2},fontSize:'18px' }}
                component="div"
              >
                Explore Us
              </Typography>
              <Box sx={{display:'flex',flexDirection:'column',gap:{xs:0.3,lg:0.5}}}>
                <Typography sx={{ color: "#B0B0B0" }} component="div">
                  Our Careers
                </Typography>
                <Typography sx={{ color: "#B0B0B0" }} component="div">
                  Privacy{" "}
                </Typography>
                <Typography sx={{ color: "#B0B0B0" }} component="div">
                  Terms & Conditions{" "}
                </Typography>

              </Box>

            </Box>
          </Grid>

          <Grid item xs={12} md={6} lg={2} sx={{backgroundColor:'cya',display:'flex',flexDirection:'column',alignItems:'center'}}>
            <Box sx={{backgroundColor:'gra',textAlign:{xs:'center',lg:'left'}}}>
              <Typography sx={{color: "#152C5B",mb:{xs:1,lg:2},fontWeight:500,fontSize:'18px' }} component="div">
                Connect with Us
              </Typography>
              <Box sx={{display:'flex',flexDirection:'column',gap:{xs:0.3}}}>
                <Typography sx={{color: "#B0B0B0" }} component="div">
                  support@staycation.id
                </Typography>
                <Typography sx={{color: "#B0B0B0" }} component="div">
                  021 - 2208 - 1996
                </Typography>
                <Typography sx={{color: "#B0B0B0",textAlign:{xs:'center'} }} component="div">
                  Staycation, Kemang, Jakarta
                </Typography>
              </Box>
            </Box>
          </Grid>


        </Grid>

        <Grid item sx={{my:0}} >
          <Typography
            sx={{ mt:{xs:4,lg:5}, textAlign: "center", color: "#B0B0B0", fontSize: 16 }}
            component="div"
          >
            Copyright 2019 • All rights reserved • Staycation
          </Typography>
        </Grid> 
      </Box>
      
      
    </>
  );
}
