require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const transactions = require('./routes/transactions');
const errorHandler = require('./middleware/errorHandler');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/transactions', transactions);
app.get('/', (req,res)=> res.send('Expense Tracker API'));
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
connectDB(process.env.MONGO_URI).then(()=> {
  app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`));
});
