import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from "./ImagenesAnalisis.module.css";
import { BiBong } from "react-icons/bi";

const ImagenesAnalisis = ({ analysis, onDelete }) => {
  const [showInfo, setShowInfo] = useState(false);

  const handleShowInfo = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

  return (
    <div className={styles.containerImg}>
      <div className={styles.topcard}>
        <div>
          <li className={styles.MedicIcon}><BiBong size="2em" /></li>
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '12px' }}>
              <h6 style={{ margin: '0' }}><b>{analysis.testName}</b></h6>
              <p className={styles.labellineCard}><b>Motivo de la prueba:</b> Evaluación de dolor torácico y dificultad respiratoria</p>
            </div>
            <Button className={styles.botonImagenesCard} variant="success"><p>{analysis.testDate}</p></Button>  
          </div>
        </div>
      </div>
      <div className={styles.bottomcardImg}>
        <Button className={styles.botonImagenes} variant="success">Descargar</Button>
        <Button className={styles.botonImagenes} variant="success" onClick={handleShowInfo}>Ver</Button>
        <Button className={styles.botonImagenesEliminar} variant="success" onClick={onDelete}>Eliminar</Button>
      </div>

      {showInfo && (
        <React.Fragment>
          <div className={styles.modalOverlay}></div>
          <div className={styles.modalContent}>
            <div>
              <h5>Ver Análisis</h5>
              <p>Aquí puedes visualizar la información de los análisis.</p>
              <h6>Resultados:</h6>
              <div className={styles.tableContainer}>
                <table className={styles.resultsTable}>
                  <thead>
                    <tr>
                      <th>Prueba</th>
                      <th>Resultado</th>
                      <th>Rango Normal</th>
                      <th>Unidades</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>{analysis.testName}</td>
                      <td>{analysis.result}</td>
                      <td>{analysis.normalRange}</td>
                      <td>{analysis.unit}</td>
                    </tr>
                  </tbody>
                </table>
                <Button variant="secondary" onClick={handleCloseInfo}>Cerrar</Button>
              </div>
            </div>
          </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImagenesAnalisis;
