'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, Grid, Paper, IconButton, Typography } from '@mui/material';
import Calendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import pacientesData from "@/data/usuarios.JSON";

import SideNavBarDoctor from '@/components/SideNavBarDoctor/SideNavBarDoctor';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import { addMonths, addYears, subMonths, subYears, format } from 'date-fns';
import { es } from 'date-fns/locale';

import styles from './page.module.css';

const Calendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [eventDetail, setEventDetail] = useState([]);
  const calendarRef = useRef(null);

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.gotoDate(currentDate);
    }
  }, [currentDate]);

  const handlePrev = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const handleNext = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handlePrevYear = () => {
    setCurrentDate(subYears(currentDate, 1));
  };

  const handleNextYear = () => {
    setCurrentDate(addYears(currentDate, 1));
  };

  const handleDateClick = (info) => {
    const clickedDate = new Date(info.dateStr + 'T00:00:00');
    const citas = citasDoctor(clickedDate);
    setEventDetail(citas);
  };

  const citasDoctor = (fecha) => {
    const citas = [
      {
        id: "C001",
        fecha: fecha,
        hora: "10:00",
        paciente: "P001"
      },
      {
        id: "C002",
        fecha: fecha,
        hora: "11:00",
        paciente: "P002"
      },
      {
        id: "C003",
        fecha: fecha,
        hora: "14:00",
        paciente: "P003"
      }
    ];

    const citasFiltradas = citas.map(cita => ({
      ...cita,
      paciente: pacientesData.find(paciente => paciente.id === cita.paciente)
    }));

    return citasFiltradas;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('es-ES', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <Box className={styles.mainContainer}>
      <SideNavBarDoctor />
      <Box className={styles.contentContainer}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Paper className={styles.calendarContainer}>
              <Typography variant="h4" component="h2" className={styles.calendarTitle}>Calendario</Typography>
              <Grid container justifyContent="center" alignItems="center" spacing={2} className={styles.buttonContainer}>
                <Grid item>
                  <IconButton onClick={handlePrevYear} className={styles.navButton}><ArrowBackIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={handlePrev} className={styles.navButton}><ArrowBackIcon /></IconButton>
                </Grid>
                <Grid item>
                  <Typography variant="h6" className={styles.calendarYear}>
                    {format(currentDate, 'MMMM yyyy', { locale: es })}
                  </Typography>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleNext} className={styles.navButton}><ArrowForwardIcon /></IconButton>
                </Grid>
                <Grid item>
                  <IconButton onClick={handleNextYear} className={styles.navButton}><ArrowForwardIcon /></IconButton>
                </Grid>
              </Grid>
              <Calendar
                ref={calendarRef}
                plugins={[dayGridPlugin, interactionPlugin]}
                initialView="dayGridMonth"
                weekends={true}
                events={eventDetail.map((cita) => ({
                  title: `${cita.paciente.nombres} ${cita.paciente.apePaterno}`,
                  start: new Date(cita.fecha + 'T' + cita.hora),
                  allDay: false
                }))}
                dateClick={handleDateClick}
                headerToolbar={{
                  left: '',
                  center: 'title',
                  right: ''
                }}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                initialDate={currentDate}
                
              />
            </Paper>
          </Grid>
          <Grid item xs={12} md={8}>
            <Paper className={styles.detailsContainer}>
              <Typography variant="h4" component="h3" className={styles.detailsTitle}>Citas del Doctor</Typography>
              {eventDetail.length > 0 ? (
                eventDetail.map((cita, index) => (
                  <div key={cita.id} className={styles.citaItem}>
                    {index === 0 && <div className={styles.citaFecha}>Fecha: {formatDate(cita.fecha)}</div>}
                    <div className={styles.citaHora}>Hora: {cita.hora}</div>
                    <div className={styles.citaPaciente}>Paciente: {cita.paciente.nombres} {cita.paciente.apePaterno}</div>
                  </div>
                ))
              ) : (
                <Typography>No hay citas para la fecha seleccionada.</Typography>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default Calendario;

