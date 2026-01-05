import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Visualisation.css';

import buildingNight from '../../assets/building_night.png';
import bg2 from '../../assets/hero_bg_architecture.png';
import bg3 from '../../assets/home_bg.png';
import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: 'Haus am See', category: 'Residential', image: buildingNight, year: '2024' },
    { id: 2, title: 'Urban Loft', category: 'Property', image: bg2, year: '2023' },
    { id: 3, title: 'Alpine Retreat', category: 'Hospitality', image: bg3, year: '2024' },
    { id: 4, title: 'Tech Hub', category: 'Corporate', image: art1, year: '2022' },
    { id: 5, title: 'Modern Villa', category: 'Residential', image: art2, year: '2024' },
    { id: 6, title: 'City Center', category: 'Property', image: buildingNight, year: '2023' },
];

const Visualisation = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAutoPlaying, setIsAutoPlaying] = useState(true);
    const marqueeRef = useRef(null);
    const titleRef = useRef(null);
    const imageRef = useRef(null);
    const progressRef = useRef(null);

    // Auto-slide logic
    useEffect(() => {
        let interval;
        if (isAutoPlaying) {
            interval = setInterval(() => {
                nextSlide();
            }, 5000);
        }
        return () => clearInterval(interval);
    }, [isAutoPlaying, currentIndex]);

    // Marquee animation
    useEffect(() => {
        const marquee = marqueeRef.current;
        if (marquee) {
            gsap.to(marquee, {
                xPercent: -50,
                repeat: -1,
                duration: 20,
                ease: "none"
            });
        }
    }, []);

    // Slide transition animation
    useEffect(() => {
        const tl = gsap.timeline();

        // Reset progress bar
        gsap.set(progressRef.current, { scaleX: 0 });

        tl.fromTo(titleRef.current,
            { y: 50, opacity: 0, skewY: 7 },
            { y: 0, opacity: 1, skewY: 0, duration: 1, ease: 'expo.out' }
        )
            .fromTo(imageRef.current,
                { scale: 1.1, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' },
                '-=0.8'
            )
            .to(progressRef.current, {
                scaleX: 1,
                duration: 5,
                ease: 'none'
            }, 0);

    }, [currentIndex]);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % projects.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
        setIsAutoPlaying(false); // Pause auto-play on manual interaction
        setTimeout(() => setIsAutoPlaying(true), 10000); // Resume after 10s
    };

    const activeProject = projects[currentIndex];

    return (
        <div className="vis-dynamic-container">
            {/* Background Marquee */}
            <div className="vis-marquee-container">
                <div className="vis-marquee-wrapper" ref={marqueeRef}>
                    <span className="vis-marquee-text">VISUALISATION • RENDERING • ARCHITECTURE • DESIGN • </span>
                    <span className="vis-marquee-text">VISUALISATION • RENDERING • ARCHITECTURE • DESIGN • </span>
                </div>
            </div>

            {/* Main Content */}
            <div className="vis-main-layout">
                <div className="vis-left-panel">
                    <div className="vis-info-box">
                        <span className="vis-category">{activeProject.category}</span>
                        <div className="vis-title-reveal">
                            <h1 className="vis-title" ref={titleRef}>{activeProject.title}</h1>
                        </div>
                        <div className="vis-meta">
                            <span className="vis-year">{activeProject.year}</span>
                            <div className="vis-divider"></div>
                            <span className="vis-index">0{currentIndex + 1} / 0{projects.length}</span>
                        </div>
                    </div>

                    <div className="vis-controls">
                        <button className="vis-nav-btn" onClick={prevSlide}>PREV</button>
                        <div className="vis-progress-container">
                            <div className="vis-progress-bar" ref={progressRef}></div>
                        </div>
                        <button className="vis-nav-btn" onClick={nextSlide}>NEXT</button>
                    </div>
                </div>

                <div className="vis-right-panel">
                    <div className="vis-image-container">
                        <img
                            ref={imageRef}
                            src={activeProject.image}
                            alt={activeProject.title}
                            className="vis-featured-image"
                        />
                        <div className="vis-image-overlay"></div>
                    </div>
                </div>
            </div>

            {/* Thumbnails / Indicators */}
            <div className="vis-thumbnails">
                {projects.map((p, i) => (
                    <div
                        key={p.id}
                        className={`vis-thumb-item ${i === currentIndex ? 'active' : ''}`}
                        onClick={() => goToSlide(i)}
                    >
                        <div className="vis-thumb-line"></div>
                        <span className="vis-thumb-num">0{i + 1}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Visualisation;
