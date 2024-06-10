import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select,
  TextField,
  MenuItem,
  Button,
  Box,
  Checkbox,
  ListItemText,
  Alert,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacilitiesProps, Inputs } from "../../../../interfaces/interface";
import { userRequest } from "../../../../utils/request";
import { useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function RoomsData() {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const location = useLocation();
  const roomId = location.pathname.split("/")[3];
  const roomData = location.state?.roomData;
  const state = location.state?.state;
  const timeoutRef = useRef<number | null>(null);
  const navigate = useNavigate();
  const { showToast } = useToast();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  const getFacilitiesList = async () => {
    setSpinner(true);
    try {
      const response = await userRequest.get(`/admin/room-facilities`);
      setFacilitiesList(response.data.data.facilities);
      setSpinner(false);
    } catch (error) {
      setSpinner(false);
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  const appendToFormData = (data: Inputs) => {
    const formData = new FormData();
    formData.append("roomNumber", data?.roomNumber);
    formData.append("price", data?.price);
    formData.append("capacity", data?.capacity);
    formData.append("discount", data?.discount);
    if (Array.isArray(data.facilities)) {
      data.facilities.map((facility: string) =>
        formData.append("facilities[]", facility)
      );
    }

    for (let i = 0; i < data.imgs.length; i++) {
      formData.append("imgs", data.imgs[i]);
    }

    return formData;
  };

  // console.log(Array.from(watch("imgs")));

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoading(true);
    const addFormData = appendToFormData(data);

    try {
      const res = await userRequest({
        method: state === "edit" ? "put" : "post",
        url: state === "edit" ? `/admin/rooms/${roomId}` : `/admin/rooms`,
        data: addFormData,
      });
      showToast("success", res.data.message);
      setLoading(false);

      navigate("/dashboard/rooms");
    } catch (error) {
      setLoading(false);
      const err = getErrorMessage(error);
      showToast("error", err);
    }
  };

  useEffect(() => {
    getFacilitiesList();

    if (state === "edit" && roomData) {
      setValue("roomNumber", roomData.roomNumber);
      setValue("price", roomData.price);
      setValue("capacity", roomData.capacity);
      setValue("discount", roomData.discount);
      setValue(
        "facilities",
        roomData.facilities.map((item: { _id: string }) => item?._id)
      );
      // console.log(roomData.images);
      for (let i = 0; i < roomData.images.length; i++) {
        setValue("imgs", [...roomData.images[i]]);
      }
    }
    // getUrl()
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [roomData, setValue]);

  return (
    <Container sx={{ mt: 5 }}>
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
            {errors.roomNumber && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.roomNumber.message}
              </Alert>
            )}
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
            {errors.price && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.price.message}
              </Alert>
            )}
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
            {errors.capacity && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.capacity.message}
              </Alert>
            )}
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
            {errors.discount && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.discount.message}
              </Alert>
            )}
          </Grid>
          <Grid item md={6}>
            <FormControl fullWidth>
              <InputLabel>Facilities</InputLabel>
              <Select
                multiple
                value={watch("facilities") || []}
                {...register("facilities", {
                  required: "facilities is required",
                })}
                sx={{ width: "100%" }}
                renderValue={(selected) => (
                  <div>
                    {selected.map((id: string) => {
                      const facility = facilitiesList.find(
                        (facility: FacilitiesProps) => facility._id === id
                      );
                      return (
                        <span style={{ margin: "8px" }} key={id}>
                          {spinner ? "Loading..." : facility && facility?.name}
                        </span>
                      );
                    })}
                  </div>
                )}
              >
                {facilitiesList.map((item: FacilitiesProps) => (
                  <MenuItem key={item._id} value={item?._id}>
                    <Checkbox
                      checked={watch("facilities")?.includes(item._id)}
                    />

                    <ListItemText primary={item?.name} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            {errors.facilities && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.facilities.message}
              </Alert>
            )}
          </Grid>
          <Grid item md={3}>
            <label htmlFor="imgs">
              <Button
                component="span"
                variant="contained"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
              >
                Upload Images
              </Button>
            </label>

            <input
              type="file"
              id="imgs"
              style={{ display: "none" }}
              multiple
              {...register("imgs", {
                required: "imgs is required",
              })}
            />
            {errors.imgs && (
              <Alert severity="error" sx={{ mt: 1 }}>
                {errors.imgs.message}
              </Alert>
            )}
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={1}>
          {watch("imgs") && Array.from(watch("imgs")).map((img ,index) => (
            <Grid item md={2} key={index}>
              <img src={img?URL.createObjectURL(img): ""} style={{width:"100%"}} alt="" />
            </Grid>
          ))}
        </Grid>
        <Box sx={{ mt: 2, textAlign: "right" }}>
          <Link to={"/dashboard/rooms"}>
            <Button variant="outlined" sx={{ mr: 4 }}>
              Cancle
            </Button>
          </Link>
          <Button disabled={loading} variant="contained" type="submit">
            {loading ? <CircularProgress color="primary" size={24} /> : "Save"}
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
