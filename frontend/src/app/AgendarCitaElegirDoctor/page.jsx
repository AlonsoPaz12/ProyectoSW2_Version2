'use client';

import React from 'react';
import styles from './page.module.css';
import { RiArrowGoBackFill, RiSkipRightLine } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import SearchBar from "./../../components/SearchBar/SearchBar.jsx";
import ChooseDoctorCard from '@/components/ChooseDoctorCard/ChooseDoctorCard';

const AgendarCitaEDoctores = () => { 
  return (
    <div className={styles.container}>
      <div className={styles.cabecera}>
        <div className={styles.Logo}>
          <img src='/img/logo.png' height='60' width='60' alt='Logo' />
          <span className={styles.nombreLogo}>MedControl+</span>
        </div>
        <a href="" style={{color: '#014433', display: 'flex', alignItems: 'center'}}>
          <RiArrowGoBackFill size={'30px'} style={{marginRight: '10px'}} />
          <p style={{margin: '0'}}><b> Regresar al inicio</b></p>
        </a>
      </div>
      <div className={styles.body}>
        <h3 style={{display: 'flex', justifyContent: 'center', height: '100px', alignItems: 'center'}}><b>AGENDAR CITA MÉDICA</b></h3>
        <h5 style={{paddingLeft: '90px', marginBottom: '20px'}}><b>Nuestros Médicos</b></h5>
        <div style={{display: 'flex', justifyContent: 'center', paddingRight: '90px', paddingLeft: '90px'}}>
          <SearchBar/>
        </div>
        <div className={styles.DoctorCards}>  
          <ChooseDoctorCard/>
          <ChooseDoctorCard/>
          <ChooseDoctorCard/>
          <ChooseDoctorCard/>
          {/* Agrega más ChooseDoctorCard aquí */}
        </div>  
      </div>    
      <div className={styles.footer}>
        <Button variant="secondary" style={{borderRadius: '10px', width: '250px'}}> 
          <RiArrowGoBackFill/> Regresar
        </Button>
        <div style={{height: '5px', width: '50px'}}></div>
        <Button variant="dark" style={{borderRadius: '10px', width: '250px'}}>
          Continuar <RiSkipRightLine size={'22'}/> 
        </Button>
      </div>
    </div>
  );
};

export default AgendarCitaEDoctores;
