import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';

import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import DirectionsIcon from '@mui/icons-material/Directions';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.black, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.black, 0.25),
    color:grey[800]
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
    color: grey[900],
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

const CustomizedSearch = ({fn, setSearch, setUsers}) => {
  const [searchString, setSearchString] = React.useState('')
  const searchFieldUpdate = (value) => {
    setSearchString(value)
    setSearch(value)
  }
  const sendFormData = (e) => {
    e.preventDefault()
    setUsers([])
    fn( {
      variables: {
        search: searchString,
        page: 1,
        limit: 20
      }
    })
    setSearchString('')
  }

  return (
    <Search>
      <Box component="form"
        sx={{ p: '2px 4px', display: 'flex', alignItems: 'stretch', justifyContent: 'space-between' }}
      >
        <StyledInputBase
          style={{color:grey[800]}}
          placeholder="Search"
          inputProps={{ 'aria-label': 'search' }}
          onChange={(e) => searchFieldUpdate(e.target.value)}
          value={searchString}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={ (e) => {sendFormData(e)}}>
          <SearchIcon color={grey[100]}  />
        </IconButton>
      </Box>
    </Search>
  )
}
export default function SearchAppBar({title, fn, setSearch, setUsers}) {
  return (
    <Box sx={{ flexGrow: 1 }} style={{paddingBottom:'0.5rem'}}>
      <AppBar position="static" style={{backgroundColor:'#FFFFFF'}}>
        <Toolbar variant="dense">
          {/* <IconButton
            size="large"
            edge="start"
            color="secondary"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="secondary"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            {title}
          </Typography>
          <CustomizedSearch fn={fn} setSearch={setSearch} setUsers={setUsers} />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
