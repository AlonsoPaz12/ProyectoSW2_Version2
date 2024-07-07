/*
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

*/


'use client'

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';

const VisualizacionDePerfil = () => {
    const [usuario, setUsuario] = useState(null);
    const [tipoUsuario, setTipoUsuario] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editableUsuario, setEditableUsuario] = useState({});

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser && storedUser.medico) {
            setUsuario(storedUser.medico);
            setTipoUsuario('medico');
        } else if (storedUser && storedUser.paciente) {
            setUsuario(storedUser.paciente);
            setTipoUsuario('paciente');
        }
    }, []);

    const handleEditClick = () => {
        setEditableUsuario({ ...usuario });
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        setUsuario(editableUsuario);
        localStorage.setItem('usuario', JSON.stringify({ [tipoUsuario]: editableUsuario }));
        setIsEditing(false);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditableUsuario(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const renderProfileInfo = () => (
        <div className={styles.profileInfo}>
            <h2>{usuario.nombres}</h2>
            <p>DNI: {usuario.numeroDocumento}</p>
            <p>Género: {usuario.genero}</p>
            <p>Edad: {new Date().getFullYear() - new Date(usuario.fechaNacimiento).getFullYear()} años</p>
            <p>Email: {usuario.correoElectronico}</p>
            <p>Celular: {usuario.numCelular}</p>
        </div>
    );

    const renderEditProfile = () => (
        <div className={styles.editContainer}>
            <h2>Editar Perfil</h2>
            <input
                type="text"
                name="nombres"
                value={editableUsuario.nombres}
                onChange={handleInputChange}
                placeholder="Nombre"
            />
            <input
                type="text"
                name="numeroDocumento"
                value={editableUsuario.numeroDocumento}
                onChange={handleInputChange}
                placeholder="DNI"
            />
            <input
                type="text"
                name="genero"
                value={editableUsuario.genero}
                onChange={handleInputChange}
                placeholder="Género"
            />
            <input
                type="date"
                name="fechaNacimiento"
                value={editableUsuario.fechaNacimiento}
                onChange={handleInputChange}
                placeholder="Fecha de Nacimiento"
            />
            <input
                type="email"
                name="correoElectronico"
                value={editableUsuario.correoElectronico}
                onChange={handleInputChange}
                placeholder="Email"
            />
            <input
                type="tel"
                name="numCelular"
                value={editableUsuario.numCelular}
                onChange={handleInputChange}
                placeholder="Celular"
            />
            <button onClick={handleSaveClick}>Guardar</button>
        </div>
    );

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <button className={styles.backButton}>Regresar al inicio</button>
            </div>
            {usuario && (
                <div className={styles.profileContainer}>
                    <div className={styles.leftSide}>
                        <img src={usuario.imageurl} alt="Foto del perfil" className={styles.profilePicture} />
                        {!isEditing ? renderProfileInfo() : renderEditProfile()}
                    </div>
                    <div className={styles.rightSide}>
                        <ul className={styles.optionsList}>
                            <li onClick={handleEditClick}>Editar datos de la cuenta</li>
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
