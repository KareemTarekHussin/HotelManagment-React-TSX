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
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { FacilitiesProps, Inputs } from "../../../../interfaces/interface";
import { userRequest } from "../../../../utils/request";
import { useEffect, useRef, useState } from "react";
import { getErrorMessage } from "../../../../utils/error";
import { useToast } from "../../../Context/ToastContext";
import { useLocation, useNavigate } from "react-router-dom";

export default function RoomsData() {
  const [facilitiesList, setFacilitiesList] = useState([]);
  const [facilitesEdit, setFacilitesEdit] = useState([]);
  const [images, setImages] = useState<string[] | FileList | null | []>([]);

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
    formState: { errors },
  } = useForm<Inputs>();

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setImages(e?.target.files);
  };

  const getFacilitiesList = async () => {
    try {
      const response = await userRequest.get(`/admin/room-facilities`);
      setFacilitiesList(response.data.data.facilities);
    } catch (error) {
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
    if (!images || images.length === 0) {
      return false;
    }
    for (let i = 0; i < images.length; i++) {
      formData.append("imgs", images[i]);
    }

    return formData;
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const addFormData = appendToFormData(data);
    try {
      const res = await userRequest({
        method: state === "edit" ? "put" : "post",
        url: state === "edit" ? `/admin/rooms/${roomId}` : `/admin/rooms`,
        data: addFormData,
      });
      showToast("success", res.data.message);

      timeoutRef.current = setTimeout(() => {
        navigate("/dashboard/rooms");
      }, 1500);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFacilitiesList();

    if (state === "edit" && roomData) {
      setFacilitesEdit(roomData.facilities);
    }

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  console.log(facilitesEdit);
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
              defaultValue={roomData?.roomNumber}
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
              defaultValue={roomData?.price}
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
              defaultValue={roomData?.capacity}
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
              defaultValue={roomData?.discount}
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
                    {selected.map((id: string) => (
                      <span style={{ margin: "8px" }} key={id}>
                        {
                          facilitiesList.find(
                            (facility: FacilitiesProps) => facility._id === id
                          )?.name
                        }
                      </span>
                    ))}
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
          <Grid item md={12}>
            <label htmlFor="imgs">
              <Button
                component="span"
                role={undefined}
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
              onChange={handleImageUpload}
            />
          </Grid>
        </Grid>
        <Grid container mt={2} spacing={1}>
          {Array.from(images).map((img: Blob | MediaSource) => (
            <Grid item  key={img} md={2}>
              <img
                src={img && URL.createObjectURL(img)}
                alt=""
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
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
