import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../SharedModule/components/Footer/Footer'
import NavbarUser from '../../SharedModule/components/Navbar/NavbarUser'
import { userRequest } from '../../../utils/request';
import {AuthContext} from '../../Context/AuthContext';
import { Card, CardContent, Typography, Avatar, IconButton, Box } from '@mui/material';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import StarIcon from '@mui/icons-material/Star';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
interface Room {
  _id: string;
  roomNumber: string;
}

interface User {
  _id: string;
  userName: string;
  profileImage: string;
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
export default function DashboardUser() {
  const { requestHeaders, baseUrl }: any = useContext(AuthContext);
  const [roomReviews, setRoomReviews] = useState<RoomReview[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const getRoomReviews = async () => {
    try {
      const response = await userRequest.get<RoomReviewsResponse>(`${baseUrl}/portal/room-reviews/65aecfa5e815336ace213af7`);
      setRoomReviews(response.data.data.roomReviews);
      setTotalCount(response.data.data.totalCount);
    } catch (error) {
      console.error('API call error:', error);
    }
  };

  useEffect(() => {
    getRoomReviews();
  }, []);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % roomReviews.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + roomReviews.length) % roomReviews.length);
  };

  if (roomReviews.length === 0) {
    return <Typography variant="h6">No reviews available</Typography>;
  }

  const currentReview = roomReviews[currentIndex];
  return (
    <div>
       <NavbarUser/> 
        DashboardUser

        <Card sx={{ display: 'flex', alignItems: 'center', padding: 2, maxWidth: 600, margin: '0 auto' }}>
      <Avatar
        alt={currentReview.user.userName}
        src={currentReview.user.profileImage}
        sx={{ width: 100, height: 100, marginRight: 2 }}
      />
      <CardContent sx={{ flex: 1 }}>
        <Typography variant="h6">{currentReview.review}</Typography>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {[...Array(currentReview.rating)].map((_, index) => (
            <StarIcon key={index} sx={{ color: '#ffb400' }} />
          ))}
        </Box>
        <Typography variant="body2" color="textSecondary">{currentReview.user.userName}</Typography>
        <Typography variant="caption" color="textSecondary">
          {new Date(currentReview.createdAt).toLocaleDateString()}
        </Typography>
        <Box sx={{ display: 'flex'}}>
        <IconButton aria-label="previous" onClick={handlePrevious}>
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
      </Box>
      </CardContent>
      
    </Card>
<Footer/>
    </div>
  )
}
