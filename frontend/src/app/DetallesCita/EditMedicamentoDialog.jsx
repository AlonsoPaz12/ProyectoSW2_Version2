import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, Select, MenuItem, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

const EditMedicamentoDialog = ({ open, onClose, recetaId, onSave }) => {
  const [editableMedicamento, setEditableMedicamento] = useState([]);
  const [medicamentos, setMedicamentos] = useState([]);

  useEffect(() => {
    const fetchMedicamentos = async () => {
      try {
        const response = await axios.get('http://localhost:3000/medicamentos');
        setMedicamentos(response.data);
        console.log('Fetched medicamentos:', response.data);
      } catch (error) {
        console.error('Error fetching medicamentos', error);
      }
    };

    fetchMedicamentos();
  }, []);

  const handleSelectChange = (e) => {
    const selectedMedicamento = medicamentos.find(m => m.id === e.target.value);
    setEditableMedicamento(selectedMedicamento);
    console.log('Selected medicamento:', selectedMedicamento);
  };

  const handleSave = async () => {
    console.log('Saving medicamento:', editableMedicamento);
    try {
      await axios.post('http://localhost:3000/recetas/agregar-medicamento', {
        recetaId,
        medicamentoId: editableMedicamento.id
      });
      console.log('Medicamento saved:', editableMedicamento);
      onSave(editableMedicamento); // Llamar a la función onSave si deseas realizar alguna acción adicional
      onClose(); // Cerrar el diálogo después de guardar
    } catch (error) {
      console.error('Error saving medicamento', error);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Medicamento</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel>Medicamento</InputLabel>
          <Select
            value={editableMedicamento.id || ''}
            onChange={handleSelectChange}
          >
            {medicamentos.map((med) => (
              <MenuItem key={med.id} value={med.id}>
                {med.nombre}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMedicamentoDialog;
