// This is Almost complete file !
import { useState, useEffect } from 'react';
import { getSummary } from './services/expenseService';
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
      setError(null);//->i add this to clear previous error when we start fetching new data
      //also this might be last change for this commit, i will update this file in future commits when we have more features to add(in future)
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
      setError(null);
      await createExpense(formData);
      fetchExpenses();
    } catch (err) {
      setError('Failed to create expense');
    }
  };

  const handleUpdate = async (formData) => {
    try {
      setError(null);
      await updateExpense(editingExpense._id, formData);
      setEditingExpense(null);
      fetchExpenses();
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null); 
      await deleteExpense(id);
      fetchExpenses();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      <h1>Mini Expense Tracker</h1>

      {error && (
        <div style={{
          background: '#fee2e2',
          color: '#dc2626',
          padding: '10px 16px',
          borderRadius: '6px',
          marginBottom: '16px',
        }}>
          {error}
          <button
            onClick={() => setError(null)}
            style={{ marginLeft: '12px', background: 'none', border: 'none', cursor: 'pointer', color: '#dc2626', fontWeight: 'bold' }}
          >
            ✕
          </button>
        </div>
      )}


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