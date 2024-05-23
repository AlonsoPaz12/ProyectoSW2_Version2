import React from 'react';
import styles from "./ProfileCard.module.css";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosArrowDown } from "react-icons/io";

const ProfileCard = () =>{

    return(
        <div className={styles.container}>
            <div className={styles.top}>
                <FaCircleUser size={'30px'} color='#014433'/>
                <p style={{margin: '0', marginLeft:'2px', fontSize: '14px', color:'#014433'}}><b>GIANELLA ARIANA CARRIÓN MENDOZA</b></p>
                <IoIosArrowDown size={'30px'} color='#014433'/>
            </div>
            <p style={{marginTop: '28px', marginLeft:'10px', fontSize: '14px', color:'#014433'}}>Mi perfil</p>
            <p style={{margin: '0', marginLeft:'10px', fontSize: '14px', color:'#014433'}}>Cerrar sesión</p>
            
        </div>
    )
}


export default ProfileCard