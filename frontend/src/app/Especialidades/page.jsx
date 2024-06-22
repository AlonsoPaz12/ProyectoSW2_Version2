'use client';

import { React, useState } from "react";
import styles from './page.module.css';
import BannerFactory from '@/components/Banner/BannerFactory';
import Footer from '@/components/Footer/Footer.jsx';
import ListaEspecialidades from "@/components/ListaEspecialidades/ListaEspecialidades";
import ResponsiveAppBar from "@/components/ResponsiveAppBar/ResponsiveAppBar";

const Especialidades = () => {
  const [inputText, setInputText] = useState("");

  const handleSearchInputChange = (value) => {
    setInputText(value)
  };

  const bannerFactory = new BannerFactory();

  return (
    <div className={styles.container}>
      <ResponsiveAppBar/>

      {bannerFactory.createBanner('style1', {
        pageTitle: "NUESTRAS ESPECIALIDADES",
        parrafo: "Descubre nuestra gama de especialidades médicas diseñadas para cuidar de ti de manera integral.",
        imagen: "/img/doctores1.png",
      })}
         
      <ListaEspecialidades/>

      <Footer />
    </div>
  );
};

export default Especialidades;

