import { CrearVacunaDto } from "src/vacunas/dto/vacuna.dto";

export const defaultVacunas: CrearVacunaDto[] = [
    {
        nombre: "BCG",
        fecha: new Date('2023-01-15'),
        dosis: 1, 
        fabricante: "Instituto Serum de India",
        lugarDeVacunacion: "Hospital Nacional Arzobispo Loayza, Lima", 
        medicos:[1,5],
        pacientes:[1,3]
    },
    {
        nombre: "Hepatitis B",
        fecha: new Date('2023-02-20'),
        dosis: 1, 
        fabricante: "GlaxoSmithKline",
        lugarDeVacunacion: "Clínica Internacional, Lima", 
        medicos:[5,2,6],
        pacientes:[2,6,3]
    },
    {
        nombre: "DTP",
        fecha: new Date('2023-03-10'),
        dosis: 2, 
        fabricante: "Sanofi Pasteur",
        lugarDeVacunacion: "Hospital Edgardo Rebagliati Martins, Lima", 
        medicos:[4,6,8],
        pacientes:[4,3,9]
    },
    {
        nombre: "Polio",
        fecha: new Date('2023-04-05'),
        dosis: 2, 
        fabricante: "Pfizer",
        lugarDeVacunacion: "Clínica Ricardo Palma, Lima", 
        medicos:[1,9],
        pacientes:[6,7]
    },
    {
        nombre: "Hib",
        fecha: new Date('2023-05-12'),
        dosis: 1, 
        fabricante: "Merck & Co.",
        lugarDeVacunacion: "Hospital Nacional Dos de Mayo, Lima", 
        medicos:[2,6],
        pacientes:[5,2]
    },
    {
        nombre: "Rotavirus",
        fecha: new Date('2023-06-18'),
        dosis: 1, 
        fabricante: "Johnson & Johnson",
        lugarDeVacunacion: "Clínica San Borja, Lima", 
        medicos:[1,2,3],
        pacientes:[4,6,9]
    },
    {
        nombre: "Neumococo",
        fecha: new Date('2023-07-24'),
        dosis: 1, 
        fabricante: "Pfizer",
        lugarDeVacunacion: "Hospital de Emergencias José Casimiro Ulloa, Lima", 
        medicos:[2,6],
        pacientes:[7,9]
    },
    {
        nombre: "Influenza",
        fecha: new Date('2023-08-30'),
        dosis: 1, 
        fabricante: "Sanofi Pasteur",
        lugarDeVacunacion: "Clínica Anglo Americana, Lima", 
        medicos:[1, 5],
        pacientes:[2, 4]
    },
    {
        nombre: "Sarampión",
        fecha: new Date('2023-09-14'),
        dosis: 1, 
        fabricante: "Merck & Co.",
        lugarDeVacunacion: "Hospital María Auxiliadora, Lima", 
        medicos:[3,6],
        pacientes:[9,1]
    }
]