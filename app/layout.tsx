import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'HOT or NOT - Leads Edition',
  description: 'Rate your SaaS leads - Is this lead HOT or NOT?',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        {children}
      </body>
    </html>
  );
}
