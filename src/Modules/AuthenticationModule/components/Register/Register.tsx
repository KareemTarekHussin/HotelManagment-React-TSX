import Grid from '@mui/material/Grid';
import loginImg from "../../../../assets/Images/sign-up.png";
import { Box, Button, IconButton, Input, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CircularProgress from '@mui/material/CircularProgress';
import { FieldError, SubmitHandler, useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useToast } from "../../../Context/ToastContext";
import { useState } from 'react';
import axios from 'axios';
type AuthInputs = {
  userName: string;
  phoneNumber: string;
  country: string;
  email: string;
  password: string;
  confirmPassword: string;
  profileImage: FileList;
  role: string;
};

export default function Register() {


  const navigate = useNavigate();
  const { showToast } = useToast();
  const [showPass, setShowPass] = useState(true);
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<AuthInputs>();

  const appendToFormData = (data: any) => {
    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("profileImage", data.profileImage[0]);
    formData.append("role", data.role);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);
    return formData;
  };
  const onSubmit: SubmitHandler<AuthInputs> = async (data) => {
    try {
      setLoading(true);
      const registerFormData = appendToFormData(data);

      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users",
        registerFormData
      );
      console.log(response)

      showToast("success", 'User created successfully');
      navigate('/login');
      setLoading(false);

    } catch (error: any) {
      showToast("error", error.response.data.message);

    } finally {
      setLoading(false);
    }
  };


  return (
    <>
      <Box
        sx={{
          backgroundColor: 'purp',
          display: 'flex',
          flexDirection: 'column',
          height: '100vh',
          justifyContent: 'center',
          gap: { xs: 3, sm: 5 }
        }}>
        <Box sx={{ backgroundColor: 'blac', paddingLeft: { md: 0, lg: 3 }, paddingBottom: { md: 2 }, textAlign: 'cente', display: { xs: 'none', md: 'block' } }}>
          <Typography sx={{ fontSize: { xs: 26, sm: 30, md: 20, lg: 24 }, fontWeight: 600, display: 'inline', color: '#3252df' }}>
            Stay
          </Typography>
          <Typography sx={{ fontSize: { xs: 26, sm: 30, md: 20, lg: 24 }, fontWeight: 600, display: 'inline', color: '#152c5b' }}>
            cation.
          </Typography>
        </Box>

        <Grid container
          sx={{
            backgroundColor: 'gra',
            padding: { xs: 1, sm: 2 },
            justifyContent: { xs: 'center' },
            alignItems: { sm: 'center', md: 'start' },
            gap: { md: 0, lg: 1 }
          }}>


          <Grid item xs={12} sm={10} md={6} lg={5} sx={{ display: 'flex', flexDirection: 'column', paddingTop: { md: 1 }, paddingInline: { md: 4, lg: 0 }, gap: { md: 0, xl: 4 }, backgroundColor: 'greenYello' }}>
            <Box sx={{ backgroundColor: 'blac', paddingLeft: { md: 0, lg: 3 }, paddingBottom: { md: 2 }, textAlign: 'cente', display: { xs: 'none', md: 'block' } }}>
              <Typography sx={{ fontSize: { xs: 26, sm: 30, md: 20, lg: 24 }, fontWeight: 600, display: 'inline', color: '#3252df' }}>
                Stay
              </Typography>
              <Typography sx={{ fontSize: { xs: 26, sm: 30, md: 20, lg: 24 }, fontWeight: 600, display: 'inline', color: '#152c5b' }}>
                cation.
              </Typography>
            </Box>


            <Grid item md={12} sx={{
              backgroundColor: 'greenYello', width: { md: '90%', lg: '75%' }, alignSelf: { md: 'center' },
              padding: { xs: 2 }, paddingBottom: { sm: 4, md: 0 }
            }}>

              <Typography sx={{ fontSize: { xs: 26, md: 22, lg: 26 }, fontWeight: 600 }} >
                Sign up
              </Typography>

              <Box sx={{ backgroundColor: 'orang', paddingBlock: { xs: 3, sm: 3, md: 2, lg: 3 } }}>
                <Typography sx={{ fontSize: { md: 14, lg: 16 } }} >
                  If you already have an account register
                </Typography>

                <Box   >
                  <Typography sx={{ fontSize: { md: 14, lg: 16 }, display: 'inline' }}>You can</Typography>
                  {' '}
                 <Link style={{textDecoration:"none",color:"#152c5b",fontWeight: "600"}} to="/">Login here !</Link>
                </Box>
              </Box>

              <form onSubmit={handleSubmit(onSubmit)}>

                <Box sx={{ backgroundColor: '#ff', display: 'flex', flexDirection: 'column', gap: { xs: 3, sm: 4, md: 4, lg: 4 } }}>
                  {/* USER NAME */}

                  <Box sx={{ width: '100%', height: 55, display: 'flex', flexDirection: 'column' }}>
                    <TextField

                      label="User Name"
                      variant="filled"
                      size='small'
                      fullWidth
                      {...register('userName', {
                        required: '* userName is required',
                      })}
                      error={!!errors.userName}
                    />
                    <TextField
                      sx={{ display: "none" }}
                      label="User Name"
                      variant="filled"
                      size='small'
                      value={"user"}
                      {...register('role', {
                        required: '* userName is required',
                      })}
                    />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                      <Typography sx={{
                        fontSize: 14,
                        color: '#D32F2F',
                      }}>
                        {(errors.userName as FieldError)?.message || <span>&nbsp;</span>}
                      </Typography>
                    </Box>
                  </Box>

                  <Stack direction="row"
                    justifyContent="center"
                    alignItems="center"
                    spacing={2}>
                    {/* Phone Number */}
                    <Box sx={{ height: 55, width: "100%", display: 'flex', flexDirection: 'column' }}>
                      <TextField

                        label="Phone Number"
                        variant="filled"
                        size='small'
                        fullWidth
                        {...register('phoneNumber', {
                          required: '* phoneNumber is required'
                        })}
                        error={!!errors.phoneNumber}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                        <Typography sx={{
                          fontSize: 14,
                          color: '#D32F2F',
                        }}>
                          {(errors.phoneNumber as FieldError)?.message || <span>&nbsp;</span>}
                        </Typography>
                      </Box>
                    </Box>
                    {/* county */}
                    <Box sx={{ height: 55, width: "100%", display: 'flex', flexDirection: 'column' }}>
                      <TextField

                        label="country"
                        variant="filled"
                        size='small'
                        fullWidth
                        {...register('country', {
                          required: 'country is required',
                        })}
                        error={!!errors.country}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 0.5 }}>
                        <Typography sx={{
                          fontSize: 14,
                          color: '#D32F2F',
                        }}>
                          {(errors.country as FieldError)?.message || <span>&nbsp;</span>}
                        </Typography>
                      </Box>
                    </Box>

                  </Stack>



                  {/* email */}
                  <Box sx={{ width: '100%', height: 55, display: 'flex', flexDirection: 'column' }}>
                    <TextField

                      label="Email"
                      variant="filled"
                      size='small'
                      fullWidth
                      {...register('email', {
                        required: '* Email is required',
                        pattern: {
                          value: /^[^@]+@[^@]+\.[^@.]{2,}$/,
                          message: 'Invalid Email.'
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

                  {/* password */}

                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      label="Password"
                      variant="filled"
                      size='small'
                      fullWidth
                      {...register('password', {
                        required: '* Password is required',
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                          message: 'Invalid password.'
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
                  </Box>

                  {/* confirm password */}
                  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <TextField
                      label="Confirm Password"
                      variant="filled"
                      size='small'
                      fullWidth
                      {...register('confirmPassword', {
                        required: '* confirmPassword is required',
                        pattern: {
                          value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                          message: 'Invalid confirmPassword.'
                        }
                      })}
                      error={!!errors.confirmPassword}
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
                  </Box>
                  <input type="file" id="file"
                            {...register('profileImage', {
                        required: '* profileImage is required',

                      })}
                        error={!!errors.profileImage}
                   />
                     {/* changed for to htmlfor */}
                  <label htmlFor="file" className="btn-2">Upload Image</label>
                  

                  <Button
                    type='submit'
                    variant="contained"
                    disabled={loading}
                    sx={{
                      backgroundColor: '#3252DF',
                      padding: 1.2,
                      // marginTop: { xs: 0, sm: 4, md: 2 },
                      height: 44,
                      color: '#ffffff',
                      '&:hover': {
                        backgroundColor: '#273ea8',
                      },
                      '&.Mui-disabled': {
                        backgroundColor: '#273ea8',
                        color: '#888888',
                        boxShadow: '0px 3px 1px -2px rgba(0,0,0,0.2),0px 2px 2px 0px rgba(0,0,0,0.14),0px 1px 5px 0px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    {loading ? <CircularProgress sx={{ color: 'white' }} size={20} /> : 'Sign up'}
                  </Button>
                </Box>

              </form>
            </Grid>
          </Grid>


          <Grid item sm={6} md={6} lg={5} sx={{ position: "relative", backgroundColor: 're', alignSelf: { md: 'center' }, display: { xs: 'none', sm: 'none', md: 'flex', justifyContent: 'center' } }} >
            <Box sx={{
              backgroundColor: 'orang',
              width: { xs: '100%', md: '85%', lg: '87%' },
              paddingTop: 0.5,
            }}>

              <img src={loginImg} style={{ width: '100%' }} alt="" />
              <div style={{ position: "absolute", top: "80%", left: "55%", transform: "translate(-50%,-50%)", color: "#fff", width: "80%" }}>
                <h1>Sign up to Roamhome</h1>
                <h5>Hames as unique as you</h5>
              </div>
            </Box>
          </Grid>

        </Grid>


      </Box>

    </>
  )
}