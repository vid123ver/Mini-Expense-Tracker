// This component fetches the summary data and maps it into a nice Recharts pie chart to show category breakdowns.
// It includes loading and error handling plus a custom tooltip to show the exact formatted INR amount when hovering.

import { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { getSummary } from '../services/expenseService';
import { formatCurrency } from '../utils/formatCurrency';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

function CategoryChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const summary = await getSummary();

        // format data for recharts
        const chartData = summary.perCategory.map((item) => ({
          name: item._id,
          value: item.total,
        }));

        setData(chartData);
      } catch (err) {
        setError('Failed to load chart');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <p>Loading chart...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (data.length === 0) {
    return (
      <div className="chart-container">
        <h2>Spending by Category</h2>
        <p>No data to display yet</p>
      </div>
    );
  }

  // custom tooltip
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p>{payload[0].name}</p>
          <p>{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="chart-container">
      <h2>Spending by Category</h2>
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            outerRadius={100}
            dataKey="value"
            label={({ name, percent }) =>
              `${name} ${(percent * 100).toFixed(0)}%`
            }
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}

export default CategoryChart;