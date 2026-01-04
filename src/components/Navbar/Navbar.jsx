import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoMenu, IoClose } from 'react-icons/io5';
import './Navbar.css';

import buildingNight from '../../assets/building_night.png';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const bgRef = useRef(null);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Close menu on route change
    const location = useLocation();
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                duration: 1.2,
                clipPath: 'circle(150% at 100% 0)',
                ease: 'power4.inOut',
            });

            gsap.fromTo(bgRef.current,
                { scale: 1.2, opacity: 0 },
                { scale: 1, opacity: 0.3, duration: 2, ease: 'power2.out' }
            );

            // Animate links and info section
            const elementsToAnimate = [...linksRef.current];
            gsap.fromTo(
                elementsToAnimate,
                { y: 60, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    stagger: 0.08,
                    delay: 0.4,
                    ease: 'power4.out',
                }
            );
        } else {
            gsap.to(menuRef.current, {
                duration: 0.8,
                clipPath: 'circle(0% at 100% 0)',
                ease: 'power4.inOut',
            });
        }
    }, [isOpen]);

    const addToRefs = (el) => {
        if (el && !linksRef.current.includes(el)) {
            linksRef.current.push(el);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="logo">
                    <Link to="/">Ajidhas and Associates</Link>
                </div>
                <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="toggle-lines">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="menu-overlay" ref={menuRef}>
                <div className="menu-bg-image" ref={bgRef}>
                    <img src={buildingNight} alt="Menu Background" />
                </div>

                <div className="menu-container">
                    <div className="menu-left">
                        <div className="menu-links">
                            {['Home', 'Art', 'Architecture', 'Studio', 'Contact'].map((item, index) => (
                                <div className="menu-link-wrapper" key={index}>
                                    <span className="menu-index">0{index + 1}</span>
                                    <Link
                                        to={item === 'Home' ? '/' : item === 'Studio' ? '/architecture/about' : `/${item.toLowerCase()}`}
                                        className="menu-link"
                                        ref={addToRefs}
                                        onClick={toggleMenu}
                                    >
                                        {item}
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menu-right">
                        <div className="menu-info" ref={(el) => (linksRef.current[5] = el)}>
                            <div className="info-section">
                                <h4>Get in Touch</h4>
                                <a href="mailto:ajidhassandassociates@gmail.com" className="info-link">ajidhassandassociates@gmail.com</a>
                                <p>+91 9790847621</p>
                            </div>

                            <div className="info-section">
                                <h4>Follow Us</h4>
                                <div className="social-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
                                </div>
                            </div>

                            <div className="info-section">
                                <h4>Office</h4>
                                <p>Chennai, India<br />Available Worldwide</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="menu-footer">
                    <div className="footer-line"></div>
                    <div className="footer-content">
                        <p>&copy; 2026 Ajidhas & Associates</p>
                        <p>Architecture & Art Studio</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
