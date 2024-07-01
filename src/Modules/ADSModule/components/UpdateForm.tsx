import {
  Alert,
  Box,
  Button,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import { useForm } from "react-hook-form";

interface Form {
  _id: string;

  room: String;
  discount: number;
  isActive: boolean;
  roomNumber: string;
  isActiveUpdate: boolean;
  discountUpdate: number;
  onEditSubmit: any;
}

export default function UpdateForm({
  isActiveUpdate,
  discountUpdate,
  onEditSubmit,
}: Form) {
  let {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<Form>();

  return (
    <>
      <form onSubmit={handleSubmit(onEditSubmit)}>
        <InputLabel id="demo-simple-select-label">Discount</InputLabel>

        <TextField
          type="number"
          sx={{ width: "100%", backgroundColor: "#F7F7F7", my: 1 }}
          {...register("discount", { required: "Discount is required" })}
          defaultValue={discountUpdate}
        />
        {errors.discount && (
          <Alert sx={{ my: 1 }} variant="filled" severity="error">
            {errors.discount.message}
          </Alert>
        )}
        <InputLabel id="demo-simple-select-label">Active?</InputLabel>

        <Select
          sx={{ width: "100%", backgroundColor: "#F7F7F7", my: 1 }}
          {...register("isActive", { required: "Active is required" })}
          defaultValue={isActiveUpdate}
        >
          <MenuItem value="true">true</MenuItem>

          <MenuItem value="false">false</MenuItem>
        </Select>
        {errors.isActive && (
          <Alert sx={{ my: 1 }} variant="filled" severity="error">
            {errors.isActive.message}
          </Alert>
        )}
        <Box display="flex" justifyContent="end" gap={2} padding={2}>
          <Button type="submit" variant="contained">
            Save
          </Button>
        </Box>
      </form>
    </>
  );
}
