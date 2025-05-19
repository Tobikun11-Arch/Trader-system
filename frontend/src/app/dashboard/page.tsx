export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total P&L</h3>
          <p className="text-2xl font-bold text-green-600">+$12,345.67</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Win Rate</h3>
          <p className="text-2xl font-bold text-blue-600">68%</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Total Trades</h3>
          <p className="text-2xl font-bold text-gray-800">156</p>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow">
        <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>
        <div className="space-y-4">
          <p className="text-gray-600">No recent activity to display.</p>
        </div>
      </div>
    </div>
  );
}
