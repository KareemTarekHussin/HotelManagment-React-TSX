import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../SharedModule/components/Footer/Footer'
import NavbarUser from '../../SharedModule/components/Navbar/NavbarUser'
import { userRequest } from '../../../utils/request';
import {AuthContext} from '../../Context/AuthContext';
import { Card, CardContent, Typography, Avatar, IconButton, Box , Grid} from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import axios from 'axios';
interface User {
  _id: string;
  userName: string;
  profileImage: string;
}

interface Room {
  _id: string;
  roomNumber: string;
  price: number;
  capacity: number;
  discount: number;
  images: string[];
  createdAt: string;
  updatedAt: string;
}

interface RoomReview {
  _id: string;
  room: Room;
  user: User;
  rating: number;
  review: string;
  createdAt: string;
  updatedAt: string;
}

interface RoomReviewsResponse {
  success: boolean;
  message: string;
  data: {
    roomReviews: RoomReview[];
    totalCount: number;
  };
}

interface RoomsResponse {
  success: boolean;
  message: string;
  data: {
    rooms: Room[];
  };
}
export default function DashboardUser() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [currentRoomIndex, setCurrentRoomIndex] = useState(0);
  const [roomReviews, setRoomReviews] = useState<RoomReview[]>([]);
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);

  const getRoomReviews = async (roomId: string) => {
    try {
      const response = await userRequest.get<RoomReviewsResponse>(`${baseUrl}/portal/room-reviews/roomId=${roomId}`);
      setRoomReviews(response.data.data.roomReviews);
      setCurrentReviewIndex(0);
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  const getRooms = async () => {
    try {
      const response = await axios.get<RoomsResponse>(`${baseUrl}/portal/rooms/available?page=1&size=10&startDate=2023-01-20&endDate=2023-01-30`);
      setRooms(response.data.data.rooms);
    } catch (error) {
      console.error('API call error:', error);
    }
  };
  useEffect(() => {
    getRooms();
  }, []);
  
  useEffect(() => {
    if (rooms.length > 0) {
      getRoomReviews(rooms[currentRoomIndex]._id);
    }
  }, [currentRoomIndex, rooms]);


  const handleNextReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex + 1) % roomReviews.length);
  };

  const handlePreviousReview = () => {
    setCurrentReviewIndex((prevIndex) => (prevIndex - 1 + roomReviews.length) % roomReviews.length);
  };

  const handleNextRoom = () => {
    setCurrentRoomIndex((prevIndex) => (prevIndex + 1) % rooms.length);
  };

  const handlePreviousRoom = () => {
    setCurrentRoomIndex((prevIndex) => (prevIndex - 1 + rooms.length) % rooms.length);
  };

  if (rooms.length === 0 || roomReviews.length === 0) {
    return <Typography variant="h6">Loading...</Typography>;
  }

  const currentRoom = rooms[currentRoomIndex];
  const currentReview = roomReviews[currentReviewIndex];
  return (
    <div>
       <NavbarUser/> 
        DashboardUser

        <Card sx={{ display: 'flex', flexDirection: 'row', padding: 2, maxWidth: 900, margin: '0 auto', position: 'relative' }}>
      <IconButton aria-label="previous-room" onClick={handlePreviousRoom} sx={{ position: 'absolute', top: '50%', left: -30 }}>
        <ArrowBackIosIcon />
      </IconButton>
      <Grid container>
        <Grid item xs={12} md={6}>
          <img
            src={currentRoom.images[0]}
            alt={currentRoom.roomNumber}
            style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <CardContent sx={{ flex: 1, paddingLeft: 2 }}>
            <Typography variant="h6">{currentReview.user.userName}</Typography>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              {[...Array(currentReview.rating)].map((_, index) => (
                <StarIcon key={index} sx={{ color: '#ffb400' }} />
              ))}
            </Box>
            <Typography variant="body2" color="textSecondary">{currentReview.review}</Typography>
            <Typography variant="caption" color="textSecondary">
              {new Date(currentReview.createdAt).toLocaleDateString()}
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
              <IconButton aria-label="previous-review" onClick={handlePreviousReview}>
                <ArrowBackIosIcon />
              </IconButton>
              <IconButton aria-label="next-review" onClick={handleNextReview}>
                <ArrowForwardIosIcon />
              </IconButton>
            </Box>
          </CardContent>
        </Grid>
      </Grid>
      <IconButton aria-label="next-room" onClick={handleNextRoom} sx={{ position: 'absolute', top: '50%', right: -30 }}>
        <ArrowForwardIosIcon />
      </IconButton>
    </Card>


<Footer/>
    </div>
  )
}


{/* <Box
sx={{
  width: 30,
  height: 30,
  border: "2px solid #203FC7",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}}
>
<ArrowBackIcon sx={{ color: "#203FC7", fontSize: "20px" }} />
</Box>
</IconButton>
<IconButton aria-label="next" onClick={handleNext}>

<Box
sx={{
  width: 30,
  height: 30,
  border: "2px solid #203FC7",
  borderRadius: "50%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  cursor: "pointer",
}}
>
<ArrowForwardIcon sx={{ color: "#203FC7", fontSize: "20px" }} />
</Box>
</IconButton>
</Box> */}