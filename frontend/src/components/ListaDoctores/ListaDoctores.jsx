// src/components/ListaDoctores/ListaDoctores.jsx

"use client";

import React, { useEffect, useState } from "react";
import { getDoctors } from "../../services/medicos";

import styles from "./ListaDoctores.module.css";

import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IoDocumentAttachSharp } from "react-icons/io5";

function ListaDoctores() {
  const [medicos, setMedicos] = useState([]);
  const [search, setSearch] = useState("");

  const [open, setOpen] = React.useState(false);

  const [selectedDoctor, setSelectedDoctor] = useState(null);

  const handleOpen = (doctor) => {
    setSelectedDoctor(doctor);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedDoctor(null);
    setOpen(false);
  };

  useEffect(() => {
    async function fetchMedicos() {
      const data = await getDoctors();
      setMedicos(data);
    }
    fetchMedicos();
  }, []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredMedicos = medicos.filter((doctor) =>
    new RegExp(`\\b${normalize(search)}`, "i").test(
      normalize(`${doctor.nombres} ${doctor.apePaterno} ${doctor.apeMaterno}`)
    )
  );

  return (
    <div>
      <div className={styles.searchContainer}>
        <TextField
          className={styles.textField}
          id="outlined-basic"
          size="small"
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
          color="success"
          fullWidth
          InputProps={{ style: { backgroundColor: "white" } }}
          label={"Buscar Médico..."}
        />
      </div>

      <div className={styles.container}>
        {filteredMedicos.map((doctor) => (
          <div className={styles.contenido}>
            <img className={styles.imagenDoctor} src={doctor.imageurl} />

            <div className={styles.informacion}>
              <div className={styles.datos}>
                <h5>
                  {doctor.nombres} {doctor.apePaterno} {doctor.apeMaterno}
                </h5>
                <p>{doctor.especialidad.nombre_especialidad}</p>
              </div>
              <div className={styles.icon}>
                <IoDocumentAttachSharp
                  onClick={() => handleOpen(doctor)}
                  size="1.5em"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedDoctor && (
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box
            sx={{
              justifyContent: "center",
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: "fit-content",
              bgcolor: "background.paper",
              border: "2px solid #00916E",
              textAlign: "center",
              boxShadow: 24,
              p: 4,
            }}
          >
            <div className={styles.contenidoModal}>
              <div className={styles.contenidoDatosImportantes}>
                <img
                  className={styles.imagenDoctorModal}
                  src={selectedDoctor.imageurl}
                  alt={`${selectedDoctor.nombres} ${selectedDoctor.apePaterno}`}
                />
                <div className={styles.datosPersonales}>
                  <Typography
                    sx={{
                      color: "#00916E",
                      fontWeight: "bold",
                      fontSize: "1.5em",
                      lineHeight: "25px",
                    }}
                  >
                    {`${selectedDoctor.nombres} ${selectedDoctor.apePaterno} ${selectedDoctor.apeMaterno}`}
                  </Typography>
                  <Typography id="modal-modal-especialidad" sx={{ mt: 1 }}>
                    <span className={styles.subtitulo}>Especialidad:</span>{" "}
                    {selectedDoctor.especialidad
                      ? selectedDoctor.especialidad.nombre_especialidad
                      : "N/A"}
                  </Typography>
                  <Typography id="modal-modal-cmp" sx={{ mt: 1 }}>
                    <span className={styles.subtitulo}>CMP:</span>{" "}
                    {selectedDoctor.numeroDocumento}
                  </Typography>
                  <Typography id="modal-modal-educacion" sx={{ mt: 1 }}>
                    <span className={styles.subtitulo}>Centro Médico:</span>{" "}
                    {selectedDoctor.centroMedico}
                  </Typography>
                  <Typography id="modal-modal-correo" sx={{ mt: 1 }}>
                    <span className={styles.subtitulo}>Correo:</span>{" "}
                    {selectedDoctor.correoElectronico}
                  </Typography>
                  <Typography id="modal-modal-celular" sx={{ mt: 1 }}>
                    <span className={styles.subtitulo}>Celular:</span>{" "}
                    {selectedDoctor.numCelular}
                  </Typography>
                </div>
              </div>
            </div>
          </Box>
        </Modal>
      )}
    </div>
  );
}

export default ListaDoctores;
