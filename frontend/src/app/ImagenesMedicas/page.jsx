'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import LeftBar from '@/components/LeftBar/LeftBar';
import Button from 'react-bootstrap/Button';
import ProfileCard from '@/components/ProfileCard/ProfileCard';
import ImagenesCard from '@/components/ImagenesCard/ImagenesCard';
import AddInforImagenes from '@/components/AddInforImagenes/AddInforImagenes';

const ImagenesMedicas = () => {
  const [showCard, setshowCard] = useState(false);
  const [imagen, setImagen] = useState([]);

  const viewPageImage = () => setshowCard(true);
  const closePageImage = () => setshowCard(false);

  const viewSaveImage = (NewImagen) => {
    setImagen(NewImagen);
  };

  const viewBorrarImage = (index) => {
    const updateImage = imagen.filter((_, i) => i !== index);
    setImagen(updateImage);
  };

  return (
    <div className={styles.container}>
      <LeftBar/>
      <div className={styles.body}>
        <div className={styles.cabecera}>
          <h5 style={{marginTop:'80px'}}><b>MIS IMÁGENES MÉDICAS</b></h5>
          <ProfileCard/>
        </div>
        <div className={styles.cardlabel}>
            <input className={styles.inputlabal} type="text" required />
            <div className={styles.labelline}>Buscar por nombre de análisis</div>
          </div>
        <div className={styles.cardbody}>
            {imagen.map((imagen, index) => (
              <ImagenesCard
                key={index}
                imagen={imagen}
                onDelete={() => viewBorrarImage(index)}
              />
            ))}
        </div>
        <div className={styles.footer}>
          <Button variant="dark" className={styles.agregarImagen} onClick={viewPageImage}>Agregar y Editar Diagnostico</Button>
        </div>
      </div>
      <AddInforImagenes
        show={showCard}
        closePage={closePageImage}
        viewSave={viewSaveImage}
        initialImageData={imagen}
      />
    </div>
  );
};

export default ImagenesMedicas;