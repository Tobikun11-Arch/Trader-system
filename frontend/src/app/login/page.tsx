'use client';
import React, {useEffect} from 'react';
import {AuthProvider, useAuth} from '@/components/features/auth/AuthProvider';
import {AuthSplitLayout} from '@/components/features/auth/AuthSplitLayout';
import {useRouter} from 'next/navigation';

const LoginPageInner = () => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/pnl-journal');
  }, [user, router]);

  return <AuthSplitLayout />  ;
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageInner />
    </AuthProvider>
  );
}
