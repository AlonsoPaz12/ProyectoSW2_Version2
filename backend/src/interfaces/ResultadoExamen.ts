export interface ResultadoExamen{

    LeerResultados();
    crearResultado(objeto: any);
    LeerResultadoPorId(id: number);
    ActualizarResultado(id: number, objeto: any);
    EliminarResultado(id: number)

}