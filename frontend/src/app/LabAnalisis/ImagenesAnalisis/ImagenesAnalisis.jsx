import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from "./ImagenesAnalisis.module.css";
import { BiBong } from "react-icons/bi";

const ImagenesAnalisis = ({ analysis, onDelete }) => {
  const [showInfo, setShowInfo] = useState(false);
  const [showImage, setShowImage] = useState(false);
  const [imageSrc, setImageSrc] = useState('');

  const handleShowInfo = () => setShowInfo(true);
  const handleCloseInfo = () => setShowInfo(false);

  const handleShowImage = (src) => {
    setImageSrc(src);
    setShowImage(true);
  };

  const handleCloseImage = () => setShowImage(false);

  return (
    <div className={styles.containerImg}>
      <div className={styles.topcard}>
        <div>
          <li className={styles.MedicIcon}><BiBong size="2em" /></li>
        </div>
        <div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginLeft: '12px' }}>
              <h6 style={{ margin: '0' }}><b>{analysis.testName}</b> <b>{analysis.testLasName}</b></h6>
              <p className={styles.labellineCard}><b>Motivo de la prueba:</b> {analysis.MotivoPrueba} </p>
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
            <div className={styles.listContainer}>
              <ul className={styles.resultsList}>
                <li>
                  <strong>Prueba:</strong> {analysis.MotivoPrueba}
                </li>
                <li>
                  <strong>Resultado:</strong> {analysis.result}
                </li>
                <li>
                  <strong>Rango Normal:</strong> {analysis.normalRange}
                </li>
                <li>
                  <strong>Unidades:</strong> {analysis.unit}
                </li>
                <li>
                  <strong>Imagen:</strong> 
                  {analysis.image ? (
                    <a href="#" onClick={() => handleShowImage(analysis.image)}>Ver Imagen</a>
                  ) : (
                    'No hay imagen disponible'
                  )}
                </li>
              </ul>
              <Button variant="secondary" onClick={handleCloseInfo}>Cerrar</Button>
            </div>
          </div>
        </div>
        </React.Fragment>
      )}

      {showImage && (
        <React.Fragment>
        <div className={styles.modalOverlay}></div>
        <div className={styles.modalContent}>
          <div>
            <h5>Imagen</h5>
            <img src={imageSrc} alt="Análisis" className={styles.imageModal} />
            <div className={styles.imageButtons}>
              <Button variant="secondary" onClick={handleCloseImage}>Cerrar</Button>
              <a href={imageSrc} download className={styles.downloadButton}>
                <Button variant="success">Descargar Imagen</Button>
              </a>
            </div>
          </div>
        </div>
        </React.Fragment>
      )}
    </div>
  );
};

export default ImagenesAnalisis;
