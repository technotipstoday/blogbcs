import Navbar from './components/Navbar';
import localFont from 'next/font/local';
import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";

import { Analytics } from '@vercel/analytics/react';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});

const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});

export const metadata = {
  title: 'Your Blog - Your Thoughts',
  description: 'Best Blog Generation App',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`min-h-screen flex flex-col ${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning={true}      >
        {/* Header */}

        {/* <header className="bg-blue-600 p-4 text-white">
          My Blog App
        </header> */}

        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <main className="container mx-auto p-6 flex-grow">{children}</main>

        {/* Sticky Footer */}
        <footer className="bg-gray-800 text-white p-4 text-center mt-auto">
          © 2024 My Blog
        </footer>
      </body>
    </html>
  );
}