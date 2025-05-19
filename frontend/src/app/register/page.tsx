'use client';
import React, {useEffect} from 'react';
import {
  AuthProvider,
  useAuth
} from '@/src/components/features/auth/AuthProvider';
import {AuthForm} from '@/src/components/features/auth/AuthForm';
import {useRouter} from 'next/navigation';

const RegisterPageInner = () => {
  const {user} = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) router.replace('/pnl-journal');
  }, [user, router]);

  return <AuthForm />;
};

export default function RegisterPage() {
  return (
    <AuthProvider>
      <RegisterPageInner />
    </AuthProvider>
  );
}
