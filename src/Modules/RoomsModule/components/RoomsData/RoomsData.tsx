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
  Alert
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { SubmitHandler, useForm } from "react-hook-form";
import { Inputs } from "../../../../interfaces/interface";
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
    <Container sx={{marginTop:8}}>
      <Box 
        component="form" onSubmit={handleSubmit(onSubmit)} 
        sx={{ display:'flex',flexDirection:'column',alignItems:'center'}}>
        <Grid lg={9} container sx={{display:'flex',flexDirection:'column',gap:3}}>



          <Grid item md={12}>
            <TextField
              size="small"
              label="Room Number"
              variant="filled"
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

          
          <Grid item sm={12}  sx={{display:'flex', gap:2,backgroundColor:'gol'}}>
            <Grid item sm={12}>
              <TextField
              size="small"
                label="Price"
                variant="filled"
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

            <Grid item sm={12}>
              <TextField
              size="small"
                label="Capacity"
                variant="filled"
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
          </Grid>
          
          <Grid item sm={12}  sx={{display:'flex',flexDirection:{xs:'column',sm:'row'}, gap:2}}>
            <Grid item sm={12}>
              <TextField
              size="small"
                label="Discount"
                variant="filled"
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
            <Grid item sm={12}>
              <FormControl fullWidth variant="filled">
                <InputLabel id="demo-multiple-checkbox-label">Facilities</InputLabel>
                <Select
                  size="small"
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={watch("facilities") || []}
                  {...register("facilities", {
                    required: "facilities is required",
                  })}
                  label="Facilities"
                  renderValue={(selected) => (
                    <div>
                      {selected.map((id) => (
                        <span style={{ margin: "8px" }} key={id}>
                          {facilitiesList.find((facility) => facility._id === id)?.name}
                        </span>
                      ))}
                    </div>
                  )}
                >
                  {facilitiesList.map((item) => (
                    <MenuItem key={item._id} value={item._id}>
                      <Checkbox checked={watch("facilities")?.includes(item._id)} />
                      <ListItemText primary={item.name} />
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
          </Grid>
          

          <Grid item xs={12} sx={{width:'100%'}}>
            <label htmlFor="imgs">
              <Button
                size="large"
                component="span"
                role={undefined}
                variant="outlined"
                tabIndex={-1}
                startIcon={<CloudUploadIcon />}
                sx={{width:'100%',paddingBlock:{lg:1.5}}}
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


        <Box sx={{mt: 2,alignSelf:'end' }}>
          <Button variant="outlined" size="large"  sx={{ mr: 3 }}>
            Cancle
          </Button>
          <Button variant="contained" size="large" type="submit">
            Save
          </Button>
        </Box>
          
        </Grid>
        <Grid container mt={2} spacing={0}>
          {Array.from(images).map((img: Blob | MediaSource, index: number) => (
            <Grid item key={index} md={2}>
              <img
                src={img && URL.createObjectURL(img as Blob)}
                alt=""
                style={{ width: "100%" }}
              />
            </Grid>
          ))}
        </Grid>




      </Box>
    </Container>
  );
}
