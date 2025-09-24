import React, { useState } from 'react';
import { Box, TextField, Button, MenuItem, Grid } from '@mui/material';
import { useAddTransactionMutation } from '../api/transactionApi';

const defaultForm = { type:'expense', amount:'', description:'', category:'', date:new Date().toISOString().substring(0,10) };

export default function TransactionForm(){
  const [form,setForm]=useState(defaultForm);
  const [addTransaction,{isLoading}]=useAddTransactionMutation();

  const handleChange=(e)=>setForm(f=>({...f,[e.target.name]:e.target.value}));
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!form.amount || !form.category){ alert('Fill required'); return; }
    try{
      await addTransaction({...form, amount:Number(form.amount), date:new Date(form.date)}).unwrap();
      setForm(defaultForm);
    }catch(err){ alert('Failed'); }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{mb:2}}>
      <Grid container spacing={1}>
        <Grid item xs={12} sm={3}>
          <TextField select fullWidth label="Type" name="type" value={form.type} onChange={handleChange}>
            <MenuItem value="income">Income</MenuItem>
            <MenuItem value="expense">Expense</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField required fullWidth name="amount" label="Amount" value={form.amount} onChange={handleChange} type="number"/>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField required fullWidth name="category" label="Category" value={form.category} onChange={handleChange}/>
        </Grid>
        <Grid item xs={12}><TextField fullWidth name="description" label="Description" value={form.description} onChange={handleChange}/></Grid>
        <Grid item xs={12} sm={6}><TextField type="date" name="date" fullWidth value={form.date} onChange={handleChange} InputLabelProps={{shrink:true}}/></Grid>
        <Grid item xs={12} sm={6} sx={{display:'flex',alignItems:'center'}}><Button type="submit" variant="contained" disabled={isLoading}>Add</Button></Grid>
      </Grid>
    </Box>
  );
}
