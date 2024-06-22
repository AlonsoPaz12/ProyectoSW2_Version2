import axios from 'axios';

export const getDoctors = async () => {
  const response = await axios.get('http://localhost:3000/Medicos');
  return response.data;
};