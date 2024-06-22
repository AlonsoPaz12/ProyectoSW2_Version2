import axios from 'axios';

export const getHistorialCitas = async (idPaciente) => {
  const response = await axios.get(`http://localhost:3000/pacientes/${idPaciente}/citas`);
  return response.data;
};