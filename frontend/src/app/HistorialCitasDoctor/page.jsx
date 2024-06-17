'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import citasData from "@/data/citasMedicas.JSON";
import pacientesData from "@/data/usuarios.JSON";
import styles from './page.module.css';
import SideNavBarDoctor from '@/components/SideNavBarDoctor/SideNavBarDoctor';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';
import Button from '@mui/material/Button';
import { LuPlus } from "react-icons/lu";

const HistorialCitasDoctor = () => {
  const [citas, setCitas] = useState([]);
  const [pacientes, setPacientes] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [searchDate, setSearchDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
  
    setCitas(citasData);
    setPacientes(pacientesData);
  }, []);

  const getNombrePaciente = (idPaciente) => {
    const paciente = pacientes.find(p => p.id === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apePaterno} ${paciente.apeMaterno}` : 'Desconocido';
  };

  const handleVerDetallesClick = (id) => {
    navigate(`/DetallesCita/${id}`); 
  };

  const filteredCitas = citas.filter(cita => {
    const nombrePaciente = getNombrePaciente(cita.IDpaciente).toLowerCase();
    const fechaCita = new Date(cita.fecha).toLocaleDateString('en-CA');
    return (
      (!searchName || nombrePaciente.includes(searchName.toLowerCase())) &&
      (!searchDate || fechaCita === searchDate)
    );
  });

  return (
    <Box sx={{ display: "flex", backgroundColor: "#E7F6F1", height: "100vh", width: "100%" }}>
      <SideNavBarDoctor />
      <Box sx={{ flexDirection: "column", margin: "2em", width: "100%" }}>
        <div className={styles.cabecera}>
          <UserMenu />
        </div>
        <h3 className={styles.titulo}><b>HISTORIAL DE CITAS</b></h3>
        <div className={styles.searchContainer}>
          <input 
            type="text" 
            placeholder="Buscar por nombre de paciente" 
            className={styles.searchInput1} 
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
          />
          <input 
            type="date" 
            placeholder="Buscar por Fecha" 
            className={styles.searchInput2} 
            value={searchDate}
            onChange={(e) => setSearchDate(e.target.value)}
          />
          <Button 
            variant="contained" 
            className={styles.searchButton}
            onClick={() => { setSearchName(""); setSearchDate(""); }}
          >
            Limpiar
          </Button>
        </div>
        <div className={styles.containerTabla}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th className={styles.tableHeader}>Fecha</th>
                <th className={styles.tableHeader}>Hora</th>
                <th className={styles.tableHeader}>Paciente</th>
                <th className={styles.tableHeader}>Estado</th>
                <th className={styles.tableHeader}>Más Detalles</th>
              </tr>
            </thead>
            <tbody>
              {filteredCitas.map((cita) => (
                <tr key={cita.id} className={styles.tableRow}>
                  <td className={styles.tableCell}>{new Date(cita.fecha).toLocaleDateString()}</td>
                  <td className={styles.tableCell}>{new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
                  <td className={styles.tableCell}>{getNombrePaciente(cita.IDpaciente)}</td>
                  <td className={styles.tableCell}>
                    <span className={cita.asistio ? styles.asistio : styles.noAsistio}>
                      {cita.asistio ? 'Asistió' : 'No Asistió'}
                    </span>
                  </td>
                  <td className={styles.tableCell}>
                    <Button
                      onClick={() => handleVerDetallesClick(cita.id)} 
                      className={styles.verMasButton}
                    >
                      <span className={styles.verMasText}>Ver más <LuPlus /></span>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Box>
    </Box>
  );
};

export default HistorialCitasDoctor;
