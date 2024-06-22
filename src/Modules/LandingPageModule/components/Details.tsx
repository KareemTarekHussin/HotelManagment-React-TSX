import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import Link from "@mui/material/Link";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, Container, Grid, Modal } from "@mui/material";
import { getErrorMessage } from "../../../utils/error";
import { useToast } from "../../Context/ToastContext";
import { userRequest } from "../../../utils/request";
import { RoomsListProps } from "../../../interfaces/interface";
import bedroom from "../../../assets/Images/ic_bedroom.png";
import tv from "../../../assets/Images/ic_tv.png";
import wifi from "../../../assets/Images/ic_wifi 1.png";
import bathroom from "../../../assets/Images/ic_bedroom (1).png";
import ac from "../../../assets/Images/ic_ac 1.png";
import diningroom from "../../../assets/Images/ic_diningroom 1.png";
import kulkas from "../../../assets/Images/ic_kulkas.png";
import livingroom from "../../../assets/Images/ic_livingroom.png";
import formatCurrency from "../../../utils/formatCurrency";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFnsV3";
import { enGB } from "date-fns/locale";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import {
  DateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";
import { useAuth } from "../../Context/AuthContext";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function Details() {
  const [roomDetails, setRoomDetails] = useState<RoomsListProps>({
    _id: "",
    capacity: 0,
    price: 0,
    roomNumber: "",
    facilities: [],
    discount: 0,
    images: [],
    createdAt: "",
    updatedAt: "",
    createdBy: { _id: "", userName: "" },
  });
  const [startDate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  const navigate = useNavigate();
  const { state } = useLocation();
  const { showToast } = useToast();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = (
    event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
  ) => {
    event.preventDefault();
    navigate("/home");
  };

  const getRoomDetails = async () => {
    try {
      const { data } = await userRequest(`/portal/rooms/${state.roomId}`);
      console.log(data.data.room);
      setRoomDetails(data.data.room);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  const handleChange = (e) => {
    setDate([e.selection]);
    setStartDate(e[0]);
    console.log(e[0]);
    setEndDate(e[1]);
  };

  useEffect(() => {
    getRoomDetails();
  }, []);

  const facilitiesDetails = [
    { Icon: bedroom, main: 5, sub: "bedroom" },
    { Icon: livingroom, main: 1, sub: "livingRoom" },
    { Icon: bathroom, main: 3, sub: "bathroom" },
    { Icon: diningroom, main: 1, sub: "diningRoom" },
    { Icon: wifi, main: 10, sub: "mbp/s" },
    { Icon: ac, main: 7, sub: "unitReady" },
    { Icon: kulkas, main: 2, sub: "refigrator" },
    { Icon: tv, main: 4, sub: "television" },
  ];

  return (
    <>
      <Container>
        <Breadcrumbs aria-label="breadcrumb">
          <Link
            sx={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
            }}
            variant="body1"
            color="inherit"
            href="/dashuser"
            onClick={handleClick}
          >
            Home
          </Link>
          <Typography
            sx={{ display: "flex", alignItems: "center" }}
            color="text.primary"
            variant="body1"
            fontWeight={600}
          >
            Room Details
          </Typography>
        </Breadcrumbs>
        <Box>
          <Typography
            variant="h5"
            sx={{ display: "flex", justifyContent: "center", mb: 2 }}
          >
            {roomDetails.roomNumber}
          </Typography>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, 1fr)",
              gap: "10px",
              "div:nth-child(1)": { gridRowStart: 1, gridRowEnd: 3 },
            }}
          >
            {roomDetails.images.slice(0, 3).map((image) => (
              <Box
                component="div"
                sx={{
                  position: "relative",
                  borderRadius: "15px",
                  overflow: "hidden",
                  "&:hover > div": { opacity: "1" },
                }}
              >
                <img
                  src={image}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                  }}
                  alt=""
                />
              </Box>
            ))}
          </Box>

          <Grid container mt={6}>
            <Grid item md={6} color="#B0B0B0">
              <Typography variant="body1" fontSize="15px">
                Minimal techno is a minimalist subgenre of techno music. It is
                characterized by a stripped-down aesthetic that exploits the use
                of repetition and understated development. Minimal techno is
                thought to have been originally developed in the early 1990s by
                Detroit-based producers Robert Hood and Daniel Bell.
              </Typography>
              <Typography variant="body1" py={1} fontSize="15px">
                Such trends saw the demise of the soul-infused techno that
                typified the original Detroit sound. Robert Hood has noted that
                he and Daniel Bell both realized something was missing from
                techno in the post-rave era.
              </Typography>
              <Typography variant="body1" fontSize="15px">
                Design is a plan or specification for the construction of an
                object or system or for the implementation of an activity or
                process, or the result of that plan or specification in the form
                of a prototype, product or process. The national agency for
                design: enabling Singapore to use design for economic growth and
                to make lives better.
              </Typography>
              <Box sx={{ mt: 3, display: "flex", flexWrap: "wrap" }}>
                {facilitiesDetails.map((facility, index) => (
                  <Box key={index} sx={{ flexBasis: "25%" }}>
                    <img
                      src={facility.Icon}
                      width={36}
                      height={36}
                      alt="Icons"
                    />
                    <Typography>
                      {facility.main}
                      <Typography variant="caption">{facility.sub}</Typography>
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Grid>
            <Grid item md={6}>
              <Box sx={{ p: 3, pl: { xs: 0, md: 5 } }}>
                <Typography variant="subtitle1" fontWeight={600}>
                  Start Booking
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Typography variant="h4" color="#1ABC9C">
                    {formatCurrency(roomDetails.price)}
                  </Typography>
                  <Typography
                    variant="caption"
                    fontWeight="100"
                    sx={{ color: "#B0B0B0", fontSize: "30px" }}
                  >
                    per night
                  </Typography>
                </Box>
                <Typography variant="caption" color="#FF1612">
                  Discount
                  {((roomDetails.discount / roomDetails.price) * 100).toFixed(
                    2
                  )}
                  Off
                </Typography>

                <Box mt={4}>
                  <Typography variant="caption">Pick a Date</Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        backgroundColor: "#152C5B",
                        color: "white",
                        borderRadius: "5px",
                        p: 1.7,
                        mt: "5px",
                      }}
                    >
                      <CalendarMonthIcon />
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

                  <Typography variant="body1" sx={{ color: "#B0B0B0", mt: 2 }}>
                    You will pay{"  "}
                    <span style={{ color: "#152C5B", fontWeight: "bold" }}>
                      {formatCurrency(300)} USD
                    </span>
                    <span
                      style={{
                        color: "#152C5B",
                        fontWeight: "bold",
                        paddingLeft: 5,
                      }}
                    >
                      per {"3"} Person
                    </span>
                  </Typography>
                  <Button variant="contained" sx={{ ml: 10, mt: 2 }}>
                    Continue Book
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>

      {/* modal if not logged in */}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
}
