import React from 'react';
import styles from "./ProxCitasCard.module.css";
import Button from 'react-bootstrap/Button';
import { FaHeart } from "react-icons/fa";
import { CiCalendar } from "react-icons/ci";
import { FaRegClock } from "react-icons/fa6";

const ProxCitasCard = () => {
  return (
    <div className={styles.container}>
      <div className={styles.topcard}>
        <img src="https://i.ibb.co/b6SDFTN/01.jpg" alt="foto" height="80px" style={{borderRadius: "10px"}}/>
        <div>
          <div style={{display: 'flex'}}>
            <div style={{marginLeft: '12px'}}>
              <h6 style={{margin: '0'}}>Dr. Juan Romero</h6>
              <p style={{fontSize: '10px'}}>Cardiología</p>
            </div> 
            <FaHeart className={styles.botonfav} style={{marginTop: '10px', marginLeft: '50px'}}/>   
          </div>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <CiCalendar size={'25'} color='#00916E' style={{marginLeft: '10px'}}/>
            <p style={{margin: '0', marginTop:'1px', fontSize: '12px', marginLeft: '4px'}}>23 Mar</p>
            <FaRegClock size={'20'} color='#00916E' style={{marginLeft: '80px'}}/>
            <p style={{margin: '0', marginTop:'1px', fontSize: '12px', marginLeft: '4px'}}>16:00</p>
          </div>
        </div>
      </div>
      <hr style={{marginBottom: '0'}} />
      <div className={styles.bottomcard}>
        <Button className={styles.botonReprogramar} variant="success">Preprogramar</Button>
        <Button className={styles.botonAnular} variant="outline-danger">Anular</Button>
      </div>
    </div>
  );
};

export default ProxCitasCard;