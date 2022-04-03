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
  CircularProgress,
  IconButton,
} from '@mui/material'
import { red } from '@mui/material/colors';
import MoreVertIcon from '@mui/icons-material/MoreVert';

// Custom
import SearchAppBar from './SearchAppBar';
import {GET_USERS} from "../../app/queries";

const UsersListIndex = () => {
  
  const [search,setSearch] = React.useState('')
  const [users,setUsers] = React.useState([])
  const {data, loading, error} = useQuery(GET_USERS);
  const [
    fetchUsers,
    {data: filteredUser, loading: filteredLoading, error: filteredError}
  ] = useLazyQuery(GET_USERS)

  //////////////////// TEST
  React.useEffect(() => {
    if(!search) return
console.log(search)
  },[search])
  ////////////////////

  React.useEffect(() => {
    if(!data) return
    setUsers(data.getUsers.users)
  },[data])

  if (loading) return <CircularProgress color="secondary" />
//if(filteredUser) console.log(filteredUser.getUsers)
  return (
    <React.Fragment>
      
      <Box style={{padding:'0.5rem'}}>
        <SearchAppBar 
          title={'Users list'} 
          fn={fetchUsers} 
          setSearch={setSearch} 
          setUsers={setUsers}
        />
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {users && users.map((user, idx) => {
            return <UserGridItem fn={user} key={idx} title="Users"/>
          })}
          {filteredUser && filteredUser.getUsers.users.map((user, idx) => {
            return <UserGridItem fn={user} key={idx} title="Users"/>
          })}
        </Grid>
        
      </Box>
    </React.Fragment>
  )
}

export default UsersListIndex

const UserGridItem = ({fn, title}) => {
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