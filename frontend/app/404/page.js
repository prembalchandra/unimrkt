import React from 'react';
import NotFoundHero from './sections/NotFoundHero';

export const metadata = {
  title: '404 - Page Not Found | Unimrkt Research',
  description: "Wrong turn. Right mindset. The page you are looking for doesn't exist or has been moved.",
  robots: {
    index: false,
    follow: false,
  },
};

export default function NotFoundPage() {
  return (
    <main>
      <NotFoundHero />
    </main>
  );
}
