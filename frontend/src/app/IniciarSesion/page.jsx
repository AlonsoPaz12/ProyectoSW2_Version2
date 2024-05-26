'use client'

import React, { useState } from 'react';
import styles from './page.module.css';

const IniciarSesion = () =>{
    const [documento, setDocumento] = useState('');
    const [contrasena, setContrasena] = useState('');

    const handleDocumentoChange = (e) => {
        setDocumento(e.target.value);
    };

    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aquí puedes agregar la lógica para manejar el inicio de sesión
        console.log('Documento:', documento);
        console.log('Contraseña:', contrasena);
    };
    return (
        <div className={styles.container}>
        <div className={styles.loginBox}>
            <img
            width="60"
            height="50"
            src="/img/logo.png"
            />
            <div className={styles.logo}>MEDCONTROL+</div>
            <h2>¿Tienes una cuenta?</h2>
            <form onSubmit={handleSubmit}>
                <div className={styles.inputGroup}>
                    <input
                        type="text"
                        placeholder="Número de documento"
                        value={documento}
                        onChange={handleDocumentoChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.inputGroup}>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={contrasena}
                        onChange={handleContrasenaChange}
                        className={styles.input}
                    />
                </div>
                <div className={styles.link}>¿Olvidaste tu contraseña?</div>
                <button type="submit" className={styles.button}>Iniciar Sesión</button>
                <div className={styles.separator}>0</div>
                <button className={styles.buttonSecondary}><a href='/Registrarse'>Registrarse</a> </button>
            </form>
        </div>
    </div>
    )

}

export default IniciarSesion;