import React from 'react';

export default function InsightsEditorial({
  kicker = 'About Telephonic Surveys',
  title = 'Direct Conversations. Deeper Insights.',
  paragraph1 = 'Telephonic Surveys enable businesses to connect directly with their target audience and gather reliable, real-time insights through structured conversations. At Unimrkt Research, our trained interviewers use professionally designed questionnaires and robust research processes to capture meaningful responses from the right respondents.',
  paragraph2 = 'From customer feedback and brand perception to market understanding and B2B research, our telephonic survey solutions combine human interaction with technology-driven data collection to deliver accurate, actionable insights that support confident business decisions.',
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
