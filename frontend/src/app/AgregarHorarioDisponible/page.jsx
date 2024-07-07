'use client'

import React, { useState, useEffect } from 'react';
import styles from './page.module.css';
import { useRouter } from 'next/navigation';
import axios from 'axios';


const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"];
const hours = Array.from({ length: 12 }, (_, i) => `${i + 8}:00 - ${i + 9}:00`);

const AgregarHorarioDisponible = () => {
    const [selectedSlots, setSelectedSlots] = useState({});
    const [medicoId, setMedicoId] = useState(null);
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

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem('usuario'));

        if (storedUser) {
            setMedicoId(storedUser.medico.id);
        } else {
            console.error('No se encontró información del doctor en localStorage');
        }
    }, []);

    useEffect(() => {
        const fetchHorarios = async () => {
            
            
            try{
                const response = await axios.get(`http://localhost:3000/horas-disponibles/${medicoId}`)
                const horarios = response.data;
                const slots = {};

                horarios.forEach(horario => {
                    if (!slots[horario.diaSemana]) {
                        slots[horario.diaSemana] = {};
                    }
                    slots[horario.diaSemana][`${horario.horaInicio} - ${horario.horaFin}`] = true;
                });

                setSelectedSlots(slots);
            } catch (error) {
                console.error('Error fetching horarios', error);
            }

        };
        fetchHorarios();
    }, [medicoId])

    const handleSave = async () => {
        //ga
        const horarios = [];
        Object.keys(selectedSlots).forEach(day => {
            Object.keys(selectedSlots[day]).forEach(hour => {
                horarios.push({
                    diaSemana: day,
                    horaInicio: hour.split(' - ')[0],
                    horaFin: hour.split(' - ')[1],
                    seleccionado: selectedSlots[day][hour]
                });
            });
        });

        
        try{
            const response = await axios.post(`http://localhost:3000/horas-disponibles/${medicoId}`,{horarios});
            if (response.status === 201 || response.status === 200){
                alert('horarios gabados con exito');
            }else{
                alert('error')
            }
        }catch{
            alert('error al grabar horarios')
            console.log(console.error)
        }
        
        
        console.log('ID medico', medicoId)
        console.log('se envia al back esto: ', horarios)
        console.log('horarios seleccionados', selectedSlots);
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