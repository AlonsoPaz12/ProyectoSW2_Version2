import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import styles from "./ImpresionImagen.module.css";
import { BiBong } from "react-icons/bi";

const ImpresionImagen = ({ analysis, onDelete }) => {
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
              <h6 style={{ margin: '0' }}><b>{analysis.NombrePaciente}</b> <b>{analysis.NombrePaciente}</b></h6>
              <p className={styles.labellineCard}><b>Tipo de prueba:</b> {analysis.ExamTipo} </p>
            </div>
            <Button className={styles.botonImagenesCard} variant="success"><p>{analysis.ExamDate}</p></Button>  
          </div>
        </div>
      </div>
      <div className={styles.bottomcardImg}>
        <Button className={styles.botonImagenes} variant="success" onClick={handleShowInfo}>Ver</Button>
        <Button className={styles.botonImagenesEliminar} variant="success" onClick={onDelete}>Eliminar</Button>
      </div>

      {showInfo && (
        <React.Fragment>
        <div className={styles.modalOverlay}></div>
        <div className={styles.modalContent}>
          <div>
            <h5>Ver Imagen Medica</h5>
            <p>Aqui puedes visualizar la informacion de tu imagen medica.</p>
            <h6>Resultados:</h6>
            <div className={styles.listContainer}>
              <ul className={styles.resultsList}>
                <li>
                  <strong>Parte del cuerpo:</strong> {analysis.ParteCuerpo}
                </li>
                <li>
                  <strong>Indicaciones:</strong> {analysis.indicaciones}
                </li>
                <li>
                  <strong>Estrcuturas anatomicas:</strong> {analysis.AnatomicasEstruc}
                </li>
                <li>
                  <strong>Notas del medico:</strong> {analysis.NotasMedic}
                </li>
                <li>
                    <strong>Nombre del Doctor:</strong> {analysis.NombreDoc}
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

export default ImpresionImagen;
