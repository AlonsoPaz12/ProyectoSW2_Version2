'use client';

import { React, useState } from "react";
import styles from './page.module.css';
import Banner from '@/components/Banner/Banner.jsx';
import Footer from '@/components/Footer/Footer.jsx';
import Buscador from "@/components/Buscador/Buscador";
import ListaEspecialidades from "@/components/ListaEspecialidades/ListaEspecialidades";
import ResponsiveAppBar from "@/components/ResponsiveAppBar/ResponsiveAppBar";

const Especialidades = () => {
  const [inputText, setInputText] = useState("");

  const handleSearchInputChange = (value) => {
    setInputText(value);
  };


  return (
    <div className={styles.container}>
      <ResponsiveAppBar/>
      
      <Banner
        pageTitle="NUESTRAS ESPECIALIDADES"
        parrafo="Descubre nuestra gama de especialidades médicas diseñadas para cuidar de ti de manera integral."
        imagen="/img/doctores1.png"
      />

      <Buscador onChange={handleSearchInputChange} label={"Buscar especialidad por nombre"} />
     

      <ListaEspecialidades input={inputText}/>

      <Footer />
    </div>
  );
};

export default Especialidades;

