'use client';
import React, { useState } from 'react';
import styles from './page.module.css';
import LeftBar from '@/components/LeftBar/LeftBar';
import Button from 'react-bootstrap/Button';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ImagenesAnalisis from '@/components/ImagenesAnalisis/ImagenesAnalisis';
import AddAnalysisModal from '@/components/AddAnalysisModal/AddAnalysisModal';

const LabAnalisis = () => {
  const [showModal, setShowModal] = useState(false);
  const [analyses, setAnalyses] = useState([]);

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveAnalysis = (newAnalyses) => {
    setAnalyses(newAnalyses);
  };

  
  const handleDeleteAnalysis = (index) => {
    const updatedAnalyses = analyses.filter((_, i) => i !== index);
    setAnalyses(updatedAnalyses);
  };

  return (
    <div className={styles.container}>
      <LeftBar />
      <div className={styles.body}>
        <div className={styles.cabecera}>
          <h5 style={{ marginTop: '80px' }}><b>RESULTADOS DEL LABORATORIO</b></h5>
          <ProfileCard/>
        </div>
        <div>
          <div className={styles.cardlabel}>
            <input className={styles.inputlabal} type="text" required />
            <div className={styles.labelline}>Buscar por nombre de análisis</div>
          </div>
          <div className={styles.cardbody}>
            {analyses.map((analysis, index) => (
              <ImagenesAnalisis
                key={index}
                analysis={analysis}
                onDelete={() => handleDeleteAnalysis(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <Button variant="dark" className={styles.agregarImagen} onClick={handleShowModal}>Agregar y Editar Análisis</Button>
        </div>
      </div>
      <AddAnalysisModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAnalysis}
        initialAnalysisData={analyses}
      />
    </div>
  );
};

export default LabAnalisis;
