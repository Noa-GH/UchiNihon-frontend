import React from 'react';
import './About.css';

function About() {
  return (
    <main className="about">
      <div className="about__hero">
        <h1 className="about__hero-title">空き家</h1>
        <p className="about__hero-reading">akiya — "empty house"</p>
      </div>

      <div className="about__container">
        <section className="about__section">
          <h2 className="about__section-title">The Scale of the Crisis</h2>
          <p className="about__text">
            Japan faces a housing paradox: urban centres overflow with demand while rural regions
            sit dotted with millions of abandoned homes. As of 2023, Japan holds approximately{' '}
            <strong>8.5 million akiya</strong> — about 14% of all housing stock. By 2033, that
            figure is projected to reach 30%.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">Why Are Homes Abandoned?</h2>
          <ul className="about__list">
            <li className="about__list-item">
              <strong>Rural depopulation.</strong> Younger generations migrate to Tokyo and Osaka,
              leaving ancestral homes behind with no immediate heirs.
            </li>
            <li className="about__list-item">
              <strong>Inheritance complications.</strong> Heirs often live far away and lack the
              means or desire to renovate an old property.
            </li>
            <li className="about__list-item">
              <strong>Japan's property tax system.</strong> Land is taxed heavily but structures are
              not, so demolition is expensive — shells are left standing instead.
            </li>
            <li className="about__list-item">
              <strong>Cultural factors.</strong> Stigma around lived-in older homes, and a strong
              cultural preference for brand-new construction.
            </li>
          </ul>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">The Opportunity</h2>
          <p className="about__text">
            Many municipalities actively seek new owners, offering properties at extraordinarily low
            prices — sometimes entirely free — combined with renovation subsidies that can cover up
            to 50% of qualified costs. For the right buyer, akiya represent a rare chance to own a
            piece of rural Japan.
          </p>
        </section>

        <section className="about__section">
          <h2 className="about__section-title">Akiya Banks</h2>
          <p className="about__text">
            Japan's Ministry of Land, Infrastructure, Transport and Tourism (MLIT) established
            regional <strong>Akiya Banks</strong> — government-managed registries of available
            vacant properties administered by local municipalities. These form the backbone of any
            serious akiya search.
          </p>
        </section>

        <section className="about__section about__section--callout">
          <h2 className="about__section-title">Is It Right for You?</h2>
          <p className="about__text">
            Purchasing an akiya typically requires Japanese residency or a trusted local agent,
            knowledge of renovation costs (often ¥5M–¥20M for a full kominka restoration), and a
            willingness to live in — or at minimum regularly visit — a rural area. The rewards are
            extraordinary: spacious traditional homes, deep community ties, and a genuinely
            affordable path to Japanese property ownership.
          </p>
        </section>
      </div>
    </main>
  );
}

export default About;
