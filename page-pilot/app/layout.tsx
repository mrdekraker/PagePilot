import type { Metadata } from 'next';
import { League_Spartan } from 'next/font/google';
import { BookOpenIcon } from '@heroicons/react/24/solid'

import './globals.css';


import Navbar from './components/Navbar';
import Footer from './components/Footer';

const spartan = League_Spartan({
  subsets: ['latin'],
  weight: '400'
});

export const metadata: Metadata = {
  title: 'PagePilot',
  description: `Welcome to PagePilot, your all-in-one reading companion powered by Next.js. PagePilot offers a wealth of book-related features, including personalized book recommendations, concise book summaries, and in-depth explanations by ChatGPT. Whether you're a passionate reader or short on time, PagePilot helps you discover, understand, and enjoy books to the fullest. Dive into the world of literature like never before with PagePilot.`,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${spartan.className} flex flex-col min-h-screen`}>
        <Navbar />
        <main className="flex-grow">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}