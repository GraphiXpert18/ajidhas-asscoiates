import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoMenu, IoClose, IoArrowBack } from 'react-icons/io5';
import './Navbar.css';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);
    const linksRef = useRef([]);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                duration: 1,
                clipPath: 'circle(150% at 100% 0)',
                ease: 'power4.inOut',
            });

            // Animate links and info section
            const elementsToAnimate = [...linksRef.current];
            gsap.fromTo(
                elementsToAnimate,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    stagger: 0.1,
                    delay: 0.5,
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

    const navigate = useNavigate();

    const handleBack = () => {
        try {
            navigate(-1);
        } catch (e) {
            window.history.back();
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="left-group">
                    <button className="back-button" onClick={handleBack} aria-label="Go back">
                        <IoArrowBack size={20} />
                    </button>
                    <div className="logo">
                        <Link to="/">Ajidhas and Associates</Link>
                    </div>
                </div>
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
                </div>
            </div>

            <div className="menu-overlay" ref={menuRef}>
                <div className="menu-container">
                    <div className="menu-left">
                        <div className="menu-links">
                            {['Home', 'Art', 'Architecture', 'Studio', 'Contact'].map((item, index) => (
                                <div className="menu-link-wrapper" key={index}>
                                    <span className="menu-index">0{index + 1}</span>
                                    <Link
                                        to={item === 'Home' ? '/' : `/${item.toLowerCase()}`}
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
                                <h4>Contact</h4>
                                <p>ajidhassandassociates@gmail.com</p>
                                <p>+91 9790847621</p>
                            </div>
                            <div className="info-section">
                                <h4>Social</h4>
                                <div className="social-links">
                                    <a href="#" target="_blank" rel="noopener noreferrer">Instagram</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                                    <a href="#" target="_blank" rel="noopener noreferrer">Behance</a>
                                </div>
                            </div>
                            <div className="info-section">
                                <h4>Location</h4>
                                <p>Chennai, India</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="menu-footer">
                    <p>&copy; 2026 Ajidhas & Associates. All rights reserved.</p>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
