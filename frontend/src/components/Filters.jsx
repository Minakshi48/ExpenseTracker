import React, { useState } from 'react';
import { Box, TextField, MenuItem, Button, Grid } from '@mui/material';

export default function Filters({onChange}){
  const [filters,setFilters]=useState({type:'', category:'', startDate:'', endDate:''});
  const update=(patch)=>{ const next={...filters,...patch}; setFilters(next); };
  const apply=()=>onChange(filters);
  const reset=()=>{ setFilters({type:'', category:'', startDate:'', endDate:''}); onChange({}); };

  return (
    <Box>
      <Grid container spacing={1} alignItems="center">
        <Grid item xs={12} sm={2}>
          <TextField select label="Type" value={filters.type} onChange={(e)=>update({type:e.target.value})} fullWidth>
            <MenuItem value=''>All</MenuItem>
            <MenuItem value='income'>Income</MenuItem>
            <MenuItem value='expense'>Expense</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} sm={3}>
          <TextField label="Category" value={filters.category} onChange={(e)=>update({category:e.target.value})} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField type="date" label="From" InputLabelProps={{shrink:true}} value={filters.startDate} onChange={(e)=>update({startDate:e.target.value})} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={2}>
          <TextField type="date" label="To" InputLabelProps={{shrink:true}} value={filters.endDate} onChange={(e)=>update({endDate:e.target.value})} fullWidth/>
        </Grid>
        <Grid item xs={12} sm={3} sx={{display:'flex', gap:1}}>
          <Button variant="contained" onClick={apply}>Apply</Button>
          <Button variant="outlined" onClick={reset}>Reset</Button>
        </Grid>
      </Grid>
    </Box>
  );
}
