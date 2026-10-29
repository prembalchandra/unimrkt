import Header from '@/components/Header';
import Footer from '@/components/Footer';

export const metadata = {
  metadataBase: new URL('https://www.unimrkt.com'),
  title: {
    default: 'Unimrkt Research | Structured Market Intelligence & Global Solutions',
    template: '%s | Unimrkt Research',
  },
  description:
    'Unimrkt Research delivers structured market data, CATI/CAWI quantitative surveys, qualitative research, and global market intelligence across 90+ countries and 22+ languages.',
  keywords: [
    'market research company',
    'global market research',
    'CATI surveys',
    'CAWI surveys',
    'qualitative research',
    'quantitative research',
    'B2B market research',
    'primary research services',
    'market intelligence',
    'Unimrkt Research',
    'consumer insights',
    'brand tracking',
  ],
  authors: [{ name: 'Unimrkt Research', url: 'https://www.unimrkt.com' }],
  creator: 'Unimrkt Research',
  publisher: 'Unimrkt Research',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.unimrkt.com',
    siteName: 'Unimrkt Research',
    title: 'Unimrkt Research | Structured Market Intelligence',
    description:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    images: [
      {
        url: '/asstes/images/unimrkt-resarch-map-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Unimrkt Research - Global Market Intelligence',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Unimrkt Research | Structured Market Intelligence',
    description:
      'Delivering structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
    images: ['/asstes/images/unimrkt-resarch-map-banner-img.png'],
  },
  icons: {
    icon: '/favicon.ico',
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
};

const jsonLdOrg = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Unimrkt Research',
  url: 'https://www.unimrkt.com',
  logo: 'https://www.unimrkt.com/asstes/images/unimrkt-logo-red.png',
  description:
    'Unimrkt Research delivers structured market data enabling organizations to gain complete clarity into market dynamics, minimize risks, and uncover new opportunities.',
  contactPoint: [
    {
      '@type': 'ContactPoint',
      telephone: '+91-124-424-5210',
      contactType: 'sales',
      email: 'sales@unimrkt.com',
      areaServed: 'Worldwide',
      availableLanguage: ['English'],
    },
  ],
  sameAs: [
    'https://www.linkedin.com/company/unimrkt-research',
  ],
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Montserrat:wght@400;500;600;700&family=Quicksand:wght@400;500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/asstes/fontawesome/css/all.min.css" />
        <link rel="stylesheet" href="/asstes/css/swiper-bundle.min.css" />
        <link rel="stylesheet" href="/asstes/css/leaflet.css" />
        <link rel="stylesheet" href="/asstes/css/global.css?v=1.0" />
        <link rel="stylesheet" href="/asstes/css/style.css?v=3.5" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrg) }}
        />
      </head>
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
