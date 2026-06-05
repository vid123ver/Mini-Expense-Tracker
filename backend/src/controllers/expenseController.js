const Expense = require('../models/Expense');

  // GET /api/expenses
  // I created this endpoint to handle filtering out my transactions based on what the frontend requests.
  // It checks if the user filtered by a specific category or picked a date range, builds a dynamic query,
  // and sorts everything so the latest expenses pop up first on the history page.
const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch expenses' });
  }
};

  // POST /api/expenses
  // This handles adding a new transaction to the database. It grabs the user input fields like 
  // amount, category, date, and notes straight from the request body, passes them into my Mongoose 
  // model to save the entry, and sends back a 201 status to confirm it went through.
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
  // I wrote this to let users edit existing expenses. It takes the specific transaction ID from 
  // the URL parameters, pulls the updated values from the body, and updates MongoDB. I also turned 
  // on runValidators to make sure the modified data still matches my schema rules.
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
  // This handles deleting a transaction when a user clicks remove. It lookups up the item by its unique
  // ID, wipes it from the collection using findByIdAndDelete, and returns a success response so the 
  // frontend UI knows it can safely clear that item from the list state.
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
  // GET /api/expenses/summary
  // I set this up to power the main dashboard metrics. It runs a MongoDB aggregation pipeline that
  // filters for expenses in the current month, calculates the total sum spent, breaks down costs 
  // by category, and finds the highest single purchase overall so users get a quick snapshot of their habits.
const getSummary = async (req, res) => {
  try {
    const now = new Date();
    const firstOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const totalThisMonth = await Expense.aggregate([
      { $match: { date: { $gte: firstOfMonth } } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const perCategory = await Expense.aggregate([
      { $match: { date: { $gte: firstOfMonth } } },
      { $group: { _id: '$category', total: { $sum: '$amount' } } },
      { $sort: { total: -1 } },
    ]);

    const highest = await Expense.findOne().sort({ amount: -1 });

    res.status(200).json({
      totalThisMonth: totalThisMonth[0]?.total || 0,
      perCategory,
      highestExpense: highest || null,
    });
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch summary' });
  }
};

module.exports = { getExpenses, createExpense, updateExpense, deleteExpense, getSummary };