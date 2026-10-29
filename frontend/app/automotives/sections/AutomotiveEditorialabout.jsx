import React from 'react';

export default function AutomotiveEditorialabout({
  kicker = 'About Our Automotive Research',
  title = 'Driving Innovation with Automotive Market Intelligence',
  paragraph1 = 'The automotive industry is evolving rapidly with the rise of electric vehicles, connected mobility, autonomous technologies, and changing consumer expectations. At Unimrkt Research, we provide comprehensive automotive market research that helps manufacturers, OEMs, suppliers, dealerships, EV companies, and mobility providers make informed, data-driven decisions..',
  paragraph2 = 'Leveraging advanced research methodologies and deep industry expertise, we deliver actionable insights into consumer behavior, market trends, competitive landscapes, product innovation, and emerging opportunities. Our customized research solutions empower automotive businesses to reduce risk, accelerate innovation, and achieve sustainable growth in an increasingly competitive global market.',
} = {}) {
  return (
    <section className="insights-editorial-section">
      <div className="srcn-container">
        <div className="insights-editorial-box">
          <span className="sub-title-red">{kicker}</span>
          <h2 className="insights-editorial-heading section-main-heading">{title}</h2>
          <div className="insights-editorial-text-wrap">
            <p>{paragraph1}</p>
            {paragraph2 && <p>{paragraph2}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
