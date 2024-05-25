'use client';

import { React } from "react";

import ResponsiveAppBar from "@/components/ResponsiveAppBar/ResponsiveAppBar";
import BannerFactory from '@/components/Banner/BannerFactory';
import Footer from '@/components/Footer/Footer.jsx';

import styles from './page.module.css';

import { GiMicroscope, GiLovers } from "react-icons/gi";
import { FaUserDoctor, FaShieldHalved } from "react-icons/fa6";
import { GoLaw } from "react-icons/go";
import { FaMedal, FaCheckCircle, FaHospital } from "react-icons/fa";
import { SiTrustpilot } from "react-icons/si";

const Nosotros = () => {
  
  const bannerFactory = new BannerFactory();

  return (
    <div className={styles.container}>
      <ResponsiveAppBar/>

      {bannerFactory.createBanner('style2', {
        pageTitle: "NOSOTROS",
      })}

      <div className={styles.clinicInfo}>
        <p className={styles.clinicInfoTitle}>Somos una clínica, con la tecnología más moderna y el Staff médico más comprometido con la salud de nuestros pacientes y la de su familia.</p>

        <div className={styles.clinicItems}>
          <div className={styles.infoItem}>
            <FaHospital className={styles.infoItemIcon}/>
            <p className={styles.infoItemP}>Infraestructura</p>
          </div>
          <div className={styles.infoItem}>
            <GiMicroscope className={styles.infoItemIcon}/>
            <p className={styles.infoItemP}>Tecnología</p>
          </div>
          <div className={styles.infoItem}>
            <FaUserDoctor className={styles.infoItemIcon}/>
            <p className={styles.infoItemP}>Staff Médico</p>
          </div>
        </div>
      </div>

      {bannerFactory.createBanner('style3', {
        titulo1: "Visión", 
        titulo2: "Misión", 
        parrafo1: "Ser la Red de servicios de salud privada de referencia en el país.",
        parrafo2:"Hacer sentir a nuestros pacientes que su salud está en las mejores manos, combinando la excelencia en nuestro servicio con nuestra pasión por la salud y la innovación permanente de procedimientos médicos.", 
        imagen:"/img/bannerNosotros.png",
      })}

      <div className={styles.valoresSection}>
        <h2 className={styles.valoresTitle}>VALORES</h2>
        <div className={styles.valoresContainer}>
          <div className={styles.valorItem}>
            <GoLaw className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Ética</h3>
            <p className={styles.valorDescription}>
              Ser un modelo de conducta inspirado a los demás para que lo mejor de sí y cumplir con las normas.
            </p>
          </div>
          <div className={styles.valorItem}>
            <GiLovers className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Respeto</h3>
            <p className={styles.valorDescription}>
              Escuchar y estar dispuesto a aprender de las experiencias, opiniones y habilidades de las demás.
            </p>
          </div>
        
          <div className={styles.valorItem}>
            <FaMedal className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Excelencia</h3>
            <p className={styles.valorDescription}>
              Comprometerse a brindar servicios de calidad excepcional, promoviendo la investigación y generación de ideas y soluciones innovadoras.
            </p>
          </div>
          
          <div className={styles.valorItem}>
            <FaShieldHalved className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Seguridad</h3>
            <p className={styles.valorDescription}>
              Velar por la integridad del paciente y de los compañeros de trabajo.
            </p>
          </div>
        
          <div className={styles.valorItem}>
            <FaCheckCircle className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Veracidad</h3>
            <p className={styles.valorDescription}>
              Proveer información transparente, oportuna y ligera en todo momento y lugar.medalla
            </p>
          </div>
          
          <div className={styles.valorItem}>
            <SiTrustpilot className={styles.valorIcon} />
            <h3 className={styles.valorTitle}>Confianza</h3>
            <p className={styles.valorDescription}>
              Inspirar y mantener la confianza de nuestros pacientes mediante la ejecución de las mejores prácticas hospitalarias.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Nosotros;

