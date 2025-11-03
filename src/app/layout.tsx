import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import AdSenseScript from '@/components/AdSenseScript';
import Chatbot from '@/components/Chatbot';
import DarkModeToggle from '@/components/DarkModeToggle';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Bengali Blog - আপনার বাংলা ব্লগ',
  description: 'বাংলায় লেখা আর্টিকেল, টিউটোরিয়াল এবং গাইড পড়ুন',
  keywords: 'bengali blog, bangla blog, বাংলা ব্লগ, টিউটোরিয়াল, গাইড',
  authors: [{ name: 'Admin' }],
  openGraph: {
    title: 'Bengali Blog - আপনার বাংলা ব্লগ',
    description: 'বাংলায় লেখা আর্টিকেল, টিউটোরিয়াল এবং গাইড পড়ুন',
    type: 'website',
    locale: 'bn_BD',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn">
      <head>
        <AdSenseScript />
      </head>
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </div>
        <Chatbot />
        <DarkModeToggle />
      </body>
    </html>
  );
}
