'use client';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './page.js'
import ProximasCitas from './ProximasCitas/page.jsx';
import HistorialCitas from './HistorialCitas/page.jsx';
import Laboratorio from './LabAnalisis/page.jsx';
import Perfil from './VisualizacionDePerfil/page.jsx';


function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ProximasCitas" element={<ProximasCitas />} />
        <Route path="/HistorialCitas" element={<HistorialCitas />} />
        <Route path="/LabAnalisis" element={<Laboratorio />} />
        <Route path="/VisualizacionDePerfil" element={<Perfil />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;