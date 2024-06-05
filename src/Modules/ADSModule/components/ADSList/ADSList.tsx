import React, { useContext, useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
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
  TablePagination,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";
import SliderValueLabel from "@mui/material/Slider/SliderValueLabel";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import { useToast } from "../../../Context/ToastContext";
import { getErrorMessage } from "../../../../utils/error";
import { SubmitHandler, useForm } from "react-hook-form";

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
  { id: "capacity", label: "Capacity", minWidth: 50 },
  { id: "discount", label: "Discount", minWidth: 50 },
  {
    id: "createdBy",
    label: "created By",
    minWidth: 50,
    align: "right",
  },
  {
    id: "isActive",
    label: "Active",
    minWidth: 50,
    align: "right",
  },
  {
    id: "price",
    label: "Price",
    minWidth: 50,
    align: "right",
  },
  {
    id: "roomNumber",
    label: "Room Number",
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
}

export default function ADSList() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [adsList, setAdsList] = useState<ADS[]>([]);
  const [roomsList, setRoomsList] = useState<Rooms[]>([]);
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const { showToast } = useToast();

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>, menuItem: ADS) => {
    setAnchorEl(event.currentTarget);
    setAction(menuItem);
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setAction(null);
  };
  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const [editId, setEditId] = useState<ADS | string>("");
  const [editDiscount, setEditDiscout] = useState<ADS | number>(0);
  const [editActive, setEditActive] = useState<ADS | boolean>(false);
  const [action, setAction] = useState<ADS | null>(null);

  const [open, setOpen] = React.useState(false);
  const [openEdit, setOpenEdit] = React.useState(false);
  const [editAds, setEditAds] = React.useState<Form | boolean>(false);
  const handleOpen = () => setOpen(true);
  const handleEdit = (
    _id: ADS | string,
    discount: ADS | number,
    active: ADS | boolean
  ) => {
    setEditId(_id);
    setEditDiscout(discount);
    setEditActive(active);
    setOpenEdit(true);
  };
  const handleClose = () => {
    setOpen(false);
    
  };
  const handleEditClose = () => {
    setOpenEdit(false);
    setEditAds(false);
    reset();
  };

  const [openDelete, setDeleteOpen] = React.useState(false);
  const handleDeleteOpen = () => setDeleteOpen(true);

  const handleDeleteClose = () => setDeleteOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Form>();

  const handleAction = (action: string) => {
    if (action === "Delete") {
      handleDeleteOpen();
    } else if (action === "Edit") {
      setEditAds(true);
      setOpenEdit(true);
    }
    handleMenuClose();
  };

  const getAdsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/ads`, {
        headers: requestHeaders,
      });
      console.log(response.data.data.ads);
      setAdsList(response.data.data.ads);
    } catch (error) {
      console.log(error);
    }
  };
  const getRoomsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/admin/rooms`, {
        headers: requestHeaders,
      });
      console.log(response.data.data.rooms);
      setRoomsList(response.data.data.rooms);
    } catch (error) {
      console.log(error);
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
        const response = await axios.put(
          `${baseUrl}/admin/ads/${editId}`,
          data,
          {
            headers: requestHeaders,
          }
        );
        console.log(response);

        showToast("success", response.data.message);
        handleEditClose();
        getAdsList();
      } catch (error) {
        console.log(error);
      }
    } 
    const onSubmit: SubmitHandler<Form> = async (data) => {

      try {
        const response = await axios.post(`${baseUrl}/admin/ads`, data, {
          headers: requestHeaders,
        });
        showToast("success", response.data.message);
        handleClose();
        getAdsList();
      } catch (error) {
        console.log(error);
      }
    }
  
  const onDeleteSubmit = async () => {
    if (action) {
      try {
        const response = await axios.delete(
          `${baseUrl}/admin/ads/${action._id}`,
          {
            headers: requestHeaders,
          }
        );
        showToast("success", response.data.message);
        handleDeleteClose();
        getAdsList();
      } catch (error) {
        const err = getErrorMessage(error);
        showToast("error", err);
      }
    }
  };
  useEffect(() => {
    getAdsList();
    getRoomsList();
  }, []);
  return (
    <>
      <Grid container spacing={1} sx={{ my: 3 }}>
        <Grid item md={10} sm={8} xs={12}>
          <Typography variant="h6">ADS Table Details</Typography>
          <Typography>You can check all details</Typography>
        </Grid>
        <Grid item md={2} sm={4} xs={12}>
          <Button onClick={() => handleOpen()} variant="contained">
            Add New Ads
          </Button>
        </Grid>
      </Grid>
      <Box
        padding={2}
        marginTop={10}
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          overflow: "auto",
        }}
      >
        <Paper sx={{ width: "100%", overflow: "hidden" }}>
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
                                    Boolean(anchorEl) && action?._id === ads._id
                                  }
                                  onClose={handleMenuClose}
                                >
                                  <MenuItem
                                    onClick={() => handleAction("View")}
                                  >
                                    <VisibilityIcon
                                      sx={{ mx: 1, color: "#00e5ff" }}
                                    />{" "}
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
                                    />{" "}
                                    Edit
                                  </MenuItem>
                                  <MenuItem
                                    onClick={() => handleAction("Delete")}
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
            // count={rows.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>
      </Box>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Ads
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Select
              sx={{ width: "100%", backgroundColor: "#F7F7F7", mt: 1 }}
              label="Room Name"
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
            <TextField
              type="number"
              label="Discount"
              sx={{ width: "100%", backgroundColor: "#F7F7F7", mt: 1 }}
              {...register("discount", { required: "Discount is required" })}
              defaultValue={editAds ? editDiscount : ""}
            />
            {errors.discount && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.discount.message}
              </Alert>
            )}
            <Select
              sx={{ width: "100%", backgroundColor: "#F7F7F7", mt: 1 }}
              label="Active"
              {...register("isActive", { required: "Active is required" })}
              defaultValue={editAds ? editActive : ""}
            >
              {adsList.map((ads) => (
                <MenuItem value={ads.isActive.toString()}>
                  {ads.isActive.toString()}
                </MenuItem>
              ))}
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
          <Typography id="modal-modal-title" variant="h5" component="h2">
            Ads
          </Typography>
          <form onSubmit={handleSubmit(onEditSubmit)}>
        
            <TextField
              type="number"
              label="Discount"
              sx={{ width: "100%", backgroundColor: "#F7F7F7", mt: 1 }}
              {...register("discount", { required: "Discount is required" })}
              defaultValue={editAds ? editDiscount : ""}
            />
            {errors.discount && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.discount.message}
              </Alert>
            )}
            <Select
              sx={{ width: "100%", backgroundColor: "#F7F7F7", mt: 1 }}
              label="Active"
              {...register("isActive", { required: "Active is required" })}
              defaultValue={editAds ? editActive : ""}
            >
              {adsList.map((ads) => (
                <MenuItem value={ads.isActive.toString()}>
                  {ads.isActive.toString()}
                </MenuItem>
              ))}
            </Select>
            {errors.isActive && (
              <Alert sx={{ my: 1 }} variant="filled" severity="error">
                {errors.isActive.message}
              </Alert>
            )}
            <Box display="flex" justifyContent="end" gap={2} padding={2}>
              <Button
                onClick={() => {
                  handleEditClose();
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
        open={openDelete}
        onClose={handleDeleteClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
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
          <Box display="flex" justifyContent="center" gap={2} padding={2}>
            <Button
              onClick={() => {
                onDeleteSubmit();
              }}
              color="error"
              variant="contained"
            >
              Delete
            </Button>
            <Button
              onClick={() => {
                handleDeleteClose();
              }}
              variant="contained"
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
}
