import React from 'react';
import Link from 'next/link';

export default function PrivacyContent({ dynamicRichText = null }) {
  const dynamicTitle = dynamicRichText?.title;
  const dynamicParagraphs =
    dynamicRichText?.content && Array.isArray(dynamicRichText.content)
      ? dynamicRichText.content.map((b, i) => {
          const txt = b.children?.map((c) => c.text).join('') || '';
          return txt ? <p key={i} style={{ fontWeight: 500, color: '#1a202c' }}>{txt}</p> : null;
        })
      : null;

  return (
    <article className="privacy-policy-content">
      <div className="srcn-container">
        {dynamicParagraphs && dynamicParagraphs.length > 0 && (
          <div className="privacy-intro" style={{ marginBottom: '30px', padding: '24px', backgroundColor: '#f8fafc', borderRadius: '10px', borderLeft: '4px solid #ff526b' }}>
            {dynamicTitle && <h3 style={{ marginBottom: '12px', fontSize: '1.25rem', fontWeight: 700 }}>{dynamicTitle}</h3>}
            {dynamicParagraphs}
          </div>
        )}
        <div className="privacy-intro">
          <p>
            Unimrkt Research respects the privacy of visitors to its websites. Unimrkt Research (also referred to as
            “Company”, “we” or “our”) respects the relationships, we have with our customers and respects the privacy
            of all individuals, whose Personal Information may be processed by Unimrkt Research in the performance of
            our services and our business operations.
          </p>
          <p>
            This Policy explains how Unimrkt Research collects, holds, uses and discloses Personal Information,
            including personal Information of our personnel, consumers, business professionals, customers, suppliers,
            vendors, business partners and investors. Unimrkt Research intends that this privacy policy read along with
            its standard terms, conditions and procedures will support timely compliance with all applicable local as
            well as international privacy laws and regulations around the world including, but not limited to, the Data
            Protection Regime under Indian Law and EU General Data Protection Regulation (“GDPR”).
          </p>
          <p>
            This privacy policy applies between you, the User of this Website and Unimrkt Research, the owner and
            provider of this Website. This privacy policy applies to our use of any and all Data collected by us or
            provided by you in relation to your use of our Website.
          </p>
          <p>
            This privacy policy should be read alongside, and in addition to, Unimrkt Research’s standard Terms,
            Conditions and Practice Procedures followed by them in rendering services.
          </p>
          <p>Please read this privacy policy carefully before proceeding.</p>
        </div>

        <section className="privacy-policy-section">
          <h2>This Privacy Policy Defines and Regulates:</h2>
          <ul className="privacy-check-list">
            <li>
              <a href="#what-qualifies">What qualifies as Personal Data</a>
            </li>
            <li>
              <a href="#lawful-collection">What Constitutes the Lawful Collection and Use of Personal Data</a>
            </li>
            <li>
              <a href="#disclosure-pii">Disclosure of Personally Identifiable Information (PII)</a>
            </li>
            <li>
              <a href="#registration-data">Registration of data and direct communication</a>
            </li>
            <li>
              <a href="#participation-panels">Participation in Panels</a>
            </li>
            <li>
              <a href="#legal-defense">Legal obligations and legal defense</a>
            </li>
            <li>
              <a href="#privacy-rights">Your Privacy Rights and Choices</a>
            </li>
            <li>
              <a href="#childrens-privacy">Children's Privacy</a>
            </li>
            <li>
              <a href="#third-party-websites">Third-Party Websites</a>
            </li>
            <li>
              <a href="#changes-policy">Changes to This Privacy Policy</a>
            </li>
            <li>
              <a href="#contact-us">Contact Us</a>
            </li>
          </ul>
        </section>

        <section className="privacy-policy-section" id="what-qualifies">
          <h2>What qualifies as Personal Data</h2>
          <p>
            Personal data are information that directly or indirectly identifies you as an individual, indirectly
            meaning when combined with other information, for example, your name, postal address, email address and
            phone number, or a unique device identifier.
          </p>
          <p>
            Through this website, Unimrkt Research may collect information that can specifically identify you- the user,
            such as your name, address, telephone number and e-mail address when you chose to yourself voluntarily
            submit the same. It is clarified that Unimrkt Research does not impose any mandatory condition for the
            aforesaid submission of your personal data which is voluntarily undertaken by you – the User.
          </p>
        </section>

        <section className="privacy-policy-section" id="lawful-collection">
          <h2>Lawful Collection and Use of Personal Data</h2>
          <p>
            Unimrkt Research collects information in multiple ways including from the use of this website as well as
            other activities such as telephone studies, face to face, online and social media interactions, etc..
            Unimrkt shall only use personal data submitted by the User, as set forth in this privacy policy and further
            subject to the User’s express consent recorded duly in the submission form issued for such purpose. Once
            submitted Unimrkt may use and disclose such voluntarily submitted data of the User for any of the following
            reasons:
          </p>
          <p>
            In the event that Unimrkt Research intends or choses to use or apply the User’s personal data, so
            collected, in any manner other than what was consented to by the User, Unimrkt Research shall inform the
            intended User in advance and in such cases where the processing is based on the User’s further consent, use
            the User’s personal data for a different purpose only with the User’s permission:
          </p>
          <ol>
            <li>
              To respond to requests made by the Users in terms of the use of the website and/or services provided by
              Unimrkt Research, including to provide services that have been requested by the User and also to allow the
              User to participate in activities that they may have chosen to participate in.
            </li>
            <li>
              To contact the User and/or to provide the User with general information as well as information about
              Unimrkt Research products and services from time to time
            </li>
            <li>
              To send the User marketing communications relating to Unimrkt Research’s business which may be regarded as
              being of interest to the User.
            </li>
            <li>
              To share with agents, contractors or partners of Unimrkt Research in connection with services that these
              individuals or entities perform for, or with, our firm and/or related businesses. However, it is
              clarified that these agents, contractors or partners are restricted from using the User’s Personal Data in
              any way other than to provide services for Unimrkt Research. Unimrkt Research may, for example, provide
              Personal Data submitted by the User to agents, contractors or partners for hosting their databases, for
              data processing services, or to send the User information that the User requested, but those parties
              cannot use the Users Personal Data for their own purposes unrelated to the work they are doing for
              Unimrkt Research.
            </li>
            <li>
              To respond to duly authorized information and statutory disclosure requests of governmental authorities or
              wherever required under applicable law.
            </li>
            <li>
              In connection with the sale, assignment, or other transfer of the business of this website to which the
              information relates, in which case Unimrkt Research shall require any such future Buyer to agree to treat
              the personal data in accordance with this privacy policy.
            </li>
            <li>
              Contact the User for studies via email, through mobile notifications or texts or any other proposed
              communication options
            </li>
            <li>
              Inform the User of updates to services, new features and details relevant to the User through
              communications sent from time-time
            </li>
            <li>
              Select the User for future studies and further lend adequate assistance to the User when the User contacts
              Unimrkt Research’s support team
            </li>
            <li>Allow us to reward the User with the incentives per Unimrkt Research Policy</li>
            <li>
              Protect Unimrkt Research from fraudulent behavior by investigating suspected activity in connection with
              the website or violation of another party’s rights
            </li>
            <li>Prevent multiple entries in studies by the same individuals</li>
            <li>
              Update, enrich and clean Unimrkt Research’s database to improve the usage of data, allowing for Unimrkt
              Research to better select and identify the User for studies and receiving communications
            </li>
          </ol>
          <p>
            In terms of the Privacy Policy Unimrkt Research has further set out, below more detailed information about
            how they utilize personal data. The legal basis for data being processed at the receiver’s end i.e. Unimrkt
            Research’s end is listed as below:
          </p>
          <ol>
            <li>Unimrkt Research has consent for the use of the User’s personal data</li>
            <li>
              Unimrkt Research needs to use the User’s personal data in order to perform its contractual obligations
              with respect to the User,
            </li>
            <li>
              Unimrkt Research needs to process User data to comply with its legal obligations under applicable law
            </li>
            <li>
              Unimrkt Research needs to process the User’s data in order to protect the User’s vital interests in terms of
              contractual and statutory compliance requirements
            </li>
            <li>
              Unimrkt Research may process User data if it is deemed necessary to perform a task in the public interest
              or where the use of the User’s personal data is deemed necessary for securing Unimrkt Research’s clients’
              legitimate interests (in which case Unimrkt Research will first explain what those interests are to the
              User concerned)
            </li>
          </ol>
          <p>
            Unimrkt Research being a responsible and law-abiding corporate entity undertakes not to misrepresent its
            services, data or scope of operations, at any time and in the event any contrary or mischievous email that
            concerns the User directly or indirectly, is received by the User purportedly from Unimrkt Research, the User
            is required to forthwith inform and intimate Unimrkt Research in this regard in order to avoid any
            unforeseeable and/or damaging circumstances from arising.
          </p>
          <p>
            In addition to and in terms of the foregoing Privacy Policy Unimrkt Research will also be entitled to use
            the personal data submitted by the User for the purposes as described below. It is re-iterated that Unimrkt
            Research does not collect and process more or other types of personal data than is deemed necessary by them
            in terms of fulfilling their respective purposes and or contractual or statutory compliance.
          </p>
        </section>

        <section className="privacy-policy-section" id="registration-data">
          <h2>Registration of data and direct communication</h2>
          <p>
            For the many services offered by Unimrkt Research they collect your personal data, like: name, postal
            address, phone number and email address (“Registration Data”). The User data so collected is termed as
            Registration Data and is utilized by Unimrkt Research to communicate with the User about the services and
            also to update and inform them from time-time about their policies and terms, conditions and procedures for
            service. Unimrkt Research also uses the User’s Registration Data as well as the content of their
            communication to respond to the User whenever the User contacts them..
          </p>
        </section>

        <section className="privacy-policy-section" id="participation-panels">
          <h2>Participation in Panels</h2>
          <p>
            If the User chooses to participate in a panel, Unimrkt Research will, in addition to the Registration Data,
            collect any other relevant information, additional data including personal data as well as such fee as it
            deems necessary for the purpose of enabling such participation.
          </p>
          <p>For instance, Unimrkt Research collects such personal data:</p>
          <ul>
            <li>In the course of surveys, conducted online, via phone or face to face interaction, etc.;</li>
            <li>
              By way of automated data collection by hardware or software web-tracking and audience measurement means
              such as tracking applications, browser add-ons, TV meters and special internet routers (data regarding the
              User’s use of the Internet, streaming and social media platforms and other (online) media channels, as
              well as the User’s digital devices in general);
            </li>
            <li>
              Data the User actively provides Unimrkt Research during their participation (for example, by means of
              applications or devices (collectively referred to as "Panel Data")
            </li>
          </ul>
          <p>
            Unimrkt further reserves the right to analyze and evaluate such Panel Data, aggregate the Panel Data with
            the Panel Data of other participants and use the Panel Data for market research purposes.
          </p>
        </section>

        <section className="privacy-policy-section" id="legal-defense">
          <h2>Legal obligations and legal defense</h2>
          <p>
            Unimrkt Research may be required to use and retain personal data for legal and compliance reasons, such as
            the prevention, detection, or investigation of a crime, loss prevention, fraud or any other abuse of their
            services and IT systems. Unimrkt Research may also use the User’s personal data to meet its internal and
            external audit requirements, information security purposes or to protect or enforce their rights of
            privacy, safety, or property, or those of other persons that may be encountered for the purposes set out or
            contractual or statutory requirements and their compliance.
          </p>
        </section>

        <section className="privacy-policy-section" id="disclosure-pii">
          <h2>Disclosure of Personally Identifiable Information (PII)</h2>
          <ol>
            <li>
              PII may be collected from the User prior to the execution of the survey proposed and at the time of their
              enrollment, participants may consent to providing additional sensitive data including personal data,
              race/ethnic origin, political/religious opinions, etc
            </li>
            <li>
              The identity of the respondents is kept confidential and their details will not be communicated to third
              parties except for the purposes for which such data is being collected
            </li>
            <li>
              Individuals authorized to view the responses, whether they are representatives of the study sponsor or
              third parties, are not permitted to disclose personally identifiable information (PII) about
              participants/ User’s to others in their organization or other organizations
            </li>
            <li>
              Any information that could potentially identify a participant/ User (e.g., name, address, place of
              employment, social security number, zip code) will not be collected by, or transmitted to the sponsor of
              the study
            </li>
            <li>
              The information provided by the User will be treated in the strictest confidence and will be aggregated
              with other participants
            </li>
            <li>
              Only the consolidated results will be presented to the sponsor of the study, in order to provide an
              overview of the attitudes in the therapeutic areas that are the subject of this study. No answer can be
              attributed to respondent/ User by name
            </li>
          </ol>
        </section>

        <section className="privacy-policy-section" id="privacy-rights">
          <h2>Your Privacy Rights and Choices</h2>
          <p>
            Depending on your location and applicable law, you may have the right to request access to, correction or
            deletion of personal data, object to or restrict certain processing, withdraw consent, or request a copy of
            information in a portable format. You may also have the right to complain to a relevant privacy regulator.
          </p>
          <p>
            To make a request, contact us using the details below. We may need to verify your identity and will respond
            within the timeframe required by applicable law. Some information may need to be retained where a legal
            exception applies.
          </p>
        </section>

        <section className="privacy-policy-section" id="childrens-privacy">
          <h2>Children's Privacy</h2>
          <p>
            Our website and services are intended for business audiences and are not directed to children. We do not
            knowingly collect personal data from children through this website. Research involving minors, if any, must
            be conducted under appropriate study-specific consent, safeguarding and legal requirements.
          </p>
        </section>

        <section className="privacy-policy-section" id="third-party-websites">
          <h2>Third-Party Websites</h2>
          <p>
            Our website may link to websites or services operated by third parties. Their privacy practices are governed
            by their own policies, and we encourage you to review those policies before providing information to them.
          </p>
        </section>

        <section className="privacy-policy-section" id="changes-policy">
          <h2>Changes to This Privacy Policy</h2>
          <p>
            We may update this policy from time to time to reflect changes in our practices, services or legal
            requirements. We will post the updated version on this page and revise the "Last updated" date above. Please
            review this page periodically.
          </p>
        </section>

        <section className="privacy-policy-section privacy-contact" id="contact-us">
          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy or wish to make a privacy request, please contact us through
            our <Link href="/contact">Contact page</Link>.
          </p>
        </section>
      </div>
    </article>
  );
}
