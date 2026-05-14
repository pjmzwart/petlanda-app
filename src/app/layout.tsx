import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Pet Art AI',
  description: 'Maak unieke AI kunstwerken van je huisdier'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="nl">
      <body>{children}</body>
    </html>
  );
}
