import { Column, OneToMany, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { OrdenMedica } from 'src/ordenes-medicas/ordenes-medicas.entity';
import { ComponenteResultado } from "src/componentes-resultado/componentes_resultado.entity";

@Entity()
export class ResultadoLab{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    tipo: String;

    @Column()
    observacion: String;

    @Column()
    nombrePaciente: String;

    @OneToOne(() => OrdenMedica, orden => orden.resultadoLaboratorio)
    @JoinColumn({ name: 'orden_medica_id' })
    orden: OrdenMedica;

    @OneToMany(() => ComponenteResultado, componente => componente.resultadoLab, { cascade: true })
    componentes: ComponenteResultado[];
}