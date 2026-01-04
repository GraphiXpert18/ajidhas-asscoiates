import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack, IoChevronBack, IoChevronForward } from 'react-icons/io5';
import './Collaboration.css';

import buildingNight from '../../assets/building_night.png';

const slides = [
    {
        id: 1,
        title: "Edge of Light",
        subtitle: "Discover the Pearl Collection",
        image: buildingNight
    },
    {
        id: 2,
        title: "Silent Form",
        subtitle: "Minimalist Structural Design",
        image: buildingNight
    },
    {
        id: 3,
        title: "Urban Echo",
        subtitle: "Resonating with City Life",
        image: buildingNight
    },
    {
        id: 4,
        title: "Nature's Touch",
        subtitle: "Organic Materials Integration",
        image: buildingNight
    }
];

const Collaboration = () => {
    const navigate = useNavigate();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const titleRef = useRef(null);
    const subtitleRef = useRef(null);
    const counterRef = useRef(null);

    const animateContentIn = () => {
        const tl = gsap.timeline();
        tl.to(titleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' })
            .to(subtitleRef.current, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=0.8')
            .to(counterRef.current, { opacity: 1, duration: 1 }, '-=0.8');
    };

    const animateContentOut = (callback) => {
        const tl = gsap.timeline({ onComplete: callback });
        tl.to(titleRef.current, { y: -30, opacity: 0, duration: 0.5, ease: 'power2.in' })
            .to(subtitleRef.current, { y: -20, opacity: 0, duration: 0.5, ease: 'power2.in' }, '-=0.4')
            .to(counterRef.current, { opacity: 0, duration: 0.5 }, '-=0.4');
    };

    useEffect(() => {
        // Initial load animation
        gsap.set([titleRef.current, subtitleRef.current], { y: 30, opacity: 0 });
        gsap.set(counterRef.current, { opacity: 0 });
        animateContentIn();
    }, []);

    const changeSlide = (direction) => {
        if (isAnimating) return;
        setIsAnimating(true);

        animateContentOut(() => {
            if (direction === 'next') {
                setCurrentIndex((prev) => (prev + 1) % slides.length);
            } else {
                setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
            }

            // Reset positions for incoming animation
            gsap.set([titleRef.current, subtitleRef.current], { y: 30 });

            // Allow a brief moment for the DOM to update the text before animating in
            setTimeout(() => {
                animateContentIn();
                setIsAnimating(false);
            }, 100);
        });
    };

    // Auto-slide effect removed as per user request for static background
    /*
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!isAnimating) {
                changeSlide('next');
            }
        }, 5000);

        return () => clearTimeout(timer);
    }, [currentIndex, isAnimating]);
    */

    return (
        <div className="collaboration-container">
            <button className="collab-back-btn" onClick={() => navigate('/architecture')}>
                <IoArrowBack />
            </button>

            {slides.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`collab-slide ${index === currentIndex ? 'active' : ''}`}
                >
                    <img src={slide.image} alt={slide.title} className="collab-bg-image" />
                </div>
            ))}

            <div className="collab-content-overlay">
                <h1 className="collab-title" ref={titleRef}>
                    {slides[currentIndex].title}
                </h1>
                <p className="collab-subtitle" ref={subtitleRef}>
                    {slides[currentIndex].subtitle}
                </p>
                <div className="collab-counter" ref={counterRef}>
                    0{currentIndex + 1} / 0{slides.length}
                </div>
            </div>

            <button className="collab-nav-btn collab-prev" onClick={() => changeSlide('prev')}>
                <IoChevronBack />
            </button>
            <button className="collab-nav-btn collab-next" onClick={() => changeSlide('next')}>
                <IoChevronForward />
            </button>
        </div>
    );
};

export default Collaboration;
