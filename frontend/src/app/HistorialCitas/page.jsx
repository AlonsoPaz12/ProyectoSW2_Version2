

'use client';

import React, { useEffect, useState } from 'react';
import citasData from "@/data/citasMedicas.JSON";
import medicosData from "@/data/doctors.JSON";
import recetasData from "@/data/recetaMedica.JSON";
import styles from './page.module.css';
import SideNavBar from '@/components/SideNavBar/SideNavBar';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';
import { Modal, Button } from 'react-bootstrap';

const HistorialCitas = () => {
  const [citas, setCitas] = useState([]);
  const [recetaSeleccionada, setRecetaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const citasConMedicosYRecetas = citasData.map(cita => {
      const medico = medicosData.find(m => m.id === parseInt(cita.IDmedico));
      const receta = recetasData.find(r => r.citaId === cita.id);
      return {
        ...cita,
        medico: medico ? medico : { nombre: 'Médico no encontrado', especialidad: 'Desconocida' },
        receta: receta ? receta : null,
      };
    });

    setCitas(citasConMedicosYRecetas);
  }, []);

  const handleShowModal = (receta) => {
    setRecetaSeleccionada(receta);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setRecetaSeleccionada(null);
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#E7F6F1", height: "100vh", width: "100%" }}>
      <SideNavBar />
      <Box sx={{ flexDirection: "column", margin: "2em", width: "100%" }}>
      
        <h5 className={styles.titulo}>HISTORIAL DE CITAS</h5>
        <div className={styles.containerTabla}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Fecha</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Motivo</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Médico</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Especialidad</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Diagnóstico</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Observación</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Receta Médica</th>
              </tr>
            </thead>
            <tbody>
              {citas.map(cita => (
                <tr key={cita.id}>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{new Date(cita.fecha).toLocaleString()}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.motivo}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.medico.nombre}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.medico.especialidad}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.diagnostico}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.Observacion}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>
                    {cita.receta ? (
                      <Button variant="success" className={styles.botonReceta} onClick={() => handleShowModal(cita.receta)}>
                        Ver Receta
                      </Button>
                    ) : (
                      "No hay receta"
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Modal show={showModal} onHide={handleCloseModal} centered backdrop="static">
          <Modal.Header closeButton style={{ backgroundColor: '#00916e', color: '#fff', borderBottom: 'none' }}>
            <Modal.Title>Receta Médica</Modal.Title>
          </Modal.Header>
          <Modal.Body style={{ backgroundColor: '#ffffff', padding: '20px' }}>
            {recetaSeleccionada && (
              <>
                <div className={styles.observationSection}>
                  <h5 style={{ color: '#00916e', marginBottom: '10px' }}>Observación:</h5>
                  <p style={{ color: '#333333' }}>{recetaSeleccionada.observacion}</p>
                </div>
                <div className={styles.medicationSection}>
                  <h5 style={{ color: '#00916e', marginBottom: '10px' }}>Medicamentos:</h5>
                  <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {recetaSeleccionada.medicamento.map((med, index) => (
                      <li key={index} style={{ color: '#333333', marginBottom: '5px' }}>
                        {med.nombre} - {med.dosis}, {med.frecuencia}
                      </li>
                    ))}
                  </ul>
                </div>
              </>
            )}
          </Modal.Body>
          <Modal.Footer style={{ backgroundColor: '#f0f0f0', borderTop: 'none' }}>
            <Button variant="secondary" onClick={handleCloseModal} style={{ backgroundColor: '#00916e', borderColor: '#00916e', borderRadius: '20px', color: '#ffffff', transition: 'background-color 0.3s ease' }}>
              Cerrar
            </Button>
          </Modal.Footer>
        </Modal>
      </Box>
    </Box>
  );
};

export default HistorialCitas;