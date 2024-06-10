import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Paper,
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import CloseIcon from "@mui/icons-material/Close";
import { useEffect, useState, MouseEvent } from "react";
import { useToast } from "../../../Context/ToastContext";
import { getErrorMessage } from "../../../../utils/error";
import { userRequest } from "../../../../utils/request";
import { RoomsListProps } from "../../../../interfaces/interface";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function RoomsList() {
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [roomsList, setRoomsList] = useState<RoomsListProps[]>([]);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RoomsListProps | null>(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

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
      const { data } = await userRequest.get(`/admin/rooms?page=${page + 1}&size=${rowsPerPage}`);
      setRoomsList(data.data.rooms);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteOpen = (id: string) => {
    setRoomId(id);
    setOpenDelete(true);
  };

  const handleDeleteClose = () => setOpenDelete(false);

  const handleDelete = async () => {
    setSpinner(true);
    try {
      await userRequest.delete(`/admin/rooms/${roomId}`);
      getAllRooms();
      showToast("success", "Room has been deleted!");
      handleDeleteClose();
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } finally {
      setSpinner(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event: MouseEvent<HTMLElement>, room: RoomsListProps) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(room);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action: string) => {
    if (action === "Edit") {
      // Navigate to edit page or open edit modal
      // Example: setEditMode(true); setEditData(selectedRow);
    } else if (action === "Delete") {
      handleDeleteOpen(selectedRow!._id);
    }
    handleCloseMenu();
  };

  return (
    <>
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

      <Box>
        <Grid 
        container
        sx={{mt: 3, mb: 5,p:2.5 , backgroundColor:'#E2E5EB',borderRadius:2, display:'flex',justifyContent:{xs:'center',sm:'space-between'},alignItems:'center',gap:2, boxShadow: '0px 2px 1px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}
        >
          <Grid item>
            <Typography variant="h5" color="initial" sx={{fontWeight:500}}>
              Rooms Table Details
            </Typography>
            <Typography color="initial" sx={{textAlign:{xs:'center',sm:'left'}}}>You can check all details</Typography>
          </Grid>
          <Grid item textAlign="end">
            <Link to="/dashboard/roomsdata">
              <Button variant="contained">Add New Room</Button>
            </Link>
          </Grid>
        </Grid>

        {loading ? (
          <Loading />
        ) : (
          <>
            {roomsList.length > 0 ? (
              <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table  aria-label="simple table">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#E2E5EB" }}>
                      <TableCell>room Number</TableCell>
                      <TableCell align="center">Image</TableCell>
                      <TableCell align="center">Price</TableCell>
                      <TableCell align="center">Discount</TableCell>
                      <TableCell align="center">Capacity</TableCell>
                      <TableCell align="center">Actions</TableCell>
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

                        <TableCell align="center">
                          <img
                            src={room.images[0]}
                            alt=""
                            style={{ width: 50, height: 50, borderRadius: 5 }}
                          />
                        </TableCell>

                        <TableCell align="center">{room.price}</TableCell>
                        <TableCell align="center">{room.discount}</TableCell>
                        <TableCell align="center">{room.capacity}</TableCell>
                        <TableCell>
                          <div style={{ textAlign: "center" }}>
                            <IconButton
                              onClick={() => handleDeleteOpen(room._id)}
                            >
                              <DeleteIcon color="error" />
                            </IconButton>

                            {/* <IconButton>
                              <Link
                                to={`/dashboard/roomsedit/${room._id}`}
                                state={{ roomData: room, state: "edit" }}
                              >
                                <EditNoteIcon color="warning" />
                              </Link>
                            </IconButton> */}
                            <IconButton component={Link} to={`/dashboard/roomsedit/${room._id}`} state={{ roomData: room, state: "edit" }}>
                              <EditNoteIcon color="warning" />
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
      </Box>
    </>
  );
}
