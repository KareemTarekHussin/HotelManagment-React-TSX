import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Button,
  styled,
  Box,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacilitiesProps, Inputs } from "../../../../interfaces/interface";
import { userRequest } from "../../../../utils/request";
import { useEffect, useState } from "react";
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export default function RoomsData() {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [facilitesOption, setFacilitiesOption] = useState([]);
  const [loading, setLoading] = useState(false);
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  // const handleSelect = (e) => {
  //   const value = Array.from(
  //     e.target.selectedOptions,
  //     (option) => option.value
  //   );
  //   setFacilitiesOption(value);
  // };
  // console.log(facilitesOption);
  // get all Facilities
  const getFacilitiesList = async () => {
    try {
      const response = await userRequest.get(`/admin/room-facilities`);
      setFacilitiesList(response.data.data.facilities);
      setLoading(false);
    } catch (error) {
      const err = getErrorMessage(error);
      showToast("error", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFacilitiesList();
  }, []);

  console.log(facilitiesList);

  const onSubmit: SubmitHandler<Inputs> = (data) => {};
  return (
    <Container>
      <Box component="form" onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing={2}>
          <Grid item md={12}>
            <TextField
              label="Room Number"
              variant="outlined"
              {...register("roomNumber", {
                required: "Room Number is required",
              })}
              fullWidth
            />
          </Grid>

          <Grid item md={6}>
            <TextField
              label="Price"
              variant="outlined"
              {...register("price", {
                required: "Price is required",
              })}
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Capacity"
              variant="outlined"
              {...register("capacity", {
                required: "capacity is required",
              })}
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <TextField
              label="Discount"
              variant="outlined"
              {...register("discount", {
                required: "discount is required",
              })}
              fullWidth
            />
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-multiple-name-label">Facilities</InputLabel>
              <Select
                labelId="demo-multiple-name-label"
                id="demo-multiple-name"
                multiple
                value={[]}
              >
                {facilitiesList.map((facilities: FacilitiesProps) => (
                  <MenuItem key={facilities._id} value={facilities._id}>
                    {facilities.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item md={12}>
            <Button
              component="label"
              role={undefined}
              variant="contained"
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Upload file
              <VisuallyHiddenInput type="file" />
            </Button>
          </Grid>
        </Grid>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Button variant="outlined" sx={{ mr: 4 }}>
            Cancle
          </Button>
          <Button variant="contained" type="submit">
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
