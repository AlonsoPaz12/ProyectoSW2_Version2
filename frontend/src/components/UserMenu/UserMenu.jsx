import React, { useEffect, useState } from 'react';
import { Menu, MenuItem, Typography, Avatar } from '@mui/material';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useRouter } from 'next/navigation';

const UserMenu = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const router = useRouter()
  const [usuario, setUsuario] = useState(null); // Estado para almacenar el usuario
  const [tipoUsuario, setTipoUsuario] = useState(null);

  useEffect(()=>{
    const storedUser = JSON.parse(localStorage.getItem('usuario'));
    if (storedUser.medico) {
        setUsuario(storedUser.medico);
        setTipoUsuario('medico');
    }else{
        setUsuario(storedUser.paciente);
        setTipoUsuario('paciente')
    }

},[])


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
          {usuario ? 
            tipoUsuario === 'paciente' || tipoUsuario === 'medico' ? 
              `${usuario.nombres} ${usuario.apePaterno} ${usuario.apeMaterno}` : 
              usuario.nombre
            : 'Nombre de Usuario'}
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
        <MenuItem onClick={() => { handleMenuClose(); router.push(`/VisualizacionDePerfil`);}}>
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
