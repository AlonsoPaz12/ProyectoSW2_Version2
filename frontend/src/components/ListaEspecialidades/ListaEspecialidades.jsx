// src/components/ListaEspecialidades/ListaEspecialidades.jsx

"use client";

import { useEffect, useState } from "react";
import { getSpecialties } from "../../services/especialidades";
import TextField from "@mui/material/TextField";
import styles from "./ListaEspecialidades.module.css";

import * as Icons from "react-icons/fa";

function ListaEspecialidades() {
  const [specialties, setSpecialties] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function fetchSpecialties() {
      const data = await getSpecialties();
      setSpecialties(data);
    }
    fetchSpecialties();
  }, []);

  const normalize = (str) =>
    str
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");

  const filteredSpecialties = specialties.filter((specialty) =>
    new RegExp(`\\b${normalize(search)}`, "i").test(
      normalize(specialty.nombre_especialidad)
    )
  );

  const getIconComponent = (iconName) => {
    const IconComponent = Icons[iconName];
    return IconComponent ? <IconComponent /> : <Icons.FaRegUser />;
  };

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
          label={"Buscar especialidad..."}
        />
      </div>

      <div className={styles.container}>
        {filteredSpecialties.map((specialty) => (
          <div className={styles.especialidadItem}>
            <div
              style={{
                backgroundColor: specialty.color,
                borderRadius: "50%",
                width: "80px",
                height: "80px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                color: "white",
                fontSize: "40px",
              }}
            >
              {getIconComponent(specialty.icono)}
            </div>
            <span className={styles.especialidadNombre}>
              {specialty.nombre_especialidad}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ListaEspecialidades;
