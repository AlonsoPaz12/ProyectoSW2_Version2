import React from 'react';
import styles from "./LeftBarButton.module.css";

const LeftBarButton = ({texto, componente}) => {
  return (
    <div className={styles.container}>
        {componente}
        <div style={{height: '100%', width: '10px'}}></div> {/*Espacio entre el logo y el texto*/} 
        <span>{texto}</span>
    </div>
  );
};

export default LeftBarButton;