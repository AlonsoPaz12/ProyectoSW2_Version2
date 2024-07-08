
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

const ReprogramarCitaModal = ({ citaSeleccionada, onReprogramar, onClose }) => {
  const [nuevaFecha, setNuevaFecha] = useState(citaSeleccionada.fecha);
  const [nuevaHora, setNuevaHora] = useState(citaSeleccionada.hora);

  const handleReprogramar = async () => {
    try {
      await axios.patch(`http://localhost:3000/citas/3`, {
        fecha: nuevaFecha,
        hora: nuevaHora,
      });

      citaSeleccionada.fecha = nuevaFecha;
      citaSeleccionada.hora = nuevaHora;

      onReprogramar(citaSeleccionada);

      onClose(); 
    } catch (error) {
      console.error('Error al reprogramar la cita:', error);
   
    }
  };

  return (
    <Modal show={true} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reprogramar Cita</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formFecha">
            <Form.Label>Fecha de la cita:</Form.Label>
            <Form.Control
              type="date"
              value={nuevaFecha}
              onChange={(e) => setNuevaFecha(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="formHora">
            <Form.Label>Hora de la cita:</Form.Label>
            <Form.Control
              type="time"
              value={nuevaHora}
              onChange={(e) => setNuevaHora(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleReprogramar}>
          Reprogramar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReprogramarCitaModal;
