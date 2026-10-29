import React from 'react';
import PrivacyHero from './sections/PrivacyHero';
import PrivacyContent from './sections/PrivacyContent';
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Privacy Policy & Data Protection | Unimrkt Research',
  description:
    'Learn how Unimrkt Research collects, uses, processes, and protects respondent data and personal information in full compliance with GDPR, ISO 20252, and international privacy laws.',
  keywords: [
    'unimrkt privacy policy',
    'market research data protection',
    'GDPR compliance research',
    'respondent confidentiality',
    'ISO 20252 privacy standards',
  ],
  alternates: {
    canonical: '/privacy-policy',
  },
  openGraph: {
    title: 'Privacy Policy & Data Protection | Unimrkt Research',
    description:
      'Learn how Unimrkt Research collects, uses, and protects personal information in accordance with international privacy laws and GDPR standards.',
    url: 'https://www.unimrkt.com/privacy-policy',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Privacy Policy & Data Protection | Unimrkt Research',
    description:
      'Learn how Unimrkt Research collects, uses, and protects personal information in accordance with international privacy laws.',
  },
};

export default async function PrivacyPolicyPage() {
  const pageData = await getPageBySlug('privacy-policy').catch(() => null);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');

  return (
    <main>
      <PrivacyHero dynamicHero={heroSection} />
      <PrivacyContent dynamicRichText={richTextSection} />
    </main>
  );
}
