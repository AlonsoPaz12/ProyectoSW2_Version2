import React, { useState } from 'react';
import { Menu, MenuItem, Typography, Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useNavigate } from 'react-router-dom';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate = useNavigate();

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }} onClick={handleMenuOpen}>
        <Avatar style={{ marginRight: 8 }} />
        <Typography variant="body1" style={{ fontWeight: 'bold', color: '#004225' }}>
          GIANELLA ARIANA CARRIÓN MENDOZA
        </Typography>
        <ArrowDropDownIcon style={{ color: '#004225' }} />
      </div>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        PaperProps={{
          style: {
            width: 300, // Ancho fijo del menú
          },
        }}
      >
        <MenuItem onClick={() => { handleMenuClose(); navigate(`/VisualizacionDePerfil`);}}>
          <Typography variant="body1" style={{ color: '#1a73e8', width: '100%' }}>Mi perfil</Typography>
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose()}} style={{ width: 200 }}> {/* Ancho fijo de las opciones del menú */}
          <Typography variant="body1" style={{ width: '100%' }}>Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;
