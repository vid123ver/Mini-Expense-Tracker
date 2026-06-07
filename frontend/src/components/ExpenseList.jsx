// This component displays the list of transactions in a clean table for desktop and auto-switches to responsive cards for mobile.
// It features an empty state screen with an emoji when there is no data, plus an action button to export the expense logs into a CSV file.

import ExpenseItem from './ExpenseItem';
import { exportToCSV } from '../utils/exportCSV';

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-slate-100 shadow-sm flex flex-col items-center justify-center py-16 text-slate-400">
        <span className="text-5xl mb-3">🧾</span>
        <p className="text-sm font-medium">No expenses found</p>
        <p className="text-xs mt-1">Add one using the button above</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Expenses ({expenses.length})
        </h2>
        <button
          onClick={() => exportToCSV(expenses)}
          className="text-xs bg-emerald-50 text-emerald-600 hover:bg-emerald-100 border border-emerald-200 px-3 py-1.5 rounded-lg font-medium transition-colors"
        >
          ↓ Export CSV
        </button>
      </div>

      {/* desktop table */}
      <div className="hidden sm:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="bg-slate-50 text-left text-xs text-slate-500 uppercase tracking-wide">
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Note</th>
              <th className="px-5 py-3 text-right">Amount</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {expenses.map((expense) => (
              <ExpenseItem key={expense._id} expense={expense} onEdit={onEdit} onDelete={onDelete} />
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile cards */}
      <div className="sm:hidden divide-y divide-slate-100">
        {expenses.map((expense) => (
          <ExpenseItem key={expense._id} expense={expense} onEdit={onEdit} onDelete={onDelete} mobile />
        ))}
      </div>

    </div>
  );
}

export default ExpenseList;