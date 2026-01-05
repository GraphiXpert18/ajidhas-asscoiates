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
        <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
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
            </div>
        </nav>
    );
};

export default Navbar;
