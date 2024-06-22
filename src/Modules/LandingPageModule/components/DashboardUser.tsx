import { Box, Button, Grid, Typography } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import header from "../../../assets/Images/landing-page-header.png";
import { AuthContext } from "../../Context/AuthContext";
import Footer from "../../SharedModule/components/Footer/Footer";
import NavbarUser from "../../SharedModule/components/Navbar/NavbarUser";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";

import { enGB } from "date-fns/locale";
import axios from "axios";
import { Favorite } from "@mui/icons-material";
import MainNavbar from '../../SharedModule/components/Navbar/MainNavbar'
import { Outlet } from 'react-router-dom'
export default function DashboardUser() {
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
      <NavbarUser />

        <Box sx={{marginTop:{xs:'45px',lg:'65px'},py:{lg:2}}}>
          <Outlet/>

        </Box>
     
      <Footer />
    </div>
  );
}
