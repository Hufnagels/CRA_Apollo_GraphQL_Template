import React from 'react'
import { Link, useParams } from "react-router-dom";

// Material
import {
  Avatar,
  Grid,
  Card,
  CardHeader,
  CardContent,
  IconButton,
} from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const UsersListIndexItem = ({post, title}) => {
  return (
    <Grid item xs={12} sm={12} md={6} lg={4} xl={3}>
      <Card variant="outlined" >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe" alt={title}>{title.charAt(0)}</Avatar>
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
          <pre>{JSON.stringify(post, null, 2)}</pre>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default UsersListIndexItem