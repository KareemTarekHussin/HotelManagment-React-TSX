import Grid from "@mui/material/Grid";
import loginImg from "../../../../assets/Images/login.png";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import CircularProgress from "@mui/material/CircularProgress";
import { FieldError, SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import { useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";
type AuthInputs = {
  email: string;
  password: string;
};

export default function Login() {
  const navigate = useNavigate();
  const { getUserData, baseUrl } = useAuth();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const timeoutRef = useRef<number | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthInputs>();

  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      setLoading(true);
      const response = await axios.post(`${baseUrl}/admin/users/login`, data);
      localStorage.setItem("token", response.data.data.token);
      getUserData();
      showToast("success", "Login Successful");
      timeoutRef.current = setTimeout(() => {
        navigate("/DashBoard");
      }, 1500);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);


  return (
    <>
      <Box
        sx={{
          backgroundColor: "purpl",
          display: "flex",
          flexDirection: "column",
          height: "100vh",
          justifyContent: "center",
          gap: { xs: 3, sm: 5 },
        }}
      >
        <Box
          sx={{
            backgroundColor: "blac",
            paddingTop: 4,
            textAlign: "center",
            display: { md: "none" },
          }}
        >
          <Typography
            sx={{
              fontSize: { xs: 26, sm: 30 },
              fontWeight: 500,
              display: "inline",
              color: "#3252df",
            }}
          >
            Stay
          </Typography>
          <Typography
            sx={{
              fontSize: { xs: 26, sm: 30 },
              fontWeight: 500,
              display: "inline",
              color: "#152c5b",
            }}
          >
            cation.
          </Typography>
        </Box>

        <Grid
          container
          sx={{
            backgroundColor: "gra",
            padding: { xs: 1, sm: 2 },
            justifyContent: { xs: "center" },
            alignItems: { sm: "center", md: "start" },
            gap: { md: 0, lg: 1 },
          }}
        >
          <Grid
            item
            xs={12}
            sm={10}
            md={6}
            lg={5}
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: { md: 1 },
              paddingInline: { md: 4, lg: 0 },
              gap: { md: 0, xl: 4 },
              backgroundColor: "greenYello",
            }}
          >
            <Box
              sx={{
                backgroundColor: "blac",
                paddingLeft: { md: 0, lg: 3 },
                paddingBottom: { md: 2 },
                textAlign: "cente",
                display: { xs: "none", md: "block" },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 26, sm: 30, md: 20, lg: 24 },
                  fontWeight: 600,
                  display: "inline",
                  color: "#3252df",
                }}
              >
                Stay
              </Typography>
              <Typography
                sx={{
                  fontSize: { xs: 26, sm: 30, md: 20, lg: 24 },
                  fontWeight: 600,
                  display: "inline",
                  color: "#152c5b",
                }}
              >
                cation.
              </Typography>
            </Box>

            <Grid
              item
              md={12}
              sx={{
                backgroundColor: "greenYello",
                width: { md: "90%", lg: "75%" },
                alignSelf: { md: "center" },
                padding: { xs: 2 },
                paddingBottom: { sm: 4, md: 0 },
              }}
            >
              <Typography
                sx={{
                  fontSize: { xs: 26, md: 22, lg: 26 },
                  fontWeight: 600,
                  marginTop: { md: 1, lg: 3 },
                }}
              >
                Sign in
              </Typography>

              <Box
                sx={{
                  backgroundColor: "orang",
                  paddingBlock: { xs: 3, sm: 3, md: 2, lg: 3 },
                }}
              >
                <Typography sx={{ fontSize: { md: 14, lg: 16 } }}>
                  If you don’t have an account registered
                </Typography>

                <Box>
                  <Typography
                    sx={{ fontSize: { md: 14, lg: 16 }, display: "inline" }}
                  >
                    You can
                  </Typography>{" "}
                  <Typography
                    sx={{
                      fontSize: { md: 14, lg: 16 },
                      fontWeight: 600,
                      display: "inline",
                      color: "#152c5b",
                    }}
                  >
                    <Link to={"/register"}
                    
                    >
                    Register here !
                    </Link>
                   
                  </Typography>
                </Box>
              </Box>

                  <form onSubmit={handleSubmit(onSubmit)}>

                    <Box sx={{backgroundColor: '#ff',display:'flex', flexDirection:'column', gap:{xs:3, sm:4, md:4, lg:4}}}>

                        <Box sx={{ width: '100%',height:60,display:'flex', flexDirection:'column' }}>
                          <TextField  
                            label="Email" 
                            variant="filled"
                            size='small'
                            fullWidth
                            sx={{
                              '& .MuiFilledInput-root': {
                                backgroundColor: '#F5F6F8', // Remove the gray background
                              }
                            }}
                            {...register('email',{
                              required:'* Email is required',
                              pattern:{
                                value:/^[^@]+@[^@]+\.[^@.]{2,}$/ ,
                                message:'Invalid Email.'
                              }
                            })}
                            error={!!errors.email}
                            />
                             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                              <Typography sx={{
                                fontSize: 14,
                                color: '#D32F2F',
                              }}>
                                {(errors.email as FieldError)?.message || <span>&nbsp;</span>}
                              </Typography>
                            </Box>
                        </Box>

                        <Box sx={{display:'flex', flexDirection:'column'}}>
                          <TextField 
                            label="Password" 
                            variant="filled"
                            size='small'
                            fullWidth
                            sx={{
                              '& .MuiFilledInput-root': {
                                backgroundColor: '#F5F6F8', // Remove the gray background
                              }
                            }}
                            {...register('password',{
                              required:'* Password is required',
                              pattern:{
                                value:/^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/ ,
                                message:'Invalid Email.'
                              }
                            })}
                            error={!!errors.password}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment position="end">
                                  <IconButton onClick={() => setShowPass(!showPass)}>
                                  {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                  </IconButton>
                                </InputAdornment>
                              ),
                              type: showPass ? 'text' : 'password'
                            }}
                            />
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                              <Typography sx={{
                                fontSize: 14,
                                color: '#D32F2F',
                              }}>
                                {(errors.password as FieldError)?.message || <span>&nbsp;</span>}
                              </Typography>
                              <Link
                                underline="hover" 
                                onClick={() => navigate('/forgetpass')}
                                sx={{ 
                                  fontSize: 14, 
                                  fontWeight: 300, 
                                  color: '#4D4D4D',
                                  '&:hover':{
                                    cursor:'pointer',
                                  } 
                                }}
                                >
                                Forget Password?
                              </Link>
                            </Box>
                        </Box>

                  <Button
                    type="submit"
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: "#3252DF",
                      padding: 1.2,
                      marginTop: { xs: 2, sm: 4, md: 2 },
                      height: 44,
                      color: "#ffffff",
                      "&:hover": {
                        backgroundColor: "#273ea8",
                      },
                      "&.Mui-disabled": {
                        backgroundColor: "#273ea8",
                        color: "#888888",
                      },
                    }}
                  >
                    {loading ? (
                      <CircularProgress sx={{ color: "white" }} size={24} />
                    ) : (
                      "Login"
                    )}
                  </Button>
                </Box>
              </form>
            </Grid>
          </Grid>

          <Grid
            item
            sm={6}
            md={6}
            lg={5}
            sx={{
              backgroundColor: "re",
              alignSelf: { md: "center" },
              display: {
                xs: "none",
                sm: "none",
                md: "flex",
                justifyContent: "center",
              },
            }}
          >
            <Box
              sx={{
                backgroundColor: "orang",
                width: { xs: "100%", md: "85%", lg: "87%" },
                paddingTop: 0.5,
                // minHeight: '90vh',
                // backgroundImage:`url(${loginImg})`,
                // backgroundSize:'cover',
                // backgroundPosition:'center',
                // alignSelf:'center'
              }}
            >
              <img src={loginImg} style={{ width: "100%" }} alt="" />
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
