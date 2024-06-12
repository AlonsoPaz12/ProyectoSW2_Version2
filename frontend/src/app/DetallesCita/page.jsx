'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import citasData from "@/data/citasMedicas.JSON";
import pacientesData from "@/data/usuarios.JSON";
import styles from './page.module.css';
import { TiArrowBack } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

const DetallesPaciente = () => {
  const { id } = useParams();
  const [cita, setCita] = useState(null);
  const [paciente, setPaciente] = useState(null);

  useEffect(() => {
    const fetchCita = async () => {
      // Buscar la cita por ID
      const citaData = citasData.find(cita => cita.id === id);
      if (!citaData) {
        // Manejar el caso en que no se encuentre ninguna cita con el ID proporcionado
        console.log(`No se encontró ninguna cita con el ID ${id}`);
        return;
      }
      // Buscar el paciente correspondiente al ID de la cita
      const pacienteData = pacientesData.find(paciente => paciente.id === citaData.IDpaciente);
      setCita(citaData);
      setPaciente(pacienteData);
    };

    if (id) {
      fetchCita();
    }
  }, [id]);

  if (!cita || !paciente) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.cabecera}>
        <button onClick={() => history.back()} className={styles.backButton}><TiArrowBack size={"20px"} /> Regresar</button>
      </div>
      <h5 className={styles.titulo}>DETALLES DE LA CITA</h5>
      <div className={styles.citaInfo}>
        <div className={styles.pacienteInfo}>
          <div className={styles.columna1}>
            <img src="https://images.unsplash.com/photo-1651008376811-b90baee60c1f?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Paciente" className={styles.pacienteFoto} />
          </div>
          <div className={styles.columna2}>
            <p className={styles.texto}><strong>Paciente
            </strong>: {paciente.nombres} {paciente.apePaterno} {paciente.apeMaterno}</p>
            <p className={styles.texto}><strong>Edad:</strong> {new Date().getFullYear() - new Date(paciente.fechaNacimiento).getFullYear()} años</p>
            <p className={styles.texto}><strong>Estado:</strong> <span className={cita.asistio ? styles.asistio : styles.noAsistio}>{cita.asistio ? 'Asistió' : 'No Asistió'}</span></p>
            <p className={styles.texto}><strong>Fecha:</strong> {new Date(cita.fecha).toLocaleDateString()}</p>
            <p className={styles.texto}><strong>Hora:</strong> {new Date(cita.fecha).toLocaleTimeString()}</p>
          </div>
          <div className={styles.columna3}>
            <p className={styles.texto}><strong>Motivo de la Cita:</strong> {cita.motivo}</p>
            <p className={styles.texto}><strong>Diagnóstico:</strong> {cita.diagnostico || 'No disponible'}</p>
          </div>
          <div className={styles.columna4}>
          <button className={styles.editButton}><FaEdit size={"20px"} /> Editar</button>
          </div>
        </div>
      </div>
      <div className={styles.recetaMedica}>
        <h5 className={styles.titulo}>RECETA MÉDICA</h5>
        <div className={styles.recetaInfo}>
          <p>No se ha agregado ninguna receta médica</p>
          <button className={styles.addButton}><IoMdAdd /> Agregar receta médica</button>
        </div>
      </div>
      <div className={styles.ordenMedica}>
        <h5 className={styles.titulo}>ORDEN MÉDICA</h5>
        <div className={styles.ordenInfo}>
          <p>No se ha agregado ninguna orden médica</p>
          <button className={styles.addButton}><IoMdAdd /> Agregar orden médica</button>
        </div>
        
      </div>
    </div>
  );
};

export default DetallesPaciente;

