import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from "./ImagenesCard.module.css";
import { FaHeartPulse } from "react-icons/fa6";

const ImagenesCard = (imagen, onDelete) => {
  const [showInfo, setShowInfo] = useState(false);
  
  const handleShowPage = () => setShowInfo(true);
  const closePageImage = () => setShowInfo(false);

  return (
    <div className={styles.containerImg}>
      <div className={styles.topcard}>
        <div>
          <li className={styles.MedicIcon}><FaHeartPulse size="2em"/></li>
        </div>
        <div>
          <div style={{display: 'flex'}}>
            <div style={{marginLeft: '12px'}}>
              <h6 style={{margin: '0'}}><b>Ecocardiograma</b></h6>
              <p className={styles.labellineCard}><b>Motivo de la prueba:</b> Evaluación de dolor torácico y dificultad respiratoria</p>
            </div> 
            <Button className={styles.botonImagenesCard} variant="success"><p>{imagen.testDateImg}</p></Button>  
          </div>
        </div>
      </div>
      <div className={styles.bottomcardImg}>
        <Button className={styles.botonImagenes} variant="success">Descargar</Button>
        <Button className={styles.botonImagenes} variant="success" onClick={handleShowPage}>Ver</Button>
        <Button className={styles.botonImagenesEliminar} variant="success" onClick={onDelete}>Eliminar</Button>
      </div>

      {showInfo && (
        <React.Fragment>
          <div className={styles.modalOverlay}></div>
          <div className={styles.modalContent}>
            <div>
              <h5>Visualización de mi imagen medica</h5>
              <p>Aquí podras revisar tu imagen medica y su respectivo análisis</p>
              <h6>Resultados:</h6>
              <div className={styles.tableContainer}>
                <table className={styles.resultsTable}>
                  <thead>
                    <tr>
                      <th>Información del paciente</th>
                      <th>Informacion del diagnostico</th>
                      <th>Hallazgos</th>
                      <th>Imagen</th>
                      <th>Doctor encargado</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{imagen.testNamePacient}</td>
                      <td>{imagen.diagnostico}</td>
                      <td>{imagen.hallazgos}</td>
                      <td>{imagen.rayox}</td>
                      <td>{imagen.infoDoc}</td>
                    </tr>
                  </tbody>
                </table>
                <Button variant="secondary" onClick={closePageImage}>Cerrar</Button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImagenesCard;