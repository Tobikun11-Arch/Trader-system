import React from 'react';
import {PNLCalendar} from '@/components/features/pnl-journal/PNLCalendar';
import {PNLWeeklySummary} from '@/components/features/pnl-journal/PNLWeeklySummary';

export default function PnlJournalPage() {
  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex-1">
        <PNLCalendar />
      </div>
      <div className="w-full md:w-96">
        <PNLWeeklySummary />
      </div>
    </div>
  );
}
