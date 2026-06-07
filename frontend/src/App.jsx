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
  getSummary,
} from './services/expenseService';

function App() {
  const [expenses, setExpenses] = useState([]);
  const [summary, setSummary] = useState({ perCategory: [], totalThisMonth: 0, highestExpense: null });
  const [editingExpense, setEditingExpense] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [filters, setFilters] = useState({
    startDate: getFirstDayOfMonth(),
    endDate: getToday(),
    category: '',
  });

  const fetchExpenses = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getExpenses(filters);
      setExpenses(data);
    } catch (err) {
      setError('Failed to fetch expenses');
    } finally {
      setLoading(false);
    }
  };

  const fetchSummary = async () => {
    try {
      const data = await getSummary();
      setSummary(data);
    } catch (err) {
      console.error('Failed to fetch summary');
    }
  };

  useEffect(() => {
    fetchExpenses();
    fetchSummary();
  }, [filters]);

  const handleCreate = async (formData) => {
    try {
      setError(null);
      await createExpense(formData);
      setShowForm(false);
      fetchExpenses();
      fetchSummary();
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
      fetchSummary();
    } catch (err) {
      setError('Failed to update expense');
    }
  };

  const handleDelete = async (id) => {
    try {
      setError(null);
      await deleteExpense(id);
      fetchExpenses();
      fetchSummary();
    } catch (err) {
      setError('Failed to delete expense');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      {/* header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">💰</span>
            <h1 className="text-xl font-bold text-slate-800">Expense Tracker</h1>
          </div>
          <button
            onClick={() => { setShowForm((p) => !p); setEditingExpense(null); }}
            className="bg-indigo-600 hover:bg-indigo-700 active:bg-indigo-800 text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
          >
            {showForm ? 'Cancel' : '+ Add Expense'}
          </button>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 space-y-6">

        {/* error banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex justify-between items-center text-sm">
            <span>⚠️ {error}</span>
            <button onClick={() => setError(null)} className="ml-4 font-bold hover:text-red-900">✕</button>
          </div>
        )}

        {/* add/edit form */}
        {(showForm || editingExpense) && (
          <ExpenseForm
            onSubmit={editingExpense ? handleUpdate : handleCreate}
            editingExpense={editingExpense}
            onCancel={() => { setEditingExpense(null); setShowForm(false); }}
          />
        )}

        {/* summary cards */}
        <SummaryPanel summary={summary} />

        {/* chart */}
        <CategoryChart perCategory={summary.perCategory} />

        {/* filter bar */}
        <FilterBar onFilterChange={setFilters} />

        {/* expense list */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-8 h-8 border-4 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
          </div>
        ) : (
          <ExpenseList
            expenses={expenses}
            onEdit={(expense) => { setEditingExpense(expense); setShowForm(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            onDelete={handleDelete}
          />
        )}

      </main>
    </div>
  );
}

export default App;