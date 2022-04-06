import React, { memo } from 'react'
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
} from '@mui/material'

import { useTheme, styled, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';

import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

// Custom
import PostsListIndexItem from './PostsListIndexItem';
import {GET_POSTS} from "../../app/queries";
import PostAdd from './PostAdd';

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

const CustomizedSearch = ({fn, setSearch, search, setPosts}) => {
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
    setPosts([])
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

const PostsListIndex = () => {

//console.log('PostsListIndex')

  const theme = useTheme();
  const [title, setTitle] = React.useState('Posts list')
  const [openDialog, setOpenDialog] = React.useState(false)
  const [search,setSearch] = React.useState(null)
  const [posts,setPosts] = React.useState([])
  //const {data, loading, error, refetch} = useQuery(GET_USERS);
  const [
    fetchFilteredPosts,
    {data, loading, error, refetch}
  ] = useLazyQuery(GET_POSTS)

  React.useEffect(() => {
//console.log('PostsListIndex --> data useEffect')
    if(!data) return
    setPosts(data.getPosts.posts)
  },[data])

  //////////////////// TEST
  React.useEffect(() => {
//console.log('PostsListIndex --> search useEffect')
  fetchFilteredPosts({variables:{
    search,
    page:1,
    limit:10
  }}).then((res) => {
//console.log('res', res)
    setPosts(res.data.getPosts.posts)
  })

    if(!search) return
//console.log('search added', search)
//refetch()
  },[search])
  ////////////////////

  

  if (loading) return <CircularProgress color="secondary" />
//  if (error) return `Error! ${error}`
//if(filteredUser) console.log(filteredUser.getUsers)
  return (
    <React.Fragment>
      <Box style={{padding:'0rem'}}>
         {/*<SearchAppBar 
          title={'Users list'} 
          fn={fetchFilteredPosts} 
          setSearch={setSearch}
          search={search}
          setPosts={setPosts}
          refetch={refetch}
        /> */}
        <Box sx={{ flexGrow: 1 }} style={{paddingBottom:'0.5rem'}}>
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
            <CustomizedSearch fn={fetchFilteredPosts} setSearch={setSearch} search={search} setPosts={setPosts} />
          </Toolbar>
        </AppBar>
      </Box>
        <Grid container spacing={{ sm: 1, md: 1 }} >
          {posts && posts.map((post, idx) => {
            return <PostsListIndexItem post={post} key={idx} title={post.title}/>
          })}
        </Grid>
        
      </Box>
      <PostAdd onClick={setOpenDialog} active={openDialog} refetch={refetch} setPosts={setPosts}/>
    </React.Fragment>
  )
}

export default memo(PostsListIndex)