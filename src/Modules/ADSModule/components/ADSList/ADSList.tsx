import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  Alert,
  Box,
  Button,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Modal,
  Select,
  Skeleton,
  TablePagination,
  TextField,
  Typography,
  InputLabel,
  CircularProgress,
} from "@mui/material";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import { getErrorMessage } from "../../../../utils/error";
import { SubmitHandler, useForm } from "react-hook-form";
import UpdateForm from "../UpdateForm";
import { AuthContext } from "../../../Context/AuthContext";
import { useToast } from "../../../Context/ToastContext";
import CloseIcon from "@mui/icons-material/Close";

interface Column {
  id:
    | "capacity"
    | "discount"
    | "createdBy"
    | "isActive"
    | "price"
    | "roomNumber"
    | "action";
  label: string;
  minWidth?: number;
  align?: "right";
}

const columns: readonly Column[] = [
  {
    id: "roomNumber",
    label: "Room Number",
    minWidth: 50,
  },
  { id: "capacity", label: "Capacity", minWidth: 50 },
  { id: "discount", label: "Discount", minWidth: 50 },
  {
    id: "createdBy",
    label: "Created By",
    minWidth: 50,
    // align: "right",
  },
  {
    id: "isActive",
    label: "Active",
    minWidth: 50,
    // align: "right",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
    align: "right",
  },
 

  {
    id: "action",
    label: "Action",
    minWidth: 50,
    align: "right",
  },
];

interface ADS {
  _id: string;
  createdBy: { _id: string; userName: string };
  isActive: boolean;
  room: {
    _id: string;

    capacity: number;
    price: number;
    discount: number;
    roomNumber: string;
  };
}
interface Rooms {
  _id: string;

  capacity: number;
  price: number;
  discount: number;
  roomNumber: string;
}
interface Form {
  _id: string;
  room: String;
  discount: number;
  isActive: boolean;
  roomNumber: string;
  isActiveUpdate: boolean;
  discountUpdate: number;
  onEditSubmit: any;
}

export default function ADSList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adsList, setAdsList] = useState<ADS[]>([]);
  const [roomsList, setRoomsList] = useState<Rooms[]>([]);
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [spinner, setSpinner] = useState<boolean>(false);

  const { showToast } = useToast();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<ADS | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: ADS) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [adsId, setAdsId] = useState<string>("");
  const [adsDiscount, setAdsDiscout] = useState<number>(0);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [loading, setLoading] = useState(true); 

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const handleEdit = (_id: string, discount: number, active: boolean) => {
    setAdsId(_id);
    setAdsDiscout(discount);
    setIsActive(active);
    setOpenEdit(true);
  };
  const handleEditClose = () => {
    setOpenEdit(false);
  };
  const handleOpen = () => setOpen(true);

  const handleClose = () => {
    setOpen(false);
  };

  const [openDelete, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = (_id: string) => {
    setAdsId(_id);

    setDeleteOpen(true);
  };

  const handleAction = (action: string) => {
    if (action === "Edit") {
      setOpenEdit(true);
    } else if (action === "Delete") {
      setDeleteOpen(true);
    }
    handleMenuClose();
  };

  const handleDeleteClose = () => setDeleteOpen(false);
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: {xs:350,lg:400},
    bgcolor: 'background.paper',
    borderRadius: 4, 
    boxShadow: 24,
    p: { xs: 3 },
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>();

  const getAdsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/ads`, {
        headers: requestHeaders,
      });
      setAdsList(response.data.data.ads);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };
  const getRoomsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/rooms`, {
        headers: requestHeaders,
      });
      setRoomsList(response.data.data.rooms);
      setLoading(false);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };
  const formatCellValue = (column: Column, ads: ADS) => {
    let value: any = ads[column.id as keyof ADS];
    if (column.id === "capacity") {
      value = ads.room.capacity;
    }
    if (column.id === "price") {
      value = ads.room.price;
    }
    if (column.id === "discount") {
      value = ads.room.discount;
    }
    if (column.id === "createdBy") {
      value = ads.createdBy.userName;
    }
    if (column.id === "isActive") {
      value = ads?.isActive.toString();
    }

    if (column.id === "roomNumber") {
      value = ads.room.roomNumber;
    }

    return value;
  };
  const onEditSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response = await axios.put(`${baseUrl}/admin/ads/${adsId}`, data, {
        headers: requestHeaders,
      });

      showToast("success", response.data.message);
      handleEditClose();
      getAdsList();
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  const onSubmit: SubmitHandler<Form> = async (data) => {
    try {
      const response = await axios.post(`${baseUrl}/admin/ads`, data, {
        headers: requestHeaders,
      });
      showToast("success", response.data.message);
      handleClose();
      getAdsList();
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  const onDeleteSubmit = async () => {
    try {
      const response = await axios.delete(`${baseUrl}/admin/ads/${adsId}`, {
        headers: requestHeaders,
      });

      showToast("success", response.data.message);
      handleDeleteClose();
      getAdsList();
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  useEffect(() => {
    getAdsList();
    getRoomsList();
  }, []);

  const [openView, setOpenView] = React.useState(false);
const [selectedAdDetails, setSelectedAdDetails] = useState<ADS | null>(null);

const handleViewOpen = (ad: ADS) => {
  setSelectedAdDetails(ad);
  setOpenView(true);
};

const handleViewClose = () => {
  setOpenView(false);
  setSelectedAdDetails(null);
};
  return (
    <>
      <Grid
        container
        sx={{
          mt: 3,
          mb: 5,
          p: 2.5,
          backgroundColor: "#E2E5EB",
          borderRadius: 2,
          display: "flex",
          justifyContent: { xs: "center", sm: "space-between" },
          alignItems: "center",
          gap: 2,
          boxShadow:
            "0px 2px 1px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
        }}
      >
        <Grid item>
          <Typography variant="h5" color="initial" sx={{ fontWeight: 500 }}>
            Ads. Table Details
          </Typography>
          <Typography
            color="initial"
            sx={{ textAlign: { xs: "center", sm: "left" } }}
          >
            You can check all details
          </Typography>
        </Grid>

        <Grid item>
          <Button onClick={() => handleOpen()} variant="contained">
            Add New Ads
          </Button>
        </Grid>
      </Grid>
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
            <TableContainer>
              <Table stickyHeader aria-label="sticky table">
                <TableHead>
                  <TableRow>
                    {columns.map((column) => (
                      <TableCell
                        key={column.id}
                        align={column.align}
                        style={{ minWidth: column.minWidth }}
                        sx={{ backgroundColor: "#E2E5EB" }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {adsList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ads) => {
                      return (
                        <TableRow role="checkbox" tabIndex={-1} key={ads._id}>
                          {columns.map((column) => {
                            const value = formatCellValue(column, ads);
                            if (column.id === "action") {
                              return (
                                <TableCell key={column.id} align={column.align}>
                                  <IconButton
                                    onClick={(event) => handleClick(event, ads)}
                                  >
                                    <MoreHorizIcon />
                                  </IconButton>
                                  <Menu
                                    anchorEl={anchorEl}
                                    open={
                                      Boolean(anchorEl) &&
                                      selectedRow?._id === ads._id
                                    }
                                    onClose={handleMenuClose}
                                  >
                                    <MenuItem onClick={() => handleViewOpen(ads)}>
  <VisibilityIcon sx={{ mx: 1, color: "#00e5ff" }} />
  View
</MenuItem>
                                    <MenuItem
                                      onClick={() => [
                                        handleEdit(
                                          ads._id,
                                          ads.room.discount,
                                          ads.isActive
                                        ),
                                        handleAction("Edit"),
                                      ]}
                                    >
                                      <EditIcon
                                        sx={{ mx: 1, color: "#ffd600" }}
                                      />
                                      Edit
                                    </MenuItem>
                                    <MenuItem
                                      onClick={() => [
                                        handleDeleteOpen(ads._id),
                                        handleAction("Delete"),
                                      ]}
                                    >
                                      <DeleteIcon
                                        sx={{ mx: 1, color: "#d50000" }}
                                      />
                                      Delete
                                    </MenuItem>
                                  </Menu>
                                </TableCell>
                              );
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {value}
                              </TableCell>
                            );
                          })}
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15]}
              component="div"
              count={adsList.length}
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
        )}
      </Paper>

      {/* <Box
        padding={2}
        sx={{
          display: "fle",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      > */}

      {/* </Box> */}

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            marginBlock={2}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Add Ads
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <InputLabel id="demo-simple-select-label">Room Name</InputLabel>

            <Select
              labelId="demo-simple-select-label"
              sx={{ width: "100%", backgroundColor: "#F7F7F7", my: 1 }}
              {...register("room", { required: "Room is required" })}
              error={!!errors.room}
            >
              {roomsList.map((room) => (
                <MenuItem value={room._id}>{room.roomNumber}</MenuItem>
              ))}
            </Select>

            {errors.room && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.room.message}
              </Alert>
            )}
            <InputLabel id="demo-simple-select-label">Discount</InputLabel>

            <TextField
              type="number"
              sx={{ width: "100%", backgroundColor: "#F7F7F7", my: 1 }}
              {...register("discount", { required: "Discount is required" })}
            />
            {errors.discount && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.discount.message}
              </Alert>
            )}
            <InputLabel id="demo-simple-select-label">Active?</InputLabel>

            <Select
              sx={{ width: "100%", backgroundColor: "#F7F7F7", my: 1 }}
              {...register("isActive", { required: "Active is required" })}
            >
              <MenuItem value="true">true</MenuItem>

              <MenuItem value="false">false</MenuItem>
            </Select>
            {errors.isActive && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.isActive.message}
              </Alert>
            )}
            <Box display="flex" justifyContent="end" gap={2} padding={2}>
              <Button
                onClick={() => {
                  handleClose();
                }}
              >
                Cancel
              </Button>
              <Button type="submit" variant="contained">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
      <Modal
        open={openEdit}
        onClose={handleEditClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            marginBlock={2}
            id="modal-modal-title"
            variant="h5"
            component="h2"
          >
            Edit Ads
          </Typography>
          <UpdateForm
            isActiveUpdate={isActive}
            discountUpdate={adsDiscount}
            onEditSubmit={onEditSubmit}
          />
        </Box>
      </Modal>
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
          <img
            src={deleteImg}
            alt="deleteImg"
            style={{
              display: "block",
              margin: "0 auto",
              padding: "16px",
            }}
          />
          <Typography
            fontWeight={600}
            textAlign="center"
            variant="h6"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Delete This Ads Room ?
          </Typography>
          <Typography textAlign="center">
            <p>
              Are you sure you want to delete this item ? if you are sure just
              click on Delete
            </p>
          </Typography>

          <Box sx={{ textAlign: "right", mt: 2 }}>
            {/*  */}
            <Button
              variant="contained"
              color="error"
              onClick={() => {
                onDeleteSubmit();
              }}
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

      {/* View Modal */}
      <Modal
  open={openView}
  onClose={handleViewClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
      Ads. Details
      <Button
             onClick={handleViewClose}
              sx={{
                color: "red",
                padding: 0,
                minWidth: "auto",
                width: 30,
                height: 30,
                backgroundColor: "transparent",
                border: "2px solid red",
              borderRadius: "50%"
                
          
              }}
            >
              <CloseIcon />
            </Button>
    </Typography>
    
    {selectedAdDetails && (
      <>
        <Typography variant="body1"><strong>Room Number:</strong> {selectedAdDetails.room.roomNumber}</Typography>
        <Typography variant="body1"><strong>Capacity:</strong> {selectedAdDetails.room.capacity}</Typography>
        <Typography variant="body1"><strong>Price:</strong> {selectedAdDetails.room.price}</Typography>
        <Typography variant="body1"><strong>Discount:</strong> {selectedAdDetails.room.discount}</Typography>
        <Typography variant="body1"><strong>Created By:</strong> {selectedAdDetails.createdBy.userName}</Typography>
        <Typography variant="body1"><strong>Active:</strong> {selectedAdDetails.isActive ? 'Yes' : 'No'}</Typography>
      </>
    )}
   
  </Box>
</Modal>
    </>
  );
}
