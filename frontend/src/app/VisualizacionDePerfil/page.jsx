'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const VisualizacionDePerfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);

    useEffect(()=>{
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser.medico) {
            setUsuario(storedUser.medico);
            setTipoUsuario('medico');
        }else{
            setUsuario(storedUser.paciente);
            setTipoUsuario('paciente')
        }

    },[])

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton}>Regresar a inicio</button>
            </div>
            {usuario && tipoUsuario === 'paciente' && (
                <div className={styles.profileContainer}>
                    <div className={styles.leftSide}>
                        <img src={usuario.imageurl} alt="Foto del paciente" className={styles.profilePicture} />
                        <div className={styles.profileInfo}>
                            <h2>{usuario.nombres}</h2>
                            <p>DNI: {usuario.numeroDocumento}</p>
                            <p>Género: {usuario.genero}</p>
                            <p>Fecha de Nacimiento: {new Date(usuario.fechaNacimiento).toLocaleDateString()}</p>
                            <p>Email: {usuario.correoElectronico}</p>
                            <p>Celular: {usuario.numCelular}</p>
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
            )}
            {usuario && tipoUsuario === 'medico' && (
                <div className={styles.profileContainer}>
                    <div className={styles.leftSide}>
                        <img src={usuario.imageurl} alt="Foto del médico" className={styles.profilePicture} />
                        <div className={styles.profileInfo}>
                            <h2>{`${usuario.nombres} ${usuario.apePaterno} ${usuario.apeMaterno}`}</h2>
                            <p>Número de Documento: {usuario.numeroDocumento}</p>
                            <p>Género: {usuario.genero}</p>
                            <p>Fecha de Nacimiento: {new Date(usuario.fechaNacimiento).toLocaleDateString()}</p>
                            <p>Email: {usuario.correoElectronico}</p>
                            <p>Celular: {usuario.numCelular}</p>
                            <p>Centro Médico: {usuario.centroMedico}</p>
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
            )}
        </div>
    );
}

export default VisualizacionDePerfil;