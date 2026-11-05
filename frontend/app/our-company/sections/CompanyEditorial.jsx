import React from 'react';

export default function CompanyEditorial({ dynamicEditorial = null }) {
  const kicker = dynamicEditorial?.kicker || 'About Company';
  const heading =
    dynamicEditorial?.heading || 'Turning Market Questions Into Business Clarity';
  const content =
    dynamicEditorial?.content ||
    'Unimrkt is a global market research and insights company helping businesses understand markets, consumers, and emerging opportunities. With research capabilities across 90+ countries and 22+ languages, we bring together global reach, local understanding, and deep industry expertise to uncover meaningful perspectives. From defining business challenges to delivering actionable recommendations, our research is designed to help organisations make informed decisions with confidence. Through rigorous methodologies, advanced technology, and a human-centred approach, we transform complex data and diverse perspectives into insights that create measurable business impact.';

  return (
    <section className="bg-white py-16 sm:py-20 lg:py-24">
      <div className="mx-auto w-full max-w-container px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-[850px] text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-brand-600">
            {kicker}
          </p>
          <h2 className="mt-3 capitalize text-[28px] font-semibold leading-[1.2] text-heading sm:text-4xl lg:text-[44px] lg:tracking-[-2px]">
            {heading}
          </h2>
          <p className="mx-auto mt-6 max-w-4xl text-base leading-[1.9] text-heading/80">
            {content}
          </p>
        </div>
      </div>
    </section>
  );
}
