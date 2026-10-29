import React from 'react';

export default function TelephonicOverview() {
  return (
    <section className="telephonic-overview-section">
      <div className="srcn-container">
        <div className="telephonic-overview-grid">
          <div className="telephonic-overview-content">
            <span className="telephonic-overview-kicker sub-title-red">WHAT ARE TELEPHONIC SURVEYS?</span>
            <h2 className="telephonic-overview-title">
              Direct Access To The<br />Voices That Matter
            </h2>

           <div className="abou-Primary-overview">
                <p>
              Telephonic surveys provide a structured and efficient way to connect directly with respondents and capture their opinions, experiences, preferences and behaviours.
            </p>

            <p>
              At Unimrkt Research, our telephonic research programs combine trained interviewers, carefully designed questionnaires, respondent targeting and rigorous quality checks to deliver dependable primary research insights.
            </p>

            <p>
              Whether you need customer feedback, market intelligence, brand understanding or B2B research, our CATI capabilities help you collect meaningful data at scale.
            </p>
           </div>
          </div>

          <div className="telephonic-overview-visual-wrap">
            <div className="telephonic-overview-figure abou-Primary-img">
              <img
                src="/asstes/images/unimrkt-research-voices-img.png"
                alt="Telephonic survey interviewer holding a clipboard"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
