import { formatDate } from './formatDate';

export const exportToCSV = (expenses) => {
  if (expenses.length === 0) {
    alert('No expenses to export');
    return;
  }

  // header row
  const headers = ['Date', 'Category', 'Amount (₹)', 'Note'];

  // data rows
  const rows = expenses.map((expense) => [
    formatDate(expense.date),
    expense.category,
    expense.amount,
    expense.note || '',
  ]);

  // combine headers and rows
  const csvContent = [headers, ...rows]
    .map((row) => row.join(','))
    .join('\n');

  // trigger download
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `expenses_${new Date().toISOString().split('T')[0]}.csv`;
  link.click();
  URL.revokeObjectURL(url);
};