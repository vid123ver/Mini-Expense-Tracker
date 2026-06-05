const Expense = require('../models/Expense');

// GET /api/expenses
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

// POST /api/expenses
const createExpense = async (req, res) => {
  try {
    const { amount, category, date, note } = req.body;

    const expense = await Expense.create({ amount, category, date, note });
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT /api/expenses/:id
const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { amount, category, date, note } = req.body;

    const expense = await Expense.findByIdAndUpdate(
      id,
      { amount, category, date, note },
      { new: true, runValidators: true }
    );

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE /api/expenses/:id
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await Expense.findByIdAndDelete(id);

    if (!expense) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    res.status(200).json({ message: 'Expense deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete expense' });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense };