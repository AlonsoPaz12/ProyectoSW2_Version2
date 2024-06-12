'use client';

import React from 'react';
import styles from './page.module.css';

import Box from '@mui/material/Box';

import SideNavBarDoctor from '@/components/SideNavBarDoctor/SideNavBarDoctor';

const Calendario = () => {
  return (
    <Box sx={{display: "flex", backgroundColor:"#E7F6F1", height: "100vh", width: "100%"}}>
      <SideNavBarDoctor></SideNavBarDoctor>
      <Box sx={{flexDirection: "column", margin: "2em", width: "100%"}}>
        <div className={styles.container}>
            <h2>¡Página en construcción!</h2>
            <p>Estamos trabajando en esta página para mejorar tu experiencia. Vuelve pronto para ver los cambios.</p>
        </div>
      </Box>
    </Box>

  );
};

export default Calendario;
