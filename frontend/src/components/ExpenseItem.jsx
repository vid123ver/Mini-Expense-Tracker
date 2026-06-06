// A simple table row component to display individual expense details with formatted dates and currency.
// It also provides edit and delete action buttons, including a quick confirmation popup before removing any item.

import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

function ExpenseItem({ expense, onEdit, onDelete }) {
  const handleDelete = () => {
    const confirmed = window.confirm(
      `Are you sure you want to delete this expense?`
    );
    if (confirmed) {
      onDelete(expense._id);
    }
  };

  return (
    <tr>
      <td>{formatDate(expense.date)}</td>
      <td>{expense.category}</td>
      <td>{expense.note || '-'}</td>
      <td>{formatCurrency(expense.amount)}</td>
      <td>
        <button onClick={() => onEdit(expense)}>Edit</button>
        <button onClick={handleDelete}>Delete</button>
      </td>
    </tr>
  );
}

export default ExpenseItem;