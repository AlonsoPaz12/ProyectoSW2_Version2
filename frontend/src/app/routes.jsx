'use client';
import dynamic from 'next/dynamic';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page.js'
import Nosotros from './Nosotros/page.jsx';
import Doctores from './Doctores/page.jsx';
import Especialidades from './Especialidades/page.jsx';
import ProximasCitas from './ProximasCitas/page.jsx';
import HistorialCitas from './HistorialCitas/page.jsx';
import Laboratorio from './LabAnalisis/page.jsx';
import Perfil from './VisualizacionDePerfil/page.jsx';
import AgendarCitaElegirDoctor from './AgendarCitaElegirDoctor/page.jsx';
import AgendarCitaElegirHorario from './AgendarCitaElegirHorario/page.jsx';
import AgregarHorarioDisponible from './AgregarHorarioDisponible/page.jsx';
import ImagenesMedicas from './ImagenesMedicas/page.jsx';
import IniciarSesion from './IniciarSesion/page.jsx';
import Registro from './Registro/page.jsx';
import Calendario from './Calendario/page.jsx';
import Vacunas from './Vacunas/page.jsx';
import GenerarInforme from './GenerarInformes/page.jsx';

import ProximasCitasDoctor from './ProximasCitasDoctor/page.jsx';
import HistorialCitasDoctor from './HistorialCitasDoctor/page.jsx';
import DetallesCita from './DetallesCita/page.jsx';
import DetallesPaciente from './DetallesPaciente/page.jsx';
import Pacientes from './Pacientes/page.jsx';
import CalendarioDoctor from './CalendarioDoctor/page.jsx';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Nosotros" element={<Nosotros />} />
        <Route path="/Doctores" element={<Doctores />} />
        <Route path="/Especialidades" element={<Especialidades />} />
        <Route path="/ProximasCitas" element={<ProximasCitas />} />
        <Route path="/HistorialCitas" element={<HistorialCitas />} />
        <Route path="/LabAnalisis" element={<Laboratorio />} />
        <Route path="/VisualizacionDePerfil" element={<Perfil />} />
        <Route path="/AgendarCitaElegirDoctor" element={<AgendarCitaElegirDoctor />} />
        <Route path="/AgendarCitaElegirHorario" element={<AgendarCitaElegirHorario/>} />
        <Route path="/AgregarHorarioDisponible" element={<AgregarHorarioDisponible />} />
        <Route path="/ImagenesMedicas" element={<ImagenesMedicas />} />
        <Route path="/Iniciar Sesión" element={<IniciarSesion />} />
        <Route path="/Registrarse" element={<Registro />} />
        <Route path="/Calendario" element={<Calendario />} />
        <Route path="/Vacunas" element={<Vacunas />} />
        <Route path="/GenerarInforme" element={<GenerarInforme />} />
        
        <Route path="/ProximasCitasDoctor" element={<ProximasCitasDoctor />} />
        <Route path="/HistorialCitasDoctor" element={<HistorialCitasDoctor />} />
        <Route path="/DetallesCita/:id" element={<DetallesCita />} />
        <Route path="/Pacientes" element={<Pacientes />} />
        <Route path="/DetallesPaciente/:id" element={<DetallesPaciente />} />
        <Route path="/CalendarioDoctor" element={<CalendarioDoctor />} />

      </Routes>
    </Router>
  );
}

export default dynamic(() => Promise.resolve(AppRoutes), { ssr: false });