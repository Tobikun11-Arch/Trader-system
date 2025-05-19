'use client';

import React from 'react';
import {Tabs, TabsContent, TabsList, TabsTrigger} from '@/components/ui/tabs';
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

  const currentTab =
    tabs.find(tab => pathname.startsWith(tab.path))?.id || 'overview';

  const handleTabChange = (value: string) => {
    const tab = tabs.find(tab => tab.id === value);
    if (tab) {
      router.push(tab.path);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Tabs
          value={currentTab}
          onValueChange={handleTabChange}
          className="w-full"
        >
          <TabsList className="grid w-full grid-cols-4 mb-8">
            {tabs.map(tab => (
              <TabsTrigger
                key={tab.id}
                value={tab.id}
                className="data-[state=active]:bg-white data-[state=active]:text-primary"
              >
                {tab.label}
              </TabsTrigger>
            ))}
          </TabsList>
          <TabsContent value={currentTab} className="mt-0">
            {children}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
