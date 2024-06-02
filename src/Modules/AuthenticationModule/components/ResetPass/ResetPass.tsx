import {
  Box,
  Button,
  FilledInput,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import forgetImg from "../../../../assets/Images/forget-reset.png";
import Alert from "@mui/material/Alert";
import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useToast } from "../../../Context/ToastContext";
import { getErrorMessage } from "../../../../utils/error";
type Input = {
  email: string;
  password: string;
  seed: string;
  confirmPassword: string;
};
export default function ResetPass() {
  const { showToast } = useToast();

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const navigate = useNavigate();
  let {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Input>();
  const onSubmit: SubmitHandler<Input> = async (data) => {
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3000/api/v0/admin/users/reset-password",
        data
      );
      showToast("success", response.data.message);
      navigate("/login");

    } catch (error: any) {
      const err = getErrorMessage(error);
      showToast("error", err);    }
  };
  return (
    <>
      <Grid
        container
        display="flex"
        justifyContent="center"
        
      >
        <Grid item xs={12} md={6} sm={12} sx={{ ml: "50px" }}>
          <Typography sx={{ m: "15px", color: "#152C5B", fontWeight: 700 }}>
            <Typography
              sx={{
                display: "inline-block",
                color: "#3252DF",
                fontWeight: 700,
              }}
            >
              Stay
            </Typography>
            cation.
          </Typography>
          <Box sx={{ my: "25px" }}>
            <Typography variant="h5" sx={{ ml: "100px", fontWeight: 700 }}>
              Reset Password
            </Typography>
            <Typography sx={{ ml: "100px" }}>
              If you already have an account register
              <Typography>
                You can
                <Link
                  style={{
                    color: "#ff0000",
                    textDecoration: "none",
                    marginInline: "5px",
                  }}
                  to="/"
                >
                  Login here !
                </Link>
              </Typography>
            </Typography>
          </Box>
          <Box
            onSubmit={handleSubmit(onSubmit)}
            component={"form"}
            sx={{
              width: "60%",
              mx: "100px",
            }}
          >
            <label style={{ color: "#3252DF" }}>Email</label>
            <TextField
              focused={false}
              sx={{
                width: "100%",
                backgroundColor: "#F5F6F8",
                my: "7px",
              }}
              placeholder="Enter your Email"
              variant="filled"
              size="small"
              {...register("email", {
                required: "Email is required",
              })}
            />
            {errors.email && (
              <Alert variant="filled" severity="error">
                {errors.email.message}
              </Alert>
            )}
            <label style={{ color: "#3252DF" }}>OTP</label>
            <TextField
              focused={false}
              sx={{
                width: "100%",
                backgroundColor: "#F5F6F8",
                my: "7px",
              }}
              placeholder="Enter Verification Code"
              variant="filled"
              size="small"
              {...register("seed", {
                required: "Code is required",
              })}
            />
            {errors.seed && (
              <Alert variant="filled" severity="error">
                {errors.seed.message}
              </Alert>
            )}
            <label style={{ color: "#3252DF" }}>password</label>
            <FilledInput
              sx={{
                width: "100%",
                backgroundColor: "#F5F6F8",
                my: "7px",
              }}
              placeholder="Enter your Password"
              size="small"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("password", {
                required: "password is required",
              })}
            />
            {errors.password && (
              <Alert variant="filled" severity="error">
                {errors.password.message}
              </Alert>
            )}

            <label style={{ color: "#3252DF" }}>confirm password</label>
            <FilledInput
              sx={{
                width: "100%",
                backgroundColor: "#F5F6F8",
                my: "7px",
              }}
              placeholder="Enter your Confirm Password"
              size="small"
              type={showPassword ? "text" : "password"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              }
              {...register("confirmPassword", {
                required: "confirm password is required",
              })}
            />
            {errors.confirmPassword && (
              <Alert variant="filled" severity="error">
                {errors.confirmPassword.message}
              </Alert>
            )}
            <Button
              size="medium"
              color="primary"
              variant="contained"
              type="submit"
              sx={{ width: "100%", my: "20px" }}
            >
              Reset
            </Button>
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          md={5}
          sm={12}
          sx={{
            height: "100vh",
            position: "relative",
            zIndex: 0,
            padding: "25px",
          }}
        >
          <img src={forgetImg} style={{ width: "100%", height: "100%" }} />
          <Box
            sx={{
              position: "absolute",
              bottom: "80px",
            }}
          >
            <Typography
              variant="h4"
              sx={{
                color: "#FFFFFF",
                mx: "80px",
              }}
            >
              Reset Password
            </Typography>
            <Typography
              sx={{
                color: "#FFFFFF",
                mx: "80px",
              }}
            >
              Homes as unique as you.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
