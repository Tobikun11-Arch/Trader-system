import {AuthForm} from './AuthForm';
import {TradingLogo} from '@/components/ui/custom/TradingLogo';
import React from 'react';

export function AuthSplitLayout() {
  return (
    <div className="flex min-h-screen">
      {/* Left: Branding & Testimonials */}
      <div className="w-1/2 bg-gradient-to-b from-[#0a1a2f] to-[#112233] flex flex-col justify-center items-center p-12">
        <TradingLogo />
        <h1 className="text-4xl font-bold mt-8 text-white text-center">
          Your Trading Journal Starts Here
        </h1>
        <p className="mt-4 text-lg text-slate-300 max-w-md text-center">
          Log every trade. Review your performance. Unlock your trading edge
          with powerful analytics and insights.
        </p>
        <div className="mt-8 w-full max-w-sm">
          {/* Testimonial Card Placeholder */}
          <div className="bg-[#16243a] rounded-lg p-4 shadow-md text-white">
            <div className="flex items-center mb-2">
              <span className="text-green-400 font-bold mr-2">★★★★★</span>
              <span className="font-semibold">Trader Jane</span>
            </div>
            <p className="text-sm">
              "TradeJournal helped me spot patterns in my trading I never
              noticed before. My performance and confidence have never been
              higher!"
            </p>
          </div>
        </div>
      </div>
      {/* Right: Auth Form */}
      <div className="w-1/2 flex items-center justify-center bg-gradient-to-br from-[#1e3a5c] to-[#2e8b57]">
        <div className="w-full max-w-md">
          <AuthForm />
        </div>
      </div>
    </div>
  );
}
