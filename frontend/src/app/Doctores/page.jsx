'use client';

import { React, useState } from "react";
import ResponsiveAppBar from '@/components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import styles from './page.module.css';
import Banner from '@/components/Banner/Banner.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Buscador from "@/components/Buscador/Buscador";
import ListaDoctores from "@/components/ListaDoctores/ListaDoctores";

const VerMedicos = () => {
  const [inputText, setInputText] = useState("");

  const handleSearchInputChange = (value) => {
    setInputText(value);
  };

  return (
    <div className={styles.container}>
      
      <ResponsiveAppBar/>
      
      <Banner pageTitle="NUESTROS MÉDICOS" parrafo="Contamos con los mejores profesionales para
      cuidar de ti y tu familia. ¡Agenda una cita hoy
      mismo!" imagen="/img/doctores2.png"/>

      <Buscador onChange={handleSearchInputChange} label={"Buscar médico por nombre o especialidad"} />

      <ListaDoctores input={inputText} />

      <Footer/>

    </div>
  );
};

export default VerMedicos;
