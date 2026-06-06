// Form component that handles both adding new expenses and updating existing ones by pre-filling fields.
// It includes client-side validation to catch negative amounts or future dates before submitting the data.

import { useState, useEffect } from 'react';
import { getToday, toInputDate } from '../utils/formatDate';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function ExpenseForm({ onSubmit, editingExpense, onCancel }) {
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    date: getToday(),
    note: '',
  });

  const [errors, setErrors] = useState({});

  // if editingExpense is passed, fill form with its data
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
    const newErrors = {};

    if (!formData.amount || Number(formData.amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    } else if (formData.date > getToday()) {
      newErrors.date = 'Date cannot be in the future';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // clear error on change
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      amount: Number(formData.amount),
      category: formData.category,
      date: formData.date,
      note: formData.note,
    });

    // reset form if adding (not editing)
    if (!editingExpense) {
      setFormData({ amount: '', category: '', date: getToday(), note: '' });
    }
  };

  return (
    <div className="form-container">
      <h2>{editingExpense ? 'Edit Expense' : 'Add Expense'}</h2>
      <form onSubmit={handleSubmit}>

        <div className="form-group">
          <label>Amount (₹)</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            placeholder="Enter amount"
            min="0.01"
            step="0.01"
          />
          {errors.amount && <span className="error">{errors.amount}</span>}
        </div>

        <div className="form-group">
          <label>Category</label>
          <select name="category" value={formData.category} onChange={handleChange}>
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <span className="error">{errors.category}</span>}
        </div>

        <div className="form-group">
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={getToday()}
          />
          {errors.date && <span className="error">{errors.date}</span>}
        </div>

        <div className="form-group">
          <label>Note (optional)</label>
          <input
            type="text"
            name="note"
            value={formData.note}
            onChange={handleChange}
            placeholder="Add a note"
          />
        </div>

        <div className="form-actions">
          <button type="submit">
            {editingExpense ? 'Update Expense' : 'Add Expense'}
          </button>
          {editingExpense && (
            <button type="button" onClick={onCancel}>
              Cancel
            </button>
          )}
        </div>

      </form>
    </div>
  );
}

export default ExpenseForm;