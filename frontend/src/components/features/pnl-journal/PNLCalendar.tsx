'use client';
import React, {useState, useCallback, useEffect} from 'react';
import {AddTradeModal} from './AddTradeModal';
import {Button} from '@/components/ui/button';
import {ChevronLeft, ChevronRight} from 'lucide-react';
import {usePNLCalendar} from '@/lib/client/queries/pnl-journal';

interface TradeData {
  date: string;
  pnl: number;
  trades: number;
}

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfWeek(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

// Helper to get previous month's last day
function getPrevMonthLastDay(year: number, month: number) {
  return new Date(year, month, 0).getDate();
}

export const PNLCalendar: React.FC = () => {
  const {data, isLoading, error} = usePNLCalendar();
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | null>(null);
  const [tradeData, setTradeData] = useState<Record<string, TradeData>>({});
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Set initial year/month on client only
  useEffect(() => {
    const now = new Date();
    setSelectedYear(now.getFullYear());
    setSelectedMonth(now.getMonth());
  }, []);

  const handleDateClick = (date: string) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const handleSaveTrade = useCallback(
    (data: {trades: number; pnl: number}) => {
      if (selectedDate) {
        setTradeData(prev => ({
          ...prev,
          [selectedDate]: {
            date: selectedDate,
            trades: data.trades,
            pnl: data.pnl
          }
        }));
      }
    },
    [selectedDate]
  );

  const handlePrevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(prev => prev - 1);
    } else {
      setSelectedMonth(prev => prev - 1);
    }
  };

  const handleNextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(prev => prev + 1);
    } else {
      setSelectedMonth(prev => prev + 1);
    }
  };

  if (selectedYear === null || selectedMonth === null) {
    return null; // or a loading spinner
  }

  const daysInMonth = getDaysInMonth(selectedYear, selectedMonth);
  const firstDayOfWeek = getFirstDayOfWeek(selectedYear, selectedMonth);
  const prevMonth = selectedMonth === 0 ? 11 : selectedMonth - 1;
  const prevMonthYear = selectedMonth === 0 ? selectedYear - 1 : selectedYear;
  const prevMonthLastDay = getPrevMonthLastDay(selectedYear, selectedMonth);
  const nextMonth = selectedMonth === 11 ? 0 : selectedMonth + 1;
  const nextMonthYear = selectedMonth === 11 ? selectedYear + 1 : selectedYear;

  // Build calendar days array with info about which month each day belongs to
  const calendarDays: {
    day: number;
    month: number;
    year: number;
    isCurrentMonth: boolean;
  }[] = [];

  // Previous month's days (if any)
  for (let i = firstDayOfWeek - 1; i >= 0; i--) {
    calendarDays.push({
      day: prevMonthLastDay - i,
      month: prevMonth,
      year: prevMonthYear,
      isCurrentMonth: false
    });
  }
  // Current month's days
  for (let d = 1; d <= daysInMonth; d++) {
    calendarDays.push({
      day: d,
      month: selectedMonth,
      year: selectedYear,
      isCurrentMonth: true
    });
  }
  // Next month's days (to fill the last week)
  const totalCells = Math.ceil(calendarDays.length / 7) * 7;
  for (let d = 1; calendarDays.length < totalCells; d++) {
    calendarDays.push({
      day: d,
      month: nextMonth,
      year: nextMonthYear,
      isCurrentMonth: false
    });
  }

  const monthNames = [
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
  ];

  if (isLoading)
    return (
      <div className="bg-gray-50 rounded-lg p-4 shadow animate-pulse">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="h-6 w-24 bg-gray-200 rounded" />
            <div className="h-6 w-16 bg-gray-200 rounded" />
          </div>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Array.from({length: 7}).map((_, i) => (
            <div key={i} className="h-4 bg-gray-200 rounded" />
          ))}
          {Array.from({length: 35}).map((_, i) => (
            <div key={i} className="h-24 bg-gray-200 rounded" />
          ))}
        </div>
        <div className="h-6 w-32 bg-gray-200 rounded mx-auto mt-4" />
      </div>
    );
  if (error)
    return (
      <div className="p-8 text-center text-red-500">
        Failed to load calendar.
      </div>
    );
  if (!data)
    return <div className="p-8 text-center text-gray-400">No data.</div>;

  return (
    <div className="bg-white rounded-lg p-4 shadow">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevMonth}
            className="h-8 w-8"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-xl font-semibold">
            {monthNames[selectedMonth]} {selectedYear}
          </h2>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNextMonth}
            className="h-8 w-8"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div
            key={day}
            className="text-center text-sm font-medium text-gray-500 py-2"
          >
            {day}
          </div>
        ))}
        {calendarDays.map((dateObj, i) => {
          const {day, month, year, isCurrentMonth} = dateObj;
          const dateStr = `${year}-${String(month + 1).padStart(
            2,
            '0'
          )}-${String(day).padStart(2, '0')}`;
          const trade = tradeData[dateStr] || null;
          return (
            <div
              key={i}
              onClick={() => {
                if (isCurrentMonth) handleDateClick(dateStr);
              }}
              className={`
                min-h-[100px] p-2 border rounded-lg
                ${
                  isCurrentMonth
                    ? 'cursor-pointer bg-white hover:bg-gray-50'
                    : 'bg-gray-50 text-gray-300'
                }
                ${
                  isCurrentMonth && trade?.pnl
                    ? trade.pnl >= 0
                      ? 'border-green-200'
                      : 'border-red-200'
                    : ''
                }
              `}
            >
              <div
                className={`text-sm ${
                  isCurrentMonth ? 'text-gray-500' : 'text-gray-300'
                }`}
              >
                {day}
              </div>
              {isCurrentMonth && trade && (
                <div
                  className={`text-sm font-medium ${
                    trade.pnl >= 0 ? 'text-green-600' : 'text-red-500'
                  }`}
                >
                  {trade.pnl}
                </div>
              )}
            </div>
          );
        })}
      </div>

      <AddTradeModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveTrade}
        date={selectedDate || ''}
      />
    </div>
  );
};
