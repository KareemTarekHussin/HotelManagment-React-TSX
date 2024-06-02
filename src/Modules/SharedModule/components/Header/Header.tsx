import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

type HeaderProps = {
  title: string;
  buttonName: string;
};

const Header: React.FC<HeaderProps> = ({ title, buttonName }) => {
  return (
    <Grid container spacing={1}>
      <Grid item xs={8} md={10}>
        <Typography variant="h5" color="initial">
          {title} Table Details
        </Typography>
        <Typography color="initial">You can check all details</Typography>
      </Grid>
      <Grid item xs={6} md={2}>
        <Button variant="contained">Add New {buttonName}</Button>
      </Grid>
    </Grid>
  );
}
export default Header;