import React from 'react';
import Link from 'next/link';

const industriesList = [
   { name: 'Automotive', icon: '/asstes/images/icon/automotive-icon-img.png', link: '/automotives' },
  { name: 'Healthcare', icon: '/asstes/images/icon/healthcare-icon-img.png', link: '/industries#healthcare' },
  { name: 'BFSI', icon: '/asstes/images/icon/BFSI-icon-img.png', link: '/industries#bfsi' },
  { name: 'Retail', icon: '/asstes/images/icon/retail-icon-img.png', link: '/industries#retail' },
  { name: 'Technology', icon: '/asstes/images/icon/technology-icon-img.png', link: '/industries#technology' },
  { name: 'Manufacturing', icon: '/asstes/images/icon/Manufacturing-icon-img.png', link: '/industries#manufacturing' },
  { name: 'Energy', icon: '/asstes/images/icon/energy-icon-img.png', link: '/industries#energy' },
  { name: 'FMCG', icon: '/asstes/images/icon/FMCG-icon-img.png', link: '/industries#FMCG' },
  { name: 'Telecom', icon: '/asstes/images/icon/telecom-icon-img.png', link: '/industries#telecom' },
  { name: '& More', icon: '/asstes/images/icon/other-icon-img.png', link: '/industries#more' },
];

export default function IndustriesArea() {
  return (
    <section className="our-industries-area">
      <div className="srcn-container">
        <div className="our-industries-wrapper-inner">
          <div className="our-industries-top-content primary-services-header">
            <span className="sub-title-red" style={{ display: 'inline-block', marginBottom: '8px' }}>
              WHO WE SERVE
            </span>
            <h2 className="our-industries-heading">Industries We Support</h2>
            <p className="our-industries-title">
              Our primary research expertise spans multiple sectors, giving us the domain knowledge needed to design relevant surveys and ask the right questions.
            </p>
          </div>
          <div className="our-industries-wapper-area">
            <div className="our-industries-grid">
              {industriesList.map((ind, idx) => (
                <div key={idx} className="our-industries-card-col">
                  <Link href={ind.link} className="our-industries-card-wapper">
                    <div className="our-industries-card">
                      <div className="icon-img-box">
                        <img src={ind.icon} alt={ind.name} />
                      </div>
                      <div className="our-industries-content-area">
                        <h3 className="our-industries-content">{ind.name}</h3>
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
