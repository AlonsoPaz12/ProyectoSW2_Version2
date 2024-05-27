'use client';
import ImpresionImagen from '@/app/ImagenesMedicas/ImpresionImagen/ImpresionImagen';
import AddInforImagenes from '@/components/AddInforImagenes/AddInforImagenes';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Box from '@mui/material/Box';


const ImagenesMedicas = () => {
  const [showModal, setShowModal] = useState(false);
  const [analyses, setAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleShowModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  const handleSaveAnalysis = (newAnalyses) => {
    setAnalyses(newAnalyses);
  };

  const handleDeleteAnalysis = (index) => {
    const updatedAnalyses = analyses.filter((_, i) => i !== index);
    setAnalyses(updatedAnalyses);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  //para poder buscar agrego aca ya sea nmbre o lo que sea
  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.NombrePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.ExamTipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.ExamDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={styles.container}>
      <Box sx={{flexDirection: "column", margin: "2em", width: "100%", height: "100vh"}}>
        <div className={styles.cabecera}>
        </div>
        <h5 style={{marginTop:'1em', marginBottom:'1em'}}><b>RESULTADOS DEL LABORATORIO</b></h5>
        <div>
          <div className={styles.cardlabel}>
          <input
              className={styles.inputlabal}
              type="text"
              value={searchTerm}
              onChange={handleSearchChange}
              required
            />
            <div className={styles.labelline}>Buscar por nombre de análisis</div>
          </div>
          <div className={styles.cardbody}>
            {filteredAnalyses.map((analysis, index) => (
              <ImpresionImagen
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

      <AddInforImagenes
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAnalysis}
        initialAnalysisData={analyses}
      />
      </Box>
    </Box>
  );
};

export default ImagenesMedicas;
