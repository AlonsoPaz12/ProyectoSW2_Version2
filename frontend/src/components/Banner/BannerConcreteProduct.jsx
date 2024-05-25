// BannerConcreteProduct.jsx
import React from 'react';
import styles from './Banner.module.css';

export class BannerStyle1 extends React.Component {
  render() {
    const { pageTitle, parrafo, imagen } = this.props;
    return (
      <div className={`${styles.banner} ${styles.banner1}`}>
        <div className={`${styles.texto} ${styles.texto1}`}>
          <h1 className={styles.title}>{pageTitle}</h1>
          <p>{parrafo}</p>
        </div>
        <img alt="" src={imagen} className={styles.image} />
      </div>
    );
  }
}

export class BannerStyle2 extends React.Component {
  render() {
    const { pageTitle } = this.props;
    return (
      <div className={`${styles.banner} ${styles.banner2}`}>
          <div className={styles.texto}>
            <h1 className={`${styles.title} ${styles.title2}`}>{pageTitle}</h1>
        </div>
      </div>
    );
  }
}

export class BannerStyle3 extends React.Component {
  render() {
    const { titulo1, titulo2, parrafo1, parrafo2, imagen } = this.props;
    return (
      <div className={`${styles.banner} ${styles.banner3}`}>
        <div className={styles.imageContainer}>
        <img src={imagen} alt="Imagen del banner" className={styles.imagen} />
        </div>
        <div className={styles.textContainer}>
          <h2 className={styles.title}>{titulo1}</h2>
          <p className={styles.parrafo}>{parrafo1}</p>
          <h2 className={styles.title}>{titulo2}</h2>
          <p className={styles.parrafo}>{parrafo2}</p>
        </div>
      </div>
    );
  }
}