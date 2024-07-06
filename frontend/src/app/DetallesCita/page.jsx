'use client';

import React, { useEffect, useState } from 'react';
import citasData from "@/data/citasMedicas.JSON";
import pacientesData from "@/data/usuarios.JSON";
import recetasData from "@/data/recetaMedica.JSON";
import styles from './page.module.css';
import { TiArrowBack } from "react-icons/ti";
import { FaEdit } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaTrashAlt } from "react-icons/fa";
import EditMedicamentoDialog from "./EditMedicamentoDialog";
import { useRouter } from 'next/navigation';

const DetallesCita = ({id}) => {
  const router = useRouter();
  const [paciente, setPaciente] = useState({});
  const [cita, setCita] = useState({ asistio: false, fecha: Date(), motivo: '', Observacion: '' });
  const [citas, setCitas] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePaciente, setEditablePaciente] = useState({ nombres: '', apePaterno: '', apeMaterno: '', fechaNacimiento: '', id: '' });
  const [editableCita, setEditableCita] = useState({ asistio: false, fecha: Date(), motivo: '', Observacion: '' });
  const [receta, setReceta] = useState({});
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [currentMedicamento, setCurrentMedicamento] = useState({ id: '', nombre: '', dosis: '', frecuencia: '' });

  const calcularEdad = (fechaNacimiento) => {
    const hoy = new Date();
    const fechaNacimientoObj = new Date(fechaNacimiento);
    let edad = hoy.getFullYear() - fechaNacimientoObj.getFullYear();
    const diferenciaMeses = hoy.getMonth() - fechaNacimientoObj.getMonth();

    if (diferenciaMeses < 0 || (diferenciaMeses === 0 && hoy.getDate() < fechaNacimientoObj.getDate())) {
      edad--;
    }

    return edad;
  };


  const fetchPaciente = async (pacienteId) => {
    const pacienteData = pacientesData.find(paciente => paciente.id === pacienteId);
    if (!pacienteData) {
      console.log(`No se encontró ningún paciente con el ID ${pacienteId}`);
      return;
    }
    setPaciente(pacienteData);
    console.log(pacienteData)
    setEditablePaciente({ ...pacienteData });
    await fetchCitasFromPaciente(pacienteData);
  };
  console.log(pacientesData)
  const fetchCita = async () => {
    const citaData = citasData.find(cita => cita.id === id);
    console.log("hola")
    if (!citaData) {
      console.log(`No se encontró ninguna cita con el ID ${id}`);
      setNotFound(true);
      return;
    }
    setCita(citaData);
    setEditableCita({ ...citaData });
    fetchPaciente(citaData.IDpaciente);
    fetchReceta(citaData.id);
  };

  const fetchCitasFromPaciente = async (paciente) => {
    const pacienteId = paciente.id;
    const citasDataFromPaciente = citasData.filter(cita => cita.IDpaciente === pacienteId && new Date(cita.fecha) > new Date());
    setCitas(citasDataFromPaciente);    
  };

  const fetchReceta = async (citaId) => {
    const recetaAux = recetasData.find(receta => receta.citaId == citaId);
    if (!recetaAux) {
      console.log(`No se encontró ninguna receta con el ID de la cita ${citaId}`);
      return;
    }
    setReceta(recetaAux);
  };

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fetchCita();
      }
    };
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = () => {
    setPaciente({ ...editablePaciente });
    setCita({ ...editableCita });
    setIsEditing(false);
  };

  const handlePacienteInputChange = (e) => {
    const { name, value } = e.target;
    setEditablePaciente(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleCitaInputChange = (e) => {
    const { name, value } = e.target;
    setEditableCita(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleEditMedicamentoClick = (medicamento) => {
    console.log(medicamento);
    setCurrentMedicamento(medicamento);
    console.log(currentMedicamento)
    setIsDialogOpen(true);
  };

  const handleCreateMedicamentoClick = () => {
    console.log('Create medicamento');
    setIsCreateDialogOpen(true);
  };


  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateDialogSave = (newMedicamento) => {
    console.log(newMedicamento);
    const medicamentos = receta.medicamento;

    if (medicamentos.length > 0) {
      newMedicamento.id = medicamentos[medicamentos.length - 1].id + 1;
    } else {
      newMedicamento.id = 1;
    }

    medicamentos.push(newMedicamento);
    setReceta({ ...receta, medicamento: medicamentos });
    setIsCreateDialogOpen(false);
  };

  const handleDialogSave = (updatedMedicamento) => {
    console.log(updatedMedicamento);
    const updatedMedicamentos = receta.medicamento.map(med => 
      med.id === updatedMedicamento.id ? updatedMedicamento : med
    );
    setReceta({ ...receta, medicamento: updatedMedicamentos });
    setIsDialogOpen(false);
  };

  const handleDeleteMedicamentoClick = (medicamentoId) => {
    const medicamentos = receta.medicamento.filter(medicamento => medicamento.id !== medicamentoId);
    setReceta({ ...receta, medicamento: medicamentos });
  };

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  if (notFound) {
    return (
      <div className={styles.body}>
        <h5 className={styles.titulo}>Cita no encontrada</h5>
        <button onClick={() => router.push('/')} className={styles.backButton}>
          <TiArrowBack size={"20px"} /> Regresar a Home
        </button>
      </div>
    );
  }

  return (
    <div className={styles.body}>
      <div className={styles.cabecera}>
        <button onClick={() => router.push('/HistorialCitasDoctor')} className={styles.backButton}><TiArrowBack size={"20px"} /> Regresar</button>
      </div>
      <h5 className={styles.titulo}>DETALLES DE LA CITA</h5>
      <div className={styles.citaInfo}>
        <div className={styles.pacienteInfo}>
          <div className={styles.columna1}>
            <img src={paciente.imageurl} alt="Paciente" className={styles.pacienteFoto} />
          </div>
          <div className={styles.columna2}>
            {isEditing ? (
              <>
                <input
                  type="text"
                  name="nombres"
                  value={editablePaciente.nombres}
                  onChange={handlePacienteInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="apePaterno"
                  value={editablePaciente.apePaterno}
                  onChange={handlePacienteInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="apeMaterno"
                  value={editablePaciente.apeMaterno}
                  onChange={handlePacienteInputChange}
                  className={styles.input}
                />
                <input
                  type="date"
                  name="fechaNacimiento"
                  value={editablePaciente.fechaNacimiento}
                  onChange={handlePacienteInputChange}
                  className={styles.input}
                />
                <input
                    type="checkbox"
                    name="asistio"
                    className={styles.input}
                    checked={editableCita.asistio}
                    value={true}
                    onChange={
                      handleCitaInputChange
                    }
                  />
                <input
                  type="datetime-local"
                  name="fecha"
                  value={editableCita.fecha}
                  onChange={handleCitaInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="motivo"
                  value={editableCita.motivo}
                  onChange={handleCitaInputChange}
                  className={styles.input}
                />
                <input
                  type="text"
                  name="observacion"
                  value={editableCita.Observacion}
                  onChange={handleCitaInputChange}
                  className={styles.input}
                />
              </>
            ) : (
              <>
                <p className={styles.texto}><strong>Paciente:</strong> {paciente.nombres} {paciente.apePaterno} {paciente.apeMaterno}</p>
                <p className={styles.texto}><strong>Fecha de Nacimiento:</strong> {paciente.fechaNacimiento}</p>
                <p className={styles.texto}><strong>Edad:</strong> {calcularEdad(paciente.fechaNacimiento)} años</p>
                <p className={styles.texto}><strong>Estado:</strong> <span className={cita.asistio ? styles.asistio : styles.noAsistio}>{cita.asistio ? 'Asistió' : 'No Asistió'}</span></p>
                <p className={styles.texto}><strong>Fecha:</strong>  {new Date(cita.fecha).toLocaleDateString()}</p>
                <p className={styles.texto}><strong>Hora:</strong> {new Date(cita.fecha).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                
              </>
            )}
          </div>
          <div className={styles.columna3}>
            {isEditing ? (
              <>
              </>
            ) : (
              <>
                <p className={styles.texto}><strong>Motivo de la Cita:</strong> {cita.motivo}</p>
                <p className={styles.texto}><strong>Observacion:</strong> {cita.Observacion || 'No disponible'}</p>
              </>
            )}
          </div>
        
          <div className={styles.columna4}>
            {isEditing ? (
              <button className={styles.backButton} onClick={handleSaveClick}>Guardar</button>
            ) : (
              <button className={styles.editButton} onClick={handleEditClick}><FaEdit size={"20px"} /> Editar</button>
            )}
          </div>
        </div>
      </div>
      <div className={styles.recetaMedica}>
        <h5 className={styles.titulo}>RECETAS</h5>
        <div className={styles.recetaInfo}>
          <div className={styles.receta}>
          {
            receta && receta.id ? (
              <div className={styles.receta}>
                <div className={styles.receta__head}>
                  <p className={styles.receta__title}>Nro RECETA: <span className={styles.receta__text}>{receta.id}</span></p>
                  <p className={styles.receta__title}>NOTAS ADICIONALES: <span className={styles.receta__text}>{receta.observacion}</span></p>
                </div>
                <div className={styles.medicamentos}>
                  {
                    receta.medicamento && receta.medicamento.length > 0 &&
                    receta.medicamento.map(medicamento => (
                      <div key={medicamento.id} className={styles.card}>
                        <p className={styles.texto}><strong>Nombre:</strong> {medicamento.nombre}</p>
                        <p className={styles.texto}><strong>Dosis:</strong> {medicamento.dosis}</p>
                        <p className={styles.texto}><strong>Frecuencia:</strong> {medicamento.frecuencia}</p>
                        <div className={styles.medicamento__buttons}>
                          <button 
                          className={styles.editButton}
                          onClick={() => handleEditMedicamentoClick(medicamento)}  // Pass the medicamento object
                          ><FaEdit size={"20px"} /></button>
                          <button className={styles.editButton}
                          onClick={() => handleDeleteMedicamentoClick(medicamento.id)}
                          ><FaTrashAlt size={"20px"} /></button>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <button className={styles.addButton}  onClick={handleCreateMedicamentoClick}><IoMdAdd size={"20px"}
                /> Agregar Medicamento</button>
              </div>
            ) : <p>No se ha encontrado receta</p>
          }
          </div>
         
        </div>
      </div>
      <div className={styles.recetaMedica}>
        <h5 className={styles.titulo}>PRÓXIMAS CITAS</h5>
        <div className={styles.recetaInfo}>
          <div className={styles.proximas_citas}>
          {
            citas.length > 0 ? (
              citas.map(cita => (
                <div key={cita.id} className={styles.cita}>
                  <p>{cita.fecha} - {cita.fecha}
                    {` `}- {cita.motivo}
                  </p>
                </div>
              ))
            ) : <p>No se han encontrado proximas citas</p>
          }
          </div>
         
        </div>
      </div>

      <div className={styles.recetaMedica}>
        <h5 className={styles.titulo}>ORDEN MEDICA</h5>
        <div className={styles.recetaInfo}>
          <div className={styles.ordenMedica}>
            <p><strong>Nº ORDEN:</strong> 123.456.789</p>
            <h6>IMAGEN MÉDICA:</h6>
            <div className={styles.imagenMedica}>
              <h6>Resultados de Radiografía de Torax</h6>
              <div className={styles.imagenContenedor}>
                <img src="https://via.placeholder.com/150" alt="Resultados de Radiografía de Torax" />
              </div>
              <p><strong>Resultados e Interpretación:</strong> Se observan opacidades en el lóbulo superior del pulmón derecho, sugestivas de proceso inflamatorio. No se observan fracturas ni lesiones óseas.</p>
              <p><strong>Observaciones/Comentarios:</strong> El paciente no presenta síntomas respiratorios en este momento.</p>
            </div>
          </div>
        </div>
      </div>

      <EditMedicamentoDialog 
        open={isDialogOpen} 
        onClose={handleDialogClose} 
        medicamento={currentMedicamento} 
        onSave={handleDialogSave} 
      />
      <EditMedicamentoDialog
      open={isCreateDialogOpen}
      onClose={handleCreateDialogClose}
      onSave={handleCreateDialogSave}
      medicamento={ { id: '', nombre: '', dosis: '', frecuencia: '' } }
    />
    </div>
    
  );
};

export default DetallesCita;