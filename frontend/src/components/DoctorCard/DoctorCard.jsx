'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import styles from "./DoctorCard.module.css";
import { IoDocumentAttachSharp } from "react-icons/io5";

const DoctorCard = ({ doctor }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  
  return (
    <div className={styles.contenido}>
      <img className={styles.imagenDoctor} src={doctor.imageurl} />
      
      <div className={styles.informacion}>
        <div className={styles.datos}>
          <h5>{doctor.nombres}</h5>
          <p>{doctor.especialidad.nombre_especialidad}</p>
        </div>
        <div className={styles.icon}>
          <IoDocumentAttachSharp onClick={handleOpen} size="1.5em"/>
        </div>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={{justifyContent: 'center',
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 'fit-content',
        bgcolor: 'background.paper',
        border: '2px solid #00916E',
        textAlign: { xs: 'center', md: 'left' },
        boxShadow: 24,
        p: 4}}>
          <div className={styles.contenidoModal}>
            <div className={styles.contenidoDatosImportantes}>
              <img className={styles.imagenDoctorModal} src={doctor.imageurl}/>
              <div  className={styles.datosPersonales}>
                <Typography sx={{ color: '#00916E', fontWeight: "bold", fontSize:'1.5em', lineHeight: '25px'}}>
                `${doctor.nombres} ${doctor.apePaterno} ${doctor.apeMaterno}`
                </Typography>
                <Typography id="modal-modal-especialidad" sx={{ mt: 1 }}>
                  <span className={styles.subtitulo}>Especialidad:</span> {doctor.especialidad.nombre_especialidad}
                </Typography>
                <Typography id="modal-modal-cmp" sx={{ mt: 1 }}>
                  <span className={styles.subtitulo}>CMP:</span> {doctor.cmp}
                </Typography>
                <Typography id="modal-modal-educacion" sx={{ mt: 1 }}>
                  <span className={styles.subtitulo}>Centro Médico:</span> {doctor.centroMedico}
                </Typography>
                <Typography id="modal-modal-correo" sx={{ mt: 1 }}>
                  <span className={styles.subtitulo}>Correo:</span> {doctor.centroMedico}
                </Typography>
                <Typography id="modal-modal-celular" sx={{ mt: 1 }}>
                  <span className={styles.subtitulo}>Celular:</span> {doctor.centroMedico}
                </Typography>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default DoctorCard;