'use client';
// AgendarCitaElegirDoctor.js
import React, { useState } from 'react';
import styles from './page.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";
import ChooseDoctorCard from '@/components/ChooseDoctorCard/ChooseDoctorCard';
import ButtonFactory from '@/components/Button/ButtonFactory';
import Link from 'next/link';

const AgendarCitaElegirDoctor = () => {
  const [selectedDoctorId, setSelectedDoctorId] = useState(null);
  const buttonFactory = new ButtonFactory();

  // Estado local para almacenar la cita actualmente en proceso de creación
  const [nuevaCita, setNuevaCita] = useState({ doctor: '', fecha: '', hora: '' });

  const handleSelectDoctor = (doctor) => {
    setSelectedDoctorId(doctor.id);
    // Al seleccionar un doctor, actualizamos la cita con el nombre del doctor seleccionado
    setNuevaCita({ ...nuevaCita, doctor: doctor.name });
  };

  const fakeDoctores = [
    { id: 1, name: 'Dr. John Doe', specialty: 'Cardiologist', cpm: 'CPM 47569' },
    { id: 2, name: 'Dr. Jane Smith', specialty: 'Dermatologist', cpm: 'CPM 38456' },
    { id: 3, name: 'Dr. Emily Johnson', specialty: 'Pediatrician', cpm: 'CPM 12345' },
    { id: 4, name: 'Dr. Michael Brown', specialty: 'Orthopedist', cpm: 'CPM 67890' },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.cabecera}>
        <div className={styles.Logo}>
          <img src='/img/logo.png' height='60' width='60' alt='Logo' />
          <span className={styles.nombreLogo}>MedControl+</span>
        </div>
        <button onClick={() => window.history.back()} style={{color: '#014433', display: 'flex', alignItems: 'center', background: 'none', border: 'none', cursor: 'pointer'}}>
          <RiArrowGoBackFill size={'30px'} style={{marginRight: '10px'}} />
          <p style={{margin: '0'}}><b> Regresar al inicio</b></p>
        </button>
      </div>
      <div className={styles.body}>
        <h3 style={{display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center'}}><b>AGENDAR CITA MÉDICA</b></h3>
        <h5 style={{paddingLeft: '90px', marginBottom: '20px'}}><b>Nuestros Médicos</b></h5>
        <div className={styles.DoctorCards}>  
          {/* Mostrar información falsa de los doctores */}
          {fakeDoctores.map(doctor => (
            <ChooseDoctorCard
              key={doctor.id}
              doctor={doctor}
              isSelected={doctor.id === selectedDoctorId}
              onSelect={handleSelectDoctor}
            />
          ))}
        </div>  
      </div>    
      <div className={styles.footer}>
        <Link href="/AgendarCitaElegirHorario">
          {buttonFactory.createButton('style3', {
            texto: "Continuar",
            page: "AgendarCitaElegirHorario",
          })}
        </Link>
      </div>
    </div>
  );
};

export default AgendarCitaElegirDoctor;