import React from 'react';

interface LoadingPageProps {
  message?: string;
}

export default function LoadingPage({ message = 'Cargando...' }: LoadingPageProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <span
        className="loading loading-ring loading-lg text-blue-600 dark:text-blue-400"
        role="status"
        aria-label="Cargando"
      ></span>
      <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg font-medium">{message}</p>
    </div>
  );
}
