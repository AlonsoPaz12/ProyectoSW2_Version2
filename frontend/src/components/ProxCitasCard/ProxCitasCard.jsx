import React, { useState } from 'react';

import styles from "./ProxCitasCard.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

import { FaHeart } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";

import ReprogramarCitaModal from '../ReprogramarCitaModal/ReprogramarCitaModal';

const ProxCitasCard = () => {

  const [favorito, setFavorito] = useState(false);
  const [showReprogramarModal, setShowReprogramarModal] = useState(false);
  const [showAnularModal, setShowAnularModal] = useState(false);

  const handleReprogramarClick = () => {
    setShowReprogramarModal(true);
  };

  const handleAnularClick = () => {
    setShowAnularModal(true);
  };

  const handleCloseReprogramarModal = () => {
    setShowReprogramarModal(false);
  };

  const handleCloseAnularModal = () => {
    setShowAnularModal(false);
  };

  const handleReprogramar = (fecha, hora) => {
    // Aquí iría la lógica para reprogramar la cita
    console.log('Reprogramando cita:', fecha, hora);
    setShowReprogramarModal(false); // Cierra el modal después de reprogramar la cita
  };

  const handleConfirmAnular = () => {
    // Aquí iría la lógica para anular la cita
    setShowAnularModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topcard}>
        <img src="https://i.ibb.co/b6SDFTN/01.jpg" alt="foto" height="80px" style={{borderRadius: "10px"}}/>
        <div>
          <div style={{display: 'flex'}}>
            <div style={{marginLeft: '12px'}}>
              <h6 style={{margin: '0'}}>Dr. Juan Romero</h6>
              <p style={{fontSize: '10px'}}>Cardiología</p>
            </div> 
            <FaHeart
              className={favorito ? styles.botonfavActive : styles.botonfav}
              onClick={() => setFavorito(!favorito)}
              style={{ marginTop: '10px', marginLeft: '50px' }}
            />   
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <CiCalendar size={'25'} color='#00916E' style={{marginLeft: '10px'}}/>
            <p style={{margin: '0', marginTop:'1px', fontSize: '12px', marginLeft: '4px'}}>23 Mar</p>
            <FaRegClock size={'20'} color='#00916E' style={{marginLeft: '80px'}}/>
            <p style={{margin: '0', marginTop:'1px', fontSize: '12px', marginLeft: '4px'}}>16:00</p>
          </div>
        </div>
      </div>
      <hr style={{marginBottom: '0'}} />
      <div className={styles.bottomcard}>
        <Button className={styles.botonReprogramar} variant="success" onClick={() => setShowReprogramarModal(true)}>Reprogramar</Button>
        <Button className={styles.botonAnular} variant="outline-danger" onClick={handleAnularClick}>Anular</Button>
      </div>

      {/* Modal de Reprogramar Cita */}
      {showReprogramarModal && (
        <ReprogramarCitaModal
          citaSeleccionada={{ fecha: '23/03/2024', hora: '16:00' }} // Puedes pasar la cita seleccionada como prop
          onReprogramar={handleReprogramar}
          onClose={() => setShowReprogramarModal(false)}
        />
      )}

      {/* Modal de anular cita */}
      <Modal show={showAnularModal} onHide={handleCloseAnularModal}>
        <Modal.Header closeButton>
          <Modal.Title>Anular cita</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Contenido del modal de anular cita */}
          <p>¿Está seguro de que desea anular esta cita?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAnularModal}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmAnular}>
            Anular
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ProxCitasCard;