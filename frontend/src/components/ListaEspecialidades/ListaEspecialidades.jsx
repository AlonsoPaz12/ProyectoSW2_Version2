import { React } from 'react'
import data from "@/data/especialidades.JSON"
import styles from "./ListaEspecialidades.module.css"
import EspecialidadCard from '../EspecialidadCard/EspecialidadCard';

function ListaDoctores(props) {

    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredData = data.filter((el) => {
        const searchTerm = props.input.toLowerCase();
        const especialidadName = normalizeString(el.nombre);
        const searchWithAccents = normalizeString(searchTerm);
        
        return (
            especialidadName.includes(searchWithAccents)
        );
    });

    return (
        <ul className={styles.container}>
            {filteredData.map((especialidad) => (
                <EspecialidadCard key={especialidad.id} especialidad={especialidad} />
            ))}
        </ul>
    )
}

export default ListaDoctores
