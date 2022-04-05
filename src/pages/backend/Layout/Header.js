import React, { useState, useRef, useEffect, memo } from "react";
import { Link, NavLink } from "react-router-dom";

// Material
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  Tooltip,
  MenuItem,
  Grid,
  Paper,
} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import CssBaseline from '@mui/material/CssBaseline';

const pages = [
  {name: 'Users', link: '/app/users'},
  {name: 'Courses', link: '/app/courses'},
  {name: 'Maps', link: '/app/maps'},
  {name: 'Blogs', link: '/app/blogs'},
  {name: 'Home', link: '/'},
];
const settings = [
  {name:'Profile', link: '/app/user/profile'}, 
  {name:'Account', link: '/app/user/profile'}, 
  {name:'Dashboard', link: '/app/user/profile'}, 
  {name:'Logout', link: '/app/user/profile'}
];

const Header = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  useEffect(() => {
    //console.log("Header.js->useEffect");
  }, []);

  return (
   <React.Fragment>
     <AppBar position="static" >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexWrap: 'nowrap', 
              flexDirection: 'row', alignContent: 'flex-start', justifyContent: 'space-between', alignItems: 'center' }}
          >
            <img src={window.location.origin + "/android-icon-48x48.png"} style={{margin:'0 10px'}} />
            GraphQL Demo
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map( (page, idx) => (
              <NavLink to={page.link} key={idx}>
                { ({ isActive }) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                    variant={isActive ? 'outlined' : 'text'} 
                  >
                    {page.name}
                  </Button>
                )}
                
              </NavLink>
              
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map( (page, idx) => (
              <NavLink to={page.link} key={idx} end>
                { ({ isActive }) =>(
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', color:'#333' }}
                    variant={isActive ? 'outlined' : 'text'} 
                  >
                    {page.name}
                  </Button>
                )}
              </NavLink>
              
            ))}
            </Menu>
          </Box>

          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            GraphQL Demo1
          </Typography>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting, idx) => (
                <NavLink to={setting.link} key={idx} end>
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                </NavLink>
                )
              )}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
   </React.Fragment>
  );
};

export default memo(Header);

function convertToSlug(Text)
{
    return Text
        .toLowerCase()
        .replace(/ /g,'-')
        .replace(/[^\w-]+/g,'')
        ;
}