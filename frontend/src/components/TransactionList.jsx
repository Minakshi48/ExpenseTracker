import React, { useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTransactionMutation } from '../api/transactionApi';

export default function TransactionList({ items = [] }) {
  const [deleteTx] = useDeleteTransactionMutation();
  const [deletingId, setDeletingId] = useState(null);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this transaction?')) return;
    try {
      setDeletingId(id);
      await deleteTx(id).unwrap();
    } catch (err) {
      console.error(err);
      alert('Delete failed');
    } finally {
      setDeletingId(null);
    }
  };

  if (!items.length) return <Typography variant="body2" sx={{ color: 'text.primary' }}>No transactions found</Typography>;

  return (
    <TableContainer className="card shadow-sm p-3" sx={{ bgcolor: 'background.paper' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell sx={{ color: 'text.primary' }}>Date</TableCell>
            <TableCell sx={{ color: 'text.primary' }}>Type</TableCell>
            <TableCell sx={{ color: 'text.primary' }}>Category</TableCell>
            <TableCell sx={{ color: 'text.primary' }}>Description</TableCell>
            <TableCell align="right" sx={{ color: 'text.primary' }}>Amount</TableCell>
            <TableCell sx={{ color: 'text.primary' }}>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(tx => (
            <TableRow
              key={tx._id}
              sx={{
                '&:hover': { backgroundColor: (theme) => theme.palette.action.hover },
                cursor: 'pointer'
              }}
            >
              <TableCell sx={{ color: 'text.primary' }}>{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>{tx.type}</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>{tx.category}</TableCell>
              <TableCell sx={{ color: 'text.primary' }}>{tx.description}</TableCell>
              <TableCell align="right" sx={{ color: 'text.primary' }}>
                {new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR' }).format(tx.amount)}
              </TableCell>
              <TableCell>
                <IconButton
                  onClick={() => handleDelete(tx._id)}
                  size="small"
                  disabled={deletingId === tx._id}
                >
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
