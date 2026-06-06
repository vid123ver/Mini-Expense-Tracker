// Table component that renders a list of transactions by mapping over the expenses array into individual rows.
// It automatically displays a clean empty state message if no matching records are found.

import ExpenseItem from './ExpenseItem';

function ExpenseList({ expenses, onEdit, onDelete }) {
  if (expenses.length === 0) {
    return (
      <div className="empty-state">
        <p>No expenses found. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Category</th>
            <th>Note</th>
            <th>Amount</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => (
            <ExpenseItem
              key={expense._id}
              expense={expense}
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ExpenseList;