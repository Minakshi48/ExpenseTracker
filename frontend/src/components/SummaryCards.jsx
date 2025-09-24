import React from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

export default function SummaryCards({ income, expense }) {
  const cards = [
    { label: 'Income', value: income, color: 'success.main' },
    { label: 'Expense', value: expense, color: 'error.main' },
    { label: 'Balance', value: income-expense, color: 'info.main' },
  ];

  return (
    <Grid container spacing={2}>
      {cards.map((c) => (
        <Grid item xs={12} md={4} key={c.label}>
          <Card
            sx={{
              transition: 'transform 0.3s, box-shadow 0.3s',
              '&:hover': { transform: 'translateY(-5px)', boxShadow: 6 },
              backgroundColor: (theme) => theme.palette[c.color.split('.')[0]][c.color.split('.')[1]]
            }}
          >
            <CardContent>
              <Typography variant="h6" color="white">{c.label}</Typography>
              <Typography variant="h5" color="white">₹{c.value.toFixed(2)}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
