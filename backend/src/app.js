const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'https://mini-expense-tracker-frontend-exwe.onrender.com',
  ],
}));
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
// test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;
