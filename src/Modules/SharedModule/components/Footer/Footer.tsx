import React from 'react'
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import FolderIcon from '@mui/icons-material/Folder';
import DeleteIcon from '@mui/icons-material/Delete';
import Paper from '@mui/material/Paper';
import { Stack } from '@mui/material';

export default function Footer() {
  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  const Demo = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
  }));
  

  const [dense, setDense] = React.useState(false);
  const [secondary, setSecondary] = React.useState(false);
  function generate(element: React.ReactElement) {
    return [0, 1, 2].map((value) =>
      React.cloneElement(element, {
        key: value,
      }),
    );
  }

  return (
    <div>
      <hr />
        <Grid container  spacing={2}>
    <Grid item xs={4}>
    <Stack >
  <Item>Item 1</Item>
  <Item>Item 1</Item>
  <Item>Item 2</Item>
  <Item>Item 3</Item>
</Stack>
    </Grid>
    <Grid item xs={2}>
    <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
       For Beginners
        </Typography>
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>,
            )}
          </List>
        </Demo>
      </Grid> 
    </Grid>
    <Grid item xs={2}>
    <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Text only
        </Typography>
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>,
            )}
          </List>
        </Demo>
      </Grid> 
    </Grid>
    <Grid item xs={2}>
    <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
          Text only
        </Typography>
        <Demo>
          <List dense={dense}>
            {generate(
              <ListItem>
                <ListItemText
                  primary="Single-line item"
                  secondary={secondary ? 'Secondary text' : null}
                />
              </ListItem>,
            )}
          </List>
        </Demo>
      </Grid> 
    </Grid>
  </Grid>
  <Grid item xs={12} md={6}>
        <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
       For Beginners
        </Typography>
       
      </Grid> 
    </div>
  
  )}
// }
 