import React from 'react';

export default function InsightsEditorial({
  dynamicEditorial = null,
  kicker = 'About Telephonic Surveys',
  title = 'Direct Conversations. Deeper Insights.',
  paragraph1,
  paragraph2,
} = {}) {
  const displayKicker = dynamicEditorial?.kicker || kicker;
  const displayTitle = dynamicEditorial?.heading || dynamicEditorial?.title || title;
  const displayP1 = dynamicEditorial?.description || paragraph1;

  return (
    <section className="insights-editorial-section">
      <div className="srcn-container">
        <div className="insights-editorial-box">
          {displayKicker && <span className="sub-title-red">{displayKicker}</span>}
          <h2 className="insights-editorial-heading section-main-heading">{displayTitle}</h2>
          <div className="insights-editorial-text-wrap">
            {displayP1 ? (
              <p>{displayP1}</p>
            ) : (
              <>
                <p>
                  Telephonic Surveys enable businesses to connect directly with their target audience and gather reliable, real-time insights through structured conversations. At Unimrkt Research, our trained interviewers use professionally designed questionnaires and robust research processes to capture meaningful responses from the right respondents.
                </p>
                <p>
                  From customer feedback and brand perception to market understanding and B2B research, our telephonic survey solutions combine human interaction with technology-driven data collection to deliver accurate, actionable insights that support confident business decisions.
                </p>
              </>
            )}
            {paragraph2 && <p>{paragraph2}</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
