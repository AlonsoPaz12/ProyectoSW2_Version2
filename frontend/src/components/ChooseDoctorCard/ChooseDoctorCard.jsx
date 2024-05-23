'use client';

import styles from './ChooseDoctorCard.module.css';
import { FaHeart } from "react-icons/fa";

const ChooseDoctorCard = () => {
  return (
    <div className={styles.container}>
        <img src="https://i.ibb.co/b6SDFTN/01.jpg" alt="foto" height="200px" width="200px" style={{borderRadius: "10px"}}/>
        <div style={{width: '100%', display: 'flex',flexGrow: '1'}}>
            <div style={{ alignContent: 'center', width: '70%', paddingLeft: '20px'}}>
                <h5>Dr. a</h5>
                <p>Specialist Cardiologist</p>
                <p>CPM 47569</p>
            </div>
            <div style={{width: '30%', display: 'flex', justifyContent: 'center', paddingTop: '40px'}}>
                <FaHeart className={styles.botonfav} />  
            </div>
        </div>
    </div>
  );
};

export default ChooseDoctorCard;