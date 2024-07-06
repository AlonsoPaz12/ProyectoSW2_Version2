'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import jsPDF from 'jspdf';
import {
  Box,
  Paper,
  Avatar,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Button
} from '@mui/material'; // Asegúrate de importar los componentes de MUI que estás utilizando
import SideNavBar from '@/components/SideNavBar/SideNavBar';
import 'jspdf-autotable';

const Vacunas = () => {
  const [paciente, setPaciente] = useState(null);
  const [vacunas, setVacunas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));
        if (storedUser && storedUser.paciente) {
          setPaciente(storedUser.paciente);
          fetchVacunasByPacienteId(storedUser.paciente.id);
        } else {
          console.error('No se encontró información del paciente en localStorage');
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);

  const fetchVacunasByPacienteId = async (pacienteId) => {
    try {
      const response = await axios.get(`http://localhost:3000/vacunas/paciente/${pacienteId}/vacunas`);
      setVacunas(response.data.vacunas);
    } catch (error) {
      console.error('Error al obtener las vacunas del paciente:', error);
    }
  };

  const generatePDF = () => {
    if (!paciente) return;

    const doc = new jsPDF();

    doc.text(`Nombre: ${paciente.nombres} ${paciente.apePaterno} ${paciente.apeMaterno}`, 10, 10);
    doc.text(`Fecha de Nacimiento: ${paciente.fechaNacimiento}`, 10, 20);
    doc.text(`Documento de Identificación: ${paciente.numeroDocumento}`, 10, 30);
    doc.text(`Género: ${paciente.genero}`, 10, 40);

    const tableColumn = ["Vacuna Administrada", "Fecha de Vacunación", "Dosis", "Fabricante", "Lugar de vacunación"];
    const tableRows = [];

    vacunas.forEach((vacuna, index) => {
      const vacunaData = [
        vacuna.nombre,
        vacuna.fecha,
        vacuna.dosis,
        vacuna.fabricante,
        vacuna.lugarDeVacunacion,
      ];
      tableRows.push(vacunaData);
    });

    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 50,
    });

    doc.save("vacunacion.pdf");
  };

  return (
    <Box sx={{ display: "flex", backgroundColor: "#E7F6F1", height: "100vh", width: "100%" }}>
      <SideNavBar />

      <Box sx={{ flexDirection: "column", margin: "2em", width: "100%" }}>
        <Paper sx={{ padding: "2em", width: "100%" }}>
          {paciente && (
            <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1em" }}>
              <Avatar
                alt={paciente.nombres}
                src={paciente.imageurl}
                sx={{ width: 56, height: 56, marginRight: "1em" }}
              />
              <Box>
                <Typography variant="h6">{`${paciente.nombres} ${paciente.apePaterno} ${paciente.apeMaterno}`}</Typography>
                <Typography variant="body1">Fecha de Nacimiento: {paciente.fechaNacimiento.slice(0,10)}</Typography>
                <Typography variant="body1">Documento de Identificación: {paciente.numeroDocumento}</Typography>
                <Typography variant="body1">Género: {paciente.genero}</Typography>
              </Box>
            </Box>
          )}

          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Vacuna Administrada</TableCell>
                  <TableCell>Fecha de Vacunación</TableCell>
                  <TableCell>Dosis</TableCell>
                  <TableCell>Fabricante</TableCell>
                  <TableCell>Lugar de vacunación</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {vacunas.map((vacuna, index) => (
                  <TableRow key={index}>
                    <TableCell>{vacuna.nombre}</TableCell>
                    <TableCell>{vacuna.fecha}</TableCell>
                    <TableCell>{vacuna.dosis}</TableCell>
                    <TableCell>{vacuna.fabricante}</TableCell>
                    <TableCell>{vacuna.lugarDeVacunacion}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          <Box sx={{ marginTop: "1em", textAlign: "right" }}>
            <Button variant="contained" color="primary" onClick={generatePDF}>Descargar PDF</Button>
          </Box>
        </Paper>
      </Box>
    </Box>
  );
};

export default Vacunas;