import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoMenu, IoClose } from 'react-icons/io5';
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
                duration: 0.8,
                clipPath: 'circle(150% at 100% 0)',
                ease: 'power3.inOut',
            });
            gsap.fromTo(
                linksRef.current,
                { y: 50, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.5,
                    stagger: 0.1,
                    delay: 0.4,
                    ease: 'power3.out',
                }
            );
        } else {
            gsap.to(menuRef.current, {
                duration: 0.8,
                clipPath: 'circle(0% at 100% 0)',
                ease: 'power3.inOut',
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
                <div className="menu-toggle" onClick={toggleMenu}>
                    {isOpen ? <IoClose size={30} /> : <IoMenu size={30} />}
                </div>
            </div>

            <div className="menu-overlay" ref={menuRef}>
                <div className="menu-links">
                    {['Home', 'Art', 'Projects', 'Studio', 'Contact'].map((item, index) => (
                        <div className="menu-link-wrapper" key={index}>
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
        </nav>
    );
};

export default Navbar;
