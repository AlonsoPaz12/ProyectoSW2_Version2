import { Injectable } from '@nestjs/common';
import { Medico } from './medicos.entity';
import { GeneroUsuario, RolUsuario } from 'src/usuarios/usuario.entity';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';
import { ImagenesMedicasService } from 'src/imagenes-medicas/imagenes-medicas.service';
import { OrdenesMedicasService } from 'src/ordenes-medicas/ordenes-medicas.service';
import { ResultadosLabService } from 'src/resultados-lab/resultados-lab.service';
import { Medicamento } from 'src/medicamentos/medicamentos.entity';

@Injectable()
export class MedicosService {
    medicamento = [new MedicamentosService().crearMedicamento('Pastilla', 'Despues de cada comida', 'dos pastillas')]
    doc = new RecetasMedicasService().CrearDocumentoMedico(this.medicamento, 'No tomar en ayunas');
    
    imagen = [new ImagenesMedicasService().crearResultado('rayos x', 'pimba', 'Sebastian')]
    docIm = new OrdenesMedicasService().CrearDocumentoMedico(this.imagen,'Fractura transversal en el codo XD')
    
    reLab = [new ResultadosLabService().crearResultado('Analisi de Sangre', 'O+', 'Sebastian')]
    docLab = new OrdenesMedicasService().CrearDocumentoMedico(this.reLab,'Hemoglobina baja')


    private medicos: Medico[] = [
        {
            citas: [
                {
                    id: '1',
                    motivo: 'Dolor de panza',
                    IDmedico: 'MED-1',
                    Observacion: 'Llegar Puntual, y con muestra de heces',
                    IDpaciente: '1',
                    fecha: new Date('2024-02-20'),
                    documentoMedico: [this.doc , {}],
                    asistio: true
                },
                {
                    id: '2',
                    motivo: 'Fractura de brazo',
                    IDmedico: 'MED-1',
                    Observacion: 'Fractura total',
                    IDpaciente: '1',
                    fecha: new Date('2024-02-20'),
                    documentoMedico: [{} , this.docIm],
                    asistio: false
                },
                {
                    id: '3',
                    motivo: 'Chequeo anual',
                    IDmedico: 'MED-1',
                    Observacion: 'O+',
                    IDpaciente: '1',
                    fecha: new Date('2024-02-20'),
                    documentoMedico: [{} , this.reLab],
                    asistio: false
                },
                {
                    id: '4',
                    motivo: 'Inflamación ocular',
                    IDmedico: 'MED-1',
                    Observacion: 'O+',
                    IDpaciente: '1',
                    fecha: new Date('2024-02-20'),
                    documentoMedico: [{} , {}],
                    asistio: true
                }
            ],
            especialidad: 'Cardiologia',
            centroMedico: 'La victoria',
            id: 'MED-1',
            numeroDocumento: '33333',
            nombres: 'Gustavo',
            apePaterno: 'Pimba',
            apeMaterno: 'skibidi',
            fechaNacimiento: new Date('1990-09-23'),
            numCelular: '999888999',
            correoElectronico: 'doctor1@gmail.com',
            contrasena: 'soydoctor',
            repContrasena: 'soydoctor',
            genero: GeneroUsuario.MASCULINO,
            rol: RolUsuario.MEDICO
        }
    ]

    LeerMedico(){
        return this.medicos;
    }
    //Siguiente Sprint
    AgregarHorarioDisponible(){}


    VisualizarRecetasMedicas(IDpaciente:String, IDmedico: String){
        let m = this.medicos.find(med => med.id === IDmedico);
        let c = m.citas.filter(cita => cita.IDpaciente === IDpaciente)
        let arrRecetasMedicas = []
        c.map(x => arrRecetasMedicas.push(x.documentoMedico[0]))
        return arrRecetasMedicas;
    }

    AgregarRecetaMedica(obs: String, medicina: Medicamento [],idcita: String, IDmedico: String){
        const nuevaReceta = new RecetasMedicasService().CrearDocumentoMedico(medicina,obs)
        let medicos = this.medicos.find(x => x.id === IDmedico)
        let c = medicos.citas.filter(c => c.id === idcita)
        c.map(x => x.documentoMedico = [nuevaReceta,{}])
    }
/*
    AgregarMedicamento(tipo: String, frecuencia: String, dosis: String): Medicamento[]{
        let medicina = new MedicamentosService().crearMedicamento(tipo,frecuencia,dosis)
        return null
    }
*/
    VisualizacionProximasCitas(IDmedico: String){
        let m = this.medicos.find(m => m.id === IDmedico);
        return m.citas.filter(cita => cita.asistio === false);
    }

    AgregarImagenMedica(idcita: String, IDMedico: String, tipo: String, imagen: String, NombreP: String){
        const nuevaImagen = new ImagenesMedicasService().crearResultado(tipo, imagen, NombreP)
        let medicos = this.medicos.find(x => x.id == IDMedico)
        let c = medicos.citas.filter(c => c.id === idcita)
        c.map(x => x.documentoMedico = [{}, nuevaImagen])
    }

    VisualizacionResultadosLaboratorio(IDpaciente:String, IDmedico: String){
        let m  = this.medicos.find(med => med.id === IDmedico);
        let c = m.citas.filter(cita => cita.IDpaciente === IDpaciente);
        let arrResultadosLab = []
        c.map(x => arrResultadosLab.push(x.documentoMedico[1]))
        return arrResultadosLab;
    }

    AgregarResultadoLab(idcita: String, IDMedico: String, tipo: String, resultado: String, NombrePaciente: String){
        const nuevoResultadoLab = new ResultadosLabService().crearResultado(tipo, resultado, NombrePaciente)
        let medicos = this.medicos.find(x => x.id == IDMedico)
        let c = medicos.citas.filter(c => c.id === idcita)
        c.map(x => x.documentoMedico = [{},nuevoResultadoLab])
    }

    EliminarRestultadoLab(){}



}
