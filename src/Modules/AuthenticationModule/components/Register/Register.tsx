import React from 'react'
import Grid from '@mui/material/Grid'
import Item from '@mui/material/Grid'
import imageRegister from '/src/assets/Images/sign-up.png'
import { Box, Button, Container, CssBaseline, Stack, TextField, Typography } from '@mui/material'
import { Link } from 'react-router-dom'
import { useNavigate } from "react-router-dom";
import stylesRegister from './Register.module.css'
import  { useRef, useState } from "react";
import { useForm } from "react-hook-form"
import axios from "axios";


type FormValue = {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
    profileImage: FileList;
  password: string;
  confirmPassword: string;
}

export default function Register() {
      // const imgValue = watch();

    // const password = useRef({});
  // const navigate = useNavigate();

  const form = useForm<FormValue>({

    defaultValues: {
      userName: "",
      email: "",
      country: "",
      phoneNumber: "",
      // profileImage:[0],
      password: "",
      confirmPassword: ""
    }
  })

  const { register, handleSubmit, watch, formState } = form;
  const { errors } = formState


  const onSubmit = async (data: FormValue) => {
    console.log(data)
    try {
      // const registerFormData = appendToFormData(data);


      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users",
        data
      );
      console.log(response);
      alert(response.data.message)
      console.log(response.data.message)

      // navigate("/verify");
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <div className='register'>
      <Grid container spacing={"10"} padding={"10px 10px"}>
        <Grid item xs={6}>
          <Item padding={"40px"}>
            <div className={`${stylesRegister.StayCation}`} >
              <span>Stay<strong>cation</strong></span>
            </div>

            <Container maxWidth="sm">
              <div className='register-signUp'>

                <p className={`${stylesRegister.Paragraph}`}>if you already have an account register you can <Link to="">login here !</Link> </p>
              </div>
              <div className='send-register'>
                <form onSubmit={handleSubmit(onSubmit)}>
  
                  <div className={`${stylesRegister.ControlInputs}`} >
                    <div className={`${stylesRegister.MainLabel}`} >
                      <label htmlFor="" className={`${stylesRegister.registerLabel}`}>User Name</label> <br />
                    </div>
                    {/* USER NAME */}
                    <TextField className={`${stylesRegister.registerInput}`} id="outlined-basic" label="please type here ..." variant="outlined"
                      {...register("userName", {
                        required: "Username is required",
                      })}
                      error={!!errors.userName}
                      helperText={errors.userName?.message}

                    />

                  </div>

                  <Stack direction="row" spacing={3} marginTop={"20px"}>
                    <div className='phone-conutry' style={{ width: "100%" }} >
                      <div className={`${stylesRegister.MainLabel}`} >
                        <label htmlFor="" className={`${stylesRegister.registerLabel}`} style={{ marginTop: "590px" }}>phone number</label> <br />

                      </div>
                      {/* PHONE NUMBER */}
                      <TextField id="outlined-basic" className={`${stylesRegister.registerInput}`} label="please type here ..." variant="outlined"
                        {...register("phoneNumber", {
                          required: "phoneNumber is required",
                        })}
                        error={!!errors.phoneNumber}
                        helperText={errors.phoneNumber?.message}
                      />
                    </div>
                    <div className='phone-conutry' style={{ width: "100%" }} >
                      <div className={`${stylesRegister.MainLabel}`} >
                        <label htmlFor="" className={`${stylesRegister.registerLabel}`} style={{ marginTop: "590px" }}>Email Address</label> <br />

                      </div>
                      {/* EMAIL ADDRESS */}
                      <TextField id="outlined-basic" className={`${stylesRegister.registerInput}`} label="please type here ..." variant="outlined"
                        {...register("country", {
                          required: "country is required",
                          pattern: {
                            message: "country mail"
                          }
                        })}
                        error={!!errors.country}
                        helperText={errors.country?.message}

                      />
                    </div>
                  </Stack>
                  <div className='phone-conutry' style={{ width: "100%" }} >
                    <div className={`${stylesRegister.MainLabel}`} >
                      <label htmlFor="" className={`${stylesRegister.registerLabel}`} style={{ marginTop: "590px" }}>Email Address</label> <br />

                    </div>
                    {/* EMAIL ADDRESS */}
                    <TextField id="outlined-basic" className={`${stylesRegister.registerInput}`} label="please type here ..." variant="outlined"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: "Invlid mail"
                        }
                      })}
                      error={!!errors.email}
                      helperText={errors.email?.message}

                    />
                  </div>
                  <div className={`${stylesRegister.ControlInputs}`} >
                    <div className={`${stylesRegister.MainLabel}`} >
                      <label htmlFor="" className={`${stylesRegister.registerLabel}`}>Password</label> <br />
                    </div>
                    {/* PASSWORD */}
                    <TextField className={`${stylesRegister.registerInput}`} id="outlined-basic" label="please type here ..." variant="outlined"
                      {...register("password", {
                        required: "password is required",
                      })}
                      error={!!errors.password}
                      helperText={errors.password?.message}
                    />
                  </div>
                  <div className={`${stylesRegister.ControlInputs}`} >
                    <div className={`${stylesRegister.MainLabel}`} >
                      <label htmlFor="" className={`${stylesRegister.registerLabel}`}>Confirm Password</label> <br />
                    </div>
                    {/* CONFIRM PASSWORD */}
                    <TextField className={`${stylesRegister.registerInput}`} style={{ width: "80%" }} id="outlined-basic" label="please type here ..." variant="outlined"
                      {...register("confirmPassword", {
                        required: "password is required",
                      })}
                      error={!!errors.confirmPassword}
                      helperText={errors.confirmPassword?.message}

                    />
                  </div>
                  <Button type='submit' className={`${stylesRegister.ButtonSignUp}`} variant="contained">sign Up</Button>

                </form>
              </div>

            </Container>


          </Item>
        </Grid>
        <Grid item xs={6}>
          {/* <Item>picture</Item> */}
          <img width={"100%"} src={imageRegister} alt="imageRegister"></img>
        </Grid>

      </Grid>
    </div >
  )
}

