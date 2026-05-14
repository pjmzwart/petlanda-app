import './globals.css';

export const metadata = {
  title: 'PetLanda | AI Pet Art Studio',
  description: 'Turn your pet photo into adorable AI artwork. Create one free preview and unlock a 5-image HD pack.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
