import React from 'react'

// Material
import {
  Avatar,
  Grid,
  Card,
  CardHeader,
  CardMedia,
  CardContent,
  IconButton,
  Skeleton,
} from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

const MapsListIndexItem = ({fn, title}) => {
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
        {fn.mapimage ? 
              <CardMedia
                component="img"
                height="140"
                image={fn.mapimage}
                alt="green iguana"
              /> 
              :
              <Skeleton variant="rectangular"  height={140} />
            }
        <CardContent>
          <pre>{JSON.stringify(fn, null, 2)}</pre>
        </CardContent>
      </Card>
    </Grid>
  )
}

export default MapsListIndexItem