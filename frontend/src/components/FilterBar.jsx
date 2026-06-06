import { useState } from 'react';
import { getFirstDayOfMonth, getToday } from '../utils/formatDate';

const CATEGORIES = ['Food', 'Transport', 'Bills', 'Entertainment', 'Other'];

function FilterBar({ onFilterChange }) {
  const [category, setCategory] = useState('');
  const [dateRange, setDateRange] = useState('this_month');
  const [customStart, setCustomStart] = useState('');
  const [customEnd, setCustomEnd] = useState('');

  // single function that always sends latest filter state
  const applyFilters = (newCategory, newDateRange, newCustomStart, newCustomEnd) => {
    let startDate = '';
    let endDate = '';

    if (newDateRange === 'this_month') {
      startDate = getFirstDayOfMonth();
      endDate = getToday();
    } else if (newDateRange === 'last_month') {
      const now = new Date();
      startDate = new Date(now.getFullYear(), now.getMonth() - 1, 1)
        .toISOString().split('T')[0];
      endDate = new Date(now.getFullYear(), now.getMonth(), 0)
        .toISOString().split('T')[0];
    } else if (newDateRange === 'custom') {
      startDate = newCustomStart;
      endDate = newCustomEnd;
    }
    // 'all' keeps startDate and endDate as ''

    onFilterChange({
      category: newCategory,
      startDate,
      endDate,
    });
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

  const handleCustomApply = () => {
    if (customStart && customEnd) {
      applyFilters(category, 'custom', customStart, customEnd);
    }
  };

  return (
    <div className="filter-bar">

      <div className="filter-group">
        <label>Filter by Category</label>
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All Categories</option>
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>{cat}</option>
          ))}
        </select>
      </div>

      <div className="filter-group">
        <label>Date Range</label>
        <select value={dateRange} onChange={handleDateRangeChange}>
          <option value="this_month">This Month</option>
          <option value="last_month">Last Month</option>
          <option value="all">All Time</option>
          <option value="custom">Custom</option>
        </select>
      </div>

      {dateRange === 'custom' && (
        <div className="filter-group custom-range">
          <input
            type="date"
            value={customStart}
            max={getToday()}
            onChange={(e) => setCustomStart(e.target.value)}
          />
          <span>to</span>
          <input
            type="date"
            value={customEnd}
            max={getToday()}
            onChange={(e) => setCustomEnd(e.target.value)}
          />
          <button onClick={handleCustomApply}>Apply</button>
        </div>
      )}

    </div>
  );
}

export default FilterBar;