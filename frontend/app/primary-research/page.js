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
import { getPageBySlug, findSection } from '../../lib/strapi';

export const metadata = {
  title: 'Primary Research Services | Qualitative & Quantitative Fieldwork',
  description:
    'Collect first-hand market intelligence through customized primary research solutions: in-depth interviews, executive recruitment, focus groups, and multi-market fieldwork.',
  keywords: [
    'primary research services',
    'qualitative fieldwork',
    'quantitative fieldwork',
    'in-depth interviews',
    'focus group discussions',
    'respondent recruitment',
    'survey fieldwork',
    'unimrkt primary research',
  ],
  alternates: {
    canonical: '/primary-research',
  },
  openGraph: {
    title: 'Primary Research Services | Unimrkt Research',
    description:
      'Customized primary research solutions that uncover customer opinions, validate business decisions, and fuel strategic growth across 90+ countries.',
    url: 'https://www.unimrkt.com/primary-research',
    siteName: 'Unimrkt Research',
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: '/asstes/images/unimrkt-reseach-primary-research-banner-img.png',
        width: 1200,
        height: 630,
        alt: 'Primary Research Services - Unimrkt Research',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Primary Research Services | Unimrkt Research',
    description:
      'Customized primary research solutions that uncover customer opinions, validate business decisions, and fuel strategic growth across 90+ countries.',
    images: ['/asstes/images/unimrkt-reseach-primary-research-banner-img.png'],
  },
};

export default async function PrimaryResearchPage() {
  const pageData = await getPageBySlug('primary-research').catch(() => null);

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
