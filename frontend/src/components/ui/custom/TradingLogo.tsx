import React from 'react';

export function TradingLogo() {
  return (
    <div className="flex items-center gap-2">
      {/* Simple notebook/chart icon */}
      <svg
        width="36"
        height="36"
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="4" y="6" width="28" height="24" rx="4" fill="#2e8b57" />
        <rect x="8" y="10" width="20" height="2" rx="1" fill="#fff" />
        <rect x="8" y="16" width="12" height="2" rx="1" fill="#fff" />
        <rect x="8" y="22" width="16" height="2" rx="1" fill="#fff" />
      </svg>
      <span className="text-2xl font-extrabold tracking-tight text-white select-none">
        Trade<span className="text-green-400">Journal</span>
      </span>
    </div>
  );
}
