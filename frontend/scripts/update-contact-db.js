async function updateContactPage() {
  const payload = {
    data: {
      sections: [
        {
          __component: 'sections.hero-common',
          kicker: 'Contact Us',
          title: 'Let’s Turn Your Business Questions Into Clear Answers',
          description: 'Tell us what you’re trying to understand. Our research experts will help you find the right path forward.',
          primaryButton: {
            label: 'Start a Conversation',
            url: '#contact-form',
            variant: 'primary',
            showArrow: true,
          },
        },
        {
          __component: 'sections.metrics-grid',
          heading: 'Research at a Global Scale',
          metrics: [
            { number: '90+', label: 'Countries' },
            { number: '22+', label: 'Languages' },
            { number: '450+', label: 'CATI Stations' },
            { number: '16+', label: 'Years of Experience' },
          ],
        },
        {
          __component: 'sections.values-grid',
          kicker: 'Why work with unimrkt?',
          heading: 'More Than Research. A Partner For Better Decisions.',
          description: 'From defining the research question to delivering actionable insights, our team combines research expertise, technology and global field capabilities to support better business decisions.',
          values: [
            {
              title: 'Deep Research Expertise',
              description: 'Experienced researchers who understand complex business problems and deliver clear, informed answers.',
            },
            {
              title: 'Global Reach',
              description: 'Research capable across markets, audiences, and geographies with localized expertise and scalable execution.',
            },
            {
              title: 'Quality-First Approach',
              description: 'Rigorous processes designed to ensure reliable data, trusted insights, and consistent reporting standards.',
            },
            {
              title: 'Business-Focused Insights',
              description: 'We turn research findings into strategic direction that supports smarter, faster business decisions.',
            },
          ],
        },
        {
          __component: 'sections.contact-form',
          kicker: 'Let’s Team Up!',
          heading: 'Let us scope your research study',
          description: 'Fill out the form below and one of our practice leads will respond within 2 business hours.',
        },
        {
          __component: 'sections.faq-accordion',
          heading: 'Frequently Asked Questions',
          items: [
            {
              question: 'How can I contact Unimrkt Research for market research services?',
              answer: "You can contact Unimrkt Research through our website's contact form to discuss your market research requirements. Our team will understand your objectives and recommend suitable research solutions for your business.",
            },
            {
              question: 'What types of market research services does Unimrkt offer?',
              answer: 'Unimrkt Research offers a range of market research solutions, including telephonic surveys, online surveys, qualitative research, quantitative research, B2B research, CATI services, and customized research solutions to help businesses gather meaningful market insights.',
            },
            {
              question: 'Can I discuss a customized research requirement with your team?',
              answer: 'Yes, you can discuss your specific research requirements with our team. We work to understand your target audience, research objectives, project scope, and timelines to develop a customized solution aligned with your business needs.',
            },
            {
              question: 'Where are Unimrkt Research offices located?',
              answer: 'Unimrkt Research serves clients across multiple markets with global offices in Gurugram (India), Great Neck, NY (USA), and Headington, Oxford (UK).',
            },
            {
              question: 'How can I work with Unimrkt Research?',
              answer: 'If you are interested in working with Unimrkt Research, you can explore career opportunities through our careers page. For business partnerships or research projects, contact our team to discuss available opportunities and collaboration possibilities.',
            },
          ],
        },
        {
          __component: 'sections.rich-text-block',
          title: 'Have a Research Question? Let’s Talk.',
          content: [
            {
              type: 'paragraph',
              children: [
                {
                  type: 'text',
                  text: 'Every business decision starts with a question. Whether you are exploring a new market, evaluating brand health, understanding customer sentiment, or validating a strategic investment, our team delivers the clarity and data you need to move forward with confidence.'
                }
              ]
            }
          ]
        },
        {
          __component: 'sections.question-cta',
          title: 'Start Your Research Journey',
          description: 'Partner with Unimrkt Research to uncover actionable market intelligence, understand your industry, and make confident business decisions.',
          button: {
            label: 'Talk to Our Experts',
            url: '/contact',
            variant: 'primary',
            showArrow: true,
          },
        },
      ],
    },
  };

  const res = await fetch('http://127.0.0.1:1337/api/pages/0872b21582d42d9e85242a42', {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  console.log('Update status via documentId:', res.status);
  if (!res.ok) {
    const err = await res.text();
    console.log('Error text:', err);
  } else {
    const data = await res.json();
    console.log('Successfully updated contact page in Strapi DB! Sections count:', data.data?.sections?.length);
  }
}

updateContactPage().catch(console.error);
