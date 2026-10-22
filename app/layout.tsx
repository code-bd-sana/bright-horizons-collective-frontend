import type { Metadata } from 'next';
import { Geist, Geist_Mono, Lora, Manrope, Nunito } from 'next/font/google';
import './globals.css';
import { QueryProvider } from '@/components/query-provider';
import { MarketingShell } from '@/components/marketing-shell';
import { Toaster } from 'sonner';
import { constructMetadata } from '@/lib/metadata';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

const nunito = Nunito({
  variable: '--font-nunito',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
});

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
});

const lora = Lora({
  variable: '--font-lora',
  subsets: ['latin'],
  style: ['italic'],
  weight: ['400'],
});

export const metadata: Metadata = constructMetadata({
  title: 'Bright Horizons Collective | Pediatric OT & Family Support',
  description:
    'Empowering families with pediatric occupational therapy resources, customized weekly developmental plans, and expert guidance.',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${nunito.variable} ${manrope.variable} ${lora.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <QueryProvider>
          <MarketingShell>{children}</MarketingShell>
          <Toaster position="top-right" richColors />
        </QueryProvider>
      </body>
    </html>
  );
}
