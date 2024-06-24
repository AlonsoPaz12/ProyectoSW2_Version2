'use client';
// AgendarCitaElegirHorario.js
import React, { useState } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from './page.module.css';
import { RiArrowGoBackFill } from "react-icons/ri";
import ButtonFactory from '@/components/Button/ButtonFactory';
import { Button } from 'react-bootstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const AgendarCitaElegirHorario = () => {
  const buttonFactory = new ButtonFactory();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  // Función para almacenar la cita en el almacenamiento local
  const handleSaveCita = () => {
    if (selectedDate && selectedTime) {
      const nuevaCita = { fecha: selectedDate, hora: selectedTime };
      const citasGuardadas = JSON.parse(localStorage.getItem('citas')) || [];
      localStorage.setItem('citas', JSON.stringify([...citasGuardadas, nuevaCita]));
      setSelectedDate(null);
      setSelectedTime(null);
    } else {
      alert('Por favor, seleccione una fecha y hora antes de continuar.');
    }
  };

  const router = useRouter()

  const availableTimes = ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM', '4:00 PM'];

  return (
    <div className={styles.container}>
      <div className={styles.cabecera}>
        <div className={styles.Logo}>
          <img src='/img/logo.png' height='60' width='60' alt="Logo"></img>
          <span className={styles.nombreLogo}>MedControl+</span>
        </div>
        <Link href="/" style={{color: '#014433', display: 'flex', alignItems: 'center'}}>
            <RiArrowGoBackFill size={'30px'} style={{marginRight: '10px'}} />
            <p style={{margin: '0'}}><b> Regresar al inicio</b></p>
        </Link>
      </div>
      <div className={styles.body}>

        <h2>Elija una fecha:</h2>
        <DatePicker
          selected={selectedDate}
          onChange={date => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
          minDate={new Date()}
          placeholderText="Seleccione una fecha"
          className={styles.datePicker}
        />
        {selectedDate && (
          <>
            <h2>Elija un horario disponible:</h2>
            <div className={styles.availableTimes}>
              {availableTimes.map((time, index) => (
                <button
                  key={index}
                  className={`${styles.timeButton} ${selectedTime === time ? styles.selectedTime : ''}`}
                  onClick={() => setSelectedTime(time)}
                >
                  {time}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
      <div className={styles.footer}>
        {buttonFactory.createButton('style2', {
          texto: "Regresar",
        })}

        <div style={{height: '5px', width: '50px'}}></div>
          <Button onClick={() => { handleSaveCita(); router.push("/ProximasCitas");}} variant="dark" style={{borderRadius: '10px', width: '250px'}}>
            Guardar Cita
          </Button>
        </div>
    </div>
  );
};

export default AgendarCitaElegirHorario;
