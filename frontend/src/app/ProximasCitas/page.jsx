'use client';
// ProximasCitas.js
import React, { useEffect, useState } from 'react';
import ButtonFactory from '@/components/Button/ButtonFactory';
import styles from './page.module.css';
import ProxCitasCard from '@/components/ProxCitasCard/ProxCitasCard';
import Box from '@mui/material/Box';
import SideNavBar from '@/components/SideNavBar/SideNavBar';
import UserMenu from '@/components/UserMenu/UserMenu';
import Link from 'next/link';

const ProximasCitas = () => {
  const buttonFactory = new ButtonFactory();

  // Estado local para almacenar las citas
  const [citas, setCitas] = useState([]);

  // Al cargar el componente, recuperamos las citas del almacenamiento local
  useEffect(() => {
    const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
    setCitas(citasGuardadas);
  }, []);

  const eliminarCita = (index) => {
    const citasActualizadas = citas.filter((cita, i) => i !== index);
    localStorage.setItem('citas', JSON.stringify(citasActualizadas));
    setCitas(citasActualizadas);
  };

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
            {/* Mostrar las citas almacenadas */}
            {citas.map((cita, index) => (
              <ProxCitasCard key={index} cita={cita} onAnular={() => eliminarCita(index)} />
            ))}
          </div>
          <div className={styles.footer}>
            {/* Botón para ir a la segunda pantalla */}
            <Link href="/AgendarCitaElegirDoctor">
              {buttonFactory.createButton('style1', {
                texto: "Agendar Cita",
                page: "AgendarCitaElegirDoctor"
              })}
            </Link>
          </div>
        </div>
      </Box>
    </Box>
  );
};

export default ProximasCitas;