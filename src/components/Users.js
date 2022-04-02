import React from 'react'
import {
  useQuery,
  useLazyQuery,
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
  CircularProgress,
  Button,
} from '@mui/material'
import { red } from '@mui/material/colors';
import IconButton from '@mui/material/IconButton';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Custom
import { GET_USERS } from "../app/queries";

const Users = () => {
  const [search,setSearch] = React.useState('n2')
  const {data, loading, error} = useQuery(GET_USERS);
  const [
    fetchUsers,
    {data: filteredUser, loading: filteredLoading, error: filteredError}
  ] = useLazyQuery(GET_USERS, {
    variables: {
      search: search,
      page: 1,
      limit: 20
    }
  })

  if (loading) return <CircularProgress color="secondary" />
if(filteredUser) console.log(filteredUser.getUsers)
  return (
    <React.Fragment>
      <Button onClick={fetchUsers}>Fetch</Button>
      <Box style={{padding:'0.5rem'}}>
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {data.getUsers.users.map((user, idx) => {
            return <GridItem fn={user} key={idx} title="Users"/>
          })}
          {filteredUser && filteredUser.getUsers.users.map((user, idx) => {
            return <GridItem fn={user} key={idx} title="Users"/>
          })}
        </Grid>
      </Box>
    </React.Fragment>
  )
}

export default Users

const GridItem = ({fn, title}) => {
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
                <pre>{JSON.stringify(fn, null, 2)}</pre>
              </CardContent>
            </Card>
          </Grid>
  )
}