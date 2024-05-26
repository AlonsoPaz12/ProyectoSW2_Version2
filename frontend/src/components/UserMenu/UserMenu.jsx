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

  const handleNavigate = (path) => {
    router.push(path);
    handleMenuClose();
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
            minWidth: anchorEl ? anchorEl.clientWidth : undefined,
          },
        }}
      >
        <MenuItem onClick={() =>  handleNavigate('/VisualizacionPerfil')}>
          <Typography variant="body1" style={{ color: '#1a73e8' }}>Mi perfil</Typography>
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <Typography variant="body1">Cerrar sesión</Typography>
        </MenuItem>
      </Menu>
    </div>
  );
};

export default UserMenu;