import React from 'react';
import { Link } from 'react-router-dom';
import { IoArrowForward } from 'react-icons/io5';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <h3>Ajidhas & Associates</h3>
            
                </div>

                <div className="footer-section">
                    <h4>Explore</h4>
                    <div className="footer-links">
                        <Link to="/architecture">Architecture</Link>
                        <Link to="/art">Art Collection</Link>
                        <Link to="/art/gallery">Gallery</Link>
                        <Link to="/art/artist">The Artist</Link>
                    </div>
                </div>

                <div className="footer-section">
                    <h4>Contact</h4>
                    <div className="footer-links">
                        <p>ajidhassandassociates@gmail.com</p>
                        <p>+91 9790847621</p>
                        <p>Chennai, India</p>
                    </div>
                </div>

                <div className="footer-section footer-newsletter">
                    <h4>Newsletter</h4>
                    <p>Subscribe to receive updates on new projects and exhibitions.</p>
                    <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                        <input type="email" placeholder="Email Address" />
                        <button type="submit">
                            <IoArrowForward />
                        </button>
                    </form>
                </div>
            </div>

            <div className="footer-bottom">
                <p>&copy; 2026 Ajidhas & Associates Studio. All rights reserved.</p>
                <div className="footer-legal">
                    <a href="#">Privacy Policy</a>
                    <a href="#">Terms of Service</a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
