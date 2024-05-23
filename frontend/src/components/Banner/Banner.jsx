'use client';
import React from 'react';
import styles from './Banner.module.css';

const Banner = ({pageTitle, parrafo, imagen}) => {
  return (
    <div className={styles.banner}>

        <div className={styles.texto}>
            <h1 className={styles.title}>{pageTitle}</h1>
            <p>{parrafo}</p>
        </div>

        <img
          alt=""
          src={imagen}
          className={styles.image}
        />
        
    </div>
  );
};

export default Banner;