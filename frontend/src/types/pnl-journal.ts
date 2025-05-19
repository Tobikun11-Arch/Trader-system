export interface PNLDay {
  date: string; // YYYY-MM-DD
  pnl: number;
  trades: number;
}

export interface PNLWeekSummary {
  week: number;
  pnl: number;
  trades: number;
}

export interface PNLCalendarData {
  month: string; // YYYY-MM
  days: PNLDay[];
}

export interface PNLWeeklySummaryData {
  month: string; // YYYY-MM
  weeks: PNLWeekSummary[];
}
