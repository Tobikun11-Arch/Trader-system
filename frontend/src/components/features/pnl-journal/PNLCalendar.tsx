'use client';
import React from 'react';
import {usePNLCalendar} from '@/lib/client/queries/pnl-journal';

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export const PNLCalendar: React.FC = () => {
  const {data, isLoading, error} = usePNLCalendar();

  if (isLoading)
    return <div className="p-8 text-center">Loading calendar...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load calendar.
      </div>
    );
  if (!data)
    return <div className="p-8 text-center text-gray-400">No data.</div>;

  const [year, month] = data.month.split('-').map(Number);
  const daysInMonth = getDaysInMonth(year, month - 1);
  const firstDayOfWeek = getFirstDayOfWeek(year, month - 1);
  const days: ((typeof data.days)[0] | null)[] =
    Array(firstDayOfWeek).fill(null);
  for (let d = 1; d <= daysInMonth; d++) {
    const dateStr = `${data.month}-${d.toString().padStart(2, '0')}`;
    const day = data.days.find(day => day.date === dateStr) || null;
    days.push(day);
  }
  while (days.length % 7 !== 0) days.push(null);

  return (
    <div className="bg-gray-50 rounded-lg p-4 shadow">
      <div className="flex items-center justify-between mb-2">
        {/* Month/Year Picker */}
        <div className="flex items-center gap-2">
          <select
            className="border rounded px-2 py-1 text-sm"
            defaultValue={month}
          >
            {[
              'January',
              'February',
              'March',
              'April',
              'May',
              'June',
              'July',
              'August',
              'September',
              'October',
              'November',
              'December'
            ].map((m, idx) => (
              <option key={m} value={idx + 1}>
                {m}
              </option>
            ))}
          </select>
          <select
            className="border rounded px-2 py-1 text-sm"
            defaultValue={year}
          >
            {[year - 2, year - 1, year, year + 1, year + 2].map(y => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(d => (
          <div key={d} className="text-xs font-bold text-gray-500 text-center">
            {d}
          </div>
        ))}
        {days.map((day, i) => (
          <div
            key={i}
            className="h-32 min-h-[120px] flex flex-col items-center justify-center border rounded bg-white relative"
          >
            {day ? (
              <>
                <div
                  className={`text-sm font-semibold ${
                    day.pnl >= 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {day.pnl >= 0
                    ? `$${day.pnl.toFixed(2)}`
                    : `-$${Math.abs(day.pnl).toFixed(2)}`}
                </div>
                <div className="text-xs text-gray-400">
                  {day.trades} trade{day.trades > 1 ? 's' : ''}
                </div>
                <div className="absolute top-1 left-1 text-xs text-gray-400">
                  {parseInt(day.date.split('-')[2], 10)}
                </div>
              </>
            ) : null}
          </div>
        ))}
      </div>
      {/* Monthly Percentage Static Data */}
      <div className="mt-4 text-center text-lg font-bold">
        Monthly P&L: <span className="text-green-600">+12.5%</span>
      </div>
    </div>
  );
};
