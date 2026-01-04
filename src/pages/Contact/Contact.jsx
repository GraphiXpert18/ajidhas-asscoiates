import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './Contact.css';

import buildingNight from '../../assets/building_night.png';

const Contact = () => {
    const formRef = useRef(null);
    const infoRef = useRef(null);
    const titleRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power4.out' }
        )
            .fromTo(infoRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=0.5'
            )
            .fromTo(formRef.current,
                { x: 50, opacity: 0 },
                { x: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=0.8'
            );
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic here
        alert("Thank you for reaching out. We will get back to you soon.");
    };

    return (
        <div className="contact-page">
            <div className="contact-bg">
                <img src={buildingNight} alt="Background" />
                <div className="contact-overlay"></div>
            </div>

            <div className="contact-container">
                <div className="contact-content">
                    <div className="contact-left" ref={infoRef}>
                        <h1 className="contact-title" ref={titleRef}>Let's Build<br />Together.</h1>

                        <div className="contact-info-block">
                            <span className="info-label">Email</span>
                            <a href="mailto:ajidhassandassociates@gmail.com" className="info-value">ajidhassandassociates@gmail.com</a>
                        </div>

                        <div className="contact-info-block">
                            <span className="info-label">Phone</span>
                            <p className="info-value">+91 9790847621</p>
                        </div>

                        <div className="contact-info-block">
                            <span className="info-label">Office</span>
                            <p className="info-value">Chennai, India<br />Available Worldwide</p>
                        </div>

                        <div className="contact-socials">
                            <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                            <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                        </div>
                    </div>

                    <div className="contact-right">
                        <form className="contact-form" ref={formRef} onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Your Name</label>
                                <input type="text" placeholder="Enter your name" required />
                            </div>
                            <div className="form-group">
                                <label>Email Address</label>
                                <input type="email" placeholder="Enter your email" required />
                            </div>
                            <div className="form-group">
                                <label>Subject</label>
                                <input type="text" placeholder="Enter your subject" required />
                            </div>
                            <div className="form-group">
                                <label>Message</label>
                                <textarea placeholder="Tell us about your vision..." rows="5" required></textarea>
                            </div>
                            <button type="submit" className="submit-btn">
                                <span>Send Message</span>
                                <div className="btn-arrow">→</div>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
