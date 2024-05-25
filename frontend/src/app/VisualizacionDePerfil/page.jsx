'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import xd from '../../../public/img/user-icon.jpg'
const VisualizacionDePerfil = () => {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton}>Regresar a inicio</button>
            </div>
            <div className={styles.profileContainer}>
                <div className={styles.leftSide}>
                    <img src="/img/user-icon.jpg" alt="Foto del paciente" className={styles.profilePicture} />
                    <div className={styles.profileInfo}>
                        <h2>Nombre del Paciente</h2>
                        <p>DNI: 12345678</p>
                        <p>Género: Masculino</p>
                        <p>Edad: 30</p>
                        <p>Email: paciente@example.com</p>
                        <p>Celular: +1234567890</p>
                    </div>
                </div>
                <div className={styles.rightSide}>
                    <ul className={styles.optionsList}>
                        <li>Editar datos de la cuenta</li>
                        <li>Notificaciones</li>
                        <li>Cambio de contraseña</li>
                        <li>Cerrar sesión</li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default VisualizacionDePerfil;