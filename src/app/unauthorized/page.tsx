'use client';

import { Suspense } from 'react';
import UnauthorizedPage from './unauthorized-content';

export const dynamic = 'force-dynamic';

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50" />}>
      <UnauthorizedPage />
    </Suspense>
  );
}

