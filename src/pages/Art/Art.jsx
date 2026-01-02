import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import './Art.css';

import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const artPieces = [
    {
        id: 1,
        title: 'Ethereal Silence',
        artist: 'Elena V.',
        description: 'An exploration of texture and void, capturing the silence of abandoned spaces.',
        contact: 'elena.v@artstudio.com',
        image: art1,
    },
    {
        id: 2,
        title: 'Bronze Form No. 4',
        artist: 'Marcus Thorne',
        description: 'A study in weight and balance, casting dramatic shadows that change with the light.',
        contact: 'marcus.t@artstudio.com',
        image: art2,
    },
    {
        id: 3,
        title: 'Monolith',
        artist: 'Sarah Jenkins',
        description: 'High contrast Ajidhas and Associatesitectural photography focusing on brutalist geometry.',
        contact: 'sarah.j@artstudio.com',
        image: art3,
    },
    {
        id: 4,
        title: 'Urban Echo',
        artist: 'David Chen',
        description: 'Abstract interpretation of city rhythms and urban decay.',
        contact: 'david.c@artstudio.com',
        image: art1,
    },
];

const Art = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const slideRef = useRef(null);
    const contentRef = useRef(null);
    const timerRef = useRef(null);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % artPieces.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + artPieces.length) % artPieces.length);
    };

    // Auto-play
    useEffect(() => {
        timerRef.current = setInterval(nextSlide, 5000); // 5 seconds auto slide
        return () => clearInterval(timerRef.current);
    }, []);

    // Reset timer on manual interaction
    const handleManualNext = () => {
        clearInterval(timerRef.current);
        nextSlide();
        timerRef.current = setInterval(nextSlide, 5000);
    };

    const handleManualPrev = () => {
        clearInterval(timerRef.current);
        prevSlide();
        timerRef.current = setInterval(nextSlide, 5000);
    };

    // Animation when currentIndex changes
    useEffect(() => {
        const tl = gsap.timeline();

        // Animate Image
        tl.fromTo(
            slideRef.current,
            { opacity: 0, scale: 1.1 },
            { opacity: 1, scale: 1, duration: 1, ease: 'power2.out' }
        );

        // Animate Content
        if (contentRef.current) {
            tl.fromTo(
                contentRef.current.children,
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
                '-=0.8'
            );
        }
    }, [currentIndex]);

    const currentArt = artPieces[currentIndex];

    return (
        <div className="art-page">
            <div className="art-background">
                <img src={currentArt.image} alt="Background" key={currentArt.id + '-bg'} className="bg-fade" />
                <div className="overlay"></div>
            </div>

            <div className="art-header">
                <h1>Gallery</h1>
            </div>

            <div className="slider-container">
                <button className="nav-btn prev-btn" onClick={handleManualPrev}>
                    <IoArrowBack size={24} />
                </button>

                <div className="art-item-active">
                    <div className="art-content-wrapper">
                        <div className="art-image-wrapper">
                            <img
                                src={currentArt.image}
                                alt={currentArt.title}
                                ref={slideRef}
                                key={currentArt.id} // Key forces re-render for animation
                            />
                        </div>
                        <div className="art-details" ref={contentRef} key={currentArt.id + '-content'}>
                            <div className="art-info">
                                <h3>{currentArt.title}</h3>
                                <h4>{currentArt.artist}</h4>
                                <p className="description">{currentArt.description}</p>
                            </div>
                            <div className="art-contact">
                                <p>Inquire</p>
                                <a href={`mailto:${currentArt.contact}`}>{currentArt.contact}</a>
                            </div>
                        </div>
                    </div>
                </div>

                <button className="nav-btn next-btn" onClick={handleManualNext}>
                    <IoArrowForward size={24} />
                </button>
            </div>

            <div className="slide-indicators">
                {artPieces.map((_, idx) => (
                    <div
                        key={idx}
                        className={`indicator ${idx === currentIndex ? 'active' : ''}`}
                        onClick={() => {
                            clearInterval(timerRef.current);
                            setCurrentIndex(idx);
                            timerRef.current = setInterval(nextSlide, 5000);
                        }}
                    ></div>
                ))}
            </div>
        </div>
    );
};

export default Art;
