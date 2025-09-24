import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteTransactionMutation } from '../api/transactionApi';

export default function TransactionList({ items = [] }) {
  const [deleteTx] = useDeleteTransactionMutation();
  const [deletingId, setDeletingId] = React.useState(null);

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

  if (!items.length) return <Typography variant="body2">No transactions found</Typography>;

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Type</TableCell>
            <TableCell>Category</TableCell>
            <TableCell>Description</TableCell>
            <TableCell align="right">Amount</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(tx => (
            <TableRow key={tx._id}>
              <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell>{tx.type}</TableCell>
              <TableCell>{tx.category}</TableCell>
              <TableCell>{tx.description}</TableCell>
              <TableCell align="right">
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
