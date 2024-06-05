import * as React from 'react';
import { useEffect, useState } from "react";
import { userRequest } from "../../../../utils/request";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, IconButton, Menu, Modal, Skeleton, TextField, Typography } from '@mui/material';
import { MenuItem } from 'react-pro-sidebar';

interface Column {
  id: 'profileImage' | 'userName' | 'email' | 'phoneNumber' | 'country' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
}

const columns: readonly Column[] = [
  { id: 'profileImage', label: 'Profile Image', minWidth: 140 },
  { id: 'userName', label: 'User Name', minWidth: 100 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phoneNumber', label: 'Phone Number', minWidth: 170 },
  { id: 'country', label: 'Country', minWidth: 100 },
  { id: 'createdAt', label: 'Creation Date', minWidth: 170 },
  { id: 'updatedAt', label: 'Last Update', minWidth: 170 },
  { id: 'actions', label: 'Actions', minWidth: 170 },
];

interface Data {
  userId: any;
  profileImage: string;
  userName: string;
  email: string;
  phoneNumber: number;
  country: string;
  createdAt: string;
  updatedAt: string;
  actions: JSX.Element;
}

export default function UsersList() {
  const [usersList, setUsersList] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); 
  const [menuUserId, setMenuUserId] = useState<null | any>(null); // State to track which user's menu is open

  const handleMenuOpen = (event: React.MouseEvent<HTMLButtonElement>, userId: any) => {
    setAnchorEl(event.currentTarget);
    setMenuUserId(userId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setMenuUserId(null);
  };

  //*================== Add Modal Appear ==================================
  const [openModal, setOpenModal] = useState(false);
  const [newUserName, setNewUserName] = useState('');
  

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => {
    setOpenModal(false);
    setNewUserName(''); // Reset new user name input
  };

  const handleNewUserNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewUserName(event.target.value);
  };
  //*==============================================================================
  const getUsersList = async () => {
    setLoading(true);
    try {
      const response = await userRequest.get('admin/users?page=1&size=10');
      const usersList = response.data.data.users.map((user: any) => ({
        profileImage: user.profileImage,
        userName: user.userName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        country: user.country,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
        userId: user.userId,
        actions: (
          <>
            <IconButton
              aria-label="more"
              aria-controls="long-menu"
              aria-haspopup="true"
              onClick={(event) => handleMenuOpen(event, user.userId)}
            >
              <MoreHorizIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={menuUserId === user.userId}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => { handleMenuClose(); /* Add action A logic here */ }}>Action A</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); /* Add action B logic here */ }}>Action B</MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); /* Add action C logic here */ }}>Action C</MenuItem>
            </Menu>
          </>
        ),
      }));
      setUsersList(usersList);
    } catch (error: any) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  useEffect(() => {
    getUsersList();
  }, []);

  

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  

  return (
    <>
    <Modal
      open={openModal}
      onClose={handleCloseModal}
      aria-labelledby="add-new-user-modal"
      aria-describedby="add-new-user-modal-description"
    >
      <div style={{ position: 'absolute',width:'350px', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '25px', borderRadius: '5px' }}>
        <Typography variant="h6" gutterBottom>Add New User</Typography>
        <TextField
          label="New User Name"
          variant="outlined"
          value={newUserName}
          onChange={handleNewUserNameChange}
          fullWidth
          autoFocus
          margin="normal"
        />
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
              <Button onClick={handleCloseModal} sx={{ mr: 2 }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Box>
      </div>
    </Modal>


    <Grid 
      container 
      spacing={1} 
      sx={{mt: 2, mb: 5,p:2, backgroundColor:'#E2E5EB',borderRadius:2, display:'flex',justifyContent:{xs:'center',sm:'space-between'},alignItems:'center' }}
      >
        <Grid item>
          <Typography variant="h5" color="initial">
            Facilities Table Details
          </Typography>
          <Typography color="initial">You can check all details</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" onClick={handleOpenModal}>Add New User</Button>
        </Grid>
      </Grid>


    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440, backgroundColor:'greenyello' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                  sx={{backgroundColor:'#E2E5EB'}}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              [...Array(rowsPerPage)].map((_, index) => (
                <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                  <TableCell colSpan={columns.length}>
                    <Skeleton variant="rectangular" height={30} sx={{borderRadius:1}} />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              usersList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align} sx={{ backgroundColor: 'orang', paddingBlock: 1 }}>
                        {column.id === 'profileImage' ? (
                          <img src={value as string} alt={row.userName} style={{ width: '50px', height: '50px', borderRadius: '50px' }} />
                        ) : (
                          value
                        )}
                      </TableCell>
                      );
                    })}
                  </TableRow>
                ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5,10, 25, 100]}
        component="div"
        count={usersList.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        sx={{backgroundColor:'#E2E5EB',display:'flex', justifyContent:'center'}}
      />
    </Paper>
    </>
  );
}
