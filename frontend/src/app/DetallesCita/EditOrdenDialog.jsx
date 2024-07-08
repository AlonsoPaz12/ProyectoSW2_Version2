import React, { useState, useEffect } from 'react';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EditOrdenDialog = ({ open, onClose, orden, onSave }) => {
  const [editableOrden, setEditableOrden] = useState({
    observacion: '',
    imagenMedica: {indicaciones: '', NotasMedic: '' },
    resultadoLaboratorio: { Resultado: '', motivoPrueba: '' },
  });

  useEffect(() => {
    if (orden) {
      setEditableOrden({
        observacion: orden.observacion || '',
        imagenMedica: orden.imagenMedica || { indicaciones: '', NotasMedic: '' },
        resultadoLaboratorio: orden.resultadoLaboratorio || { Resultado: '', motivoPrueba: '' },
      });
    }
  }, [orden]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const keys = name.split('.');
    if (keys.length > 1) {
      setEditableOrden((prevState) => ({
        ...prevState,
        [keys[0]]: {
          ...prevState[keys[0]],
          [keys[1]]: value,
        },
      }));
    } else {
      setEditableOrden((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSave = () => {
    onSave({
        ...orden,
        observacion: editableOrden.observacion,
        imagenMedica: {
          ...editableOrden.imagenMedica,
        },
        resultadoLaboratorio: {
          ...editableOrden.resultadoLaboratorio,
        },
      });
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Edit Orden Médica</DialogTitle>
      <DialogContent>
        <TextField
          label="Observación"
          name="observacion"
          value={editableOrden.observacion}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Indicaciones de la Imagen Médica"
          name="imagenMedica.indicaciones"
          value={editableOrden.imagenMedica.indicaciones}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Notas Médicas de la Imagen"
          name="imagenMedica.NotasMedic"
          value={editableOrden.imagenMedica.NotasMedic}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Resultado del Laboratorio"
          name="resultadoLaboratorio.Resultado"
          value={editableOrden.resultadoLaboratorio.Resultado}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
        <TextField
          label="Motivo de la Prueba"
          name="resultadoLaboratorio.motivoPrueba"
          value={editableOrden.resultadoLaboratorio.motivoPrueba}
          onChange={handleInputChange}
          fullWidth
          margin="dense"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave}>Save</Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditOrdenDialog;
