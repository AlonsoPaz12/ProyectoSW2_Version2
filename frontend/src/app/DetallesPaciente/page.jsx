'use client';

import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import citasData from "@/data/citasMedicas.JSON";
import pacientesData from "@/data/usuarios.JSON";
import medicosData from "@/data/doctors.JSON";
import styles from "./page.module.css";
import vacunasData from "@/data/vacunas.JSON";
import { TiArrowBack } from "react-icons/ti";
import VaccinationScheduleTable from "@/components/VaccinationScheduleTable/VaccinationScheduleTable";
import { Button } from "react-bootstrap";

const DetallesPaciente = () => {
  const { id } = useParams();
  const [paciente, setPaciente] = useState(null);
  const [citas, setCitas] = useState([]);
  const [futureCitas, setFutureCitas] = useState([]);
  const [lastPastCita, setLastPastCita] = useState(null);
  const [vacunas, setVacunas] = useState([]);
  const [newVacuna, setNewVacuna] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      const pacienteData = pacientesData.find((paciente) => paciente.id === id);
      if (!pacienteData) {
        console.log(`No se encontró ningún paciente con el ID ${id}`);
        return;
      }

      const citasDataForPaciente = citasData.filter(
        (cita) => cita.IDpaciente === pacienteData.id
      );

      const now = new Date();
      const futureCitas = citasDataForPaciente.filter(
        (cita) => new Date(cita.fecha) > now
      );
      const pastCitas = citasDataForPaciente.filter(
        (cita) => new Date(cita.fecha) <= now
      );

      pastCitas.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      const lastPastCita = pastCitas.length > 0 ? pastCitas[0] : null;

      const vacunasDataForPaciente = vacunasData.filter(
        (vacuna) => vacuna.IDpaciente === pacienteData.id
      );

      setPaciente(pacienteData);
      setCitas(citasDataForPaciente);
      setFutureCitas(futureCitas);
      setLastPastCita(lastPastCita);
      setVacunas(vacunasDataForPaciente);
    };

    if (id) {
      fetchDetails();
    }
  }, [id]);

  const addEmptyVaccineRecord = () => {
    setNewVacuna({ VacunaNombre: '', fecha: '', Dosis: '', Fabricante: '', Lugar: '' });
  };

  const saveNewVaccineRecord = (updatedRecord) => {
    setVacunas([...vacunas, updatedRecord]);
    setNewVacuna(null);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const getDoctorInfo = (IDmedico) => {
    const doctor = medicosData.find(
      (medico) => medico.id === parseInt(IDmedico)
    );
    return doctor
      ? `${doctor.nombre} - ${doctor.especialidad}`
      : "Información del médico no disponible";
  };

  if (!paciente || citas.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.body}>
      <div className={styles.cabecera}>
        <button onClick={() => history.back()} className={styles.backButton}>
          <TiArrowBack size={"20px"} /> Regresar
        </button>
      </div>

      <h5 className={styles.titulo}>INFORMACIÓN DEL PACIENTE</h5>
      <div className={styles.patientDetails}>
        <p>
          <strong>Nombre:</strong> {paciente.nombres} {paciente.apePaterno}{" "}
          {paciente.apeMaterno}
        </p>
        <p>
          <strong>Documento:</strong> {paciente.numeroDocumento}
        </p>
        <p>
          <strong>Fecha de Nacimiento:</strong>{" "}
          {formatDate(paciente.fechaNacimiento)}
        </p>
        <p>
          <strong>Género:</strong> {paciente.genero}
        </p>
        <p>
          <strong>Correo Electrónico:</strong> {paciente.correoElectronico}
        </p>
        <p>
          <strong>Número de Celular:</strong> {paciente.numCelular}
        </p>
      </div>

      <div className={styles.vacunacionDetalles}>
        <h5 className={styles.titulo2}>ESQUEMA DE VACUNACIÓN</h5>
        <VaccinationScheduleTable 
          vacunas={vacunas} 
          newVacuna={newVacuna}
          setNewVacuna={setNewVacuna}
          saveNewVaccineRecord={saveNewVaccineRecord} 
          setVacunas={setVacunas}
        />
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button 
            variant="success" 
            style={{ 
              borderRadius: '100px', 
              width: '50px',
              height: '50px',
              fontSize: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onClick={addEmptyVaccineRecord}
          >
            +
          </Button>
        </div> 
      </div>

      <div className={styles.proximasCitasDetalles}>
        <h5 className={styles.titulo2}>PRÓXIMAS CITAS</h5>
        {lastPastCita && (
          <p>
            <strong>Fecha última cita:</strong> {formatDate(lastPastCita.fecha)}{" "}
            - {getDoctorInfo(lastPastCita.IDmedico)}
          </p>
        )}
        <p>
          <strong>Próximas citas:</strong>
        </p>
        {futureCitas.length > 0 ? (
          futureCitas.map((cita) => (
            <p key={cita.id}>
              {formatDate(cita.fecha)} - {getDoctorInfo(cita.IDmedico)}
            </p>
          ))
        ) : (
          <p>No hay próximas citas programadas.</p>
        )}
      </div>

      <div className={styles.appointmentDetails}>
        <h5 className={styles.titulo2}>HISTORIAL MÉDICO</h5>
        {citas.map((cita) => (
          <div key={cita.id} className={styles.cita}>
            <p>
              <strong>Motivo:</strong> {cita.motivo}
            </p>
            <p>
              <strong>Observación:</strong> {cita.Observacion}
            </p>
            <p>
              <strong>Fecha:</strong> {formatDate(cita.fecha)}
            </p>
            <p>
              <strong>Asistió:</strong> {cita.asistio ? "Sí" : "No"}
            </p>
            <p>
              <strong>Documentos Médicos:</strong>{" "}
              {cita.documentoMedico.join(", ")}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetallesPaciente;
