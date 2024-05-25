'use client'

import React, { useState } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';


const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00 - ${i + 9}:00`);

const AgregarHorarioDisponible = () => {
    const [selectedSlots, setSelectedSlots] = useState({});
    const router = useRouter();
    const toggleSlot = (day, hour) => {
        setSelectedSlots(prevState => ({
            ...prevState,
            [day]: {
                ...prevState[day],
                [hour]: !prevState[day]?.[hour]
            }
        }));
    };

    const handleSave = () => {
        //ga
        console.log('horarios seleccionados', selectedSlots);
        alert('Horarios grabados con exito')
    }

    return (
        <div className={styles.container}>
            <header className={styles.header}>
            <img
            width="60"
            height="50"
            src="/img/logo.png"
            />
            <div className={styles.logo}>MEDCONTROL+</div>
                <h2>Agregar Horario Disponible</h2>
            </header>
            <div className={styles.schedule}>
                {daysOfWeek.map(day => (
                    <div key={day} className={styles.dayColumn}>
                        <h3>{day}</h3>
                        {hours.map(hour => (
                            <div
                                key={hour}
                                className={`${styles.hourBlock} ${selectedSlots[day]?.[hour] ? styles.selected : ''}`}
                                onClick={() => toggleSlot(day, hour)}
                            >
                                {hour}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
            <button className={styles.saveButton} onClick={handleSave}>Grabar</button>
        </div>
    );
};

export default AgregarHorarioDisponible;