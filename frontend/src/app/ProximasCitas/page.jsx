'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import ProxCitasCard from '@/components/ProxCitasCard/ProxCitasCard';
import Button from 'react-bootstrap/Button';
import Box from '@mui/material/Box';
import SideNavBar from '@/components/SideNavBar/SideNavBar';
import UserMenu from '@/components/UserMenu/UserMenu';

const ProximasCitas = () => {

  return (
    <Box className={styles.container}>
      <SideNavBar></SideNavBar>
      <Box sx={{flexDirection: "column", margin: "2em", width: "100%"}}>
        <div className={styles.cabecera}>
          <UserMenu />
        </div>
        <h5 style={{marginTop:'1em', marginBottom:'1em'}}><b>MIS CITAS PROGRAMADAS</b></h5>
        <div className={styles.body}>
          <div className={styles.cardbody}>
            <ProxCitasCard/>
            <ProxCitasCard/>
            <ProxCitasCard/>
            <ProxCitasCard/>
            <ProxCitasCard/>
            <ProxCitasCard/>
          </div>
          <div className={styles.footer}>
            <Button variant="dark" className={styles.agregarCita}>Agendar Cita</Button>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ProximasCitas;
