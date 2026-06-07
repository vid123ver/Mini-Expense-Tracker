// A simple table row component to display individual expense details with formatted dates and currency.
// It also provides edit and delete action buttons, including a quick confirmation popup before removing any item.
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

const CATEGORY_COLORS = {
  Food: 'bg-orange-100 text-orange-700',
  Transport: 'bg-blue-100 text-blue-700',
  Bills: 'bg-red-100 text-red-700',
  Entertainment: 'bg-purple-100 text-purple-700',
  Other: 'bg-gray-100 text-gray-700',
};

function ExpenseItem({ expense, onEdit, onDelete, mobile }) {
  const handleDelete = () => {
    if (window.confirm('Delete this expense?')) onDelete(expense._id);
  };

  const categoryStyle = CATEGORY_COLORS[expense.category] || 'bg-gray-100 text-gray-700';

  if (mobile) {
    return (
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${categoryStyle}`}>
              {expense.category}
            </span>
            <span className="text-xs text-slate-400">{formatDate(expense.date)}</span>
          </div>
          <p className="text-sm text-slate-500 truncate">{expense.note || '—'}</p>
        </div>
        <div className="flex items-center gap-3 ml-4">
          <span className="text-sm font-bold text-slate-800">{formatCurrency(expense.amount)}</span>
          <button onClick={() => onEdit(expense)} className="text-indigo-500 hover:text-indigo-700 text-xs font-medium">Edit</button>
          <button onClick={handleDelete} className="text-red-400 hover:text-red-600 text-xs font-medium">Del</button>
        </div>
      </div>
    );
  }

  return (
    <tr className="hover:bg-slate-50 transition-colors">
      <td className="px-5 py-3 text-slate-600 text-sm">{formatDate(expense.date)}</td>
      <td className="px-5 py-3">
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${categoryStyle}`}>
          {expense.category}
        </span>
      </td>
      <td className="px-5 py-3 text-slate-500 text-sm">{expense.note || '—'}</td>
      <td className="px-5 py-3 text-right font-bold text-slate-800">{formatCurrency(expense.amount)}</td>
      <td className="px-5 py-3 text-right">
        <button onClick={() => onEdit(expense)} className="text-indigo-500 hover:text-indigo-700 text-xs font-medium mr-3 transition-colors">Edit</button>
        <button onClick={handleDelete} className="text-red-400 hover:text-red-600 text-xs font-medium transition-colors">Delete</button>
      </td>
    </tr>
  );
}

export default ExpenseItem;