'use client';
import ImagenesAnalisis from '@/app/LabAnalisis/ImagenesAnalisis/ImagenesAnalisis';
import AddAnalysisModal from '@/components/AddAnalysisModal/AddAnalysisModal';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';
import SideNavBarDoctor from '@/components/SideNavBarDoctor/SideNavBarDoctor';
import ImpresionImagen from '../ImagenesMedicas/ImpresionImagen/ImpresionImagen';
import AddInforImagenes from '@/components/AddInforImagenes/AddInforImagenes';



const LabAnalisis = () => {
  const [showModal, setShowModal] = useState(false);
  const [showModalimg, setShowModalimg] = useState(false);
  const [impresion, setImpresion] = useState([]);
  const [analyses, setAnalyses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');//para buscar
  const [filterType, setFilterType] = useState('');// para filtrar mediante un select

  const handleShowModal = () => setShowModal(true);
  const handleShowModalimg = () => setShowModalimg(true);
  const handleCloseModal = () => setShowModal(false);
  const handleCloseModalimg = () => setShowModalimg(false);

  const handleSaveAnalysis = (newAnalyses) => {
    setAnalyses(newAnalyses);
  };

  const handleSaveImpresion = (newImpresion) => {
    setImpresion(newImpresion);
  };

  const handleDeleteAnalysis = (index) => {
    const updatedAnalyses = analyses.filter((_, i) => i !== index);
    setAnalyses(updatedAnalyses);
  };

  const handleDeleteImpresion = (index) => {
    const updatedImpresion = impresion.filter((_, i) => i !== index);
    setImpresion(updatedImpresion);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterTypeChange = (e) => {
    setFilterType(e.target.value);
  };

  //para poder buscar agrego aca ya sea nmbre o lo que sea
  const filteredAnalyses = analyses.filter((analysis) =>
    analysis.testName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testLasName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    analysis.testDate.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredImpresion = impresion.filter((imagenmed) =>
    imagenmed.NombrePaciente.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imagenmed.ExamTipo.toLowerCase().includes(searchTerm.toLowerCase()) ||
    imagenmed.ExamDate.toLowerCase().includes(searchTerm.toLowerCase())
);

  return (
    <Box className={styles.container}>
      <SideNavBarDoctor />
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
            <div className={styles.labelline}>Buscar por nombre de análisis o imagen medica</div>
          </div>
          <div>
          <select className={styles.select} value={filterType} onChange={handleFilterTypeChange}>
              <option value="">Todos</option>
              <option value="analisis">Análisis</option>
              <option value="imagenmedica">Imagen Médica</option>
            </select>
          </div>
          <div className={styles.cardbody}>
            {(!filterType || filterType === 'analisis') && filteredAnalyses.map((analysis, index) => (
              <ImagenesAnalisis
                key={index}
                analysis={analysis}
                onDelete={() => handleDeleteAnalysis(index)}
              />
            ))}

            {(!filterType || filterType === 'imagenmedica') && filteredImpresion.map((imagenmed, index) => (
              <ImpresionImagen
                key={index}
                analysis={imagenmed}
                onDelete={() => handleDeleteImpresion(index)}
              />
            ))}
          </div>
        </div>
        <div className={styles.footer}>
          <Button variant="dark" className={styles.agregarImagen} onClick={handleShowModal}>Agregar y Editar Análisis</Button>
          <Button variant="dark" className={styles.agregarBotonImg} onClick={handleShowModalimg}>Agregar Imagen Médica</Button>
        </div>

      <AddAnalysisModal
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={handleSaveAnalysis}
        initialAnalysisData={analyses}
      />

      <AddInforImagenes
        show={showModalimg}
        handleClose={handleCloseModalimg}
        handleSave={handleSaveImpresion}
        initialAnalysisData={impresion}
      />
      </Box>
    </Box>
  );
};

export default LabAnalisis;
