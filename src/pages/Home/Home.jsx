import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import './Home.css';


import waitingHall from '../../assets/waiting_hall.png';
import openingBuilding from '../../assets/building1.png';
import openingCloud from '../../assets/opening_cloud.png';

import introBg from '../../assets/bg1.jpeg';
import penthouseReveal from '../../assets/penthouse_reveal.png';

gsap.registerPlugin(ScrollTrigger);

const Home = () => {
    const heroRef = useRef(null);
    const textRef = useRef(null);
    const buttonsRef = useRef(null);
    const introRef = useRef(null);
    const buildingRef = useRef(null);
    const cloudLeftRef = useRef(null);
    const cloudRightRef = useRef(null);
    const introBgRef = useRef(null);
    const textAjidhasRef = useRef(null);
    const textAssociatesRef = useRef(null);

    const bgImageRef = useRef(null);
    const penthouseImageRef = useRef(null);
    const penthouseCloudLeftRef = useRef(null);
    const penthouseCloudRightRef = useRef(null);
    const penthouseTextLeftRef = useRef(null);
    const penthouseTextRightRef = useRef(null);
    const navigate = useNavigate();
    const [introFinished, setIntroFinished] = useState(false);
    const [showPenthouse, setShowPenthouse] = useState(false);

    useEffect(() => {
        // Disable scroll initially
        document.body.style.overflow = 'hidden';

        const tl = gsap.timeline();

        // Phase 1: Intro Animation (Auto)
        tl.set(introRef.current, { opacity: 1 })
            // 1. Background: Cinematic scale down + fade in
            .fromTo(introBgRef.current,
                { opacity: 0, scale: 1.15 },
                { opacity: 1, scale: 1, duration: 2.5, ease: 'power2.out' }
            )

            // 3. Building: Rises with a slight scale up for impact
            .fromTo(buildingRef.current,
                { y: '100%', xPercent: -50, opacity: 0, scale: 0.9 },
                { y: '0%', xPercent: -50, opacity: 1, scale: 1, duration: 2, ease: 'power4.out' },
                '-=1.6'
            )
            // 4. Text: Cinematic blur reveal + slide
            .fromTo(textAjidhasRef.current,
                { x: '100px', opacity: 0, filter: 'blur(15px)' },
                { x: '0%', opacity: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' },
                '-=1.5'
            )
            .fromTo(textAssociatesRef.current,
                { x: '-100px', opacity: 0, filter: 'blur(15px)' },
                { x: '0%', opacity: 1, filter: 'blur(0px)', duration: 1.8, ease: 'power3.out' },
                '-=1.6'
            )
            // 5. Clouds: Soft entry
            .fromTo(cloudLeftRef.current,
                { x: '-50%', opacity: 0 },
                { x: '10%', opacity: 1, duration: 3, ease: 'power2.out' },
                '-=2.5'
            )
            .fromTo(cloudRightRef.current,
                { x: '50%', opacity: 0 },
                { x: '-10%', opacity: 1, duration: 3, ease: 'power2.out' },
                '-=3.0'
            )
            // Pause for a moment to let the user absorb the scene
            .to({}, { duration: 0.5 })
            // Enable scroll
            .call(() => {
                document.body.style.overflow = 'auto';
            });

        // Phase 2: Scroll Animation (Cinematic Entry)
        const scrollTl = gsap.timeline({
            scrollTrigger: {
                trigger: ".scroll-spacer",
                start: "top top",
                end: "bottom bottom",
                scrub: 1.5, // Smoother scrubbing for a weighty feel
                onEnter: () => {
                    // Ensure scroll is enabled
                    document.body.style.overflow = 'auto';
                },
                onLeave: () => {
                    document.body.style.overflow = 'hidden';
                    setShowPenthouse(true);

                    const penthouseTl = gsap.timeline({
                        onComplete: () => {
                            setIntroFinished(true);
                            setShowPenthouse(false);
                            document.body.style.overflow = 'auto';
                        }
                    });

                    // 1. Initial state
                    penthouseTl.set([penthouseCloudLeftRef.current, penthouseCloudRightRef.current], { opacity: 0 });
                    penthouseTl.set(penthouseImageRef.current, { scale: 1 });

                    // 2. Full Cinematic Zoom (4s)
                    penthouseTl.to(penthouseImageRef.current, {
                        scale: 2.5,
                        filter: 'brightness(1.1) contrast(1.05)',
                        duration: 4,
                        ease: 'power2.inOut'
                    });

                    // 3. Reveal Text and Clouds (3s) - Sequential and Smooth
                    penthouseTl.fromTo([penthouseTextLeftRef.current, penthouseTextRightRef.current],
                        { y: 50, opacity: 0, filter: 'blur(20px)' },
                        { y: 0, opacity: 1, filter: 'blur(0px)', duration: 2, stagger: 0.3, ease: 'power3.out' },
                        '>-0.5'
                    );

                    penthouseTl.fromTo(penthouseCloudLeftRef.current,
                        { x: '-150%', opacity: 0, filter: 'blur(20px)' },
                        { x: '-10%', opacity: 0.6, filter: 'blur(5px)', duration: 3, ease: 'power3.out' },
                        '<'
                    );

                    penthouseTl.fromTo(penthouseCloudRightRef.current,
                        { x: '150%', opacity: 0, filter: 'blur(20px)' },
                        { x: '10%', opacity: 0.6, filter: 'blur(5px)', duration: 3, ease: 'power3.out' },
                        '<'
                    );

                    // 4. Soft Exit
                    penthouseTl.to([penthouseCloudLeftRef.current, penthouseCloudRightRef.current, penthouseTextLeftRef.current, penthouseTextRightRef.current], {
                        opacity: 0,
                        y: -30,
                        duration: 1.5,
                        ease: 'power2.in'
                    }, '+=1');

                    penthouseTl.to(penthouseImageRef.current, {
                        opacity: 0,
                        scale: 2.7,
                        duration: 1.5,
                        ease: 'power2.in'
                    }, '<');
                },
                onLeaveBack: () => {
                    setIntroFinished(false);
                }
            }
        });

        scrollTl
            // 1. Clear the view: Text fades out and moves up quickly with blur
            .to([textAjidhasRef.current, textAssociatesRef.current], {
                opacity: 0,
                y: -100,
                filter: 'blur(20px)', // Cinematic blur out
                duration: 1,
                ease: "power2.in"
            })
            // 2. Clouds part ways dramatically
            .to(cloudLeftRef.current, {
                x: '-150%',
                opacity: 0,
                scale: 1.5, // Clouds get closer as they move out
                duration: 1.5,
                ease: "power2.in"
            }, "<")
            .to(cloudRightRef.current, {
                x: '150%',
                opacity: 0,
                scale: 1.5,
                duration: 1.5,
                ease: "power2.in"
            }, "<")
            // 3. The Approach: Building zooms in
            // We want to simulate walking INTO the building.
            .to(buildingRef.current, {
                scale: 18, // Massive zoom to go "through" it
                yPercent: 40, // Adjust to aim at the door/center
                transformOrigin: "center 85%", // Zoom towards the entrance level
                filter: 'blur(10px)', // Motion blur as we get close
                opacity: 0, // Fade out at the very end
                duration: 3,
                ease: "expo.in" // Slow start, fast finish (acceleration)
            }, "<0.2") // Start slightly after text clears

            // 4. Background Transition
            .to(introBgRef.current, {
                scale: 1.5, // Background also zooms a bit
                opacity: 0,
                duration: 2.5,
                ease: "power2.in"
            }, "<")
            // 5. Final cleanup
            .to(introRef.current, {
                backgroundColor: 'rgba(5, 5, 5, 0)',
                duration: 0.5,
                onComplete: () => {
                    gsap.set(introRef.current, { display: 'none' });
                }
            }, "-=0.5");

        return () => {
            // Cleanup
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };

    }, []);

    useEffect(() => {
        if (!introFinished) return;

        const tl = gsap.timeline();

        // Hero Text Reveal (Title & Subtitle)
        // Cinematic rise with blur removal
        tl.fromTo(
            textRef.current.children,
            { y: 100, opacity: 0, filter: 'blur(20px)' },
            {
                y: 0,
                opacity: 1,
                filter: 'blur(0px)',
                duration: 1.5,
                stagger: 0.2,
                ease: 'power4.out',
                delay: 0.2,
            }
        );

        // Buttons Reveal (Art & Architecture)
        // Pop in with a slight overshoot for a premium feel
        tl.fromTo(
            buttonsRef.current.children,
            { y: 60, opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                filter: 'blur(0px)',
                duration: 1.2,
                stagger: 0.2, // One after another
                ease: 'back.out(1.2)', // Subtle bounce
            },
            '-=1.0' // Start before text finishes
        );
    }, [introFinished]);

    useEffect(() => {
        if (!introFinished) return;

        const handleMouseMove = (e) => {
            const { clientX, clientY } = e;
            const x = (clientX / window.innerWidth) - 0.5;
            const y = (clientY / window.innerHeight) - 0.5;

            // Tilt Text
            gsap.to(textRef.current, {
                rotationY: x * 20, // Rotate horizontally based on mouse X
                rotationX: -y * 20, // Rotate vertically based on mouse Y
                x: x * 30, // Parallax movement
                y: y * 30,
                duration: 1,
                ease: 'power2.out'
            });

            // Tilt Buttons (slightly different intensity for depth)
            gsap.to(buttonsRef.current, {
                rotationY: x * 30,
                rotationX: -y * 30,
                x: x * 50,
                y: y * 50,
                duration: 1,
                ease: 'power2.out'
            });

            // Animate Background (Parallax - moves opposite to mouse)
            gsap.to(bgImageRef.current, {
                x: -x * 20,
                y: -y * 20,
                scale: 1.1, // Keep it slightly scaled up to avoid edges showing
                duration: 1.5,
                ease: 'power2.out'
            });
        };

        window.addEventListener('mousemove', handleMouseMove);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, [introFinished]);

    return (
        <div className="home-page-new">
            <div className="scroll-spacer"></div>

            {/* Penthouse Reveal Overlay */}
            <div className={`penthouse-reveal-overlay ${showPenthouse ? 'active' : ''}`}>
                <img src={penthouseReveal} alt="Penthouse Reveal" className="penthouse-image" ref={penthouseImageRef} />
                <div className="penthouse-text-overlay">
                    <h2 className="penthouse-text left" ref={penthouseTextLeftRef}>AJIDHAS</h2>
                    <h2 className="penthouse-text right" ref={penthouseTextRightRef}>ASSOCIATES</h2>
                </div>
                <img src={openingCloud} alt="Cloud Left" className="penthouse-cloud left" ref={penthouseCloudLeftRef} />
                <img src={openingCloud} alt="Cloud Right" className="penthouse-cloud right" ref={penthouseCloudRightRef} />
            </div>

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



                <div className="building-container" ref={buildingRef}>
                    <img src={openingBuilding} alt="Building" className="intro-building" />
                </div>
            </div>

            <div className="home-background">
                <img
                    ref={bgImageRef}
                    src={waitingHall}
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
