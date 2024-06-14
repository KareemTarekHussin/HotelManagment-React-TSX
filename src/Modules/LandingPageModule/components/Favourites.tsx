import React from 'react'
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import { useNavigate } from "react-router-dom";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
export default function Favourites() {
  const navigate = useNavigate();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/home");
  };
  return (
    <>
        <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/dashuser"
          onClick={handleClick}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="large" color="primary"  />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <FavoriteBorderIcon sx={{ mr: 0.5 }}  fontSize="large"/>
          Favourites
        </Typography>
      </Breadcrumbs>
      Favourites
    </>
  )
}
