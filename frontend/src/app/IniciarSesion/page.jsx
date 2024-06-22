'use client';

import React, { useState } from 'react';
import styles from './page.module.css';
import axios from 'axios';

const IniciarSesion = () => {
    const [correoElectronico, setcorreoElectronico] = useState('');
    const [contrasena, setContrasena] = useState('');
    const [error, setError] = useState('');

    const handlecorreoElectronicoChange = (e) => {
        setcorreoElectronico(e.target.value);
    };

    const handleContrasenaChange = (e) => {
        setContrasena(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Datos enviados:', JSON.stringify({ correoElectronico, contrasena }));
        axios.post('http://localhost:3000/auth/login', {
            correoElectronico: correoElectronico,
            contrasena: contrasena
        }).then(response => {
            console.log('Respuesta del servidor:', response.data);

            // Guardamos la información del usuario en localStorage
            localStorage.setItem('usuario', JSON.stringify(response.data));

            // Redirección según el tipo de usuario
            if (response.data.paciente) {
                window.location.href = '/ProximasCitas';
            } else if (response.data.medico) {
                window.location.href = '/ProximasCitasDoctor'; // Redirigir a la pantalla de médico
            } else {
                console.error('Tipo de usuario desconocido');
            }
        }).catch(error => {
            console.error('Error al iniciar sesión:', error);
        });

        console.log('correoElectronico:', correoElectronico);
        console.log('Contraseña:', contrasena);
    };

    return (
        <div className={styles.container}>
            <div className={styles.loginBox}>
                <img
                    width="60"
                    height="50"
                    src="/img/logo.png"
                    alt="Logo"
                />
                <div className={styles.logo}>MEDCONTROL+</div>
                <h2>¿Tienes una cuenta?</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            placeholder="Correo"
                            value={correoElectronico}
                            onChange={handlecorreoElectronicoChange}
                            className={styles.input}
                            name="correoElectronico" // Aseguramos que el name coincida con el valor que se espera en handleSubmit
                        />
                    </div>
                    <div className={styles.inputGroup}>
                        <input
                            type="password"
                            placeholder="Contraseña"
                            value={contrasena}
                            onChange={handleContrasenaChange}
                            className={styles.input}
                            name="contrasena" // Aseguramos que el name coincida con el valor que se espera en handleSubmit
                        />
                    </div>
                    <div className={styles.link}>¿Olvidaste tu contraseña?</div>
                    <button type="submit" className={styles.button}>Iniciar Sesión</button>
                    <div className={styles.separator}>0</div>
                    <button className={styles.buttonSecondary}><a href='/Registrarse'>Registrarse</a></button>
                </form>
            </div>
        </div>
    );
};

export default IniciarSesion;

/*

const usuario = JSON.parse(localStorage.getItem('usuario'));
Para acceder a la información de perfil mediante otras pantallas
Consideraciones adicionales:

Asegúrate de manejar la limpieza o eliminación de la información del usuario de localStorage cuando el usuario cierre sesión.
Ten en cuenta que localStorage tiene limitaciones en términos de seguridad y capacidad de almacenamiento. Considera si es la mejor opción dependiendo de los requisitos de tu aplicación.

*/ 