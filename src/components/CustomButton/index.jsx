import React from 'react';
import { Button, CircularProgress } from '@mui/material';

const CustomButton = ({ onClick, loading, children }) => {
  return (
    <Button variant="contained" color="primary" onClick={onClick} disabled={loading}>
      {loading ? <CircularProgress size={20} /> : null}
      {children}
    </Button>
  );
};

export default CustomButton;
