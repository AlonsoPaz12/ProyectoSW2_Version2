'use client';
<<<<<<< HEAD
import ImagenesAnalisis from '@/app/LabAnalisis/ImagenesAnalisis/ImagenesAnalisis';
=======

import React, { useState } from 'react';
import styles from './page.module.css';
import Button from 'react-bootstrap/Button';
import ImagenesCard from '@/components/ImagenesCard/ImagenesCard';
>>>>>>> bd87ca4439eb30f959fd3c947ac381691339772b
import AddInforImagenes from '@/components/AddInforImagenes/AddInforImagenes';
import LeftBar from '@/components/LeftBar/LeftBar';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Box from '@mui/material/Box';




const ImagenesMedicas = () => {
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

  //para poder buscar agrego aca ya sea nmbre o lo que sea
  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testLasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
<<<<<<< HEAD
    <Box className={styles.container}>
        <h5 style={{marginTop:'1em', marginBottom:'1em'}}><b>IMAGENES MEDICAS</b></h5>
        <div>
          <div className={styles.cardbody}>
            {filteredAnalyses.map((analysis, index) => (
              <ImpresionImagen
=======
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.cabecera}>
          <h5 style={{marginTop:'80px'}}><b>MIS IMÁGENES MÉDICAS</b></h5>
        </div>
        <div className={styles.cardlabel}>
            <input className={styles.inputlabal} type="text" required />
            <div className={styles.labelline}>Buscar por nombre de análisis</div>
          </div>
        <div className={styles.cardbody}>
            {imagen.map((imagen, index) => (
              <ImagenesCard
>>>>>>> bd87ca4439eb30f959fd3c947ac381691339772b
                key={index}
                analysis={analysis}
                onDelete={() => handleDeleteAnalysis(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <Button variant="dark" className={styles.agregarImagen} onClick={handleShowModal}>Agregar y Editar Imagen medica</Button>
        </div>

      <AddInforImagenes
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAnalysis}
        initialAnalysisData={analyses}
      />
      
    </Box>
  );
};

export default ImagenesMedicas;
