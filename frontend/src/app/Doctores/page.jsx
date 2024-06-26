'use client';

import { React, useState } from "react";
import ResponsiveAppBar from '@/components/ResponsiveAppBar/ResponsiveAppBar.jsx';
import styles from './page.module.css';
import BannerFactory from '@/components/Banner/BannerFactory';
import Footer from '@/components/Footer/Footer.jsx';
import ListaDoctores from "@/components/ListaDoctores/ListaDoctores";

const VerMedicos = () => {
  const [inputText, setInputText] = useState("");

  const handleSearchInputChange = (value) => {
    setInputText(value);
  };

  const bannerFactory = new BannerFactory();

  return (
    <div className={styles.container}>
      
      <ResponsiveAppBar/>

      {bannerFactory.createBanner('style1', {
        pageTitle: "NUESTROS MÉDICOS",
        parrafo: "Contamos con los mejores profesionales para cuidar de ti y tu familia. ¡Agenda una cita hoy mismo!",
        imagen: "/img/doctores2.png",
      })}
      
      <ListaDoctores/>

      <Footer/>

    </div>
  );
};

export default VerMedicos;
