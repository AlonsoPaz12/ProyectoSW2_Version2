'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";
import Button from 'react-bootstrap/Button';
import { RiSkipRightLine } from "react-icons/ri";

const AgendarCitaEDoctores = () => {
  

  return (
    <div className={styles.container}>
      <div className={styles.cabecera}>
        <div className={styles.Logo}>
          <img src='/img/logo.png' height='60' width='60'></img>
          <span className={styles.nombreLogo}>MedControl+</span>
        </div>
        <a href="" style={{color: '#014433', display: 'flex', alignItems: 'center'}}>
          <RiArrowGoBackFill size={'30px'} style={{marginRight: '10px'}} />
          <p style={{margin: '0'}}><b> Regresar al inicio</b></p>
        </a>
      </div>
      <div className={styles.body}>
        {/*Contenido aca*/}
      </div>
      <div className={styles.footer}>
        <Button variant="secondary" style={{borderRadius: '10px', width: '250px'}}> 
          <RiArrowGoBackFill/> Regresar
        </Button>
        <div style={{height: '5px', width: '50px'}}></div>
        <Button variant="success" style={{borderRadius: '10px', width: '250px', backgroundColor: '#00916E', borderColor: '#00916E'}}>
          Agendar <RiSkipRightLine size={'22'}/> 
        </Button>
      </div>
    </div>
  );
};

export default AgendarCitaEDoctores;
