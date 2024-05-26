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
      </Routes>
    </Router>
  );
}

export default dynamic(() => Promise.resolve(AppRoutes), { ssr: false });