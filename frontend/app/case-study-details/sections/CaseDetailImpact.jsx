import React from 'react';

const impacts = [
  'Sharper Customer\nUnderstanding',
  'Identified\nExperience Gaps',
  'Stronger Customer\nSegmentation',
  'More Relevant\nProduct Strategy',
  'Confident, Data\nDriven Decisions',
];

export default function CaseDetailImpact() {
  return (
    <section className="impact-section">
      <div className="srcn-container">
        <div className="impact-container">
          <div className="impact-header career-journey-header">
            <span className="impact-subtitle career-values-kicker">THE IMPACT</span>
            <h2 className="impact-title section-main-heading">
              From Customer Understanding<br />To Confident Decision-Making
            </h2>
            <p className="impact-description section-sub-text">
              The research provided the client with a clearer view of what customers value, what drives their financial decisions, and where their experiences fall short. These insights helped transform customer feedback into practical opportunities for improving products, experiences and future strategies.
            </p>
          </div>
          <div className="impact-cards-wrapper-area">
            <div className="impact-cards-grid">
              {impacts.map((title, index) => (
                <article key={index} className="impact-card">
                  <div className="impact-card-area">
                    <div className="impact-icon">
                      <img src="/asstes/images/icon/identified-icon-img.png" alt={title.replace('\n', ' ')} />
                    </div>
                    <div className="impact-card-content-area">
                      <h3>
                        {title.split('\n').map((line, i) => (
                          <React.Fragment key={i}>
                            {line}
                            {i < title.split('\n').length - 1 && <br />}
                          </React.Fragment>
                        ))}
                      </h3>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
