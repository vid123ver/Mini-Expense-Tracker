// This file handles filtering out expenses by specific categories or dynamic date setups like this month and last month.
// It also opens up custom date input options on the spot whenever a user selects the custom filter range.

import { useState } from 'react';
import { getFirstDayOfMonth, getToday } from '../utils/formatDate';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function FilterBar({ onFilterChange }) {
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('this_month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  const applyFilters = (newCategory, newDateRange, newCustomStart, newCustomEnd) => {
    let startDate = '';
    let endDate = '';
    if (newDateRange === 'this_month') { startDate = getFirstDayOfMonth(); endDate = getToday(); }
    else if (newDateRange === 'last_month') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1).toISOString().split('T')[0];
      endDate = new Date(now.getFullYear(), now.getMonth(), 0).toISOString().split('T')[0];
    } else if (newDateRange === 'custom') { startDate = newCustomStart; endDate = newCustomEnd; }
    onFilterChange({ category: newCategory, startDate, endDate });
  };

  const handleCategoryChange = (e) => {
    const val = e.target.value;
    setCategory(val);
    applyFilters(val, dateRange, customStart, customEnd);
  };

  const handleDateRangeChange = (e) => {
    const val = e.target.value;
    setDateRange(val);
    applyFilters(category, val, customStart, customEnd);
  };

  const inputClass = "border border-slate-200 rounded-lg px-3 py-2 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-indigo-300";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-4">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">Filter Expenses</h2>
      <div className="flex flex-wrap gap-3 items-end">

        <div>
          <label className="block text-xs text-slate-500 mb-1">Category</label>
          <select value={category} onChange={handleCategoryChange} className={inputClass}>
            <option value="">All Categories</option>
            {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>

        <div>
          <label className="block text-xs text-slate-500 mb-1">Date Range</label>
          <select value={dateRange} onChange={handleDateRangeChange} className={inputClass}>
            <option value="this_month">This Month</option>
            <option value="last_month">Last Month</option>
            <option value="all">All Time</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {dateRange === 'custom' && (
          <>
            <div>
              <label className="block text-xs text-slate-500 mb-1">From</label>
              <input type="date" value={customStart} max={getToday()}
                onChange={(e) => setCustomStart(e.target.value)} className={inputClass} />
            </div>
            <div>
              <label className="block text-xs text-slate-500 mb-1">To</label>
              <input type="date" value={customEnd} max={getToday()}
                onChange={(e) => setCustomEnd(e.target.value)} className={inputClass} />
            </div>
            <button
              onClick={() => applyFilters(category, 'custom', customStart, customEnd)}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Apply
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default FilterBar;