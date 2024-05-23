'use client';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import HealingOutlinedIcon from '@mui/icons-material/HealingOutlined';
import { FaUser, FaPhoneAlt, FaMapMarkerAlt } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import Link from 'next/link';

const pages = ['Nosotros', 'Especialidades', 'Doctores'];
const settings = ['Iniciar Sesión', 'Registtrarse'];

function ResponsiveAppBar() {
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

  return (
    <div>
      <AppBar position="static">
        <Container maxWidth="100vh"  sx={{ fontSize:'0.9em', color: '#00916E', backgroundColor: 'white',  display: { xs: 'none', md: 'flex' }, justifyContent: 'space-around' }}>
          <span><FaPhoneAlt /> Teléfono: (123) 456-7890</span>
          <span><MdEmail /> info@medcontrol.com</span>
          <span><FaMapMarkerAlt /> Dirección: Avenida Principal 123, Lima, Perú</span>  
        </Container>

        <Container maxWidth="100vh"  sx={{ backgroundColor: '#00916E', height: '4.3rem' }}>
          <Toolbar disableGutters>
            <HealingOutlinedIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '2rem' }} />
            <Typography
              variant="h4"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'Staatliches, sans-serif',
                fontWeight: 700,
                color: 'inherit',
                textDecoration: 'none',
                fontSize:'2em'
              }}
            >
              MedControl+
            </Typography>

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
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <Link key={page} href={`/${page}`} passHref>
                    <MenuItem key={page} onClick={handleCloseNavMenu} sx={{ color: '#00916E'}}>
                      <Typography textAlign="center">{page}</Typography>
                    </MenuItem>
                  </Link>                
                ))}
              </Menu>
            </Box>
            <HealingOutlinedIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'Staatliches, sans-serif',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                fontSize:'1.5em'
              }}
            >
              MC+
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => (
                <Link key={page} href={`/${page}`} passHref>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block'}}
                  >
                    {page}
                  </Button>
              </Link>
              ))}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Abrir detalles">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar sx={{ bgcolor: '#5ED2B7' }}>
                  <FaUser />
                </Avatar>
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
                    <Typography sx={{ color: '#00916E'}} textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </div>
    
  );
}
export default ResponsiveAppBar;