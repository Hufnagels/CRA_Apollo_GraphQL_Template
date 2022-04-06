import React, { useEffect, memo } from "react";
import { NavLink } from "react-router-dom";

// Material
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Button,

} from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

const pages = [
  {name: 'Home', link: '/'}, 
  {name: 'Blog', link: '/blog'},
  {name: 'Dashboard', link: '/app/'},
];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];

const Header = () => {

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
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
           <img src={window.location.origin + "/android-icon-48x48.png"} style={{margin:'0 10px'}} alt=""/>
            Don't think twice!
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map( (page, idx) => (
              <NavLink to={page.link} key={idx}>
                { ({ isActive }) => (
                  <Button
                    key={page.name}
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block', }}
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
                    sx={{ my: 2, display: 'block', color:'#333' }}
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
            Don't think twice!1
          </Typography>

          

          {/* <Box sx={{ flexGrow: 0 }}>
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
              {settings.map((setting) => (
                <MenuItem key={setting} onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">{setting}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box> */}
        </Toolbar>
      </Container>
    </AppBar>
   </React.Fragment>
  );
};

export default memo(Header);