// for temporary purpose only, will be removed in future when we have proper UI
// it is only for testing i have to test for the backend
//again update thid App.jsx for commit 11 - still not complete file!
import { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import FilterBar from './components/FilterBar';
import SummaryPanel from './components/SummaryPanel';
import CategoryChart from './components/CategoryChart';

import { getFirstDayOfMonth, getToday } from './utils/formatDate';
import {
  getExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
} from './services/expenseService';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    startDate: getFirstDayOfMonth(),
    endDate: getToday(),
    category: '',
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [filters]);

  const handleCreate = async (formData) => {
    try {
      await createExpense(formData);
      fetchExpenses();
    } catch (err) {
      setError('Failed to create expense');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      await updateExpense(editingExpense._id, formData);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Mini Expense Tracker</h1>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <SummaryPanel />

      <CategoryChart />
      <ExpenseForm
        onSubmit={editingExpense ? handleUpdate : handleCreate}
        editingExpense={editingExpense}
        onCancel={() => setEditingExpense(null)}
      />

      <FilterBar onFilterChange={setFilters} />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={setEditingExpense}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;