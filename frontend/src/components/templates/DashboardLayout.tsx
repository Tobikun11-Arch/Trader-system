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
      //added rndom comment
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between w-full max-w-4xl mx-auto mb-8">
          {tabs.map(tab => (
            <button
              key={tab.id}
              type="button"
              onClick={() => handleTabClick(tab.path)}
              className={`px-8 py-4 rounded-md transition font-medium focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2
                ${
                  currentTab === tab.id
                    ? 'bg-blue-600 text-white shadow'
                    : 'bg-transparent text-black hover:bg-gray-100'
                }
              `}
              aria-current={currentTab === tab.id ? 'page' : undefined}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
}
