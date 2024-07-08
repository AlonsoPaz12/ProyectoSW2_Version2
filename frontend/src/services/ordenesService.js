import axios from 'axios';

export const getOrders = async (id) => {
    const response = await axios.get(`http://localhost:3000/pacientes/orden/${id}`);
    return response.data;
}
