import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import inquiryBg from '../../assets/hero_bg_night.png';
import './ArchitectureInquiry.css';

const ArchitectureInquiry = () => {
  const panelRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const el = panelRef.current;
    const tl = gsap.timeline();

    tl.fromTo(
      el,
      { scale: 0, rotation: -10, opacity: 0 },
      { scale: 1, rotation: 0, opacity: 1, duration: 0.8, ease: 'elastic.out(1, 0.6)' }
    );

    // subtle wobble
    tl.to(el, { rotation: 4, duration: 0.08 }).to(el, { rotation: -4, duration: 0.12 }).to(el, { rotation: 0, duration: 0.08 });
  }, []);

  return (
    <div className="inquiry-page">
      <div className="inquiry-backdrop" onClick={() => navigate(-1)}></div>

      <div
        className="inquiry-panel"
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        style={{ backgroundImage: `linear-gradient(180deg, rgba(15,15,15,0.9), rgba(8,8,8,0.95)), url(${inquiryBg})` }}
      >
        <button className="inquiry-close" onClick={() => navigate(-1)} aria-label="Close">✕</button>
        <h2>Inquiry</h2>
        <p className="muted">Tell us about your project — we’ll get back shortly.</p>

        <form className="inquiry-form" onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent (demo)'); navigate(-1); }}>
          <input name="name" placeholder="Your name" required />
          <input name="email" type="email" placeholder="Email" required />
          <input name="subject" placeholder="Subject" />
          <textarea name="message" placeholder="Message" required></textarea>
          <div className="inquiry-actions">
            <button type="submit" className="inquiry-submit">Send</button>
            <button type="button" className="inquiry-cancel" onClick={() => navigate(-1)}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ArchitectureInquiry;
