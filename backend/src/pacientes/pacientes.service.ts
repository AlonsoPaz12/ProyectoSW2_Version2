import { Injectable, Body } from '@nestjs/common';
import { UsuariosService } from 'src/usuarios/usuarios.service';
import { Paciente } from './pacientes.entity';
import { GeneroUsuario, RolUsuario } from 'src/usuarios/usuario.entity';
import { CitasService } from 'src/citas/citas.service';
import { RecetasMedicasService } from 'src/recetas-medicas/recetas-medicas.service';
import { MedicamentosService } from 'src/medicamentos/medicamentos.service';
import { CitasController } from 'src/citas/citas.controller';
import { RecetaMedica } from "src/recetas-medicas/recetas-medicas.entity";

@Injectable()
export class PacientesService extends UsuariosService{

    medicamento = [new MedicamentosService().crearMedicamento('Pastilla', 'Despues de cada comida', 'dos pastillas')]
    doc = new RecetasMedicasService().CrearDocumentoMedico(this.medicamento, 'No tomar en ayunas');
    private pacientes: Paciente[] = [
        {
            Citas: [
                {
                    id: '1',
                    motivo: 'Dolor de panza',
                    IDmedico: 'MED-1',
                    Observacion: 'Llegar Puntual, y con muestra de heces',
                    IDpaciente: '1',
                    fecha: new Date('2024-02-20'),
                    documentoMedico: [this.doc , {}],
                    asistio: true
                }
            ],
            id: '1',
            numeroDocumento: '12345',
            nombres: 'Sebastian',
            apePaterno: 'Guzman',
            apeMaterno: 'Soto',
            fechaNacimiento: new Date('2003-04-18'),
            numCelular: '9999999',
            correoElectronico: 'espantaviejas@gmail.com',
            contrasena: 'asdf1234',
            repContrasena: 'asdf1234',
            genero: GeneroUsuario.MASCULINO,
            rol: RolUsuario.PACIENTE
        }
    ]

    LeerPaciente(){
        return this.pacientes;
    }

    registrarCita(motivo: String, IDmedico: String, Observacion: String, IDpaciente: String, fecha: Date, documentoMedico: any[]){

        const nuevaC = new CitasService().CrearCita(motivo, IDmedico, Observacion, IDpaciente, fecha, documentoMedico);
        this.pacientes.find(pac => pac.id === IDpaciente).Citas.push(nuevaC);
        return nuevaC;

    }

    anularCita(idCita: String, IDpaciente: String){
        const pacienteFiltrado = this.pacientes.find(pac => pac.id === IDpaciente)
        const citasActualizadas = pacienteFiltrado.Citas.filter(cita => cita.id !== idCita);
        this.pacientes.find(pac => pac.id === IDpaciente).Citas = citasActualizadas;
        console.log(this.pacientes);
        return new CitasService().EliminarCita(idCita);
    }

    visualizarHistorialCitas(IDpaciente:String){
        let p = this.pacientes.find(pac => pac.id === IDpaciente);
        return p.Citas.filter(cita => cita.asistio === true);
    }

    visualizarMedicamentos(IDpaciente:String, idcita: String){
        let p = this.pacientes.find(pac => pac.id === IDpaciente);
        let c = p.Citas.find(c => c.id === idcita);
        return c.documentoMedico[0].medicamento;
    }

    visualizarRecetasMedicas(IDpaciente:String){
        let p = this.pacientes.find(pac => pac.id === IDpaciente);
        let c = p.Citas
        let arrRecetasMedicas = []
        c.map(x => arrRecetasMedicas.push(x.documentoMedico[0]))
        return arrRecetasMedicas;
    }

}