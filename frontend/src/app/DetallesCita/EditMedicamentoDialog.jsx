import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditMedicamentoDialog = ({ open, onClose, medicamento, onSave }) => {
  const [editableMedicamento, setEditableMedicamento] = useState({ id: '', nombre: '', dosis: '', frecuencia: ''});


  useEffect(() => {
    setEditableMedicamento(medicamento);
  }, [medicamento]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditableMedicamento((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = () => {
    onSave(editableMedicamento);
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Medicamento</DialogTitle>
      <DialogContent>
        <TextField
          label="Nombre"
          name="nombre"
          value={editableMedicamento.nombre}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Dosis"
          name="dosis"
          value={editableMedicamento.dosis}
          onChange={handleInputChange}
          fullWidth
        />
        <TextField
          label="Frecuencia"
          name="frecuencia"
          value={editableMedicamento.frecuencia}
          onChange={handleInputChange}
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditMedicamentoDialog;

