export interface ResultadoExamen{

    LeerResultados();
    crearResultado(tipo: String, resultado: String, Nombrepaciente: String)
    LeerResultadoPorId(id: String): any
    EliminarResultado(id: String): void

}