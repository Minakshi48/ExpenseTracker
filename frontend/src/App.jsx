import React from 'react';
import { Container, CssBaseline, Typography, Paper } from '@mui/material';
import Dashboard from './components/Dashboard';

export default function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="md" sx={{ py:4 }}>
        <Typography variant="h4" align="center" gutterBottom>Expense Tracker</Typography>
        <Paper sx={{ p:2 }}>
          <Dashboard />
        </Paper>
      </Container>
    </>
  );
}
