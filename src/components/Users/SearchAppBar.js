import * as React from 'react';

// Material is
import { useTheme, styled, alpha } from '@mui/material/styles';
import { grey } from '@mui/material/colors';
import {
  AppBar,
  Box,
  Toolbar,
  InputBase,
  Typography,
  Grid,
  Button,
  IconButton,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';

import UserAdd from './UserAdd';


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

  const searchFieldUpdate = (e) => { 
    setSearchString(e.target.value)
    setSearch(e.target.value)
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

  const checkKeyPress = (e) => {
    if (e.key === 'Enter') {
      sendFormData(e)
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
  const theme = useTheme();
  const [openDialog, setOpenDialog] = React.useState(false)

  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }} style={{paddingBottom:'0.5rem'}}>
        <AppBar position="static" style={{backgroundColor: theme.palette.custom.light}}>
          <Toolbar disableGutters variant="dense">
            <Box sx={{ m:1, display: { xs: 'flex', md: 'block' } }}>
              <Button 
                variant="contained" 
                color="secondary" 
                endIcon={<AddIcon />}
                onClick={ (e) => { setOpenDialog(true) } }
              >Add</Button>
            </Box>
            <Box sx={{m:1, flexGrow: 1}} >
              <Typography
                variant="h6"
                noWrap
                component="div"
                color="secondary"
                sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
              >
                {title}
              </Typography>
            </Box>  

            {/* <IconButton
              size="large"
              edge="start"
              color="secondary"
              aria-label="open drawer"
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton> */}

            <CustomizedSearch fn={fn} setSearch={setSearch} setUsers={setUsers} />
          </Toolbar>
        </AppBar>
      </Box>
      <UserAdd onClick={setOpenDialog} active={openDialog} />
    </React.Fragment>
    
  );
}