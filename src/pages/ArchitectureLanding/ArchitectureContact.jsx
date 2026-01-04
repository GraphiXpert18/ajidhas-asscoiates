import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ArchitectureContact.css';
import heroBg from '../../assets/hero_bg_night.png';

const ArchitectureContact = () => {
  const navigate = useNavigate();

  const openInquiry = () => {
    navigate('/architecture/inquiry');
  };

  return (
    <div className="arch-contact-page">
      <div className="contact-hero" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="hero-overlay">
          <div className="hero-top-left">look at google maps</div>
          <h1 className="hero-title">Contact us</h1>
        </div>
      </div>

      <div className="contact-bottom">
        <div className="contact-inner">
            <div className="contact-left">
              <h4>Our address</h4>
              <p className="muted">12345 Moscow<br />Lane Dyatlov<br />Building 47 office 202</p>
            </div>

            <div className="contact-right">
              <h4>Our contacts</h4>
              <p className="muted">
                <a href="mailto:hello@frame.com">hello@frame.com</a><br />
                <a href="tel:+79008007080">+7 900 800 70 80</a>
              </p>
            </div>

            <div className="contact-inquiry">
              <h4>Inquiry</h4>
              <div className="inquiry-cta">
                <p className="muted">Have a project or question? Send us a quick inquiry.</p>
                <button onClick={openInquiry} className="open-inquiry-btn">Open Inquiry</button>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default ArchitectureContact;
