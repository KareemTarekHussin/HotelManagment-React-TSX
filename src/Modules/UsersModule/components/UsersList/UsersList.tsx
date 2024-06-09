import * as React from 'react';
import { useEffect, useState } from "react";
import { userRequest } from "../../../../utils/request";
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import VisibilityIcon from '@mui/icons-material/Visibility';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Box, Button, Grid, IconButton, Input, Modal, Skeleton, TextField, Typography } from '@mui/material';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import { useForm } from 'react-hook-form';
import hotelImg from '../../../../assets/Images/hotel.jpg'
import { BorderAllRounded, RoundedCorner } from '@mui/icons-material';

interface Column {
  id: 'profileImage' | 'userName' | 'email' | 'phoneNumber' | 'country' | 'createdAt' | 'updatedAt' | 'actions';
  label: string;
  minWidth?: number;
  align?: 'right';
}
const columns: readonly Column[] = [
  { id: 'profileImage', label: 'Profile Image', minWidth: 140 },
  { id: 'userName', label: 'User Name', minWidth: 140 },
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
const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:350,lg:400},
  bgcolor: 'background.paper',
  // border: '2px solid #000',
  borderRadius: 4, 
  boxShadow: 24,
  p: {xs:3},
};
const styleForAdd = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:350,sm:700,lg:1000},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: {xs:3},
};
// *<=== === === === === === ===>> USERS LIST <<=== === === === === === === ===>
export default function UsersList() {
  
  const [usersList, setUsersList] = useState<Data[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [open, setOpen] = React.useState(false);
  const [selectedUser, setSelectedUser] = useState<Data | null>(null);
  const [openAdd, setOpenAdd] = React.useState(false);
  const handleOpenAddModal = () => setOpenAdd(true);
  const handleCloseAddModal = () => setOpenAdd(false);
  let {register, handleSubmit, watch, formState:{errors}} = useForm();
  
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
        createdAt: formatDate(user.createdAt),
        updatedAt: formatDate(user.updatedAt),
        userId: user.userId,
      }));
      setUsersList(usersList);
    } catch (error: any) {
      console.error(error);
    } finally{
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
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

  const handleOpen = (user: Data) =>{
    setSelectedUser(user);
    setOpen(true)
   };
  const handleClose = () => {
   setOpen(false)
   setSelectedUser(null);
  };

// &=== === ===>> Adding New User <<=== === === === 
const [imagePreview, setImagePreview] = useState('');
const [formData, setFormData] = useState({
  username: '',
  email: '',
  password: '',
  confirmPassword: '',
  phoneNumber: '',
  country: '',
  role: '',
  profileImage: null,
});

const handleChange = (e:any) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({ ...prevData, [name]: value }));
};

const handleFileChange = (e:any) => {
  const file = e.target.files[0];
  setFormData((prevData) => ({ ...prevData, profileImage: file }));

  const reader = new FileReader();
  reader.onloadend = () => {
    if (typeof reader.result === 'string') {
      setImagePreview(reader.result);
    }
  };
  reader.readAsDataURL(file);
};

const addUser = () => {
  console.log(formData);
};
// &=== === === === === === === === === === === ===

  

  return (
    <>

      {/* <Modal
        open={openAdd}
        onClose={handleCloseAddModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleForAdd}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add User Data
          </Typography>
          <Grid container sx={{display:'flex', flexDirection:'row',justifyContent:'center',padding:2,gap:3}}>
            <Grid item sx={{backgroundColor:'orang',display:'flex',flexDirection:'column',gap:3}} xs={5}>
            <TextField
              id="username"
              label="Username"
              variant="outlined"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
            <TextField
              id="email"
              label="Email"
              variant="outlined"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <TextField
              id="password"
              label="Password"
              variant="outlined"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
            <TextField
              id="confirmPassword"
              label="Confirm Password"
              variant="outlined"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
            />
            </Grid>
            <Grid item sx={{backgroundColor:'greenyello',display:'flex',flexDirection:'column',gap:3}} xs={5}>
            <TextField
              id="phoneNumber"
              label="Phone Number"
              variant="outlined"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <TextField
              id="country"
              label="Country"
              variant="outlined"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <TextField
              id="role"
              label="Role"
              variant="outlined"
              name="role"
              value={formData.role}
              onChange={handleChange}
            />
            <input
              type="file"
              name="profileImage"
              onChange={handleFileChange}
              style={{ marginTop: '16px',backgroundColor:'orange' }}
            />
            <Input type='file'>
            
            </Input>
             <div style={{ marginTop: '16px' }}>
              <Input
                type="file"
                name="profileImage"
                onChange={handleFileChange}
                style={{ display: 'none' }}
                id="file-input"
              />
              <label htmlFor="file-input">
                <Button
                  variant="contained"
                  component="span"
                  sx={{
                    backgroundColor: 'orange',
                    '&:hover': {
                      backgroundColor: 'darkorange',
                    },
                  }}
                >
                  Upload File
                </Button>
              </label>
            </div>
            {imagePreview && (
              <img src={imagePreview} alt="Profile Preview" style={{ marginTop: '16px', maxWidth: '100%', height: 'auto' }} />
            )}
            </Grid>
          </Grid>
          <Button onClick={addUser}>Add</Button>
        </Box>
      </Modal> */}

    <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2" sx={{display:'flex',alignItems:'center', justifyContent:'space-between'}}>
            User Details
            <Button 
              onClick={handleClose}
              sx={{
                color: 'black',
                padding: 0,
                minWidth: 'auto',
                '&:hover': {
                  color: 'red',
                  backgroundColor:'transparent'
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '24px',
                  padding: 0,
                  margin: 0,
                },
              }} 
              >
              <HighlightOffIcon />
            </Button>
          </Typography>
          {selectedUser && (
            <Box>
              <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
                <img src={selectedUser.profileImage} alt={selectedUser.userName} style={{ width: '90px', height: '90px', borderRadius: '10%' }} />
              </Box>
              <Typography>
                <span style={{ fontWeight: 'bold'}}>User Name : </span> 
                {selectedUser.userName}
                </Typography>
              <Typography>
                <span style={{ fontWeight: 'bold'}}>Email : </span> 
                 {selectedUser.email}
                </Typography>
              <Typography>
                <span style={{ fontWeight: 'bold'}}>Phone : </span> 
                 {selectedUser.phoneNumber}
                </Typography>
              <Typography>
                <span style={{ fontWeight: 'bold'}}>Country : </span> 
                 {selectedUser.country}
                </Typography>
            </Box>
          )}
        </Box>
    </Modal>

    <Box sx={{backgroundColor:'orang'}}>
      
      <Grid 
        container
        sx={{mt: 3, mb: 5,p:2.5 , backgroundColor:'#E2E5EB',borderRadius:2, display:'flex',justifyContent:{xs:'center',sm:'space-between'},alignItems:'center',gap:2, boxShadow: '0px 2px 1px -3px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)'}}
        >
          <Grid item>
            <Typography variant="h5" color="initial" sx={{fontWeight:500}}>
              Users Table Details
            </Typography>
            <Typography color="initial" sx={{textAlign:{xs:'center',sm:'left'}}}>You can check all details</Typography>
          </Grid>
          <Grid item>
            {/* <Button variant="contained" onClick={handleOpenAddModal}>Add New User</Button> */}
          </Grid>
        </Grid>

      <Paper sx={{ width: '100%', overflow: 'hidden',borderRadius:2 }}>
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
                          ) : column.id === 'actions' ? (
                            <IconButton  
                              onClick={() => handleOpen(row)}
                              sx={{
                                minWidth: 'auto',
                              }}
                              >
                              <VisibilityIcon/>
                            </IconButton>
                          ): (
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
      
    </Box>
    </>
  );
}
