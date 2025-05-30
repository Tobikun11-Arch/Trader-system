import {useState, useEffect} from 'react';
import {PNLCalendarData, PNLWeeklySummaryData} from '@/types/pnl-journal';

const mockCalendar: PNLCalendarData = {
  month: new Date().toISOString().slice(0, 7),
  days: [
    {date: '2023-07-02', pnl: 651.19, trades: 1},
    {date: '2023-07-06', pnl: -1085.69, trades: 1},
    {date: '2023-07-10', pnl: 2402.68, trades: 1},
    {date: '2023-07-12', pnl: 970.08, trades: 1},
    {date: '2023-07-18', pnl: 2228.23, trades: 1},
    {date: '2023-07-26', pnl: 1468.78, trades: 1},
    {date: '2023-07-28', pnl: 1561.98, trades: 1},
    {date: '2023-07-30', pnl: -260.27, trades: 1}
  ]
};

const mockWeekly: PNLWeeklySummaryData = {
  month: new Date().toISOString().slice(0, 7),
  weeks: [
    {week: 1, pnl: 2045.95, trades: 3},
    {week: 3, pnl: 3372.76, trades: 2},
    {week: 4, pnl: 2228.23, trades: 1},
    {week: 5, pnl: 3030.76, trades: 2},
    {week: 6, pnl: -260.27, trades: 1}
  ]
};

export function usePNLCalendar() {
  const [data, setData] = useState<PNLCalendarData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mockCalendar);
      setIsLoading(false);
    }, 600);
  }, []);

  return {data, isLoading, error};
}

export function usePNLWeeklySummary() {
  const [data, setData] = useState<PNLWeeklySummaryData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setIsLoading(true);
    setTimeout(() => {
      setData(mockWeekly);
      setIsLoading(false);
    }, 600);
  }, []);

  return {data, isLoading, error};
}
