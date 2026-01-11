import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';

import buildingNight from '../../assets/building_night.png';
import openingBuilding from '../../assets/opening_building.png';
import openingCloud from '../../assets/opening_cloud.png';
import openingGround from '../../assets/opening_ground.png';
import introBg from '../../assets/intro_bg.jpg';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);
    const introRef = useRef(null);
    const buildingRef = useRef(null);
    const leftHalfRef = useRef(null);
    const rightHalfRef = useRef(null);
    const cloudLeftRef = useRef(null);
    const cloudRightRef = useRef(null);
    const introBgRef = useRef(null);
    const textAjidhasRef = useRef(null);
    const textAssociatesRef = useRef(null);
    const groundRef = useRef(null);
    const navigate = useNavigate();
    const [introFinished, setIntroFinished] = useState(false);

    useEffect(() => {
        // Disable scroll initially
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline();

        // Phase 1: Intro Animation (Auto)
        tl.set(introRef.current, { opacity: 1 })
            // Fade in background
            .fromTo(introBgRef.current,
                { opacity: 0 },
                { opacity: 1, duration: 1, ease: 'power2.inOut' }
            )
            // Ground rises slightly
            .fromTo(groundRef.current,
                { y: '30%', opacity: 0 },
                { y: '0%', opacity: 1, duration: 1.5, ease: 'power2.out' },
                '-=1.0'
            )
            // Building rises from bottom
            .fromTo(buildingRef.current,
                { y: '100%', xPercent: -50, opacity: 0 },
                { y: '0%', xPercent: -50, opacity: 1, duration: 1.8, ease: 'power3.out' },
                '-=1.2'
            )
            // Text animations - AJIDHAS from right, ASSOCIATES from left
            .fromTo(textAjidhasRef.current,
                { x: '100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' },
                '-=1.2'
            )
            .fromTo(textAssociatesRef.current,
                { x: '-100%', opacity: 0 },
                { x: '0%', opacity: 1, duration: 1.5, ease: 'power3.out' },
                '-=1.5'
            )
            // Clouds enter from sides
            .fromTo(cloudLeftRef.current,
                { x: '-100%', opacity: 0 },
                { x: '10%', opacity: 1, duration: 2, ease: 'power2.out' },
                '-=1.4'
            )
            .fromTo(cloudRightRef.current,
                { x: '100%', opacity: 0 },
                { x: '-10%', opacity: 1, duration: 2, ease: 'power2.out' },
                '-=2'
            )
            // Pause for a moment
            .to({}, { duration: 0.8 })
            // Enable scroll
            .call(() => {
                document.body.style.overflow = 'auto';
            });

        // Phase 2: Scroll Animation (Split & Zoom)
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-spacer",
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                onEnter: () => {
                    // Ensure scroll is enabled
                    document.body.style.overflow = 'auto';
                },
                onLeave: () => {
                    setIntroFinished(true);
                },
                onLeaveBack: () => {
                    setIntroFinished(false);
                }
            }
        });

        scrollTl
            // Zoom and split building
            .to(buildingRef.current, { scale: 3, xPercent: -50, duration: 2, ease: "power2.inOut" })
            .to(leftHalfRef.current, { x: '-60%', duration: 2, ease: "power2.inOut" }, "<")
            .to(rightHalfRef.current, { x: '60%', duration: 2, ease: "power2.inOut" }, "<")
            // Fade out text
            .to([textAjidhasRef.current, textAssociatesRef.current], {
                opacity: 0,
                y: -50,
                duration: 1.5
            }, "<")
            // Fade out clouds
            .to([cloudLeftRef.current, cloudRightRef.current], {
                opacity: 0,
                scale: 1.5,
                duration: 1.5
            }, "<")
            // Fade out background, ground and overlay
            .to(groundRef.current, { y: '10%', opacity: 0, duration: 1.5 }, "<")
            .to(introBgRef.current, { opacity: 0, duration: 1.5 }, "<0.5")
            .to(introRef.current, {
                backgroundColor: 'rgba(5, 5, 5, 0)',
                duration: 1.5,
                onComplete: () => {
                    gsap.set(introRef.current, { display: 'none' });
                }
            }, "<0.5");

        return () => {
            // Cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    useEffect(() => {
        if (!introFinished) return;

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
    }, [introFinished]);

    return (
        <div className="home-page-new">
            <div className="scroll-spacer"></div>

            {/* Intro Animation Overlay */}
            <div className="intro-overlay" ref={introRef}>
                <img src={introBg} alt="Intro Background" className="intro-bg-image" ref={introBgRef} />

                {/* Animated Text */}
                <div className="intro-text-container">
                    <h1 className="intro-text intro-text-ajidhas" ref={textAjidhasRef}>AJIDHAS</h1>
                    <h1 className="intro-text intro-text-associates" ref={textAssociatesRef}>ASSOCIATES</h1>
                </div>

                <img src={openingCloud} alt="Cloud Left" className="intro-cloud left" ref={cloudLeftRef} />
                <img src={openingCloud} alt="Cloud Right" className="intro-cloud right" ref={cloudRightRef} />

                <img src={openingGround} alt="Ground" className="intro-ground" ref={groundRef} />

                <div className="building-split-container" ref={buildingRef}>
                    {/* Ghost image to set size */}
                    <img src={openingBuilding} alt="" className="ghost-building" />

                    <div className="building-half left" ref={leftHalfRef}>
                        <img src={openingBuilding} alt="Building Left" />
                    </div>
                    <div className="building-half right" ref={rightHalfRef}>
                        <img src={openingBuilding} alt="Building Right" />
                    </div>
                </div>
            </div>

            <div className="home-background">
                <img
                    src={buildingNight}
                    alt="Background"
                    className="bg-slide active"
                />
                <div className="home-overlay"></div>
            </div>

            <section className="hero-section-new" ref={heroRef}>
                <div className="hero-content-new" ref={textRef}>
                    <h1>Ajidhas and Associates</h1>
                    <p className="hero-subtitle">Architecture & Art Studio</p>
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
