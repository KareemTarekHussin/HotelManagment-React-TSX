import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Modal,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState } from "react";
import { useToast } from "../../../Context/ToastContext";
import { getErrorMessage } from "../../../../utils/error";
import { userRequest } from "../../../../utils/request";
import { RoomsListProps } from "../../../../interfaces/interface";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { Link } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 2,
};

export default function RoomsList() {
  const [roomId, setRoomId] = useState("");
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const { showToast } = useToast();

  const [openDelete, setOpenDelete] = useState(false);
  const handleDeleteOpen = (id: string) => {
    setRoomId(id);
    setOpenDelete(true);
  };
  const handleDeleteClose = () => setOpenDelete(false);

  const [roomsList, setRoomsList] = useState([]);

  const getAllRooms = async () => {
    setLoading(true);
    try {
      const { data } = await userRequest.get(`/admin/rooms?page=1&size=10`);
      console.log(data.data.rooms);
      setRoomsList(data.data.rooms);
      setLoading(false);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
      setLoading(false);
    }
  };
  console.log(roomsList);
  const handleDelete = async () => {
    setSpinner(true);
    try {
      await userRequest.delete(`/admin/rooms/${roomId}`);
      setSpinner(false);
      getAllRooms();
      showToast("success", "room has been deleted!");
      handleDeleteClose();
    } catch (error) {
      const err = getErrorMessage(error);
      setSpinner(false);
      showToast("error", err);
    }
  };

  useEffect(() => {
    getAllRooms();
  }, []);
  return (
    <>
      {/* Delete Room */}
      <div>
        <Modal
          open={openDelete}
          onClose={handleDeleteClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Box
              sx={{ display: "flex", justifyContent: "end" }}
              onClick={handleDeleteClose}
            >
              <Box
                sx={{
                  width: 30,
                  height: 30,
                  border: "2px solid red",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                }}
              >
                <CloseIcon sx={{ color: "red", fontSize: "17px" }} />
              </Box>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <img src={deleteImg} alt="" />

              <h4>Delete This Room ?</h4>
              <p>
                are you sure you want to delete this item ? if you are sure just
                click on delete it
              </p>
            </Box>
            <Box sx={{ textAlign: "right", mt: 2 }}>
              <Button
                variant="contained"
                color="error"
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
              >
                {spinner ? (
                  <CircularProgress sx={{ color: "white" }} size={20} />
                ) : (
                  "Delete"
                )}
              </Button>
            </Box>
          </Box>
        </Modal>
      </div>

      <Container>
        <Grid container spacing={2} alignItems="center" marginBottom={2}>
          <Grid item md={6}>
            <h5 style={{ margin: 0, padding: 0 }}>Rooms Table Details</h5>
            <p style={{ margin: 0 }}>You can check all details</p>
          </Grid>
          <Grid item md={6} textAlign="end">
            <Link to="/dashboard/roomsdata">
              <Button variant="contained">Add New Room</Button>
            </Link>
          </Grid>
        </Grid>

        {/* <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              fullWidth
            />
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={3}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-helper-label">Age</InputLabel>
              <Select
                labelId="demo-simple-select-helper-label"
                id="demo-simple-select-helper"
                label="Age"
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid> */}
        {loading ? (
          <Loading />
        ) : (
          <>
            {roomsList.length > 0 ? (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#E2E5EB" }}>
                      <TableCell>room Number</TableCell>
                      <TableCell align="right">Image</TableCell>
                      <TableCell align="right">Price</TableCell>
                      <TableCell align="right">Discount</TableCell>
                      <TableCell align="right">Capacity</TableCell>
                      <TableCell align="right">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {roomsList.map((room: RoomsListProps, index: number) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {room.roomNumber}
                        </TableCell>
                        <TableCell align="right">
                          <img
                            src={room.images[0]}
                            alt=""
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 5,
                              objectFit: "cover",
                            }}
                          />
                        </TableCell>
                        <TableCell align="right">{room.price}</TableCell>
                        <TableCell align="right">{room.discount}</TableCell>
                        <TableCell align="right">{room.capacity}</TableCell>
                        <TableCell>
                          <div style={{ textAlign: "right" }}>
                            <IconButton
                              onClick={() => handleDeleteOpen(room._id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>
                            <IconButton>
                              <Link
                                to={`/dashboard/roomsedit/${room._id}`}
                                state={{ roomData: room, state: "edit" }}
                              >
                                <EditNoteIcon color="warning" />
                              </Link>
                            </IconButton>
                            <IconButton>
                              <VisibilityIcon color="primary" />
                            </IconButton>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <Box sx={{ width: "100%" }}>
                <Typography variant="h3" mt={10} textAlign="center">
                  No Rooms Found
                </Typography>
              </Box>
            )}
          </>
        )}
      </Container>
    </>
  );
}
