import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Footer() {
  return (
    <div>
      <hr />
      <Grid container spacing={12}>
        <Grid item xs={3}>
          <Grid item xs={12} md={10}>
            <Typography sx={{ mt: 3, mb: 2 }} variant="h6" component="div">
              <Typography
                sx={{ color: "#152C5B", fontWeight: 500, fontSize: 26 }}
              >
                <Typography
                  sx={{
                    display: "inline-block",
                    color: "#3252DF",
                    fontWeight: 500,
                    fontSize: 26,
                  }}
                >
                  <b>Stay</b>
                </Typography>
                <b>cation.</b>
              </Typography>
            </Typography>
            <Typography sx={{ mt: 2, mb: 2, color: "#B0B0B0" }} component="div">
              We kaboom your beauty holiday instantly and memorable.
            </Typography>
          </Grid>
        </Grid>

        <Grid item xs={3}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              For Beginners
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              New Account
              {/* TODO:Link Register  */}
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Start Booking a Room
              {/* TODO:Go to Booking  */}
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Use Payments
              {/* TODO:Go to Payments  */}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12} md={12}>
            <Typography
              sx={{ mt: 4, mb: 2, color: "#152C5B", fontWeight: 500 }}
              variant="h6"
              component="div"
            >
              Explore Us
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Our Careers
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Privacy{" "}
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Terms & Conditions{" "}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Grid item xs={12} md={12}>
            <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
              Connect with Us
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              support@staycation.id
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              021 - 2208 - 1996
            </Typography>
            <Typography sx={{ mt: 1, mb: 2, color: "#B0B0B0" }} component="div">
              Staycation, Kemang, Jakarta
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} md={12}>
        <Typography
          sx={{ mt: 2, textAlign: "center", color: "#B0B0B0", fontSize: 16 }}
          component="div"
        >
          Copyright 2019 • All rights reserved • Staycation
        </Typography>
      </Grid>
    </div>
  );
}
// }
