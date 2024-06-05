import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        mt: "5rem",
        justifyContent: "center",
      }}
    >
      <CircularProgress sx={{ color: "blue" }} size={80} />
    </Box>
  );
}
