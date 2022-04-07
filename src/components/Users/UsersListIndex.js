import React, { memo } from 'react'
import PropTypes from 'prop-types';
import {
  useQuery,
  useLazyQuery,
} from "@apollo/client";

// Material
import {
  Box,
  Grid,
  CircularProgress,
  AppBar,
  Toolbar,
  InputBase,
  Typography,
  Button,
  IconButton,
  Pagination,
  Stack,
  useScrollTrigger,
  FormControl,
  Select,
  InputLabel,
  MenuItem
} from '@mui/material'

import { useTheme, styled, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// Custom
import UsersListIndexItem from './UsersListIndexItem';
import SearchAppBar from './SearchAppBar';
import {GET_USERS} from "../../app/queries";
import UserAdd from './UserAdd';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    color:theme.palette.custom.light
  },
  margin: theme.spacing(1, 1, 1, 0),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  '.MuiInputBase-root': {
    width:'100%'
  },
  '& .MuiInputBase-input': {
    padding: theme.spacing(1),
    // vertical padding + font size from searchIcon
    //paddingLeft: `calc( ${theme.spacing(2)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    color: theme.palette.custom.light,
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const CustomizedSearch = ({fn, setSearch, search, setUsers}) => {
// let search =console.log('CustomizedSearch')
  const [searchString, setSearchString] = React.useState(search)

  const searchFieldUpdate = (e) => {
    e.preventDefault()
    const search = e.target.value === '' ? null : e.target.value
    setSearchString(e.target.value)
    //setSearch(e.target.value)
  }

  const sendSearchData = (e) => {
//console.log('sendSearchData')
    e.preventDefault()
    setUsers([])
    fn( {
      variables: {
        search: searchString,
        page: 1,
        limit: 20
      }
    })
    //setSearchString(null)
  }

  const checkKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendSearchData(e)
    }
  }
  return (
      <Search>
        <Box 
          sx={{ p: '2px 4px', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}
        >
          <StyledInputBase
            style={{color:grey[800]}}
            placeholder="Search"
            inputProps={{ 'aria-label': 'search' }}
            onChange={(e) => searchFieldUpdate(e)}
            onKeyPress={(e) =>{checkKeyPress(e)}}
            value={searchString === null ? '' : searchString}
          />
          <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={ (e) => {sendSearchData(e)}}>
            <SearchIcon color="custom"  />
          </IconButton>
        </Box>
      </Search>
  )
}

const ElevationScroll = (props) => {
  const { children, window } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

ElevationScroll.propTypes = {
  children: PropTypes.element.isRequired,
  /**
   * Injected by the documentation to work in an iframe.
   * You won't need it on your project.
   */
  window: PropTypes.func,
};

const UsersListIndex = (props) => {

//console.log('UsersListIndex')

  const theme = useTheme();
  const [title, setTitle] = React.useState('Users list')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [search,setSearch] = React.useState(null)

  const [users,setUsers] = React.useState([])
  const [page, setPage] = React.useState(1);
  const [totalpage, setTotalPage] = React.useState(1)
  const handlePageChange = (event, value) => {
    setPage(value);
  };
  const [perpage, setPerpage] = React.useState(10)
  //const {data, loading, error, refetch} = useQuery(GET_USERS);
  const [
    fetchFilteredUsers,
    {data, loading, error, refetch}
  ] = useLazyQuery(GET_USERS)

  React.useEffect(() => {
//console.log('UsersListIndex --> data useEffect')
    if(!data) return
    setUsers(data.getUsers.users)
    setTotalPage(data.getUsers.totalPages)
    //console.log('UsersListIndex --> data useEffect', data)
  },[data])

  //////////////////// TEST
  React.useEffect(() => {
//console.log('UsersListIndex --> search useEffect')
    if( page > perpage ) setPage(perpage)
  fetchFilteredUsers({variables:{
    search,
    page:page,
    limit:perpage
  }}).then((res) => {
    //console.log('res', res)
    setUsers(res.data.getUsers.users)
  })
    if(!search) return
//console.log('search added', search)
//refetch()
  },[search, page, perpage])
  ////////////////////

  

  if (loading) return <CircularProgress color="secondary" />
//  if (error) return `Error! ${error}`
//if(filteredUser) console.log(filteredUser.getUsers)
  return (
    <React.Fragment>
      <Box style={{padding:'0rem'}}>

        <Box sx={{ flexGrow: 1 }} style={{paddingBottom:'0.5rem'}}>
          <Toolbar />
          <ElevationScroll {...props}>
            <AppBar position="static" style={{backgroundColor: theme.palette.custom.dark}}>
              <Toolbar disableGutters variant="dense">
                <Box sx={{ m:1, display: { xs: 'flex', md: 'block' } }}>
                  <Button 
                    variant="contained" 
                    color="primary" 
                    endIcon={<AddIcon />}
                    onClick={ (e) => { setOpenDialog(true) } }
                  >Add</Button>
                </Box>
                <Box sx={{m:1, flexGrow: 1}} >
                  <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    color="custom.light"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                  >
                    {title}
                  </Typography>
                </Box>
                <Pagination count={totalpage} page={page} onChange={handlePageChange} color="custom"/>
                <FormControl sx={{ m: 1, minWidth: 80, color: theme.palette.custom.light}} variant="standard">
                  <InputLabel id="demo-simple-select-autowidth-label">Age</InputLabel>
                  <Select
                    labelId="demo-simple-select-autowidth-label"
                    id="demo-simple-select-autowidth"
                    value={perpage}
                    onChange={(event) => setPerpage(event.target.value)}
                    autoWidth
                    label="perpage"
                    size="small"
                  >
                    {[10,20,50,100].map((v) => <MenuItem value={v} color="custom.light">{v}</MenuItem>)}
                  </Select>
                </FormControl>
                <CustomizedSearch fn={fetchFilteredUsers} setSearch={setSearch} search={search} setUsers={setUsers} />
              </Toolbar>
            </AppBar>
          </ElevationScroll>
        </Box>
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {users && users.map((user, idx) => {
            return <UsersListIndexItem fn={user} key={idx} title={user.username}/>
          })}
          {/* {filteredUser && filteredUser.getUsers.users.map((user, idx) => {
            return <UsersListIndexItem fn={user} key={idx} title="Users"/>
          })} */}
        </Grid>
        <Box>
        <Stack spacing={2}>
      <Typography>Page: {page}</Typography>
      <Pagination count={totalpage} page={page} onChange={handlePageChange} />
    </Stack>
        </Box>
      </Box>
      <UserAdd onClick={setOpenDialog} active={openDialog} refetch={refetch} setUsers={setUsers}/>
    </React.Fragment>
  )
}

export default memo(UsersListIndex)