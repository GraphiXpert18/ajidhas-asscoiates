import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-section">
                    <h3>Ajidhas and Associates Studio</h3>
                    <p>Creating spaces that inspire.</p>
                </div>
                <div className="footer-section">
                    <h4>Contact</h4>
                    <p>hello@Ajidhas and Associatesstudio.com</p>
                    <p>+1 234 567 890</p>
                </div>
                <div className="footer-section">
                    <h4>Social</h4>
                    <p>Instagram</p>
                    <p>LinkedIn</p>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; 2026 Ajidhas and Associates Studio. All rights reserved.</p>
            </div>
        </footer>
    );
};

export default Footer;
