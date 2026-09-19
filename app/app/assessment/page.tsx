'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AssessmentPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/app/dashboard');
  }, [router]);

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center space-y-4">
      <div className="text-xs font-semibold text-[#94A3B8] tracking-wide">
        Redirecting to Dashboard...
      </div>
    </div>
  );
}
