'use client';

import React from 'react';
import styles from './Footer.module.css';
import { FaMapMarkerAlt, FaPhoneAlt, FaGithub, FaFacebook } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiYoutubemusic,  } from "react-icons/si";
import { AiFillTwitterCircle } from "react-icons/ai";

const Footer = () => {
    return (
        <footer className={styles.contenido}>

            <div className={styles.column}>
                <h5 className={styles.title}>Contacto</h5>
                <li className={styles.elem}><FaMapMarkerAlt/> Avenida Principal 123, Lima, Perú </li>
                <li className={styles.elem}><MdEmail/> info@medcontrol.com</li>
                <li className={styles.elem}><FaPhoneAlt/> (01) 458-7692</li>
            </div>

            <div className={styles.column}>
                <h5 className={styles.title}>Acerca de</h5>
                <li className={styles.elem}>Nosotros</li>
                <li className={styles.elem}>Especialidades</li>
                <li className={styles.elem}>Personal médico</li>
            </div>

            <div className={styles.column}>
                <h5 className={styles.title}>Legal</h5>
                <li className={styles.elem}>Libro de reclamaciones</li>
                <li className={styles.elem}>Política de privacidad</li>
                <li className={styles.elem}>Términos de servicio</li>
            </div>

            <div className={styles.column}>
                <h5 className={styles.title}>Siguenos</h5>
                <div className={styles.listIcon}>
                    <li className={styles.socialIcon}><FaGithub size="2em"/></li>
                    <li className={styles.socialIcon}><FaFacebook size="2em"/></li>
                    <li className={styles.socialIcon}><SiYoutubemusic size="2em"/></li>
                    <li className={styles.socialIcon}><AiFillTwitterCircle size="2em"/></li>
                </div>
                
            </div>

        </footer>
    );
};
export default Footer