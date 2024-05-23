'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import LeftBar from '@/components/LeftBar/LeftBar';
import ProxCitasCard from '@/components/ProxCitasCard/ProxCitasCard';
import Button from 'react-bootstrap/Button';
import ProfileCard from '@/components/ProfileCard/ProfileCard';

const ProximasCitas = () => {

  return (
    <div className={styles.container}>
      <LeftBar/>
      <div className={styles.body}>
        <div className={styles.cabecera}>
          <h5 style={{marginTop:'80px'}}><b>MIS CITAS PROGRAMADAS</b></h5>
          <ProfileCard/>
        </div>
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
    </div>
  );
};

export default ProximasCitas;
