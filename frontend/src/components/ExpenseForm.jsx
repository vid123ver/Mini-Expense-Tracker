// This input form component takes care of both adding a fresh expense item and populating input fields whenever editing.
// It tracks field states locally and blocks empty strings, negative figures, or dates sitting ahead in the future.

import { useState, useEffect } from 'react';
import { getToday, toInputDate } from '../utils/formatDate';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function ExpenseForm({ onSubmit, editingExpense, onCancel }) {
  const [formData, setFormData] = useState({ amount: '', category: '', date: getToday(), note: '' });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingExpense) {
      setFormData({
        amount: editingExpense.amount,
        category: editingExpense.category,
        date: toInputDate(editingExpense.date),
        note: editingExpense.note || '',
      });
    }
  }, [editingExpense]);

  const validate = () => {
    const e = {};
    if (!formData.amount || Number(formData.amount) <= 0) e.amount = 'Amount must be greater than 0';
    if (!formData.category) e.category = 'Category is required';
    if (!formData.date) e.date = 'Date is required';
    else if (formData.date > getToday()) e.date = 'Date cannot be in the future';
    return e;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((p) => ({ ...p, [name]: value }));
    if (errors[name]) setErrors((p) => ({ ...p, [name]: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return; }
    onSubmit({ amount: Number(formData.amount), category: formData.category, date: formData.date, note: formData.note });
    if (!editingExpense) setFormData({ amount: '', category: '', date: getToday(), note: '' });
  };

  const inputClass = "w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 bg-slate-50";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h2 className="text-base font-semibold text-slate-800 mb-4">
        {editingExpense ? '✏️ Edit Expense' : '➕ New Expense'}
      </h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Amount (₹)</label>
          <input type="number" name="amount" value={formData.amount} onChange={handleChange}
            placeholder="0.00" min="0.01" step="0.01" className={inputClass} />
          {errors.amount && <p className="text-red-500 text-xs mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Category</label>
          <select name="category" value={formData.category} onChange={handleChange} className={inputClass}>
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
          {errors.category && <p className="text-red-500 text-xs mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Date</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange}
            max={getToday()} className={inputClass} />
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>

        <div>
          <label className="block text-xs font-medium text-slate-600 mb-1">Note (optional)</label>
          <input type="text" name="note" value={formData.note} onChange={handleChange}
            placeholder="What was this for?" className={inputClass} />
        </div>

        <div className="sm:col-span-2 flex gap-3 pt-1">
          <button type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg text-sm font-medium transition-colors">
            {editingExpense ? 'Update' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" onClick={onCancel}
              className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-5 py-2 rounded-lg text-sm font-medium transition-colors">
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default ExpenseForm;