import React from 'react';
import {
  useQuery,
} from "@apollo/client";

// Material
import {
  Avatar,
  Box,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
} from '@mui/material'
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Custom
import { GET_USERS, GET_MAPS } from "./app/queries";

const App = () => {
  const getAllUsers = useQuery(GET_USERS);
  const getAllMaps = useQuery(GET_MAPS);

  if (getAllUsers.loading ) return "Loading";

  return (
    <React.Fragment>
      <Box style={{padding:'0.5rem'}}>
        <Grid container spacing={{ xs: 2, md: 3 }} >
          <GridItem fn={getAllUsers.data} title="Users"/>
          <GridItem fn={getAllMaps.data} title="Maps"/>
        </Grid>
      </Box>
    </React.Fragment>
  );
}

export default App;

const GridItem = ({fn, title}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
            <Card variant="outlined" >
              <CardHeader
                avatar={
                  <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">R</Avatar>
                }
                action={
                  <IconButton aria-label="settings">
                    <MoreVertIcon />
                  </IconButton>
                }
                title={title}
                subheader="September 14, 2016"
              />
              <CardContent>
                <pre>{JSON.stringify(fn, null, 2)}</pre>
              </CardContent>
            </Card>
          </Grid>
  )
}