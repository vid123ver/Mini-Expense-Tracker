const express = require('express');
const cors = require('cors');
const expenseRoutes = require('./routes/expenseRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/expenses', expenseRoutes);
// test route
app.get('/', (req, res) => {
  res.json({ message: 'API is running' });
});

module.exports = app;
