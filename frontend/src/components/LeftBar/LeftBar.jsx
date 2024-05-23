import React from 'react';
import styles from "./LeftBar.module.css";
import LeftBarButton from '../LeftBarButton/LeftBarButton';
import { FaFileImport } from "react-icons/fa";
import { MdOutlineHistory } from "react-icons/md";
import { PiPillFill } from "react-icons/pi";
import { IoCalendar } from "react-icons/io5";
import { MdScience } from "react-icons/md";
import { FaXRay } from "react-icons/fa6";
import { TbVaccine } from "react-icons/tb";
import { IoIosPaper } from "react-icons/io";
import CustomLink from '../CustomLink/CustomLink';

const LeftBar = () => {
  return (
    <div className={styles.container}>
        <div className={styles.cabecera}>
            <img src='/img/logo.png' height='45' width='50'></img>
            <span className={styles.nombreLogo}>MedControl+</span>
        </div>
        <LeftBarButton texto={"Próximas citas"} componente={<FaFileImport />} />
        <LeftBarButton texto={"Historial de citas"} componente={<MdOutlineHistory />}/>
        <LeftBarButton texto={"Medicamentos"} componente={<PiPillFill />}/>
        <LeftBarButton texto={"Calendario"} componente={<IoCalendar />}/>
        <LeftBarButton texto={"Laboratorio"} componente={<MdScience />}/>
        <LeftBarButton texto={"Imágenes"} componente={<FaXRay />}/>
        <LeftBarButton texto={"Vacunas"} componente={<TbVaccine />}/>
        <LeftBarButton texto={"Generar informe"} componente={<IoIosPaper />}/>
    </div>
  );
};

export default LeftBar;