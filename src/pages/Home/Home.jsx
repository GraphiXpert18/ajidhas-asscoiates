import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './Home.css';
import homeBg from '../../assets/hero_bg_night.png';

const Home = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);
    const navigate = useNavigate();

    useEffect(() => {
        const tl = gsap.timeline();

        // Hero Text Reveal
        tl.fromTo(
            textRef.current.children,
            { y: 100, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15,
                ease: 'power3.out',
                delay: 0.3,
            }
        );

        // Buttons Reveal
        tl.fromTo(
            buttonsRef.current.children,
            { y: 50, opacity: 0 },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: 'power3.out',
            },
            '-=0.4'
        );
    }, []);

    return (
        <div className="home-page-new">
            <div className="home-background">
                <img src={homeBg} alt="Background" />
                <div className="home-overlay"></div>
            </div>

            <section className="hero-section-new" ref={heroRef}>
                <div className="hero-content-new" ref={textRef}>
                    <h1>Ajidhas and Associates</h1>
                    <p className="hero-subtitle">Architecture & Art Studio</p>
                    <p className="hero-tagline"></p>
                </div>

                <div className="hero-buttons" ref={buttonsRef}>
                    <button className="hero-btn" onClick={() => navigate('/art')}>
                        <span className="btn-text">Art</span>
                        <span className="btn-arrow">→</span>
                    </button>
                    <button className="hero-btn" onClick={() => navigate('/architecture')}>
                        <span className="btn-text">Architecture</span>
                        <span className="btn-arrow">→</span>
                    </button>
                </div>
            </section>
        </div>
    );
};

export default Home;
