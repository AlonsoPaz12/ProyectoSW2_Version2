import { ImagenMedica } from '../imagenes-medicas/imagenes-medicas.entity';
import { Paciente } from "src/pacientes/pacientes.entity";
import { Medico } from "src/medicos/medicos.entity";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";
import { Column, Entity, JoinColumn, OneToOne, ManyToOne, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Cita } from 'src/citas/citas.entity';

@Entity()
export class OrdenMedica {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    observacion: string;

    @OneToOne(() => ResultadoLab, { nullable: true })
    @JoinColumn()
    resultadoLaboratorio: ResultadoLab;

    @OneToOne(() => ImagenMedica, { nullable: true })
    @JoinColumn()
    imagenMedica: ImagenMedica;

    @ManyToOne(() => Medico, medico => medico.ordenes)
    @JoinColumn({ name: 'medico_id' })
    medico: Medico;

    @ManyToOne(() => Paciente, paciente => paciente.ordenesMedicas)
    @JoinColumn({ name: 'paciente_id' })
    paciente: Paciente;

    @OneToOne(() => Cita, cita => cita.ordenMedica, { nullable: true })
    @JoinColumn({ name: 'cita_id' })
    cita: Cita | null;

    @OneToMany(() => ImagenMedica, imagen => imagen.orden)
    imagenesMedicas: ImagenMedica[];
}
