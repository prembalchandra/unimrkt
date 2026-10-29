import React from 'react';
import ContactHero from './sections/ContactHero';
import ResearchImpact from './sections/ResearchImpact';
import OfficePresence from './sections/OfficePresence';
import ResearchValue from './sections/ResearchValue';
import ContactProcess from './sections/ContactProcess';
import ContactForm from './sections/ContactForm';
import ContactFaq from './sections/ContactFaq';
import InsightsEditorial from './sections/InsightsEditorial';
import ResearchCta from './sections/ResearchCta';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Contact Us | Global Research Offices in India, USA & UK',
  description:
    'Connect with Unimrkt Research market experts. Reach our global offices in Gurugram (India), Great Neck (USA), and Oxford (UK) for custom research inquiries and proposals.',
  keywords: [
    'contact unimrkt research',
    'market research inquiries',
    'research proposal request',
    'unimrkt india office',
    'unimrkt usa office',
    'unimrkt uk office',
    'talk to research expert',
  ],
  alternates: {
    canonical: '/contact',
  },
  openGraph: {
    title: 'Contact Us | Unimrkt Research Global Offices',
    description:
      'Contact Unimrkt Research to turn your business questions into clear answers. Explore our global office locations in India, USA, and UK.',
    url: 'https://www.unimrkt.com/contact',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/contact-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Contact Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contact Us | Unimrkt Research Global Offices',
    description:
      'Contact Unimrkt Research to turn your business questions into clear answers. Explore our global office locations in India, USA, and UK.',
    images: ['/asstes/images/contact-banner-img.png'],
  },
};

export default async function ContactPage() {
  const pageData = await getPageBySlug('contact').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <main>
      <ContactHero dynamicHero={heroSection} />
      <ResearchImpact />
      <OfficePresence />
      <ResearchValue />
      <ContactProcess />
      <ContactForm />
      <ContactFaq />
      <InsightsEditorial />
      <ResearchCta dynamicCta={ctaSection} />
    </main>
  );
}
