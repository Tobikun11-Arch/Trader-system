'use client';
import React, {useEffect} from 'react';
import {AuthProvider, useAuth} from '@/components/features/auth/AuthProvider';
import {AuthForm} from '@/components/features/auth/AuthForm';
import {useRouter} from 'next/navigation';

const LoginPageInner = () => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/pnl-journal');
  }, [user, router]);

  return <AuthForm />;
};

export default function LoginPage() {
  return (
    <AuthProvider>
      <LoginPageInner />
    </AuthProvider>
  );
}
