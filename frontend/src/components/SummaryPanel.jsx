import { useEffect, useState } from 'react';
import { getSummary } from '../services/expenseService';
import { formatCurrency } from '../utils/formatCurrency';
import { formatDate } from '../utils/formatDate';

function SummaryPanel() {
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchSummary = async () => {
    try {
      setLoading(true);
      const data = await getSummary();
      setSummary(data);
    } catch (err) {
      setError('Failed to load summary');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  if (loading) return <p>Loading summary...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!summary) return null;

  return (
    <div className="summary-panel">
      <h2>This Month's Summary</h2>

      <div className="summary-cards">

        <div className="summary-card">
          <h3>Total Spent</h3>
          <p>{formatCurrency(summary.totalThisMonth)}</p>
        </div>

        <div className="summary-card">
          <h3>Highest Expense</h3>
          {summary.highestExpense ? (
            <>
              <p>{formatCurrency(summary.highestExpense.amount)}</p>
              <span>{summary.highestExpense.category} — {formatDate(summary.highestExpense.date)}</span>
            </>
          ) : (
            <p>No expenses yet</p>
          )}
        </div>

      </div>

      <div className="per-category">
        <h3>By Category</h3>
        {summary.perCategory.length === 0 ? (
          <p>No expenses this month</p>
        ) : (
          <ul>
            {summary.perCategory.map((item) => (
              <li key={item._id}>
                <span>{item._id}</span>
                <span>{formatCurrency(item.total)}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

    </div>
  );
}

export default SummaryPanel;