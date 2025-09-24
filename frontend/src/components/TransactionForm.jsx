import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAddTransactionMutation } from '../api/transactionApi';
import { useTheme } from '@mui/material/styles';

export default function TransactionForm({ totalIncome, totalExpense }) {
  const theme = useTheme();
  const availableBalance = totalIncome - totalExpense;

  const [form, setForm] = useState({ type: 'expense', amount:'', category:'', description:'', date:'' });
  const [addTransaction, { isLoading }] = useAddTransactionMutation();

  const handleChange = e => setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async e => {
    e.preventDefault();
    if(!form.amount || !form.category) return alert("Amount and Category are required!");

    const amountNum = Number(form.amount);

    // Prevent expense greater than available balance
    if(form.type === 'expense' && amountNum > availableBalance) {
      return alert('Insufficient Balance!');
    }

    try {
      await addTransaction({ ...form, amount: amountNum }).unwrap();
      setForm({ type: 'expense', amount:'', category:'', description:'', date:'' });
    } catch (err) {
      console.error(err);
      alert("Failed to add transaction");
    }
  };

  const inputStyle = {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.text.primary,
    borderColor: theme.palette.divider
  };

  return (
    <div className="card shadow-sm p-3 mb-3" style={{ backgroundColor: theme.palette.background.paper }}>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-2">
          <Form.Label style={{ color: theme.palette.text.primary }}>Type</Form.Label>
          <Form.Select name="type" value={form.type} onChange={handleChange} style={inputStyle}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ color: theme.palette.text.primary }}>Amount</Form.Label>
          <Form.Control type="number" name="amount" value={form.amount} onChange={handleChange} required style={inputStyle} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ color: theme.palette.text.primary }}>Category</Form.Label>
          <Form.Control type="text" name="category" value={form.category} onChange={handleChange} required style={inputStyle} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ color: theme.palette.text.primary }}>Description</Form.Label>
          <Form.Control type="text" name="description" value={form.description} onChange={handleChange} style={inputStyle} />
        </Form.Group>

        <Form.Group className="mb-2">
          <Form.Label style={{ color: theme.palette.text.primary }}>Date</Form.Label>
          <Form.Control type="date" name="date" value={form.date} onChange={handleChange} style={inputStyle} />
        </Form.Group>

        <Button type="submit" className="mt-2" disabled={isLoading}>
          {isLoading ? 'Adding...' : 'Add Transaction'}
        </Button>
      </Form>
    </div>
  );
}
