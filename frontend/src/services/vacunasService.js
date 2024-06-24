import axios from 'axios';

export const getVaccines = async () => {
  const response = await axios.get('http://localhost:3000/vacunas');
  return response.data.vacunas;
};

export const postVaccines = async (body) => {
  const response = await axios.post('http://localhost:3000/vacunas', body)
  return response.data.vacunas;
};