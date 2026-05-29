import type { Metadata, Viewport } from 'next';
import { Analytics } from '@vercel/analytics/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Speakeasier — A Study in Restraint',
  description: 'Your personal mixologist. The shelf knows what it has. I know what you\'ll like.',
  keywords: ['cocktails', 'mixology', 'bartender', 'recipes', 'AI'],
  authors: [{ name: 'Speakeasier' }],
  openGraph: {
    title: 'Speakeasier — A Study in Restraint',
    description: 'Your personal mixologist. The shelf knows what it has. I know what you\'ll like.',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
  themeColor: '#0a0908',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased" style={{ 
        background: 'var(--bg)', 
        color: 'var(--text-primary)',
        fontFamily: 'var(--font-body)'
      }}>
        {/* Main content */}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
