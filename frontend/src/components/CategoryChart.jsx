// This component fetches the summary data and maps it into a nice Recharts pie chart to show category breakdowns.
// It includes loading and error handling plus a custom tooltip to show the exact formatted INR amount when hovering.
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatCurrency } from '../utils/formatCurrency';

const COLORS = ['#6366f1', '#f59e0b', '#10b981', '#ef4444', '#3b82f6'];

function CategoryChart({ perCategory }) {
  const data = perCategory.map((item) => ({ name: item._id, value: item.total }));

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white border border-slate-200 rounded-xl px-3 py-2 shadow text-sm">
          <p className="font-medium text-slate-700">{payload[0].name}</p>
          <p className="text-indigo-600 font-bold">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-100 p-5">
      <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-4">Spending by Category</h2>

      {data.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-10 text-slate-400">
          <span className="text-4xl mb-2">📊</span>
          <p className="text-sm">No data to display yet</p>
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={data} cx="50%" cy="50%" outerRadius={90} dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((_, index) => (
                <Cell key={index} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default CategoryChart;