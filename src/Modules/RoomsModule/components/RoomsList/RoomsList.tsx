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
import {
  RoomsListProps,
} from "../../../../interfaces/interface";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import Loading from "../../../SharedModule/components/Loading/Loading";
import { Link, useNavigate } from "react-router-dom";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: {xs:350,lg:400},
  bgcolor: "background.paper",
  boxShadow: 24,
  p: { xs: 3 },
  borderRadius: 4, 
};

export default function RoomsList() {
  const [roomId, setRoomId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [spinner, setSpinner] = useState<boolean>(false);
  const [roomsList, setRoomsList] = useState<RoomsListProps[]>([]);
  const [roomDetails, setRoomDetails] = useState<RoomsListProps | null>(null);
  const [openDelete, setOpenDelete] = useState<boolean>(false);
  const [openView, setOpenView] = useState<boolean>(false);
  const [page, setPage] = useState<number>(0);
  const [rowsPerPage, setRowsPerPage] = useState<number>(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<RoomsListProps | null>(null);

  const { showToast } = useToast();
  const navigate = useNavigate();

 


  const getAllRooms = async () => {
    setLoading(true);
    try {
      const { data } = await userRequest.get(
        `/admin/rooms?page=${page + 1}&size=${rowsPerPage}`
      );
      setRoomsList(data.data.rooms);
      console.log(data.data.rooms);
      
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } finally {
      setLoading(false);
    }
  };
  
useEffect(() => {
  getAllRooms();

  
}, [])

  const handleDeleteOpen = (id: string) => {
    setRoomId(id);
    setOpenDelete(true);
  };

  const handleViewOpen = () => {
    setOpenView(true);
  };

  const handleDeleteClose = () => setOpenDelete(false);
  const handleViewClose = () => setOpenView(false);

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

  const handleView = async (id: string) => {
    setSpinner(true);
    try {
      const { data } = await userRequest.get(`/admin/rooms/${id}`);
      setRoomDetails(data.data.room);
      setSpinner(false);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
      setSpinner(false);
    }
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (
    event: MouseEvent<HTMLElement>,
    room: RoomsListProps
  ) => {
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
    } else if (action === "View") {
      handleViewOpen();
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

            <Typography
            fontWeight={600}
            textAlign="center"  
            variant="h6"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Delete This Room ?
          </Typography>
            <p>
              Are you sure you want to delete this item ? if you are sure just
              click on Delete 
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

      <Modal open={openView} onClose={handleViewClose}>
        <Box sx={style}>
          <Box
            sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
            onClick={handleViewClose}
          >
            <Typography variant="h5">Room Details</Typography>
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
          {spinner ? (
            <Box sx={{ width: "100%", textAlign: "center" }}>
              <CircularProgress sx={{ color: "blue" }} size={50} />
            </Box>
          ) : (
            <>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 1,
                }}
              >
                {roomDetails?.images.map((item) => (
                  <img
                    key={item}
                    src={item}
                    style={{ width: 60, height: 60, objectFit: "cover" }}
                  />
                ))}
              </Box>
              <Box mt={2}>
                <Typography variant="subtitle2">
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Room Number:
                  </span>
                  {roomDetails?.roomNumber}
                </Typography>
                <Box sx={{}}>
                  <Typography variant="subtitle2">
                    <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                      Room Facilities:
                    </span>
                    {roomDetails?.facilities.map((item: { name: string }) => (
                      <div key={item.name} style={{ marginLeft: "10px" }}>
                        {item.name}
                      </div>
                    ))}
                  </Typography>
                </Box>
                <Typography variant="subtitle2">
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Room Price:
                  </span>
                  {roomDetails?.price}
                </Typography>
                <Typography variant="subtitle2">
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Room discount:
                  </span>
                  {roomDetails?.discount}
                </Typography>
                <Typography variant="subtitle2">
                  <span style={{ fontWeight: "bold", marginRight: "5px" }}>
                    Room capacity:
                  </span>
                  {roomDetails?.capacity}
                </Typography>
              </Box>
            </>
          )}
        </Box>
      </Modal>

     
        <Grid container spacing={1} sx={{mt: 3, mb: 5,p:2.5 , backgroundColor:'#E2E5EB',borderRadius:2, display:'flex',justifyContent:{xs:'center',sm:'space-between'},alignItems:'center',gap:2, boxShadow: '0px 2px 1px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}>
          <Grid item xs={8} md={10}>
            <Typography variant="h5" color="initial">
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

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            overflow: "auto",
          }}
        >
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            {loading ? (
              <Box sx={{ width: "100%" }}>
                <Skeleton variant="rectangular" width="100%" height={100} />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  animation="wave"
                />
                <Skeleton
                  variant="rectangular"
                  width="100%"
                  height={100}
                  animation="wave"
                />
              </Box>
            ) : (
              <>
                {roomsList.length > 0 ? (
                  <>
                    <TableContainer sx={{ maxHeight: 440, width: "100%" }}>
                      <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                          <TableRow sx={{ backgroundColor: "#E2E5EB" }}>
                            <TableCell sx={{ backgroundColor: "#E2E5EB" }}>
                              Room Number
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#E2E5EB" }}
                              align="right"
                            >
                              Image
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#E2E5EB" }}
                              align="right"
                            >
                              Price
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#E2E5EB" }}
                              align="right"
                            >
                              Discount
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#E2E5EB" }}
                              align="right"
                            >
                              Capacity
                            </TableCell>
                            <TableCell
                              sx={{ backgroundColor: "#E2E5EB" }}
                              align="right"
                            >
                              Actions
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {roomsList
                            .slice(
                              page * rowsPerPage,
                              page * rowsPerPage + rowsPerPage
                            )
                            .map((room) => (
                              <TableRow
                                hover
                                role="checkbox"
                                tabIndex={-1}
                                key={room._id}
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
                                <TableCell align="right">
                                  {room.price}
                                </TableCell>
                                <TableCell align="right">
                                  {room.discount}
                                </TableCell>
                                <TableCell align="right">
                                  {room.capacity}
                                </TableCell>
                                <TableCell align="right">
                                  <IconButton
                                    onClick={(event) =>
                                      handleClick(event, room)
                                    }
                                  >
                                    <MoreHorizIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl}
                                    open={
                                      Boolean(anchorEl) &&
                                      selectedRow?._id === room._id
                                    }
                                    onClose={handleCloseMenu}
                                  >
                                    <MenuItem
                                      onClick={() => {
                                        handleAction("View");
                                        handleView(room._id);
                                      }}
                                    >
                                      <VisibilityIcon
                                        sx={{ mr: 1, color: "#00e5ff" }}
                                      />
                                      View
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => handleAction("Edit")}
                                    >
                                      <Link
                                        to={`/dashboard/roomsedit/${room._id}`}
                                        state={{
                                          roomData: room,
                                          state: "edit",
                                        }}
                                      >
                                        <EditNoteIcon color="warning" />
                                        Edit
                                      </Link>
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => handleAction("Delete")}
                                    >
                                      <DeleteIcon
                                        sx={{ mr: 1, color: "#d50000" }}
                                      />
                                      Delete
                                    </MenuItem>
                                  </Menu>
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      rowsPerPageOptions={[5, 10, 15]}
                      component="div"
                      count={roomsList.length}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      onRowsPerPageChange={handleChangeRowsPerPage}
                      sx={{
                        backgroundColor: "#E2E5EB",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    />
                  </>
                ) : (
                  <Box sx={{ textAlign: "center", p: 3 }}>
                    <Typography variant="h6">No Rooms Found</Typography>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Box>
    </>
  );
}
