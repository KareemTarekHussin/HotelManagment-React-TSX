import React from 'react'
import notFoundImage from '../../../../assets/Images/404.svg'
import { Box, Grid, Typography } from '@mui/material'

export default function NotFound() {
  return (
    <Grid md={12} sx={{ background:"#3333",width: "100vw", height: "100vh", display: "flex", justifyContent: "center", alignItems: "center", flexDirection: "column" }}

    >
      <Box sx={{
        backgroundImage: `url(${notFoundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "cover",
        objectFit: "cover",
        width: "450px",
        height: "450px"
      }}>
        
      </Box>

      <Box>
        <Typography sx={{color:"#5d452b",fontWeight:"700"}} variant="h4" component="h2">
          Page not found
        </Typography>

      </Box>

    </Grid>
  )
}
