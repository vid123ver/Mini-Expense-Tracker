// A dashboard panel component that displays quick card stats for monthly spending, categories used, and the highest purchase.
// It maps data dynamically from the summary object and applies Tailwind CSS styling to present everything in a clean grid.

import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

function StatCard({ label, value, sub, color }) {
  return (
    <div className={`bg-white rounded-2xl p-5 border border-slate-100 shadow-sm`}>
      <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold mt-1 ${color || 'text-slate-800'}`}>{value}</p>
      {sub && <p className="text-xs text-slate-400 mt-1">{sub}</p>}
    </div>
  );
}

function SummaryPanel({ summary }) {
  if (!summary) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">This Month</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        <StatCard
          label="Total Spent"
          value={formatCurrency(summary.totalThisMonth)}
          color="text-indigo-600"
        />
        <StatCard
          label="Transactions"
          value={summary.perCategory.reduce((a, b) => a + 1, 0)}
          sub="categories used"
        />
        <StatCard
          label="Highest Expense"
          value={summary.highestExpense ? formatCurrency(summary.highestExpense.amount) : '—'}
          sub={summary.highestExpense ? `${summary.highestExpense.category} · ${formatDate(summary.highestExpense.date)}` : 'No expenses yet'}
          color="text-rose-500"
        />
      </div>
    </div>
  );
}

export default SummaryPanel;