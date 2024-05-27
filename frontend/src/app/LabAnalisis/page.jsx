'use client';
import ImagenesAnalisis from '@/app/LabAnalisis/ImagenesAnalisis/ImagenesAnalisis';
import AddAnalysisModal from '@/components/AddAnalysisModal/AddAnalysisModal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';
import SideNavBar from '@/components/SideNavBar/SideNavBar';



const LabAnalisis = () => {
  const [showModal, setShowModal] = useState(false);
  const [analyses, setAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');//para buscar

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
    analysis.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testLasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Box className={styles.container}>
      <SideNavBar></SideNavBar>
      <Box sx={{flexDirection: "column", margin: "2em", width: "100%", height: "100vh"}}>
        <div className={styles.cabecera}>
          <UserMenu />
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

      <AddAnalysisModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAnalysis}
        initialAnalysisData={analyses}
      />
      </Box>
    </Box>
  );
};

export default LabAnalisis;
