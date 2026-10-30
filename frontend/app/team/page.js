import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import TeamHero from './sections/TeamHero';
import TeamDirectory from './sections/TeamDirectory';
import ResearchCta from './sections/ResearchCta';
import { getTeamMembers, getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'team',
    'Our Leadership & Research Team | Unimrkt Research',
    'Meet the executive leadership and multidisciplinary research directors leading Unimrkt Research across operations, methodology, data science, and client relations.'
  );
}

export default async function TeamPage() {
  const [strapiTeam, pageData] = await Promise.all([
    getTeamMembers(30).catch(() => []),
    getPageBySlug('team').catch(() => null),
  ]);

  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ team: strapiTeam, pageData }} />
      </main>
    );
  }

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
