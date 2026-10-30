const STRAPI_URL = 'http://127.0.0.1:1337';

const pagesData = {
  home: [
    {
      __component: 'sections.home-hero',
      eyebrow: 'Market Intelligence',
      title: 'Connecting Data, Insights, and Action',
      description: 'Transforming raw data into decisive strategic clarity across 90+ countries and 22+ languages.',
      videoUrl: '/asstes/images/home-banner-video.mp4',
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
      __component: 'sections.accordion-solutions',
      heading: 'Tailored Methodologies for Every Intelligence Need',
      description: 'From rapid quantitative polling to in-depth stakeholder qualitative interviews, our multi-modal research engine provides the exact rigor your mandate demands.',
      cards: [
        { title: 'Primary Quantitative Research', description: 'Multi-country survey programming with real-time quota tracking and statistical scrubbing.' },
        { title: 'CATI Telephone Interviewing', description: 'Over 500 state-of-the-art workstations with 100% audio audit and native bilingual specialists.' },
        { title: 'Executive B2B In-Depth Interviews', description: 'Peer-to-peer discussions with C-suite executives, Key Opinion Leaders, and technical authorities.' },
        { title: 'Secondary & Desk Research', description: 'Rigorous market sizing, regulatory landscapes, competitive benchmarking, and intelligence synthesis.' }
      ]
    },
    {
      __component: 'sections.research-reach',
      kicker: 'WORLDWIDE REACH',
      heading: 'Fieldwork Capabilities Across 90+ Global Markets',
      description: 'Headquartered in India with strategic offices in the USA and the UK, our field operations provide seamless 24/7 global coverage.',
      cards: [
        { title: 'North America', description: 'Full-service B2B & consumer reach across USA and Canada.' },
        { title: 'Europe & UK', description: 'Multilingual European operations complying with strict GDPR guidelines.' },
        { title: 'Asia-Pacific', description: 'Native linguistic capabilities spanning high-growth Asian consumer and industrial hubs.' },
        { title: 'LATAM & MEA', description: 'Emerging market feasibility and localized on-the-ground interviewing networks.' }
      ]
    },
    {
      __component: 'sections.industry-slider',
      kicker: 'INDUSTRIES WE SERVE',
      heading: 'Vertical Expertise Built for Specialized Sectors',
      description: 'Domain-specific teams providing sector-tested questionnaire design and verified respondent targeting.',
      slides: [
        { title: 'Automotive & Smart Mobility' },
        { title: 'Banking & Financial Services (BFSI)' },
        { title: 'Healthcare & Life Sciences' },
        { title: 'Consumer & Retail' },
        { title: 'Technology & Telecom' },
        { title: 'Energy & Utilities' }
      ]
    },
    {
      __component: 'sections.testimonials-slider',
      kicker: 'CLIENT TESTIMONIALS',
      heading: 'What Global Enterprises Say About Unimrkt',
      description: 'Trusted by Tier-1 consulting firms, Fortune 500 brands, and global market research agencies.',
      testimonials: [
        {
          quote: 'Unimrkt Research has been our primary fieldwork partner for three consecutive years across difficult EMEA markets. Their data quality, audio auditing, and turnaround speed are unmatched.',
          author: 'Marcus Vance',
          role: 'Vice President of Research',
          company: 'Global Strategy Partners'
        },
        {
          quote: 'The depth and rigor of their CATI operations allowed us to reach niche C-suite decision-makers across 12 countries with 99.4% verification compliance.',
          author: 'Elena Rostova',
          role: 'Director of Consumer Insights',
          company: 'OmniBrand Worldwide'
        }
      ]
    },
    {
      __component: 'sections.blogs-slider',
      kicker: 'LATEST INSIGHTS',
      heading: 'Market Intelligence & Strategic Perspectives',
      description: 'Explore the latest articles, methodology breakdowns, and research trends from Unimrkt analysts.'
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Frequently Asked Questions',
      heading: 'Everything You Need to Know About Unimrkt Research',
      description: 'Answers to key operational, compliance, and methodology questions.',
      items: [
        {
          question: 'What methodologies does Unimrkt specialize in?',
          answer: 'We specialize in CATI, CAWI, quantitative telephone surveys, qualitative in-depth interviews, secondary desk research, and multi-country panel solutions.'
        },
        {
          question: 'How many countries do you cover?',
          answer: 'We actively conduct fieldwork across 90+ countries in 22+ languages with native bilingual research specialists.'
        },
        {
          question: 'What quality certifications does Unimrkt maintain?',
          answer: 'We adhere strictly to ISO 20252 research quality standards, ISO 27001 data security protocols, and ESOMAR code of conduct.'
        }
      ]
    },
    {
      __component: 'sections.question-cta',
      title: "Have A Question? Let's Find The Answer.",
      description: 'Connect with our senior research strategists to scope your multi-market intelligence study.',
      button: { label: 'Schedule A Consultation', url: '/contact', variant: 'primary', showArrow: true }
    }
  ],

  about: [
    {
      __component: 'sections.hero-common',
      kicker: 'About Unimrkt',
      title: 'Global Research, Local Understanding',
      description: 'Since 2009, Unimrkt Research has delivered reliable market intelligence, actionable insights, and data-driven strategies supporting confident decision-making worldwide.',
      primaryButton: { label: 'Meet Our Leadership', url: '/team', variant: 'primary', showArrow: true },
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
        { title: 'Data Rigor', description: 'Strict multi-tier screening, audio verification, and statistical validation on every survey.' },
        { title: 'Global Empathy', description: 'Deep cultural understanding respecting local linguistic nuances and market realities.' },
        { title: 'Speed & Agility', description: 'Rapid turnaround times without ever compromising statistical accuracy or regulatory compliance.' }
      ]
    },
    {
      __component: 'sections.research-reach',
      kicker: 'GLOBAL FOOTPRINT',
      heading: 'Worldwide Fieldwork Capabilities',
      description: 'Operating seamlessly across North America, Europe, Asia-Pacific, Latin America, and the Middle East.',
      cards: [
        { title: 'Centralized Hub in India', description: '24/7 CATI center with 500+ workstations and native bilingual interviewers.' },
        { title: 'Regional Office in the UK', description: 'Client servicing and project coordination for European consulting partners.' },
        { title: 'Regional Office in the USA', description: 'North American practice directors managing multinational enterprise mandates.' }
      ]
    },
    {
      __component: 'sections.team-grid',
      kicker: 'LEADERSHIP',
      heading: 'Meet Our Executive Leadership',
      description: 'Directors and methodology experts driving research excellence across the globe.'
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
      description: 'Unimrkt Research is a premier global market research and data operations powerhouse supporting leading consulting firms and enterprise brands worldwide.',
      primaryButton: { label: 'Explore Services', url: '/services', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Corporate Scale',
      heading: 'Scale Built for Enterprise Demands',
      description: 'Combining state-of-the-art technological infrastructure with deep domain expertise.',
      metrics: [
        { number: '2009', label: 'Year Founded' },
        { number: '90+', label: 'Countries Reached' },
        { number: '22+', label: 'Languages' },
        { number: '100%', label: 'Audio Verified' }
      ]
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Our Mission & Vision',
      heading: 'Committed to Uncompromising Research Fidelity',
      description: 'Empowering organizations to minimize business risk and seize emerging market opportunities.',
      values: [
        { title: 'Our Mission', description: 'To provide verified, unvarnished stakeholder intelligence that empowers confident, high-stakes decision-making.' },
        { title: 'Our Vision', description: 'To be the most trusted global research operations partner recognized for ethical compliance and operational excellence.' },
        { title: 'Our Culture', description: 'Continuous learning, technological innovation, diversity, and client delight.' }
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
      primaryButton: { label: 'View Primary Research', url: '/primary-research', variant: 'primary', showArrow: true },
      secondaryButton: { label: 'Talk to An Expert', url: '/contact', variant: 'outline', showArrow: false }
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
      __component: 'sections.accordion-solutions',
      heading: 'Full Suite of Market Research Services',
      description: 'Tailored methodologies adapted to your research timeline, quota requirements, and target respondent complexity.',
      cards: [
        { title: 'Primary Quantitative Fieldwork', description: 'Online surveys, mobile CAWI, and high-volume data collection.' },
        { title: 'Computer-Assisted Telephone Interviewing (CATI)', description: '500+ workstations executing executive and consumer telephone questionnaires.' },
        { title: 'Qualitative In-Depth Interviews (IDIs)', description: 'One-on-one executive interviews and virtual focus groups.' },
        { title: 'Data Processing & Statistical Analysis', description: 'SPSS cross-tabulations, regression models, sentiment scoring, and executive reporting.' }
      ]
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Service FAQs',
      heading: 'Questions About Our Research Methodologies',
      description: 'Detailed insights into how our methodologies operate in practice.',
      items: [
        { question: 'What is CATI survey research?', answer: 'Computer-Assisted Telephone Interviewing (CATI) enables real-time scripted surveys conducted by bilingual interviewers with integrated audio recording and live quality supervision.' },
        { question: 'Do you provide translation and localization?', answer: 'Yes, we provide native in-house translation, back-translation, and cultural adaptation in over 22 languages.' },
        { question: 'How do you verify data quality?', answer: 'We apply a 3-tier validation protocol: dual-screening of respondents, 100% audio review of telephone interviews, and automated digital fraud detection.' }
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
      primaryButton: { label: 'Speak to a Specialist', url: '/contact', variant: 'primary', showArrow: true },
      secondaryButton: { label: 'View CATI Scale', url: '/telephonic-surveys', variant: 'outline', showArrow: false }
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Primary Research Metrics',
      heading: 'Empirical Data Sourced with Unmatched Precision',
      description: 'Ensuring your commercial strategies rest on authentic market realities.',
      metrics: [
        { number: '90+', label: 'Countries Fielded' },
        { number: '250k+', label: 'Interviews Completed' },
        { number: '99.2%', label: 'Screening Accuracy' },
        { number: '100%', label: 'Audit Trail' }
      ]
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Methodological Pillars',
      heading: 'Qualitative & Quantitative Excellence',
      description: 'Balancing statistical volume with deep contextual nuance.',
      values: [
        { title: 'Rigorous Sample Screening', description: 'Double verification of job titles, company size, and purchasing authority.' },
        { title: 'Native Language Fieldwork', description: 'Interviews conducted by native speakers who understand local business etiquette.' },
        { title: 'Speed to Insight', description: 'Real-time dashboard reporting so you can track quotas and emerging findings daily.' }
      ]
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Primary Research FAQs',
      heading: 'Common Questions About Primary Fieldwork',
      items: [
        { question: 'How do you recruit niche B2B participants?', answer: 'We recruit through verified professional directories, corporate networks, and specialized industry panels with dual-step credential validation.' },
        { question: 'What deliverables are included?', answer: 'Cleaned datasets (SPSS, CSV), frequency tables, cross-tabs, executive summary presentations, and full audio recordings where permitted.' }
      ]
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
      __component: 'sections.metrics-grid',
      kicker: 'CATI Infrastructure',
      heading: 'Built for High-Volume, High-Precision Calling',
      description: 'State-of-the-art telecom infrastructure connected to robust predictive dialers and QA recording.',
      metrics: [
        { number: '500+', label: 'Workstations' },
        { number: '100%', label: 'Recorded Calls' },
        { number: '22+', label: 'Supported Languages' },
        { number: '24/7', label: 'Operations' }
      ]
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Quality Assurance',
      heading: 'The Unimrkt CATI Advantage',
      description: 'Why leading global firms trust our telephone operations for mission-critical studies.',
      values: [
        { title: '100% Audio Review', description: 'Every interview is evaluated by dedicated quality auditors for script adherence.' },
        { title: 'Bilingual Specialists', description: 'Native interviewers bridge cultural and linguistic barriers effortlessly.' },
        { title: 'Real-Time Quota Logic', description: 'Automated survey routing prevents over-sampling and ensures quota balance.' }
      ]
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'CATI FAQs',
      heading: 'Frequently Asked Questions About CATI Fieldwork',
      items: [
        { question: 'Why choose CATI over online surveys?', answer: 'CATI delivers higher response rates from senior decision-makers, eliminates automated bot fraud, and allows real-time probing on complex questions.' },
        { question: 'How are calls recorded and audited?', answer: '100% of calls are recorded via secure ISO 27001 telephony infrastructure and reviewed by certified QA specialists.' }
      ]
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
      __component: 'sections.industry-slider',
      kicker: 'CORE SECTORS',
      heading: 'Specialized Practice Verticals',
      description: 'Experienced practice leaders managing dedicated respondent panels across key industry verticals.',
      slides: [
        { title: 'Automotive & Mobility' },
        { title: 'Banking & Financial Services (BFSI)' },
        { title: 'Healthcare & Life Sciences' },
        { title: 'Consumer & Retail' },
        { title: 'Technology & Telecom' },
        { title: 'FMCG & Packaged Goods' },
        { title: 'Energy & Utilities' }
      ]
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Vertical Breadth',
      heading: 'Industry Reach Benchmarks',
      description: 'Proven access across specialized industrial and executive respondent segments.',
      metrics: [
        { number: '10+', label: 'Vertical Practices' },
        { number: '100k+', label: 'B2B Executives' },
        { number: '50k+', label: 'Healthcare Professionals' },
        { number: '90+', label: 'Markets' }
      ]
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
      __component: 'sections.metrics-grid',
      kicker: 'Automotive Scale',
      heading: 'Automotive Research Coverage',
      description: 'Direct access to fleet owners, dealership principals, and EV buyers.',
      metrics: [
        { number: '35+', label: 'Automotive Markets' },
        { number: '15k+', label: 'Fleet Managers' },
        { number: '500+', label: 'Dealership Studies' },
        { number: '24/7', label: 'Field Execution' }
      ]
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Mobility Focus Areas',
      heading: 'Key Automotive Research Domains',
      description: 'Tracking disruptions across mobility, powertrains, and connected infotainment.',
      values: [
        { title: 'Electric Vehicle Adoption', description: 'Assessing range anxiety, charging infrastructure sentiment, and total cost of ownership perception.' },
        { title: 'Commercial Fleets', description: 'Evaluating telematics software adoption, maintenance scheduling, and fuel transition roadmaps.' },
        { title: 'Dealership Experience', description: 'Measuring buyer satisfaction, digital sales tools, and after-sales service performance.' }
      ]
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Automotive FAQs',
      heading: 'Questions About Automotive Research',
      items: [
        { question: 'Can you reach commercial fleet operators?', answer: 'Yes, we maintain verified panels of small, medium, and enterprise fleet directors globally.' },
        { question: 'Do you study EV charging infrastructure?', answer: 'We conduct regular sentiment benchmarks across residential and public charging station networks.' }
      ]
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
      __component: 'sections.case-studies-slider',
      kicker: 'CLIENT SUCCESS',
      heading: 'Real-World Research Impact',
      description: 'Detailed breakdowns of how our multi-market methodologies enabled transformative commercial results.'
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Client Impact',
      heading: 'Outcomes Delivered for Enterprise Partners',
      description: 'Measurable ROI on strategic decisions informed by Unimrkt empirical data.',
      metrics: [
        { number: '38%', label: 'Digital Adoption Gain' },
        { number: '15%', label: 'Churn Reduction' },
        { number: '45+', label: 'KOL Interviews in 14 Days' },
        { number: '90+', label: 'Global Markets' }
      ]
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
      __component: 'sections.rich-text-block',
      title: 'Methodological Design and Fieldwork Execution',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'By deploying a hybrid methodology combining quantitative CATI interviews with in-depth qualitative dialogues, Unimrkt successfully mapped the entire customer journey, identifying critical drop-off points and untapped value propositions.'
            }
          ]
        }
      ]
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
      __component: 'sections.blogs-slider',
      kicker: 'ALL ARTICLES',
      heading: 'Explore Our Thought Leadership',
      description: 'Actionable perspectives from research methodology directors and data science specialists.'
    },
    {
      __component: 'sections.faq-accordion',
      kicker: 'Insights FAQ',
      heading: 'Questions About Research Intelligence',
      items: [
        { question: 'How frequently are research articles published?', answer: 'We publish in-depth methodology articles and industry trend roundups weekly.' },
        { question: 'Can I request a custom topic analysis?', answer: 'Yes, our strategy advisory team welcomes custom briefing requests from corporate clients.' }
      ]
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
      __component: 'sections.rich-text-block',
      title: 'Article Content',
      content: [
        {
          type: 'paragraph',
          children: [
            {
              type: 'text',
              text: 'Modern market research is rapidly moving from reactive reporting to proactive commercial intelligence. Organizations that embrace verified primary research gain an enduring competitive advantage in turbulent economic conditions.'
            }
          ]
        }
      ]
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
      __component: 'sections.team-grid',
      kicker: 'EXECUTIVE TEAM',
      heading: 'Leadership Directory',
      description: 'Experienced research professionals committed to absolute data fidelity.'
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Leadership Principles',
      heading: 'The Standards Guiding Our Team',
      description: 'Our leaders are committed to continuous training, transparency, and ethical governance.',
      values: [
        { title: 'Client Stewardship', description: 'Treating every client project as our own business imperative.' },
        { title: 'Global Inclusion', description: 'Fostering diverse viewpoints and multilingual collaboration across five continents.' },
        { title: 'Ethical Data Stewardship', description: 'Strict adherence to ISO 20252, ISO 27001, and ESOMAR research codes.' }
      ]
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
      __component: 'sections.gallery-showcase',
      kicker: 'PHOTO ARCHIVE',
      heading: 'Life, Work & Culture at Unimrkt',
      description: 'From collaborative whiteboard sessions to international project summits and cultural celebrations.'
    },
    {
      __component: 'sections.question-cta',
      title: 'Join Our Growing Global Team',
      description: 'Discover exciting careers across market research, data science, and international operations.',
      button: { label: 'Explore Careers', url: '/work', variant: 'primary', showArrow: true }
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
      description: 'Clear, transparent answers to help you plan your next study.',
      items: [
        { question: 'What quality certifications does Unimrkt hold?', answer: 'We adhere strictly to ISO 20252 market research quality standards and ISO 27001 data security protocols, ensuring GDPR, CCPA, and ESOMAR compliance.' },
        { question: 'What deliverables do you provide?', answer: 'Deliverables include raw SPSS/Excel datasets, interactive dashboards, executive PPT summary decks, and cross-tabulated banners.' },
        { question: 'How quickly can a CATI project launch?', answer: 'Most standard scripts can be programmed, tested, and launched into field within 24 to 48 hours.' },
        { question: 'How do you handle multi-country translations?', answer: 'We provide native professional translation and back-translation with linguistic validation by local researchers.' }
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
      kicker: 'Our Approach & Careers',
      title: 'Great People Build Great Research',
      description: 'Explore our structured research lifecycle and discover exciting career opportunities across global market intelligence.',
      primaryButton: { label: 'Explore Open Roles', url: '#open-positions', variant: 'primary', showArrow: true }
    },
    {
      __component: 'sections.values-grid',
      kicker: 'Quality Pillars',
      heading: 'Standards Embedded in Every Survey',
      description: 'Continuous monitoring ensures every single interview meets statistical accuracy criteria.',
      values: [
        { title: 'Rigorous Screening', description: 'Dual-confirmation of B2B respondent credentials, employment status, and identity.' },
        { title: 'Live Supervision', description: '100% recorded interviews with real-time QA team auditing.' },
        { title: 'Data Scrubbing', description: 'Advanced anomaly detection, speeder filtering, and automated logic checks.' }
      ]
    },
    {
      __component: 'sections.metrics-grid',
      kicker: 'Workplace Culture',
      heading: 'Growth, Collaboration & Innovation',
      description: 'Empowering our people with continuous training and global project exposure.',
      metrics: [
        { number: '500+', label: 'Team Members' },
        { number: '45%', label: 'Women in Leadership' },
        { number: '100+', label: 'Training Hours / Year' },
        { number: '16+', label: 'Years of Growth' }
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
      __component: 'sections.contact-form',
      kicker: 'SEND AN INQUIRY',
      heading: 'Let us scope your research study',
      description: 'Fill out the form below and one of our practice leads will respond within 2 business hours.',
      supportEmail: 'sales@unimrkt.com',
      supportPhone: '+91-124-424-5210'
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

async function seedMaster() {
  console.log('Fetching all pages from Strapi...');
  const res = await fetch(`${STRAPI_URL}/api/pages?pagination[limit]=50`);
  const json = await res.json();
  const pages = json.data;

  console.log(`Found ${pages.length} pages in Strapi. Updating dynamic sections for each page...`);

  for (const page of pages) {
    const slug = page.slug;
    const sections = pagesData[slug];

    if (!sections) {
      console.log(`- Skipping ${slug} (no preset sections)`);
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

  console.log('\nAll pages seeded with comprehensive dynamic sections successfully!');
}

seedMaster().catch(console.error);
