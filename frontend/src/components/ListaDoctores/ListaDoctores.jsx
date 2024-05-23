import { React } from 'react'
import data from "@/data/doctors.JSON"
import styles from "./ListaDoctores.module.css"
import DoctorCard from '../DoctorCard/DoctorCard'

function ListaDoctores(props) {
    const normalizeString = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
    };

    const filteredData = data.filter((el) => {
        const searchTerm = props.input.toLowerCase();
        const doctorName = normalizeString(el.nombre);
        const doctorSpecialty = normalizeString(el.especialidad);
        const searchWithAccents = normalizeString(searchTerm);
        
        return (
            doctorName.includes(searchWithAccents) ||
            doctorSpecialty.includes(searchWithAccents)
        );
    });

    return (
        <ul className={styles.container}>
            {filteredData.map((doctor) => (
                <DoctorCard key={doctor.id} doctor={doctor} />
            ))}
        </ul>
    )
}

export default ListaDoctores