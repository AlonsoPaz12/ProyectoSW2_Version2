import * as React from 'react';
import styles from './EspecialidadCard.module.css';
import { BsFillHeartPulseFill } from "react-icons/bs";
import { GiHandBandage, GiBrain, GiAcidTube, GiBrokenBone } from "react-icons/gi";
import { LuBaby } from "react-icons/lu";
import { FaEye, FaHeadSideMask, FaHospital, FaTooth } from "react-icons/fa";
import { RiWomenLine, RiMenLine, RiMentalHealthFill } from "react-icons/ri";
import { MdBloodtype, MdFastfood } from "react-icons/md";

const EspecialidadCard = ({ especialidad }) => {
  const iconos = {
    Cardiología: <BsFillHeartPulseFill />,
    Dermatología: <GiHandBandage />,
    Pediatría: <LuBaby />,
    Oftalmología: <FaEye />,
    Ginecología: <RiWomenLine />,
    Neurología: <GiBrain />,
    Urología: <RiMenLine />,
    Endocrinología: <GiAcidTube />,
    Oncología: <FaHeadSideMask />,
    Traumatología: <GiBrokenBone />,
    Hematología: <MdBloodtype />,
    Psiquiatría: <RiMentalHealthFill />,
    Nutrición: <MdFastfood />,
    "Cirugía General": <FaHospital />,
    Odontología: <FaTooth />
  };

  const iconoContainerStyle = {
    backgroundColor: especialidad.color,
    color: "white", 
    fontSize: "40px" 
  };

  return (
    <div className={styles.especialidadItem}>
      <div className={styles.especialidadIconoContainer} style={iconoContainerStyle}>
        {iconos[especialidad.nombre]}
      </div>
      <span className={styles.especialidadNombre}>{especialidad.nombre}</span>
    </div>
  );
};

export default EspecialidadCard;