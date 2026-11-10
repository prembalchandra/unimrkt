import React from 'react';
import { getStrapiMedia } from '../../../lib/strapi';

export default function TelephonicOverview({ dynamicOverview = null }) {
  const kicker = dynamicOverview?.kicker || 'WHAT ARE TELEPHONIC SURVEYS?';
  const title = dynamicOverview?.title || dynamicOverview?.heading || 'Direct Access To The Voices That Matter';
  const desc = dynamicOverview?.description;
  const image = getStrapiMedia(dynamicOverview?.image, '/asstes/images/unimrkt-research-voices-img.png');

  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">{kicker}</span>
            <h2 className="telephonic-overview-title">{title}</h2>

            <div className="abou-Primary-overview">
              {desc ? (
                <p>{desc}</p>
              ) : (
                <>
                  <p>
                    Telephonic surveys provide a structured and efficient way to connect directly with respondents and capture their opinions, experiences, preferences and behaviours.
                  </p>
                  <p>
                    At Unimrkt Research, our telephonic research programs combine trained interviewers, carefully designed questionnaires, respondent targeting and rigorous quality checks to deliver dependable primary research insights.
                  </p>
                  <p>
                    Whether you need customer feedback, market intelligence, brand understanding or B2B research, our CATI capabilities help you collect meaningful data at scale.
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img src={image} alt={title} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
