import React from 'react';
import TextField from "@mui/material/TextField";
import styles from './Buscador.module.css'

function Buscador({ onChange, label }) {
  const inputHandler = (e) => {
    onChange(e.target.value.toLowerCase());
  };

  return (
    <div className={styles.searchContainer}>
      <TextField
        className={styles.textField}
        id="outlined-basic"
        size="small"
        onChange={inputHandler}
        variant="outlined"
        color="success"
        fullWidth
        InputProps={{ style: { backgroundColor: 'white' } }}
        label={label}
      />
    </div>
  );
}

export default Buscador;