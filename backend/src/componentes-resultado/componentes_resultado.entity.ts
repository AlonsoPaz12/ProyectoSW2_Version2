import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ResultadoLab } from "src/resultados-lab/resultados-lab.entity";

@Entity()
export class ComponenteResultado {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    nombre: string;

    @Column()
    resultado: string;

    @Column()
    unidad: string;

    @ManyToOne(() => ResultadoLab, resultadoLab => resultadoLab.componentes)
    resultadoLab: ResultadoLab;
}
