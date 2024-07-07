'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
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
import { parseISO, format } from 'date-fns';
const DetallesCita = ({id}) => {
  const router = useRouter();
  const [paciente, setPaciente] = useState({});
  const [paciente2, setPaciente2] = useState({});
  const [cita, setCita] = useState({ asistio: false, fecha: Date(), motivo: '', Observacion: '' });
  const [citas, setCitas] = useState([]);
  const [notFound, setNotFound] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editablePaciente, setEditablePaciente] = useState({ nombres: '', apePaterno: '', apeMaterno: '', fechaNacimiento: '', id: '' });
  const [editableCita, setEditableCita] = useState([]);
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
  const fectchprueba = async (pacienteId) => {
    try {
      const response = await axios.get(`http://localhost:3000/pacientes/${pacienteId}`);
      
      setPaciente2(response.data.paciente);
      console.log(response.data.paciente);
      
      //setEditablePaciente({ ...pacienteData });
      //await fetchCitasFromPaciente(pacienteData);
    } catch (error) {
      console.error('Error al obtener las vacunas del paciente:', error);
    }
  };
  const fetchCita2 = async (pacientId, medicoid) => {
    try {
      const response = await axios.get(`http://localhost:3000/citas`);
      const data = response.data;
      console.log("Aquí está la data");
      console.log(response.data);
  
      // Encontrar la cita correspondiente con los IDs específicos
      const filteredCita = data.find(cita => cita.medico.id === medicoid && cita.paciente.id === pacientId);
  
      if (filteredCita) {
        const filteredData = {
          id: filteredCita.id,
          asistio: filteredCita.asistio,
          fecha: filteredCita.fecha,
          motivo: filteredCita.motivo,
          observacion: filteredCita.observacion,
        };
  
        setCitas(filteredData);
        setEditableCita(filteredData);
        console.log("Estas son las citas editables");
        console.log(filteredData);
      } else {
        console.log(`No se encontró ninguna cita con el médico ID ${medicoid} y paciente ID ${pacientId}`);
      }
    } catch (error) {
      console.error(error);
    }
  };
  
  
    
  


  const fetchPaciente = async (pacienteId) => {
    const pacienteData = pacientesData.find(paciente => paciente.id === pacienteId);
    if (!pacienteData) {
      console.log(`No se encontró ningún paciente con el ID ${pacienteId}`);
      return;
    }
    //setPaciente(pacienteData);
    console.log(pacienteData)
    //setEditablePaciente({ ...pacienteData });
    //await fetchCitasFromPaciente(pacienteData);
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
        await fectchprueba(1);
        await fetchCita2(1,1);
      }
    };
    fetchData();
  }, [id]);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveClick = async (idCita) => {
    try {
      const response = await fetch(`http://localhost:3000/citas/${idCita}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editableCita),
      });
  
      const result = await response.json();
  
      if (response.ok) {
        console.log('Cita actualizada:', result);
        // Aquí puedes manejar la respuesta exitosa, por ejemplo, mostrar un mensaje al usuario.
      } else {
        console.error('Error al actualizar la cita:', result.message);
        // Aquí puedes manejar el error, por ejemplo, mostrar un mensaje al usuario.
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
      // Aquí puedes manejar errores de la solicitud, por ejemplo, mostrar un mensaje al usuario.
    }
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
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
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
            <img src={paciente2.imageurl} alt="Paciente" className={styles.pacienteFoto} />
          </div>
          <div className={styles.columna2}>
            {isEditing ? (
              <>
                
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
                  value={editableCita.observacion}
                  onChange={handleCitaInputChange}
                  className={styles.input}
                />
              </>
            ) : (
              <>
                <p className={styles.texto}><strong>Paciente:</strong> {paciente2.nombres} {paciente2.apePaterno} {paciente2.apeMaterno}</p>
                <p className={styles.texto}></p><strong>Fecha de Nacimiento:</strong> {formatDate(paciente2.fechaNacimiento)}
                <p className={styles.texto}><strong>Edad:</strong> {calcularEdad(paciente2.fechaNacimiento)} años</p>
                <p className={styles.texto}><strong>Estado:</strong> <span className={citas.asistio ? styles.asistio : styles.noAsistio}>{cita.asistio ? 'Asistió' : 'No Asistió'}</span></p>
                
                <p className={styles.texto}><strong>Fecha:</strong>  {new Date(citas.fecha).toLocaleDateString()}</p>
                <p className={styles.texto}><strong>Hora:</strong> {new Date(citas.fecha).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}</p>
                
              </>
            )}
          </div>
          <div className={styles.columna3}>
            {isEditing ? (
              <>
              </>
            ) : (
              <>
                <p className={styles.texto}><strong>Motivo de la Cita:</strong> {citas.motivo}</p>
                <p className={styles.texto}><strong>Observacion:</strong> {citas.observacion || 'No disponible'}</p>
              </>
            )}
          </div>
        
          <div className={styles.columna4}>
            {isEditing ? (
              <button className={styles.backButton} onClick={() => handleSaveClick(citas.id)}>Guardar</button>

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