import { TextField } from '@mui/material';
import React from 'react'

const Input = () => {
  return (
    <TextField
      id="outlined-number"
      label="Number"
      type="number"
      slotProps={{
        inputLabel: {
          shrink: true,
        },
      }}
    />
  );
}

export default Input
