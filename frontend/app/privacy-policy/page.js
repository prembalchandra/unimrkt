import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import React from 'react';
import PrivacyHero from './sections/PrivacyHero';
import PrivacyContent from './sections/PrivacyContent';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'privacy-policy',
    'Privacy Policy & Data Protection | Unimrkt Research',
    'Learn how Unimrkt Research collects, uses, processes, and protects respondent data and personal information in full compliance with GDPR, ISO 20252, and international privacy laws.'
  );
}

export default async function PrivacyPolicyPage() {
  const pageData = await getPageBySlug('privacy-policy').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const richTextSection = findSection(pageData, 'sections.rich-text-block');

  return (
    <main>
      <PrivacyHero dynamicHero={heroSection} />
      <PrivacyContent dynamicRichText={richTextSection} />
    </main>
  );
}
