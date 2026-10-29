import TeamHero from './sections/TeamHero';
import TeamDirectory from './sections/TeamDirectory';
import ResearchCta from './sections/ResearchCta';
import { getTeamMembers, getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Our Leadership & Research Team | Unimrkt Research',
  description:
    'Meet the leadership, research directors, data analysts, and methodology specialists at Unimrkt Research who bring rigor, insight, and strategic thinking to every project.',
  keywords: [
    'unimrkt leadership',
    'market research directors',
    'research management team',
    'data analytics specialists',
    'unimrkt executive leadership',
  ],
  alternates: {
    canonical: '/team',
  },
  openGraph: {
    title: 'Our Leadership & Research Team | Unimrkt Research',
    description:
      'A diverse team of research experts bringing experience, insight, and strategic thinking to every project across 90+ countries.',
    url: 'https://www.unimrkt.com/team',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/team-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Our Team - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Leadership & Research Team | Unimrkt Research',
    description:
      'A diverse team of research experts bringing experience, insight, and strategic thinking to every project.',
    images: ['/asstes/images/team-banner-img.png'],
  },
};

export default async function TeamPage() {
  const [strapiTeam, pageData] = await Promise.all([
    getTeamMembers(30).catch(() => []),
    getPageBySlug('team').catch(() => null),
  ]);

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <TeamHero dynamicHero={heroSection} />
      <TeamDirectory initialTeam={strapiTeam} />
      <ResearchCta dynamicCta={ctaSection} />
    </>
  );
}
