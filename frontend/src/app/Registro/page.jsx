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
        fechaDeNacimiento: '',
        celular: '',
        correo: '',
        contrasena: '',
        repetirContrasena: '',
        aceptaTerminos: false,
    });
    const [profileImage, setProfileImage] = useState('/images/user-icon.png');
    const [fecha, setFecha] = useState({
        dia: '',
        mes: '',
        año: '',
      });
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) =>  ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };
    
    const handleDateChange = (e) => {
        const { name, value } = e.target;
        setFecha((prevFecha) => {
          const updatedFecha = { ...prevFecha, [name]: value };
          const { dia, mes, año } = updatedFecha;
    
          let formattedDate = '';
          if (dia && mes && año) {
            formattedDate = `${año.padStart(4, '0')}/${mes.padStart(2, '0')}/${dia.padStart(2, '0')}`;
          }
    
          setFormData((prevData) => ({
            ...prevData,
            fechaDeNacimiento: formattedDate,
          }));
    
          return updatedFecha;
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('Formulario enviado:', formData);
        console.log('Formulario enviado:', JSON.stringify(formData));

        try{
            const imageUrlToSend = profileImage || '/images/user-icon.png'; // URL predeterminada si no se selecciona una imagen

            // Mostrar en la consola los datos que se enviarán al servidor
            const dataToSend = {
                imageurl: imageUrlToSend,
                numeroDocumento: formData.documento,
                nombres: formData.nombres,
                apePaterno: formData.apellidoPaterno,
                apeMaterno: formData.apellidoMaterno,
                fechaNacimiento: formData.fechaDeNacimiento,
                numCelular: formData.celular,
                correoElectronico: formData.correo,
                contrasena: formData.contrasena,
                repContrasena: formData.repetirContrasena,
                genero: formData.genero,
            };
            console.log('Datos a enviar:', dataToSend);

            const response = await fetch('http://localhost:3000/pacientes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(dataToSend),
            });

            const data = await response.json();
            if (response.ok) {
                alert('Usuario paciente registrado correctamente');
            } else {
                alert(`Error: ${data.message}`);
            }
        } catch(error){
            console.error('error al registrar el usuario paciente', error);
            alert('Ocurrió un error al registrar paciente')
        }

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
                                    value={fecha.dia}
                                    onChange={handleDateChange}
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    name="mes"
                                    placeholder="Mes"
                                    value={fecha.mes}
                                    onChange={handleDateChange}
                                    className={styles.input}
                                />
                                <input
                                    type="text"
                                    name="año"
                                    placeholder="Año"
                                    value={fecha.año}
                                    onChange={handleDateChange}
                                    className={styles.input}
                                />
                            </div>
                            
                            <div>
                                Fecha Formateada: {formData.fechaDeNacimiento}
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
                        <button onClick={() => console.log(formData)} className={styles.button}>Registrarse</button>
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