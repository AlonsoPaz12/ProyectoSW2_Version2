'use client';

import React, { useEffect, useState } from 'react';
import styles from './page.module.css';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

import SideNavBar from '@/components/SideNavBar/SideNavBar';
import { jsPDF } from 'jspdf';
import 'jspdf-autotable';
// Datos planos de ejemplo
const userData = {
  nombre: "Carrión Mendoza, Gianella Ariana",
  fechaNacimiento: "15 de enero del 2001",
  documentoIdentificacion: "73252828",
  genero: "Femenino",
  vacunas: [
    { vacuna: "Hepatitis B", fecha: "01-02-2020", dosis: "1ra", fabricante: "Sanofi", lugar: "Lima" },
    { vacuna: "Influenza", fecha: "15-03-2021", dosis: "2da", fabricante: "Pfizer", lugar: "Arequipa" },
    // Añade más datos de ejemplo según sea necesario
  ]
};

// Comentario: Importa axios para realizar peticiones HTTP al backend
// import axios from 'axios';

const Vacunas = () => {
  const [data, setData] = useState(userData);

  // Comentario: Usa useEffect para realizar una petición al backend cuando el componente se monte
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Comentario: Realiza una petición GET a la API para obtener los datos de vacunación
        // const response = await axios.get('https://tu-api-url.com/vacunas'); // Reemplaza con la URL de tu API
        // setData(response.data);
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    fetchData();
  }, []);
  const generatePDF = () => {
    const doc = new jsPDF();

    doc.text(`Nombre: ${data.nombre}`, 10, 10);
    doc.text(`Fecha de Nacimiento: ${data.fechaNacimiento}`, 10, 20);
    doc.text(`Documento de Identificación: ${data.documentoIdentificacion}`, 10, 30);
    doc.text(`Género: ${data.genero}`, 10, 40);

    const tableColumn = ["Vacuna Administrada", "Fecha de Vacunación", "Dosis", "Fabricante", "Lugar de vacunación"];
    const tableRows = [];

    data.vacunas.forEach(vacuna => {
      const vacunaData = [
        vacuna.vacuna,
        vacuna.fecha,
        vacuna.dosis,
        vacuna.fabricante,
        vacuna.lugar,
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
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: "1em" }}>
            <Avatar
              alt={data.nombre}
              src="/path/to/avatar.jpg" // Reemplaza con la ruta a la imagen del usuario
              sx={{ width: 56, height: 56, marginRight: "1em" }}
            />
            <Box>
              <Typography variant="h6">{data.nombre}</Typography>
              <Typography variant="body1">Fecha de Nacimiento: {data.fechaNacimiento}</Typography>
              <Typography variant="body1">Documento de Identificación: {data.documentoIdentificacion}</Typography>
              <Typography variant="body1">Género: {data.genero}</Typography>
            </Box>
          </Box>
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
                {data.vacunas.map((vacuna, index) => (
                  <TableRow key={index}>
                    <TableCell>{vacuna.vacuna}</TableCell>
                    <TableCell>{vacuna.fecha}</TableCell>
                    <TableCell>{vacuna.dosis}</TableCell>
                    <TableCell>{vacuna.fabricante}</TableCell>
                    <TableCell>{vacuna.lugar}</TableCell>
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