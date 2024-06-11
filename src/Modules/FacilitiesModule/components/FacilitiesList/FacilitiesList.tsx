import React, { useContext, useEffect, useState } from "react";
import deleteImg from "../../../../assets/Images/deleteImg.png";
import { AuthContext } from '../../../Context/AuthContext';
import axios from 'axios';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Grid, Typography, CircularProgress } from '@mui/material';
import { userRequest } from "../../../../utils/request";
import Skeleton from '@mui/material/Skeleton';
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";
import CloseIcon from "@mui/icons-material/Close";


interface Column {
  id: 'name' | 'createdBy' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: string | Date) => string;
}

// Define the structure of a facility
interface Facility {
  _id: string;
  name: string;
  createdBy: { _id: string; userName: string };
  createdAt: string;
  updatedAt: string;
}

// Form data structure
interface FormData {
  name: string;
}

// Define table columns
const columns: readonly Column[] = [
  { id: 'name', label: 'Name', minWidth: 50 },
  { id: 'createdBy', label: 'Created By', minWidth: 50 },
  {
    id: 'createdAt',
    label: 'Created At',
    minWidth: 50,
    align: 'right',
    format: (value: string | Date) => new Date(value).toLocaleString(),
  },
  {
    id: 'updatedAt',
    label: 'Updated At',
    minWidth: 50,
    align: 'right',
    format: (value: string | Date) => new Date(value).toLocaleString(),
  },
  {
    id: 'actions',
    label: 'Actions',
    minWidth: 50,
    align: 'right',
  },
];

// Style for modals
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function FacilitiesList() {
  // State variables
  const [facilitiesList, setFacilitiesList] = useState<Facility[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [selectedRow, setSelectedRow] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true);
  const { showToast } = useToast();

 
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingFacility(null);
    reset();  
  };


  const handleDeleteOpenModal = (id: string) => {
    setRoomId(id);
    setOpenDeleteModal(true);
  };
  

  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
    setSelectedRow(null);  
  };

  
  const getFacilitiesList = async () => {
    try {
      const response = await userRequest.get(`${baseUrl}/admin/room-facilities`);
      console.log('Response data:', response.data.data.facilities);
      setFacilitiesList(response.data.data.facilities);
      setTotalCount(response.data.totalCount);
      setLoading(false);
    } catch (error) {
      console.error('API call error:', error);
      setLoading(false);
    }
  };

  
  useEffect(() => {
    getFacilitiesList();
  }, []);

  
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormData>();

 
  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      if (editingFacility) {
       
        await axios.put(`${baseUrl}/admin/room-facilities/${editingFacility._id}`, data, {
          headers: requestHeaders,
        });
      } else {
       
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

  
  const [roomId, setRoomId] = useState<string>("");

  const handleDelete = async () => {
   
    try {
      await userRequest.delete(`/admin/rooms/${roomId}`);
      getFacilitiesList();
      showToast("success", "Room has been deleted!");
      handleCloseDeleteModal();
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } 
  };

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Function to handle menu open and selection
  const handleClick = (event: React.MouseEvent<HTMLElement>, row: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
    console.log('Selected row:', row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  // Function to handle different actions (View/Edit/Delete)
  const handleAction = (action: string) => {
    if (action === 'Edit') {
      setEditingFacility(selectedRow);
      reset({ name: selectedRow?.name || '' });
      setOpen(true);
    } else if (action === 'Delete') {
      console.log('Handling delete action for:', selectedRow);
      handleDeleteOpenModal(selectedRow!._id);
    }
    else if (action === "View") {
      handleViewOpen();
    }
    handleCloseMenu();
  };

  // Function to format table cell values
  const formatCellValue = (column: Column, facility: Facility) => {
    let value: any = facility[column.id as keyof Facility];
    if (column.id === 'createdBy') {
      value = facility.createdBy.userName;
    }
    if (column.format) {
      return column.format(value);
    }
    return value;
  };
  //View Modal
  const [selectedFacility, setSelectedFacility] = useState<Facility | null>(null);
  const [openView, setOpenView] = useState<boolean>(false);
   const handleViewClose = () => {
    setOpenView(false);
    setSelectedFacility(null);
  };
  const [spinner, setSpinner] = useState<boolean>(false);
  const handleView = async (id: string) => {
    setSpinner(true);
    try {
      const { data } = await userRequest.get(`/admin/facility/${id}`);
      setSelectedFacility(data.data.facility);
      setSpinner(false);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
      setSpinner(false);
    }
  };
  const handleViewOpen = () => {
    setOpenView(true);
  };

  return (
    <>
<Modal open={openView} onClose={handleViewClose}>
  <Box sx={style}>
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
      <Typography id="modal-modal-title" variant="h6" component="h2">
        Facility Details
      </Typography>
      <IconButton aria-label="close" onClick={handleViewClose}>
        <CloseIcon />
      </IconButton>
    </Box>
    <Box id="modal-modal-description" sx={{ mt: 2 }}>
      {spinner ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress />
        </Box>
      ) : (
        selectedFacility && (
          <>
            {/* Extracting properties into constants */}
            {(() => {
              const roomName = selectedFacility.name;
              const createdBy = selectedFacility.createdBy.userName;
              const createdAt = new Date(selectedFacility.createdAt).toLocaleString();
              const updatedAt = new Date(selectedFacility.updatedAt).toLocaleString();

              return (
                <>
                  <Typography variant="body1">
                    <strong>Room Name:</strong> {roomName}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created By:</strong> {createdBy}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Created At:</strong> {createdAt}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Updated At:</strong> {updatedAt}
                  </Typography>
                </>
              );
            })()}
          </>
        )
      )}
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
                Facilities Table Details
              </Typography>
              <Typography color="initial" sx={{textAlign:{xs:'center',sm:'left'}}}>You can check all details</Typography>
          </Grid>
          <Grid item>
            <Button variant="contained" onClick={handleOpen}>Add New Facility</Button>
          </Grid>
        </Grid>

        <Paper sx={{ width: '100%',  overflow: 'hidde' }}>
        {loading ? (
          <Box sx={{ width: '100%' }}>
            <Skeleton variant="rectangular" width="100%" height={100} />
            <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
            <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
            <Skeleton variant="rectangular" width="100%" height={100} animation="wave" />
          </Box>
        ) : (
        <>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
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
                  <TableRow hover role="checkbox" tabIndex={-1} key={facility._id}>
                    {columns.map((column) => {
                      const value = formatCellValue(column, facility);
                      if (column.id === 'actions') {
                        return (
                          <TableCell key={column.id} align={column.align}>
                            <IconButton
                              onClick={(event) => handleClick(event, facility)}
                            >
                              <MoreHorizIcon />
                            </IconButton>
                            <Menu
                              anchorEl={anchorEl}
                              open={Boolean(anchorEl) && selectedRow?._id === facility._id}
                              onClose={handleCloseMenu}
                            >
                              
                              <MenuItem  onClick={() => {
                                        handleAction("View");
                                        handleView(facility._id);
                                      }}>
                                <VisibilityIcon sx={{ mr: 1, color: '#00e5ff' }} />
                                View
                              </MenuItem>
                              <MenuItem onClick={() => handleAction('Edit')}>
                                <EditIcon sx={{ mr: 1, color: '#ffd600' }} />
                                Edit
                              </MenuItem>
                              <MenuItem onClick={() => handleAction('Delete')}>
                                <DeleteIcon sx={{ mr: 1, color: '#d50000' }} />
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
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={facilitiesList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        </>
      )}
          
        </Paper>

      </Box>

      {/* Add/Edit Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" gutterBottom>
            {editingFacility ? 'Edit Facility' : 'Add New Facility'}
          </Typography>
          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Name"
              fullWidth
              margin="normal"
              {...register('name', { required: 'Name is required' })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleClose} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={style}>
        <Box
            sx={{ display: "flex", justifyContent: "end" }}
            onClick={handleCloseDeleteModal}
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
          <img src={deleteImg} alt="" style={{ display: 'block', margin: '0 auto', paddingBottom: '16px' }} />
          <Typography
            fontWeight={600}
            textAlign="center"
            variant="h6"
            id="modal-modal-description"
            sx={{ mt: 2 }}
          >
            Delete This Facility ?
          </Typography>
          <Typography textAlign="center">
            <p>
              Are you sure you want to delete this item ? if you are sure just
              click on Delete
            </p>
          </Typography>
        
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
    </>
  );
}
