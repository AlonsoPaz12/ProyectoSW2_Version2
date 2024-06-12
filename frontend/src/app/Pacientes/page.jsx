'use client';

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import pacientesData from "@/data/usuarios.JSON";
import styles from './page.module.css';
import SideNavBarDoctor from '@/components/SideNavBarDoctor/SideNavBarDoctor';
import Box from '@mui/material/Box';
import UserMenu from '@/components/UserMenu/UserMenu';
import Button from '@mui/material/Button';
import { LuPlus } from "react-icons/lu";

const ListaPacientes = () => {
  const [pacientes, setPacientes] = useState([]);
  const [selectedPaciente, setSelectedPaciente] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Cargar datos
    setPacientes(pacientesData);
  }, []);

  const getNombrePaciente = (idPaciente) => {
    const paciente = pacientes.find(p => p.id === idPaciente);
    return paciente ? `${paciente.nombres} ${paciente.apePaterno} ${paciente.apeMaterno}` : 'Desconocido';
  };

  const handlePacienteClick = (paciente) => {
    setSelectedPaciente(paciente);
  };

  const handleVerDetallesClick = (e, id) => {
    e.stopPropagation(); // Prevent triggering the row click event
    navigate(`/DetallesPaciente/${id}`); // Navegar a DetallesPaciente con el ID del paciente
  };

  const calculateAge = (birthDate) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDifference = today.getMonth() - birth.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#E7F6F1", height: "100vh", width: "100%" }}>
      <SideNavBarDoctor />
      <Box sx={{ flexDirection: "column", margin: "2em", width: "100%" }}>
        <div className={styles.cabecera}>
          <UserMenu />
        </div>
        <h5 className={styles.titulo}>PACIENTES</h5>
        <div className={styles.containerTabla}>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Documento de identidad</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Nombre del Paciente</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Fecha de Nacimiento</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Edad</th>
                <th style={{ border: "1px solid #014433", padding: "8px", backgroundColor: "#5ED2B7" }}>Más Detalles</th>
              </tr>
            </thead>
            <tbody>
              {pacientes.map((paciente) => (
                <tr key={paciente.id} onClick={() => handlePacienteClick(paciente)}>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{paciente.numeroDocumento}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{getNombrePaciente(paciente.id)}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{formatDate(paciente.fechaNacimiento)}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>{calculateAge(paciente.fechaNacimiento)}</td>
                  <td style={{ border: "1px solid #014433", padding: "8px" }}>
                    <Button
                      onClick={(e) => handleVerDetallesClick(e, paciente.id)} // Pasar el ID del paciente al hacer clic en "Ver más"
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

export default ListaPacientes;
