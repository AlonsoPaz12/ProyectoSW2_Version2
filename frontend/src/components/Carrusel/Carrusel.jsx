'use client';
import Carousel from 'react-bootstrap/Carousel';
import styles from './Carrusel.module.css';

const Carrusel = ({ images }) => {
  return (
    <Carousel className={styles.contenido}>
      {images.map((image, index) => (
        <Carousel.Item key={index} interval={3000}>
          <img src={image} className={`d-block ${styles.carouselImagen}`} alt={`Slide ${index + 1}`} />
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default Carrusel;
