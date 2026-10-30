import DynamicZoneRenderer from '@/components/DynamicZoneRenderer';
import PrimaryHero from './sections/PrimaryHero';
import TrustedClients from './sections/TrustedClients';
import AbouPrimaryOverview from './sections/AbouPrimaryOverview';
import PrimaryServices from './sections/PrimaryServices';
import UnimrktResearchArea from './sections/UnimrktResearchArea';
import ResearchMethodologies from './sections/ResearchMethodologies';
import IndustriesArea from './sections/IndustriesArea';
import ContactFormSection from './sections/ContactFormSection';
import CommonBlogSection from '../../components/CommonBlogSection';
import FqaPrimaryresearch from './sections/FqaPrimaryresearch';
import PrimaryresEditorialAbout from './sections/PrimaryresEditorialAbout';
import PrimaryresearchResearchCta from './sections/PrimaryresearchResearchCta';
import { getPageBySlug, findSection, generatePageMetadata } from '../../lib/strapi';

export async function generateMetadata() {
  return await generatePageMetadata(
    'primary-research',
    'Primary Market Research Services | Qualitative & Quantitative Depth',
    'End-to-end primary market research delivering authenticated first-hand data through rigorous sampling, multi-channel fieldwork, and direct respondent engagement.'
  );
}

export default async function PrimaryResearchPage() {
  const pageData = await getPageBySlug('primary-research').catch(() => null);

  
  if (pageData?.sections && pageData.sections.length > 0) {
    return (
      <main>
        <DynamicZoneRenderer sections={pageData.sections} pageContext={{ pageData }} />
      </main>
    );
  }

  const heroSection = findSection(pageData, 'sections.hero-common');
  const ctaSection = findSection(pageData, 'sections.question-cta');

  return (
    <>
      <PrimaryHero dynamicHero={heroSection} />
      <TrustedClients />
      <AbouPrimaryOverview />
      <PrimaryServices />
      <UnimrktResearchArea />
      <ResearchMethodologies />
      <IndustriesArea />
      <ContactFormSection />
      <CommonBlogSection />
      <FqaPrimaryresearch />
      <PrimaryresEditorialAbout />
      <PrimaryresearchResearchCta dynamicCta={ctaSection} />
    </>
  );
}
