import axios from 'axios';

export const getDoctors = async () => {
  const response = await axios.get('http://localhost:3000/medicos');
  return response.data;
};