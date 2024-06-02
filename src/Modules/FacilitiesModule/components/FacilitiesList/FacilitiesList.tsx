import React, { useContext, useEffect, useState } from "react";

import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { useForm, SubmitHandler } from "react-hook-form";
import { Grid, Typography } from "@mui/material";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import { blue, cyan } from "@mui/material/colors";


//column defines the headers for the table 
interface Column {
  id: "name" | "createdBy" | "createdAt" | "updatedAt" | "actions";
  label: string;
  minWidth?: number;
  align?: "right";
  format?: (value: string | Date) => string;
}

interface Facility {
  _id: string;
  name: string;
  createdBy: { _id: string; userName: string };
  createdAt: string;
  updatedAt: string;
}

interface FormData {
  name: string;
}

const columns: readonly Column[] = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "createdBy", label: "Created By", minWidth: 170 },
  {
    id: "createdAt",
    label: "Created At",
    minWidth: 170,
    align: "right",
    format: (value: string | Date) => new Date(value).toLocaleString(),
  },
  {
    id: "updatedAt",
    label: "Updated At",
    minWidth: 170,
    align: "right",
    format: (value: string | Date) => new Date(value).toLocaleString(),
  },
  {
    id: "actions",
    label: "Actions",
    minWidth: 170,
    align: "right",
  },
];

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function FacilitiesList() {
  const [facilitiesList, setFacilitiesList] = useState<Facility[]>([]);
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [deletingFacility, setDeletingFacility] = useState<Facility | null>(
    null
  );

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingFacility(null);
    reset(); // Resets form fields when closing modal
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getFacilitiesList = async () => {
    try {
      let response = await axios.get(`${baseUrl}/admin/room-facilities`, {
        headers: requestHeaders,
      });
      console.log("Response data:", response.data.data.facilities);
      setFacilitiesList(response.data.data.facilities);
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    getFacilitiesList();
  }, []);

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<FormData>();

//ADD-Update API
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (editingFacility) {
        //update api for facility
        await axios.put(
          `${baseUrl}/admin/room-facilities/${editingFacility._id}`,
          data,
          {
            headers: requestHeaders,
          }
        );
      } else {
        // add api to create a new facility
        await axios.post(`${baseUrl}/admin/room-facilities`, data, {
          headers: requestHeaders,
        });
      }
      getFacilitiesList();
      handleClose();
    } catch (error) {
      console.error(error);
    }
  };
//Delete API
  const handleDelete = async () => {
    if (!deletingFacility) return;
    try {
      await axios.delete(
        `${baseUrl}/admin/room-facilities/${deletingFacility._id}`,
        {
          headers: requestHeaders,
        }
      );
      getFacilitiesList();
      handleCloseDeleteModal();
    } catch (error) {
      console.error(error);
    }
  };

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedRow, setSelectedRow] = useState<Facility | null>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action: string) => {
    if (action === "Edit" && selectedRow) {
      setEditingFacility(selectedRow);
      setValue("name", selectedRow.name);
      handleOpen();
    } else if (action === "Delete" && selectedRow) {
      setDeletingFacility(selectedRow);
      handleOpenDeleteModal();
    }
    handleCloseMenu();
  };

  const formatCellValue = (column: Column, facility: Facility) => {
    let value: any = facility[column.id as keyof Facility];
    if (column.id === "createdBy") {
      value = facility.createdBy.userName;
    }
    if (column.format) {
      return column.format(value);
    }
    return value;
  };

  return (
    <div>
      {/* <Header title='Facilities' buttonName='Facility'> */ }

      {/* </Header> */}
      <Grid container spacing={1}>
        <Grid item xs={8} md={10}>
          <Typography variant="h5" color="initial">
            Facilities Table Details
          </Typography>
          <Typography color="initial">You can check all details</Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button variant="contained" onClick={handleOpen}>
            Add New Facility
          </Button>
        </Grid>
      </Grid>

      <Paper sx={{ width: "100%", overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead >
              <TableRow >
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth }}
                    sx={{ backgroundColor: '#E2E5EB' }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {facilitiesList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((facility) => (
                  <TableRow
                    hover
                    role="checkbox"
                    tabIndex={-1}
                    key={facility._id}
                  >
                    {columns.map((column) => {
                      const value = formatCellValue(column, facility);
                      if (column.id === "actions") {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton
                              onClick={(event) => handleClick(event, facility)}
                            >
                              <MoreHorizIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={
                                Boolean(anchorEl) &&
                                selectedRow?._id === facility._id
                              }
                              onClose={handleCloseMenu}
                            >
                              <MenuItem onClick={() => handleAction("View")}>
                                <VisibilityIcon sx={{ mr: 1 ,color: '#00e5ff'}} />
                                View
                              </MenuItem>
                              <MenuItem onClick={() => handleAction("Edit")}>
                                <EditIcon sx={{ mr: 1 ,color:'#ffd600'}} />
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => handleAction("Delete")}>
                                <DeleteIcon sx={{ mr: 1,color:'#d50000' }} />
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
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={facilitiesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              fullWidth
              label="Facility Name"
              {...register("name", { required: true })}
              error={!!errors.name}
              helperText={errors.name ? "Facility name is required" : ""}
              sx={{ mb: 2 }}
            />
            {/* update or add */}
            <Button variant="contained" type="submit">
              {editingFacility ? "Update" : "Submit"}
            </Button>
          </form>
        </Box>
      </Modal>

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={{ ...style, p: 5, textAlign: "center" }}>
          <img src={deleteImg} alt="" style={{ marginBottom: 20 }} />
          <Typography variant="h6" gutterBottom>
            Are you sure you want to Delete this Facility?
          </Typography>
          <Button
            variant="contained"
            color="error"
            onClick={handleDelete}
            sx={{ mr: 2 }}
          >
            Delete
          </Button>
          <Button variant="contained" onClick={handleCloseDeleteModal}>
            Cancel
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
