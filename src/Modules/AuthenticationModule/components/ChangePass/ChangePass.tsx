import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  Alert,
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { ChangePasswordProps } from "../../../../interfaces/interface";
import { userRequest } from "../../../../utils/request";
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";
import { useNavigate } from "react-router-dom";

export default function ChangePass() {
  const [oldPass, setOldPass] = useState(false);
  const [newPass, setNewPass] = useState(false);
  const [confirmPass, setConfirmPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate()
  const timeoutRef = useRef<number | null>(null);
  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<ChangePasswordProps>();

  const onSubmit: SubmitHandler<ChangePasswordProps> = async (data) => {
    setLoading(true);
    try {
      const res = await userRequest.post("/admin/users/change-password", data);
      showToast("success", res.data.message);
      timeoutRef.current = setTimeout(()=>{
        navigate("/login")
      },1500)
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(()=>{
    return ()=>{
        if(timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  },[])

  return (
    <Box>
      <Typography variant="h5" component="p" sx={{ mb: 3 }}>
        Change Password
      </Typography>

      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: "20px" }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-oldpassword">
            Old Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-oldpassword"
            type={oldPass ? "text" : "password"}
            {...register("oldPassword", {
              required: "old password is required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:
                  "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setOldPass(!oldPass)}
                  edge="end"
                >
                  {oldPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Old Password"
          />
        </FormControl>
        {errors.oldPassword && (
          <Alert severity="error">{errors.oldPassword.message}</Alert>
        )}

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-newpassword">
            New Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-newpassword"
            type={newPass ? "text" : "password"}
            {...register("newPassword", {
              required: "new password is required",
              pattern: {
                value: /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/,
                message:
                  "The password must include at least one lowercase letter, one uppercase letter, one digit, one special character, and be at least 6 characters long.",
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setNewPass(!newPass)}
                  edge="end"
                >
                  {newPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="New Password"
          />
        </FormControl>
        {errors.newPassword && (
          <Alert severity="error">{errors.newPassword.message}</Alert>
        )}

        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="outlined-adornment-confirmpassword">
            Confirm Password
          </InputLabel>
          <OutlinedInput
            id="outlined-adornment-confirmpassword"
            type={confirmPass ? "text" : "password"}
            {...register("confirmPassword", {
              required: "confirm password is required",
              validate: (value) => {
                const { newPassword } = getValues();
                return newPassword === value || "Passwords should match!";
              },
            })}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setConfirmPass(!confirmPass)}
                  edge="end"
                >
                  {confirmPass ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Confirm Password"
          />
        </FormControl>
        {errors.confirmPassword && (
          <Alert severity="error">{errors.confirmPassword.message}</Alert>
        )}
        <Button variant="contained" type="submit">
          {loading ? "Submit..." : "Submit"}
        </Button>
      </Box>
    </Box>
  );
}
