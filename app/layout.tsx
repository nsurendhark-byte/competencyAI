import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'CompetencyAI — Your Skills. Your Path. Your Career.',
  description: 'AI-powered competency-based learning and career-readiness platform. Turn your skills into your career.',
  openGraph: {
    title: 'CompetencyAI — Career Intelligence OS',
    description: 'Autonomous skill assessment, personalized learning roadmaps, and career readiness engine.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body className="bg-background text-slate-100 min-h-screen flex flex-col antialiased selection:bg-cyan-500 selection:text-black">
        {children}
      </body>
    </html>
  );
}
