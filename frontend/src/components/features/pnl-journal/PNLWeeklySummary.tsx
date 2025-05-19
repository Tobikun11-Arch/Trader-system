'use client';
import React from 'react';
import {usePNLWeeklySummary} from '@/lib/client/queries/pnl-journal';
import {PNLWeekSummary} from '@/types/pnl-journal';

export const PNLWeeklySummary: React.FC = () => {
  const {data, isLoading, error} = usePNLWeeklySummary();

  if (isLoading)
    return <div className="p-8 text-center">Loading weekly summary...</div>;
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load summary.
      </div>
    );
  if (!data)
    return <div className="p-8 text-center text-gray-400">No data.</div>;

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="text-lg font-semibold mb-2">P&amp;L By Week</div>
      <div className="flex flex-col gap-3">
        {data.weeks.map((week: PNLWeekSummary) => (
          <div
            key={week.week}
            className={`rounded-lg px-4 py-3 flex items-center justify-between ${
              week.pnl >= 0 ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <div
              className={`font-semibold ${
                week.pnl >= 0 ? 'text-green-700' : 'text-red-600'
              }`}
            >
              Week {week.week}
            </div>
            <div
              className={`text-xl font-bold ${
                week.pnl >= 0 ? 'text-green-700' : 'text-red-600'
              }`}
            >
              {week.pnl >= 0
                ? `$${week.pnl.toFixed(2)}`
                : `-$${Math.abs(week.pnl).toFixed(2)}`}
            </div>
            <div className="text-xs text-gray-500">
              {week.trades} Trade{week.trades > 1 ? 's' : ''}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
