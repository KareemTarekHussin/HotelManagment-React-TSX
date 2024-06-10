import React from "react";
import Footer from "../../SharedModule/components/Footer/Footer";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import HomeIcon from "@mui/icons-material/Home";
import GrainIcon from "@mui/icons-material/Grain";
import { useNavigate } from "react-router-dom";
import NavbarUser from '../../SharedModule/components/Navbar/NavbarUser'

export default function Details() {
  const navigate = useNavigate();
  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/dashuser");
  };

  return (
    <>
       <NavbarUser/>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          underline="hover"
          sx={{ display: "flex", alignItems: "center" }}
          color="inherit"
          href="/dashuser"
          onClick={handleClick}
        >
          <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Home
        </Link>
        <Typography
          sx={{ display: "flex", alignItems: "center" }}
          color="text.primary"
        >
          <GrainIcon sx={{ mr: 0.5 }} fontSize="inherit" />
          Details
        </Typography>
      </Breadcrumbs>

      <Footer />
    </>
  );
}
