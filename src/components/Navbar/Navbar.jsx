import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack } from 'react-icons/io5';
import './Navbar.css';

import buildingNight from '../../assets/building_night.png';
import artBg from '../../assets/art_1.png';
import archBg from '../../assets/hero_bg_architecture.png';
import studioBg from '../../assets/team_1.png';
import contactBg from '../../assets/building_night.png';

const menuItems = [
    { name: 'Art', path: '/art', image: artBg },
    { name: 'Architecture', path: '/architecture', image: archBg },
];

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeImage, setActiveImage] = useState(buildingNight);
    const menuRef = useRef(null);
    const linksRef = useRef([]);
    const bgRef = useRef(null);
    const location = useLocation();
    const navigate = useNavigate();

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    // Handle scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close menu on route change
    useEffect(() => {
        setIsOpen(false);
    }, [location]);

    const isHomePage = location.pathname === '/';
    const isArchitectureLanding = location.pathname === '/architecture';

    useEffect(() => {
        if (isOpen) {
            gsap.to(menuRef.current, {
                duration: 1.2,
                clipPath: 'circle(150% at 100% 0)',
                ease: 'power4.inOut',
            });

            gsap.fromTo(bgRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 0.25, duration: 2, ease: 'power2.out' }
            );

            // Animate links and info section
            const elementsToAnimate = linksRef.current.filter(el => el !== null);
            gsap.fromTo(
                elementsToAnimate,
                { y: 80, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1.2,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: "power4.out",
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

    const handleBack = () => {
        try {
            navigate(-1);
        } catch (e) {
            window.history.back();
        }
    };

    return (
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''} ${isOpen ? 'menu-open' : ''}`}>
            <div className="navbar-container">
                <div className="left-group">
                    {!isHomePage && (
                        <button className="back-button" onClick={handleBack} aria-label="Go back">
                            <IoArrowBack size={20} />
                        </button>
                    )}
                    <div className="logo">
                        <Link to="/">Ajidhas & Associates</Link>
                    </div>
                </div>
                <div className={`menu-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
                    <div className="toggle-lines">
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>

            <div className="menu-overlay" ref={menuRef}>
                <div className="menu-bg-container">
                    <div className="menu-bg-image" ref={bgRef}>
                        <img src={activeImage} alt="Menu Background" key={activeImage} />
                    </div>
                    <div className="menu-grain"></div>
                </div>

                <div className="menu-container">
                    <div className="menu-main">
                        <div className="menu-links">
                            {menuItems.map((item, index) => (
                                <div className="menu-link-wrapper" key={index} ref={addToRefs}>
                                    <span className="menu-index">0{index + 1}</span>
                                    <Link
                                        to={item.path}
                                        className="menu-link"
                                        onClick={toggleMenu}
                                        onMouseEnter={() => setActiveImage(item.image)}
                                    >
                                        <div className="link-text-wrapper">
                                            <span className="link-text">{item.name}</span>
                                            <span className="link-text hover-text">{item.name}</span>
                                        </div>
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="menu-side" ref={(el) => (linksRef.current[2] = el)}>
                        <div className="menu-side-content">
                            <div className="side-section">
                                <h4 className="side-label">Navigation</h4>
                                <div className="side-links">
                                    <Link to="/" onClick={toggleMenu}>Home</Link>
                                    <Link to="/architecture/about" onClick={toggleMenu}>Studio</Link>
                                    <Link to="/contact" onClick={toggleMenu}>Contact</Link>
                                </div>
                            </div>

                            <div className="side-section">
                                <h4 className="side-label">Inquiries</h4>
                                <a href="mailto:ajidhassandassociates@gmail.com" className="side-value">ajidhassandassociates@gmail.com</a>
                                <p className="side-value">+91 9790847621</p>
                            </div>

                            <div className="side-section">
                                <h4 className="side-label">Social</h4>
                                <div className="side-socials">
                                    <a href="#" target="_blank">Instagram</a>
                                    <a href="#" target="_blank">LinkedIn</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="menu-bottom" ref={(el) => (linksRef.current[3] = el)}>
                    <div className="bottom-left">
                        <p>&copy; 2026 Ajidhas & Associates</p>
                    </div>
                    <div className="bottom-center">
                        <div className="scroll-indicator">
                            <span>Explore</span>
                            <div className="indicator-line"></div>
                        </div>
                    </div>
                    <div className="bottom-right">
                        <p>Architecture & Art Studio</p>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
