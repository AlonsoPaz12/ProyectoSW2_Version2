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
  const [selectedCita, setSelectedCita] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos de citas y pacientes
    setCitas(citasData);
    setPacientes(pacientesData);
  }, []);

  const getNombrePaciente = (idPaciente) => {
    const paciente = pacientes.find(p => p.id === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apePaterno} ${paciente.apeMaterno}` : 'Desconocido';
  };

  const handleCitaClick = (cita) => {
    setSelectedCita(cita);
  };

  const handleVerDetallesClick = (id) => {
    navigate(`/DetallesPaciente/${id}`); // Navegar a DetallesPaciente con el ID del paciente
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#E7F6F1", height: "100vh", width: "100%" }}>
      <SideNavBarDoctor />
      <Box sx={{ flexDirection: "column", margin: "2em", width: "100%" }}>
        <div className={styles.cabecera}>
          <UserMenu />
        </div>
        <h5 className={styles.titulo}>HISTORIAL DE CITAS</h5>
        <div className={styles.containerTabla}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Fecha</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Hora</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Paciente</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Estado</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Más Detalles</th>
              </tr>
            </thead>
            <tbody>
              {citas.map((cita) => (
                <tr key={cita.id} onClick={() => handleCitaClick(cita)}>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{new Date(cita.fecha).toLocaleDateString()}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{new Date(cita.fecha).toLocaleTimeString()}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{getNombrePaciente(cita.IDpaciente)}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{cita.asistio ? 'Asistió' : 'No Asistió'}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>
                    <Button
                      onClick={() => handleVerDetallesClick(cita.id)} // Pasar el ID del paciente al hacer clic en "Ver más"
                      sx={{ my: 2, color:"black"}}
                    >
                      Ver más <LuPlus />
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

