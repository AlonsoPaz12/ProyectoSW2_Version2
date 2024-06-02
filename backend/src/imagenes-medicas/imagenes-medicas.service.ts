import { Injectable } from '@nestjs/common';
import { ResultadoExamen } from 'src/interfaces/ResultadoExamen';
import { ImagenMedica } from './imagenes-medicas.entity';
import { v4 } from 'uuid';

@Injectable()
export class ImagenesMedicasService implements ResultadoExamen{

    private imagenesMedicas: ImagenMedica[] = [
        {
            id: '1',
            tipo: 'GAAAAA',
            imagen: 'RAAAA',
            nombrePaciente: 'aaaaaa'
        }
    ]

    LeerResultados(){
        return this.imagenesMedicas;
    }
    
    crearResultado(tipo: String, imagen: String, nombrePaciente: String) {
        const nuevaImagenMedica = {
            id: v4(),
            tipo,
            imagen,
            nombrePaciente
        }
        this.imagenesMedicas.push(nuevaImagenMedica);
        return nuevaImagenMedica;

    }
    LeerResultadoPorId(id: String) {
        return this.imagenesMedicas.find( imagen => imagen.id === id );
    }
    EliminarResultado(id: String): void {
        this.imagenesMedicas = this.imagenesMedicas.filter(imagen => imagen.id !== id);
    }

}
