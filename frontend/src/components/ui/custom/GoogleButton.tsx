import React from 'react';

interface GoogleButtonProps {
  onClick: () => void;
  isLoading?: boolean;
  children?: React.ReactNode;
}

export const GoogleButton: React.FC<GoogleButtonProps> = ({
  onClick,
  isLoading,
  children
}) => (
  <button
    type="button"
    onClick={onClick}
    disabled={isLoading}
    className="flex items-center gap-2 px-4 py-2 rounded-md border border-gray-300 bg-white hover:bg-gray-50 text-gray-700 font-medium shadow-sm transition disabled:opacity-60"
    aria-label="Sign in with Google"
  >
    <svg width="20" height="20" viewBox="0 0 48 48" className="mr-2">
      <g>
        <path
          fill="#4285F4"
          d="M24 9.5c3.54 0 6.7 1.22 9.19 3.23l6.85-6.85C35.91 2.09 30.28 0 24 0 14.82 0 6.73 5.48 2.69 13.44l7.99 6.21C12.13 13.13 17.62 9.5 24 9.5z"
        />
        <path
          fill="#34A853"
          d="M46.1 24.55c0-1.64-.15-3.22-.42-4.74H24v9.01h12.42c-.54 2.9-2.18 5.36-4.65 7.01l7.19 5.6c4.2-3.88 6.61-9.6 6.61-16.88z"
        />
        <path
          fill="#FBBC05"
          d="M10.68 28.65A14.48 14.48 0 019.5 24c0-1.62.28-3.19.78-4.65l-7.99-6.21A23.93 23.93 0 000 24c0 3.93.94 7.65 2.59 10.86l8.09-6.21z"
        />
        <path
          fill="#EA4335"
          d="M24 48c6.28 0 11.56-2.08 15.41-5.66l-7.19-5.6c-2 1.36-4.56 2.16-8.22 2.16-6.38 0-11.87-3.63-14.32-8.86l-8.09 6.21C6.73 42.52 14.82 48 24 48z"
        />
        <path fill="none" d="M0 0h48v48H0z" />
      </g>
    </svg>
    {children || 'Sign in with Google'}
  </button>
);
