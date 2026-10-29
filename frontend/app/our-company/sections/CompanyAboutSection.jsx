import React from 'react';

export default function CompanyAboutSection({ dynamicRichText = null }) {
  const title = dynamicRichText?.title || 'We Turn Questions Into Clarity';

  const renderContent = () => {
    if (dynamicRichText?.content && Array.isArray(dynamicRichText.content)) {
      return dynamicRichText.content.map((block, idx) => {
        const text = block.children?.map((c) => c.text).join('') || '';
        return <p key={idx}>{text}</p>;
      });
    }
    return (
      <>
        <p>
          Founded on 6 December 2009, Unimrkt Research has evolved into a trusted global market research partner, conducting multi-industry research across 90 countries and four continents — the Americas, Europe, Asia Pacific, and Africa. With expertise spanning 22+ foreign languages, we connect businesses with diverse audiences and deliver culturally relevant, actionable insights across markets.
        </p>
        <p>
          Our commitment to quality, security, and research integrity is reflected in our adherence to ESOMAR principles and our ISO 20252 and ISO 27001 certifications. Combining global reach, deep industry expertise, robust methodologies, and advanced data collection capabilities, Unimrkt Research helps organizations better understand their markets, customers, and opportunities to make confident, data-driven decisions.
        </p>
      </>
    );
  };

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">About Unimrkt</span>
            <h2 className="telephonic-overview-title">{title}</h2>
            {renderContent()}
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img src="/asstes/images/company-about-img.png" alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
