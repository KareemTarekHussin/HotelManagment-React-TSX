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
import { Grid, Typography } from '@mui/material';
import { userRequest } from "../../../../utils/request";
import Skeleton from '@mui/material/Skeleton';




interface Column {
  id: 'name' | 'createdBy' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
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
  //States
  const [facilitiesList, setFacilitiesList] = useState<Facility[]>([]);
  const [totalCount, setTotalCount] = useState(0); // New state for total count
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [open, setOpen] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false); // State for delete confirmation modal
  const [selectedRow, setSelectedRow] = useState<Facility | null>(null);
  const [loading, setLoading] = useState(true); 
//function for opening modal
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setEditingFacility(null);
    reset();  // Reset form fields when closing the modal 3shan lma tdoos edit 3la kza item mo5tlfa
  };

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);
  const handleCloseDeleteModal = () => setOpenDeleteModal(false);

  const getFacilitiesList = async () => {
    try {
      let response = await userRequest.get(`${baseUrl}/admin/room-facilities`, {
     
       
      });
      console.log('Response data:', response.data.data.facilities);
      setFacilitiesList(response.data.data.facilities);
      setTotalCount(response.data.totalCount); // Set total count from response
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
        // PUT request to update the facility
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

  const handleDelete = async () => {
    if (selectedRow) {
      try {
        await axios.delete(`${baseUrl}/admin/room-facilities/${selectedRow._id}`, {
          headers: requestHeaders,
        });
        getFacilitiesList();
        handleCloseDeleteModal();
        setSelectedRow(null);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error('Delete API error:', error.response?.data || error.message);
        } else {
          console.error('Unexpected error:', error);
        }
      }
    }
  };

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

  const handleClick = (event: React.MouseEvent<HTMLElement>, row: Facility) => {
    setAnchorEl(event.currentTarget);
    setSelectedRow(row);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedRow(null);
  };

  const handleAction = (action: string) => {
    if (action === 'Edit') {
      setEditingFacility(selectedRow);
      reset({ name: selectedRow?.name || '' }); 
      setOpen(true);
    } else if (action === 'Delete') {
      handleOpenDeleteModal();
    }
    handleCloseMenu();
  };
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

  return (
    <div>
 
      <Grid container spacing={1} sx={{mt: 2, mb: 5 }}>
        <Grid item xs={8} md={10}>
          <Typography variant="h5" color="initial">
            Facilities Table Details
          </Typography>
          <Typography color="initial">You can check all details</Typography>
        </Grid>
        <Grid item xs={6} md={2}>
          <Button variant="contained" onClick={handleOpen}>Add New Facility</Button>
        </Grid>
      </Grid>
      
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', overflow: 'auto' }}>
        <Paper sx={{ width: '100%',  overflow: 'hidden' }}>
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
                              <MenuItem onClick={() => handleAction('View')}>
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
          sx={{backgroundColor:'#E2E5EB',display:'flex', justifyContent:'center'}}
        />
        </>
      )}
          
        </Paper>
      </Box>

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

      <Modal open={openDeleteModal} onClose={handleCloseDeleteModal}>
        <Box sx={style}>
          <img src={deleteImg} alt="" style={{ display: 'block', margin: '0 auto', paddingBottom: '16px' }} />
          <Typography variant="h6" gutterBottom>
            Are you sure you want to delete this facility?
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: '16px', mt: 2 }}>
            <Button variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
            <Button variant="contained" onClick={handleCloseDeleteModal}>
              Cancel
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}

