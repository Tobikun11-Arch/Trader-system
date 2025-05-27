'use client';

import React from 'react';
import {usePathname, useRouter} from 'next/navigation';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({children}: DashboardLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const tabs = [
    {id: 'overview', label: 'Overview', path: '/dashboard'},
    {id: 'pnl-journal', label: 'P&L Journal', path: '/dashboard/pnl-journal'},
    {id: 'trades', label: 'Trades', path: '/dashboard/trades'},
    {id: 'analytics', label: 'Analytics', path: '/dashboard/analytics'}
  ];

  const currentTab = tabs.find(tab => pathname === tab.path)?.id || 'overview';

  const handleTabClick = (path: string) => {
    if (pathname !== path) {
      router.push(path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <nav className="w-56 min-h-screen bg-white border-r flex flex-col py-8 px-4">
        {tabs.map(tab => (
          <button
            key={tab.id}
            type="button"
            onClick={() => handleTabClick(tab.path)}
            className={`mb-2 px-4 py-2 rounded-md text-left transition font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
              ${
                currentTab === tab.id
                  ? 'bg-blue-100 text-blue-700'
                  : 'bg-transparent text-gray-700 hover:bg-gray-100'
              }
            `}
            aria-current={currentTab === tab.id ? 'page' : undefined}
          >
            {tab.label}
          </button>
        ))}
      </nav>
      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">{children}</main>
    </div>
  );
}
