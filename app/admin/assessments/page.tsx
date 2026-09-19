'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminAssessmentsPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/admin/dashboard');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="font-mono text-xs text-cyan-400">
        Redirecting to Admin Operations Dashboard...
      </div>
    </div>
  );
}
