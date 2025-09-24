import React, { useState, useMemo } from 'react';
import { Grid, Box } from '@mui/material';
import TransactionForm from './TransactionForm';
import TransactionList from './TransactionList';
import Filters from './Filters';
import { useGetTransactionsQuery } from '../api/transactionApi';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#FF8042', '#00C49F', '#FFBB28', '#AA336A'];

export default function Dashboard(){
  const [filters,setFilters]=useState({});
  const params={};
  if(filters.type) params.type=filters.type;
  if(filters.category) params.category=filters.category;
  if(filters.startDate) params.startDate=filters.startDate;
  if(filters.endDate) params.endDate=filters.endDate;

  const { data, isLoading, isFetching, error } = useGetTransactionsQuery(params);
  const items = data?.items || [];

  const totals = useMemo(()=>{
    let income=0, expense=0;
    items.forEach(t=>t.type==='income'?income+=t.amount:expense+=t.amount);
    return {income, expense};
  },[items]);

  const byCategory = useMemo(()=>{
    const map={};
    items.forEach(t=> map[t.category]=(map[t.category]||0)+t.amount );
    return Object.entries(map).map(([name,value])=>({name,value}));
  },[items]);

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TransactionForm />
          <Box mt={2}><Filters onChange={setFilters}/></Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <div style={{height:240}}>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={byCategory} dataKey="value" nameKey="name" outerRadius={80} label>
                  {byCategory.map((_,i)=><Cell key={i} fill={COLORS[i%COLORS.length]}/>)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <Box mt={2}>
            <div style={{display:'flex', justifyContent:'space-between'}}>
              <div>Income: ₹{totals.income.toFixed(2)}</div>
              <div>Expense: ₹{totals.expense.toFixed(2)}</div>
              <div>Balance: ₹{(totals.income - totals.expense).toFixed(2)}</div>
            </div>
            <div style={{opacity:isFetching?0.6:1, marginTop:8}}>
              {isLoading? 'Loading...' : (error?'Failed to load': `${items.length} transactions`)}
            </div>
          </Box>
        </Grid>
        <Grid item xs={12}><TransactionList items={items}/></Grid>
      </Grid>
    </Box>
  );
}
