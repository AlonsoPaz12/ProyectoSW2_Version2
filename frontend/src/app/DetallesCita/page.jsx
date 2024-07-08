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
import { getOrders } from '@/services/ordenesService';
import EditOrdenDialog from './EditOrdenDialog';
import { GiConsoleController } from 'react-icons/gi';

const updateOrdenMedica = async (id, updateData) => {
  try {
    const response = await axios.put(`http://localhost:3000/ordenes-medicas/${id}`, updateData);
    return response.data;
  } catch (error) {
    console.error('Error updating orden médica:', error);
    throw error;
  }
}

const DetallesCita = ({ id }) => {
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
  const [ordenes, setOrdenes] = useState([]);
  const [isOrdenDialogOpen, setIsOrdenDialogOpen] = useState(false);
  const [currentOrden, setCurrentOrden] = useState({});
  const [recetasFiltradas, setRecetasFiltradas] = useState([]);
  const [recetas, setRecetas] = useState([]);




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
    } catch (error) {
      console.error('Error al obtener las vacunas del paciente:', error);
    }
  };

  const fetchCita2 = async (pacientId, medicoid) => {
    try {
      const response = await axios.get(`http://localhost:3000/citas`);
      const data = response.data;
      console.log(data)
      if (!data || data.length === 0) {
        console.log('No se encontraron citas');
        return;
      }
  
      const filteredCita = data.find(cita => cita.medico?.id === medicoid && cita.paciente?.id === pacientId);
  
      if (filteredCita) {
        const filteredData = {
          id: filteredCita.id,
          asistio: filteredCita.asistio,
          fecha: filteredCita.fecha,
          motivo: filteredCita.motivo,
          observacion: filteredCita.observacion,
        };
  
        
        setEditableCita(filteredData);
        setCitas(filteredData);
        console.log("Estas son las citas editables");
        console.log(filteredData);
        console.log(citas);
        console.log("hasta aquí");
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
    console.log(pacienteData);
    setEditablePaciente({ ...pacienteData });
    await fetchCitasFromPaciente(pacienteData);
    await fetchOrdenes(id);
  };

  const fetchCita = async () => {
    const citaData = citasData.find(cita => cita.id === id);
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

  const fetchOrdenes = async (pacienteId) => {
    const ordenesData = await getOrders(pacienteId);
    setOrdenes(ordenesData);
  }
  const fetchRecetas = async (id) => {
    try {
      const response = await axios.get('http://localhost:3000/recetas');
      console.log(response.data);
      console.log(response.data.id)
      const recetasFiltradas = response.data.filter(receta => receta.id === id);
      console.log(recetasFiltradas);
      setRecetasFiltradas(recetasFiltradas);
      console.log("Recetas filtradas");
      console.log(recetasFiltradas);
    } catch (error) {
      console.error('Error al obtener las recetas:', error);
    }
  };
  
  
  

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await fetchCita();
        await fectchprueba(1);
        await fetchCita2(1, 1);
        await fetchRecetas(1); // Pasa el `id` aquí
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
      } else {
        console.error('Error al actualizar la cita:', result.message);
      }
    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
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
    setCurrentMedicamento(medicamento);
    setIsDialogOpen(true);
  };

  const handleCreateMedicamentoClick = () => {
    setIsCreateDialogOpen(true);
  };

  const handleDialogClose = () => {
    setIsDialogOpen(false);
  };

  const handleCreateDialogSave = (newMedicamento) => {
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
    const updatedMedicamentos = receta.medicamento.map(med => 
      med.id === updatedMedicamento.id ? updatedMedicamento : med
    );
    setReceta({ ...receta, medicamento: updatedMedicamentos });
    setIsDialogOpen(false);
  };

  const handleDeleteMedicamentoClick = async (recetaId, medicamentoId) => {
    try {
      // Realiza la solicitud DELETE al backend
      await axios.delete(`http://localhost:3000/recetas/${recetaId}/medicamentos/${medicamentoId}`);
      
      // Filtra los medicamentos en el estado local después de eliminar
      const medicamentosActualizados = receta.medicamento.filter(medicamento => medicamento.id !== medicamentoId);
      setReceta({ ...receta, medicamento: medicamentosActualizados });
  
      console.log(`Medicamento con ID ${medicamentoId} eliminado de la receta con ID ${recetaId}`);
    } catch (error) {
      console.error('Error al eliminar el medicamento:', error);
    }
  };
  

  const handleCreateDialogClose = () => {
    setIsCreateDialogOpen(false);
  };

  const handleEditOrdenClick = (orden) => {
    setCurrentOrden(orden);
    setIsOrdenDialogOpen(true);
  };

  const handleOrdenDialogSave = async (updatedOrden) => {
    const imagenesIguales = shallowEqual(updatedOrden.imagenMedica, currentOrden.imagenMedica);
    const resultadoIguales = shallowEqual(updatedOrden.resultadoLaboratorio, currentOrden.resultadoLaboratorio);

    if (!imagenesIguales && resultadoIguales) {
      const updatedImagenesData = await updateOrdenMedica(currentOrden.id, updatedOrden.imagenMedica);
    } else if (imagenesIguales && !resultadoIguales) {
      const updatedResultadoData = await updateOrdenMedica(currentOrden.id, updatedOrden.resultadoLaboratorio);
    } else if (!imagenesIguales && !resultadoIguales) {
      const updatedImagenesData = await updateOrdenMedica(currentOrden.id, updatedOrden.imagenMedica);
      const updatedResultadoData = await updateOrdenMedica(currentOrden.id, updatedOrden.resultadoLaboratorio);
    } else {
      await updateOrdenMedica(currentOrden.id, updatedOrden);
    }

    const updatedOrdenData = await getOrders(currentOrden.id);

    const updatedOrdenes = ordenes.map(ord => 
      ord.id === updatedOrdenData.id ? updatedOrdenData : ord
    );
    setOrdenes(updatedOrdenes);
    setIsOrdenDialogOpen(false);
  };
  const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    const options = { day: '2-digit', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('es-ES', options);
  };

  const handleOrdenDialogClose = () => {
    setIsOrdenDialogOpen(false);
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

  const shallowEqual = (obj1, obj2) => {
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);

    if (keys1.length !== keys2.length) {
      return false;
    }

    for (let key of keys1) {
      if (obj1[key] !== obj2[key]) {
        return false;
      }
    }

    return true;
  };

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
                  onChange={handleCitaInputChange}
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
                
                <p className={styles.texto}>
                  <strong>Fecha:</strong> {new Date(citas.fecha).toLocaleDateString() !== 'Invalid Date' ? new Date(citas.fecha).toLocaleDateString() : 'Fecha no válida'}
                </p>
                <p className={styles.texto}>
                  <strong>Hora:</strong> {new Date(citas.fecha).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) !== 'Invalid Date' ? new Date(citas.fecha).toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true }) : 'Hora no válida'}
                </p>
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
          recetasFiltradas.length > 0 ? (
            recetasFiltradas.map((receta) => (
              <div key={receta.id} className={styles.receta}>
                <div className={styles.receta__head}>
                  <p className={styles.receta__title}>Nro RECETA: <span className={styles.receta__text}>{receta.id}</span></p>
                  <p className={styles.receta__title}>NOTAS ADICIONALES: <span className={styles.receta__text}>{receta.observacion}</span></p>
                </div>
                <div className={styles.medicamentos}>
                  {
                    receta.medicamentos && receta.medicamentos.length > 0 &&
                    receta.medicamentos.map(medicamento => (
                      <div key={medicamento.id} className={styles.card}>
                        <p className={styles.texto}><strong>Nombre: </strong> {medicamento.nombre}</p>
                        <p className={styles.texto}><strong>Dosis: </strong> {medicamento.dosis}</p>
                        <p className={styles.texto}><strong>Frecuencia: </strong> {medicamento.frecuencia}</p>
                        <div className={styles.medicamento__buttons}>
                          <button 
                            className={styles.editButton}
                            onClick={() => handleEditMedicamentoClick(medicamento)}
                          ><FaEdit size={"20px"} /></button>
                          <button className={styles.editButton}
                            onClick={() => handleDeleteMedicamentoClick(citas.id,medicamento.id)}
                          ><FaTrashAlt size={"20px"} /></button>
                        </div>
                      </div>
                    ))
                  }
                </div>
                <button className={styles.addButton} onClick={handleCreateMedicamentoClick}><IoMdAdd size={"20px"} /> Agregar Medicamento</button>
              </div>
            ))
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
                  <p>{cita.fecha} - {cita.fecha} - {cita.motivo}</p>
                </div>
              ))
            ) : <p>No se han encontrado próximas citas</p>
          }
          </div>
        </div>
      </div>
      
      {/* <div className={styles.recetaMedica}>
        <h5 className={styles.titulo}>ORDEN MEDICA</h5>
        <div className={styles.recetaInfo}>
          {ordenes.map( orden =>(
          <div key={orden.id} className={styles.ordenMedica}>
            <p><strong>Nº ORDEN: </strong>{orden.id}</p>
            <h6>{orden.observacion}</h6>
            <h6>IMAGEN MÉDICA: </h6>
            <div className={styles.imagenMedica}>
              <div className={styles.imagenContenedor}>
                <img src={orden.imagenMedica.imagen} alt="Resultados de Radiografía de Torax" />
              </div>
              <p><strong>Resultados e Interpretación: </strong>{orden.imagenMedica.indicaciones}</p>
              <p><strong>Observaciones/Comentarios: </strong>{orden.imagenMedica.NotasMedic}</p>
            </div>
            <h6>RESULTADO DE LABORATORIO: </h6>
            <div className={styles.imagenMedica}>
              <div className={styles.imagenContenedor}>
                <img src={orden.resultadoLaboratorio.imageurl} alt="Resultados de Radiografía de Torax" />
              </div>
              <p><strong>Resultado: </strong>{orden.resultadoLaboratorio.Resultado}</p>
              <p><strong>Motivo de prueba: </strong>{orden.resultadoLaboratorio.motivoPrueba}</p>
            </div>
            <br></br>
            <button className={styles.editButton} onClick={() => handleEditOrdenClick(orden)}><FaEdit size={"20px"} /> Editar Orden</button>
          </div>
          ))}
        </div>
      </div> */}

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
        medicamento={{ id: '', nombre: '', dosis: '', frecuencia: '' }}
      />
      <EditOrdenDialog 
        open={isOrdenDialogOpen} 
        onClose={handleOrdenDialogClose} 
        orden={currentOrden} 
        onSave={handleOrdenDialogSave} 
      />
    </div>
  );
};

export default DetallesCita;
