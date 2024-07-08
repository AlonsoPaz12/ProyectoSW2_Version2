import React, { useState, useEffect } from 'react';
import styles from "./ProxCitasCard.module.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";
import axios from 'axios';
import ReprogramarCitaModal from '../ReprogramarCitaModal/ReprogramarCitaModal'; // Ajusta la ruta según la estructura de tu proyecto

// Función para formatear fechas
const formatDate = (dateString) => {
  if (!dateString) return 'Fecha no disponible'; // Maneja el caso de fecha no definida

  const date = new Date(dateString);
  if (isNaN(date.getTime())) return 'Fecha inválida'; // Maneja el caso de fecha no válida

  return date.toLocaleDateString(); // Formatea la fecha válida como desees
};

const ProxCitasCard = ({ cita, onAnular }) => {
  const [showReprogramarModal, setShowReprogramarModal] = useState(false);
  const [showAnularModal, setShowAnularModal] = useState(false);
  const [pacienteInfo, setPacienteInfo] = useState(null);
  const [citaSeleccionada, setCitaSeleccionada] = useState(null); // Estado para la cita seleccionada

  useEffect(() => {
    obtenerInformacionPaciente();
  }, []);

  const obtenerInformacionPaciente = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/citas/con-paciente/3`);
      if (response.data.length > 0) {
        setPacienteInfo(response.data[0]); // Asumiendo que solo quieres el primer resultado si hay más de uno
      }
    } catch (error) {
      console.error('Error al obtener la información del paciente:', error);
      setPacienteInfo(null); // Maneja el estado del paciente en caso de error
    }
  };

  const handleReprogramarClick = () => {
    setCitaSeleccionada(cita); // Establece la cita seleccionada para reprogramar
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
    console.log('Reprogramando cita:', fecha, hora);
    // Aquí deberías implementar la lógica para actualizar la cita en tu backend
    setShowReprogramarModal(false); // Cierra el modal después de reprogramar la cita
  };

  const handleConfirmAnular = () => {
    // Llama a la función de anular cita pasada por prop
    onAnular();
    setShowAnularModal(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.topcard}>
        {pacienteInfo && (
          <img src={pacienteInfo.imageurl} alt="foto" height="80px" style={{ borderRadius: "10px" }} />
        )}
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '12px' }}>
              {pacienteInfo && (
                <>
                  <h6 style={{ margin: '0' }}>{pacienteInfo.nombres}</h6>
                  <p style={{ fontSize: '10px' }}>Paciente</p>
                </>
              )}
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <CiCalendar size={'25'} color='#00916E' style={{ marginLeft: '10px' }} />
            <p style={{ margin: '0', marginTop: '1px', fontSize: '12px', marginLeft: '4px' }}>
              {pacienteInfo && pacienteInfo.fecha ? formatDate(pacienteInfo.fecha) : 'Fecha no disponible'}
            </p>
            <FaRegClock size={'20'} color='#00916E' style={{ marginLeft: '80px' }} />
            <p style={{ margin: '0', marginTop: '1px', fontSize: '12px', marginLeft: '4px' }}>
              {pacienteInfo && pacienteInfo.hora ? pacienteInfo.hora : 'Hora no disponible'}
            </p>
          </div>
        </div>
      </div>
      <hr style={{ marginBottom: '0' }} />
      <div className={styles.bottomcard}>
        <Button className={styles.botonReprogramar} variant="success" onClick={handleReprogramarClick}>Reprogramar</Button>
        <Button className={styles.botonAnular} variant="outline-danger" onClick={handleAnularClick}>Anular</Button>
      </div>

      {/* Modal de Reprogramar Cita */}
      {showReprogramarModal && (
        <ReprogramarCitaModal
          citaSeleccionada={citaSeleccionada} // Pasa la cita seleccionada al modal
          onReprogramar={handleReprogramar}
          onClose={handleCloseReprogramarModal}
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

