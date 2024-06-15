import { useEffect, useState } from 'react';
import { Box, Grid, Skeleton, Typography, Pagination, Stack } from '@mui/material';
import { userRequest } from '../../../utils/request';

import { useLocation } from 'react-router-dom'
export default function Explore() {
  const location = useLocation()
  console.log("data",location.state);
  
  const [roomsList, setRoomsList] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [page, setPage] = useState(4); // Manage current page
  const [totalPages, setTotalPages] = useState(4); // Manage total pages
  const pageSize = 8; // Set page size to 6


  const getAllRooms = async (page: number) => {
    setLoading(true);
    try {
      const response = await userRequest.get(`/portal/rooms/available?page=${page}&size=${pageSize}&startDate=2023-01-20&endDate=2023-01-30`);
      const roomsData = response.data.data;
  
      // Extract rooms and total count
      const rooms = roomsData.rooms;
      const totalCount = roomsData.totalCount;
  
      // Calculate total pages
      const totalPages = Math.ceil(totalCount / pageSize);
  
      // Update state
      setRoomsList(rooms);
      setTotalPages(totalPages);
    } catch (error) {
      console.error("Error fetching rooms data:", error);
    } finally {
      setLoading(false);
    }
  };
  


  useEffect(() => {
    getAllRooms(page);
  }, [page]);

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Box sx={{ py: 3 }}>
        <Typography
          sx={{
            fontSize: { xs: '26px', sm: '30px', md: '34px' },
            fontWeight: 600,
            textAlign: 'center',
            paddingBlock: 4,
            color: '#152C5B',
          }}
        >
          Explore All Rooms
        </Typography>

        <Grid
          container
          sx={{
            display: 'flex',
            justifyContent: 'center',
            gap: 4,
            paddingInline: 3,
            paddingBlock: 4,
            pb: 6,
          }}
        >
          {loading ? (
            Array.from(new Array(6)).map((_, index) => (
              <Grid item xs={11} sm={5} md={4} lg={3} key={index}>
                <Skeleton variant="rectangular" width="100%" height={220} sx={{ borderRadius: '15px' }} />
              </Grid>
            ))
          ) : roomsList && roomsList.length > 0 ? (
            roomsList.map((room: any, index: number) => (
              <Grid item xs={11} sm={5} md={4} lg={3} sx={{ color: 'white' }} key={index}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRadius: '15px',
                    overflow: 'hidden',
                    '&:hover .hoverText': {
                      cursor: 'pointer',
                      transform: 'translateY(0)',
                    },
                    '&:hover .overlay': {
                      backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    },
                    '&:hover .image': {
                      cursor: 'pointer',
                      transform: 'scale(1.05)',
                    },
                  }}
                >
                  <Box sx={{ position: 'relative', width: '100%', height: '220px', overflow: 'hidden' }}>
                    <Box
                      alt=""
                      component='img'
                      src={room.images[0]}
                      className="image"
                      sx={{
                        width: '100%',
                        height: '100%',
                        display: 'block',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    />
                    <Box
                      className="overlay"
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'rgba(0, 0, 0, 0.1)',
                        pointerEvents: 'none',
                        transition: 'background-color 0.3s ease-in-out',
                      }}
                    />
                    <Box
                      className="hoverText"
                      sx={{
                        position: 'absolute',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        color: 'white',
                        transform: 'translateY(100%)',
                        transition: 'transform 0.3s ease, background-color 0.3s ease-in-out',
                        padding: '20px',
                      }}
                    >
                      <Typography variant="h6">Ocean Land</Typography>
                      <Typography>Bandung, Indonesia</Typography>
                    </Box>
                  </Box>
                  <Box
                    sx={{
                      position: 'absolute',
                      backgroundColor: '#FF498B',
                      top: 0,
                      right: 0,
                      width: '50%',
                      zIndex: 101,
                      textAlign: 'center',
                      paddingBlock: 0.8,
                      borderRadius: '0px 0px 0px 15px',
                    }}
                  >
                    <Typography>{room.price}$ per night</Typography>
                  </Box>
                </Box>
              </Grid>
            ))
          ) : (
            <Typography>No rooms available</Typography>
          )}
        </Grid>

        <Stack spacing={2} sx={{ alignItems: 'center', my: 4,mb:5 }}>
          <Pagination
            color="primary"
            count={totalPages}
            page={page}
            onChange={handlePageChange}
            shape="rounded"
            variant="outlined"
          />
        </Stack>
      </Box>
    </>
  );
}
