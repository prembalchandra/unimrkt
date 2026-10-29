const STRAPI_URL = 'http://127.0.0.1:1337';

const pagesData = {
  home: [
    {
      __component: 'sections.home-hero',
      eyebrow: 'Market Intelligence',
      title: 'Connecting Data, Insights, and Action',
      description: 'Transforming raw data into decisive strategic clarity across 90+ countries and 22+ languages.',
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-996-large.mp4',
      cta: { label: 'Explore Our Solutions', url: '/services', variant: 'primary', showArrow: true },
      servicePills: [
        { title: 'Primary Research' },
        { title: 'CATI Telephone Surveys' },
        { title: 'B2B Insights' },
        { title: 'Global Panels' }
      ]
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Global Impact',
      heading: 'Research Excellence at Global Scale',
      description: 'Proven operational infrastructure delivering verifiable data to world-class enterprises.',
      metrics: [
        { number: '90+', label: 'Countries Covered' },
        { number: '16+', label: 'Years of Excellence' },
        { number: '500+', label: 'CATI Workstations' },
        { number: '250k+', label: 'Surveys Annually' }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: "Have A Question? Let's Find The Answer.",
      description: 'Connect with our senior research strategists to scope your multi-market intelligence study.',
      button: { label: 'Schedule A Consultation', url: '/contact', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Frequently Asked Questions',
      heading: 'Everything You Need to Know About Unimrkt Research',
      items: [
        {
          question: 'What methodologies does Unimrkt specialize in?',
          answer: 'We specialize in CATI, CAWI, quantitative telephone surveys, qualitative in-depth interviews, secondary desk research, and multi-country panel solutions.'
        },
        {
          question: 'How many countries do you cover?',
          answer: 'We actively conduct fieldwork across 90+ countries in 22+ languages with native bilingual research specialists.'
        }
      ]
    }
  ],

  about: [
    {
      __component: 'sections.hero-common',
      kicker: 'About Unimrkt',
      title: 'Global Research, Local Understanding',
      description: 'Since 2009, Unimrkt Research has delivered reliable market intelligence, actionable insights, and data-driven strategies supporting confident decision-making worldwide.',
      primaryButton: { label: 'Our Approach', url: '/work', variant: 'primary', showArrow: true },
      secondaryButton: { label: 'Contact Us', url: '/contact', variant: 'outline', showArrow: false }
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'By The Numbers',
      heading: '16+ Years of Proven Operational Scale',
      description: 'Benchmarking quality, rigor, and compliance across 90+ global markets.',
      metrics: [
        { number: '90+', label: 'Countries Fielded' },
        { number: '22+', label: 'Languages Supported' },
        { number: '500+', label: 'Workstations' },
        { number: '98%', label: 'Client Retention' }
      ]
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Our Foundation',
      heading: 'Core Values Guiding Our Research',
      description: 'Uncompromising integrity, technological precision, and client partnership define our culture.',
      values: [
        { title: 'Data Rigor', description: 'Strict multi-tier screening, audio verification, and statistical validation.' },
        { title: 'Global Empathy', description: 'Deep cultural understanding respecting local linguistic nuances.' },
        { title: 'Speed & Agility', description: 'Rapid turnaround times without ever compromising accuracy or compliance.' }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: 'Partner with Global Market Intelligence Experts',
      description: 'Discuss your research requirements with our dedicated vertical directors.',
      button: { label: 'Get in Touch', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'our-company': [
    {
      __component: 'sections.hero-common',
      kicker: 'Corporate Profile',
      title: 'Pioneering Global Market Intelligence',
      description: 'Unimrkt Research is a premier global market research and data operations powerhouse supporting leading consulting firms and enterprise brands.',
      primaryButton: { label: 'Explore Services', url: '/services', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.rich-text-block',
      title: 'Our Journey and Global Presence',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Founded in 2009, Unimrkt has evolved into an international research provider known for field excellence, ethical data governance, and specialized industry panels across five continents.'
            }
          ]
        }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: 'Ready to Expand Your Market Knowledge?',
      description: 'Let us build a customized research blueprint for your organization.',
      button: { label: 'Consult Our Team', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  services: [
    {
      __component: 'sections.hero-common',
      kicker: 'Our Services',
      title: 'Comprehensive Research Solutions Engineered for Growth',
      description: 'End-to-end qualitative, quantitative, CATI surveys, and custom business intelligence methodologies designed for complex global markets.',
      primaryButton: { label: 'View Primary Research', url: '/primary-research', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Operational Scope',
      heading: 'Built to Deliver Verifiable Insights',
      description: 'Full-service execution across enterprise B2B and specialized consumer panels.',
      metrics: [
        { number: '250k+', label: 'Surveys Per Year' },
        { number: '500+', label: 'CATI Workstations' },
        { number: '22+', label: 'Languages' },
        { number: '24/7', label: 'Field Management' }
      ]
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Service FAQs',
      heading: 'Questions About Our Research Methodologies',
      items: [
        { question: 'What is CATI survey research?', answer: 'Computer-Assisted Telephone Interviewing (CATI) enables real-time scripted surveys conducted by bilingual interviewers with integrated audio recording and live quality supervision.' },
        { question: 'Do you provide translation and localization?', answer: 'Yes, we provide native in-house translation, back-translation, and cultural adaptation in over 22 languages.' }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: 'Need a Custom Fieldwork Proposal?',
      description: 'Get in touch for custom pricing, timeline estimates, and feasibility breakdowns.',
      button: { label: 'Request A Proposal', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'primary-research': [
    {
      __component: 'sections.hero-common',
      kicker: 'Primary Research',
      title: 'Actionable Insights Sourced Directly From Target Markets',
      description: 'Uncovering unvarnished stakeholder sentiment, decision triggers, and competitive gaps through rigorous qualitative and quantitative fieldwork.',
      primaryButton: { label: 'Speak to a Specialist', url: '/contact', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Plan Your Primary Research Study',
      description: 'Reach niche B2B decision makers and verified global consumer audiences.',
      button: { label: 'Start A Project', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'telephonic-surveys': [
    {
      __component: 'sections.hero-common',
      kicker: 'CATI Surveys',
      title: 'High-Precision Telephone Surveys & Executive Interviewing',
      description: '500+ state-of-the-art workstations executing complex multi-language CATI surveys across 90+ countries with 100% audio monitoring.',
      primaryButton: { label: 'Explore CATI Scale', url: '/contact', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Need High-Response CATI Fieldwork?',
      description: 'Our bilingual call centers are ready to execute your executive survey scripts.',
      button: { label: 'Inquire Now', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  industries: [
    {
      __component: 'sections.hero-common',
      kicker: 'Industries We Serve',
      title: 'Deep Vertical Expertise Tailored to Unique Sectors',
      description: 'From automotive innovation to healthcare compliance and financial technologies, our specialized practices deliver sector-specific market intelligence.',
      primaryButton: { label: 'Explore Automotives', url: '/automotives', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Need Domain-Specific Market Intelligence?',
      description: 'Our industry practice leads understand your sector benchmarks, terminology, and regulations.',
      button: { label: 'Contact Practice Lead', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  automotives: [
    {
      __component: 'sections.hero-common',
      kicker: 'Automotive & Mobility',
      title: 'Navigating The Next Era of Electrification & Autonomous Fleets',
      description: 'Uncovering dealership trends, consumer EV adoption drivers, battery ecosystem dynamics, and fleet telematics intelligence.',
      primaryButton: { label: 'Request Automotive Study', url: '/contact', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Accelerate Your Automotive Strategy',
      description: 'Leverage our global automotive panels spanning fleet managers, EV buyers, and Tier-1 suppliers.',
      button: { label: 'Get Started', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'case-study': [
    {
      __component: 'sections.hero-common',
      kicker: 'Case Studies',
      title: 'Proven Results & Measurable Business Impact',
      description: 'Explore real-world case studies demonstrating how Unimrkt Research solves complex data challenges and unlocks enterprise growth.',
      primaryButton: { label: 'Read Client Stories', url: '#caseStudyExplorer', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Have a Complex Research Challenge?',
      description: 'Discover how our tailored research methodologies can solve your unique market problems.',
      button: { label: 'Discuss Your Goals', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'case-study-details': [
    {
      __component: 'sections.hero-common',
      kicker: 'Case Study In Detail',
      title: 'In-Depth Analysis & Strategic Implementation',
      description: 'Detailed breakdown of research design, methodology execution, and commercial results achieved.',
      primaryButton: { label: 'Back to Case Studies', url: '/case-study', variant: 'outline', showArrow: false }
    },
    {
      __component: 'sections.question-cta',
      title: 'Achieve Similar Results for Your Business',
      description: 'Contact our strategy consultants to design your custom research project.',
      button: { label: 'Get in Touch', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  blog: [
    {
      __component: 'sections.hero-common',
      kicker: 'Blogs & Insights',
      title: 'Market Intelligence, Trends & Strategic Analysis',
      description: 'Stay ahead of emerging consumer behavior, B2B intelligence trends, and modern primary research methodologies.',
      primaryButton: { label: 'Browse Articles', url: '#blogGrid', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Subscribe to Unimrkt Intelligence',
      description: 'Receive monthly research roundups and executive market summaries directly to your inbox.',
      button: { label: 'Contact Insights Team', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  'blog-details': [
    {
      __component: 'sections.hero-common',
      kicker: 'Article',
      title: 'Research Insights & Strategic Perspectives',
      description: 'Comprehensive analysis from Unimrkt Research methodology experts and industry analysts.',
      primaryButton: { label: 'All Articles', url: '/blog', variant: 'outline', showArrow: false }
    },
    {
      __component: 'sections.question-cta',
      title: 'Apply These Insights to Your Market Strategy',
      description: 'Schedule a session with our analysts to translate findings into commercial action.',
      button: { label: 'Speak With An Analyst', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  team: [
    {
      __component: 'sections.hero-common',
      kicker: 'Leadership Team',
      title: 'Our Leadership & Research Experts',
      description: 'Meet the visionaries, directors, and methodology specialists who drive quality and insight across 90+ countries.',
      primaryButton: { label: 'Explore Directory', url: '#teamProfileGrid', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Connect With Our Executive Leadership',
      description: 'Engage directly with our practice directors for your strategic research mandates.',
      button: { label: 'Reach Out', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  gallery: [
    {
      __component: 'sections.hero-common',
      kicker: 'Life at Unimrkt',
      title: 'Moments, Milestones & Celebrations',
      description: 'A glimpse into our vibrant company culture, global summit celebrations, and team milestones.',
      primaryButton: { label: 'View Moments', url: '#gallerySlider', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Join Our Growing Global Team',
      description: 'Discover exciting careers across market research, data science, and international operations.',
      button: { label: 'Explore Careers', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  faq: [
    {
      __component: 'sections.hero-common',
      kicker: 'Help & Knowledge',
      title: 'Frequently Asked Questions',
      description: 'Find answers regarding our research methodologies, global sample coverage, security standards, and deliverables.',
      primaryButton: { label: 'Ask A Question', url: '/contact', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'General FAQs',
      heading: 'Common Questions About Working With Us',
      items: [
        { question: 'What quality certifications does Unimrkt hold?', answer: 'We adhere strictly to ISO 20252 market research quality standards and ISO 27001 data security protocols, ensuring GDPR, CCPA, and ESOMAR compliance.' },
        { question: 'What deliverables do you provide?', answer: 'Deliverables include raw SPSS/Excel datasets, interactive dashboards, executive PPT summary decks, and cross-tabulated banners.' }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: 'Still Have Questions?',
      description: 'Our customer support and research advisory teams are available 24/7 to answer your inquiries.',
      button: { label: 'Contact Us Now', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  work: [
    {
      __component: 'sections.hero-common',
      kicker: 'Our Approach',
      title: 'How We Work: Precision, Rigor & Transparency',
      description: 'Explore our structured 5-stage research lifecycle engineered to eliminate bias, ensure compliance, and maximize insight clarity.',
      primaryButton: { label: 'See Methodologies', url: '/services', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Quality Pillars',
      heading: 'Standards Embedded in Every Survey',
      description: 'Continuous monitoring ensures every single interview meets statistical accuracy criteria.',
      values: [
        { title: 'Rigorous Screening', description: 'Dual-confirmation of B2B respondent credentials and identity.' },
        { title: 'Live Supervision', description: '100% recorded interviews with real-time QA team auditing.' },
        { title: 'Data Scrubbing', description: 'Advanced anomaly detection, speeder filtering, and logic checks.' }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: 'Experience The Unimrkt Advantage',
      description: 'Partner with a research team that values your data precision as much as you do.',
      button: { label: 'Start Your Survey', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  contact: [
    {
      __component: 'sections.hero-common',
      kicker: 'Contact Us',
      title: "Let's Connect and Build Your Research Blueprint",
      description: 'Our global team is available 24/7 across multiple timezones to assist with feasibility scoping, pricing, and methodology design.',
      primaryButton: { label: 'Contact Form', url: '#contact-form', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.question-cta',
      title: 'Have A Direct Question?',
      description: 'Call our direct global helpline or email us at sales@unimrkt.com for an immediate response.',
      button: { label: 'Email Sales', url: 'mailto:sales@unimrkt.com', variant: 'primary', showArrow: false }
    }
  ],

  'privacy-policy': [
    {
      __component: 'sections.hero-common',
      kicker: 'Legal & Compliance',
      title: 'Privacy Policy & Data Protection',
      description: 'Unimrkt Research is committed to protecting your privacy and ensuring transparent, ethical data management in accordance with GDPR and global privacy frameworks.'
    },
    {
      __component: 'sections.rich-text-block',
      title: 'Privacy and Data Governance Standards',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'This Privacy Policy explains how Unimrkt Research collects, uses, protects, and discloses personal information obtained through our websites, survey panels, and client research engagements. We strictly adhere to ESOMAR and Insights Association codes of conduct.'
            }
          ]
        }
      ]
    }
  ]
};

async function seedAll() {
  console.log('Fetching all pages from Strapi...');
  const res = await fetch(`${STRAPI_URL}/api/pages?pagination[limit]=50`);
  const json = await res.json();
  const pages = json.data;

  console.log(`Found ${pages.length} pages. Updating dynamic sections for all pages...`);

  for (const page of pages) {
    const slug = page.slug;
    const sections = pagesData[slug];

    if (!sections) {
      console.log(`- Skipping ${slug} (no preset data)`);
      continue;
    }

    try {
      const updateRes = await fetch(`${STRAPI_URL}/api/pages/${page.documentId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          data: {
            sections: sections
          }
        })
      });

      if (updateRes.ok) {
        console.log(`✓ Seeded ${sections.length} dynamic sections for: ${slug}`);
      } else {
        const errText = await updateRes.text();
        console.error(`✗ Error updating ${slug}:`, updateRes.status, errText);
      }
    } catch (err) {
      console.error(`✗ Error on ${slug}:`, err.message);
    }
  }

  console.log('\nAll pages seeded with dynamic sections successfully!');
}

seedAll().catch(console.error);
