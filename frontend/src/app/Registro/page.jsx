'use client';

import React, { useState } from 'react';
import styles from './page.module.css';

const Registro = () => {
    const [formData, setFormData] = useState({
        documento: '',
        nombres: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        genero: '',
        dia: '',
        mes: '',
        año: '',
        celular: '',
        correo: '',
        contrasena: '',
        repetirContrasena: '',
        aceptaTerminos: false,
    });
    const [profileImage, setProfileImage] = useState('/images/user-icon.png');

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();
        reader.onloadend = () => {
            setProfileImage(reader.result);
        };
        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        // Aquí puedes manejar el envío del formulario y de la imagen
    };

    return (
        <div className={styles.container}>
            <div className={styles.formContainer}>
                <div className={styles.formBox}>
                    <div className={styles.imageUpload}>
                        <img src={profileImage} alt="User Icon" className={styles.userIcon} />
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            name="documento"
                            placeholder="Número de documento"
                            value={formData.documento}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            type="text"
                            name="nombres"
                            placeholder="Nombres"
                            value={formData.nombres}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <div className={styles.nameContainer}>
                            <input
                                type="text"
                                name="apellidoPaterno"
                                placeholder="Apellido Paterno"
                                value={formData.apellidoPaterno}
                                onChange={handleChange}
                                className={styles.input}
                            />
                            <input
                                type="text"
                                name="apellidoMaterno"
                                placeholder="Apellido Materno"
                                value={formData.apellidoMaterno}
                                onChange={handleChange}
                                className={styles.input}
                            />
                        </div>
                        <div className={styles.genderContainer}>
                            <label>Género</label>
                            <div className={styles.genderOptions}>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="Hombre"
                                        checked={formData.genero === 'Hombre'}
                                        onChange={handleChange}
                                    />
                                    Hombre
                                </label>
                                <label>
                                    <input
                                        type="radio"
                                        name="genero"
                                        value="Mujer"
                                        checked={formData.genero === 'Mujer'}
                                        onChange={handleChange}
                                    />
                                    Mujer
                                </label>
                            </div>
                        </div>
                        <div className={styles.birthDateContainer}>
                            <label>Fecha de Nacimiento</label>
                            <div className={styles.dateInputs}>
                                <input
                                    type="text"
                                    name="dia"
                                    placeholder="Día"
                                    value={formData.dia}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    name="mes"
                                    placeholder="Mes"
                                    value={formData.mes}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    name="año"
                                    placeholder="Año"
                                    value={formData.año}
                                    onChange={handleChange}
                                    className={styles.input}
                                />
                            </div>
                        </div>
                        <input
                            type="text"
                            name="celular"
                            placeholder="Celular"
                            value={formData.celular}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            type="email"
                            name="correo"
                            placeholder="Correo electrónico"
                            value={formData.correo}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            type="password"
                            name="contrasena"
                            placeholder="Contraseña"
                            value={formData.contrasena}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <input
                            type="password"
                            name="repetirContrasena"
                            placeholder="Repetir Contraseña"
                            value={formData.repetirContrasena}
                            onChange={handleChange}
                            className={styles.input}
                        />
                        <div className={styles.checkboxContainer}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="aceptaTerminos"
                                    checked={formData.aceptaTerminos}
                                    onChange={handleChange}
                                />
                                Estoy de acuerdo con los <a href="#">Términos y Política de Privacidad</a>
                            </label>
                        </div>
                        <button type="submit" className={styles.button}>Registrarse</button>
                        <div className={styles.loginLink}>
                            ¿Tienes una cuenta? <a href="/IniciarSesion">Inicia sesión</a>
                        </div>
                    </form>
                </div>
            </div>
            <div className={styles.imageContainer}>
                <div className={styles.imageOverlay}>
                    <h2>Citas en línea</h2>
                    <p>Ingresa y gestiona tus citas médicas</p>
                </div>
                <div className={styles.backgroundImage}></div>
            </div>
        </div>
    );
};

export default Registro;