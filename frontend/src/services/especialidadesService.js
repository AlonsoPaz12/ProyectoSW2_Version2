import axios from 'axios';

export const getSpecialties = async () => {
  const response = await axios.get('http://localhost:3000/especialidades');
  return response.data;
};