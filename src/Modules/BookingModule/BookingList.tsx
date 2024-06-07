import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from 'axios';
import { Grid, Typography, IconButton, Modal, Box } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';

// Define the columns to match booking data
const columns = [
  // { id: 'createdAt', label: 'Created At', minWidth: 170 },
  { id: 'room', label: 'Room', minWidth: 120 },
  { id: 'totalPrice', label: 'Total Price', minWidth: 150 },
  { id: 'status', label: 'Status', minWidth: 140 },
  { id: 'startDate', label: 'Start Date', minWidth: 140 },
  { id: 'endDate', label: 'End Date', minWidth: 140 },
  { id: 'user', label: 'User ID', minWidth: 120 },
  { id: 'actions', label: 'Actions', minWidth: 120 },
];

interface Booking {
  _id: string;
  startDate: string;
  endDate: string;
  totalPrice: number;
  user: {
    _id: string;
  };
  room: string;
  status: string;
  createdAt: string;
  updatedAt: string;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs:350,lg:400},
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: {xs:3},
};

export default function StickyHeadTable() {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [bookingsList, setBookingsList] = React.useState<Booking[]>([]);
  const [selectedBooking, setSelectedBooking] = React.useState<Booking | null>(null);
  const [openModal, setOpenModal] = React.useState(false);

  const handleChangePage = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // Fetch booking data
  const getBookingsList = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        console.log('No token found');
        return;
      }

      const response = await axios.get('https://upskilling-egypt.com:3000/api/v0/portal/booking/my', {
        headers: { Authorization: token },
      });

      if (response.status === 200 && response.data?.data?.myBooking) {
        setBookingsList(response.data.data.myBooking);
        console.log('Response Data:', response.data.data.myBooking);
      } else {
        console.log('Unexpected response:', response);
      }
    } catch (error) {
      console.error('Error fetching booking data:', error);
    }
  };

  const formatDate = (dateString: string) => {
    return dateString.slice(0, 10).split('-').reverse().join('-');
  };

  React.useEffect(() => {
    getBookingsList();
  }, []);

  const handleOpenModal = (booking: Booking) => {
    setSelectedBooking(booking);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <>
      <Grid
        container
        sx={{
          mt: 3, 
          mb: 5, 
          p: 2.5, 
          backgroundColor: '#E2E5EB', 
          borderRadius: 2, 
          display: 'flex',
          alignItems: 'center', 
          justifyContent: { xs: 'center', sm: 'space-between' }, 
          gap: 2,
        }}

      >
        <Grid item>
          <Typography variant="h5" color="initial" sx={{fontWeight:500}}>
            Bookings Table Details
          </Typography>
          <Typography color="initial" sx={{ textAlign: { xs: 'center', sm: 'left' } }}>You can check all details</Typography>
        </Grid>
        <Grid item>
          {/* <Button variant="contained" onClick={handleOpenAddModal}>Add New User</Button> */}
        </Grid>
      </Grid>
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    style={{ minWidth: column.minWidth }}
                    sx={{backgroundColor:'#E2E5EB'}}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {bookingsList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((booking) => {
                  return (
                    <TableRow hover role="checkbox" tabIndex={-1} key={booking._id}>
                      {columns.map((column) => {
                        let value;
                        if (column.id === 'user') {
                          value = booking.user._id;
                        } else if (column.id === 'startDate' || column.id === 'endDate' || column.id === 'createdAt') {
                          const fieldValue = booking[column.id as keyof Booking];
                          value = typeof fieldValue === 'string' ? formatDate(fieldValue) : fieldValue;
                        } else {
                          value = booking[column.id as keyof Booking];
                        }
                        return (
                          <TableCell key={column.id}>
                            {column.id === 'actions' ? (
                              <IconButton onClick={() => handleOpenModal(booking)}>
                                <VisibilityIcon />
                              </IconButton>
                            ) : (
                              typeof value === 'string' || typeof value === 'number' ? value : ''
                            )}
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
          rowsPerPageOptions={[5, 10, 25, 100]}
          component="div"
          count={bookingsList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
          sx={{backgroundColor:'#E2E5EB',display:'flex', justifyContent:'center'}}
        />
      </Paper>
      <Modal open={openModal} onClose={handleCloseModal}>
        <Box sx={style}>
          <Typography variant="h6" color="initial">Booking Details</Typography>
          {selectedBooking && (
            <>
              <Typography>Start Date: {formatDate(selectedBooking.startDate)}</Typography>
              <Typography>End Date: {formatDate(selectedBooking.endDate)}</Typography>
              <Typography>Total Price: {selectedBooking.totalPrice}</Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
}