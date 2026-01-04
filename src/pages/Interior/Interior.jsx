import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack } from 'react-icons/io5';
import './Interior.css';

import buildingNight from '../../assets/building_night.png';

const interiors = [
    { id: 1, title: 'Forty One Oaks', location: 'Portola Valley, CA', image: buildingNight },
    { id: 2, title: 'Sentinal Ridge', location: 'Howell Mountain, CA', image: buildingNight },
    { id: 3, title: 'White Sands', location: 'Carmel-by-the-sea, CA', image: buildingNight },
    { id: 4, title: 'Dawnridge', location: 'Silicon Valley, CA', image: buildingNight },
    { id: 5, title: '12 Moons', location: 'Sonoma, CA', image: buildingNight },
    { id: 6, title: 'Foothills', location: 'Los Altos Hills, CA', image: buildingNight },
    { id: 7, title: 'Zinfandel', location: 'St. Helena, CA', image: buildingNight },
    { id: 8, title: 'Pinon Ranch', location: 'Portola Valley, CA', image: buildingNight },
    { id: 9, title: 'Grasslands House', location: 'Carmel Valley, CA', image: buildingNight },
    { id: 10, title: 'Oak Creek', location: 'Palo Alto, CA', image: buildingNight },
    { id: 11, title: 'Silver Lake', location: 'Los Angeles, CA', image: buildingNight },
    { id: 12, title: 'Mountain View', location: 'Aspen, CO', image: buildingNight },
    { id: 13, title: 'Desert Rose', location: 'Palm Springs, CA', image: buildingNight },
    { id: 14, title: 'Ocean Breeze', location: 'Malibu, CA', image: buildingNight },
];

const Interior = () => {
    const navigate = useNavigate();
    const [activeProject, setActiveProject] = useState(interiors[0]);
    const [isPaused, setIsPaused] = useState(false);
    const imageRef = useRef(null);
    const listRef = useRef(null);
    const itemRefs = useRef([]);

    useEffect(() => {
        // Initial entrance animation
        const tl = gsap.timeline();
        tl.fromTo('.collab-left', { xPercent: -100 }, { xPercent: 0, duration: 1.5, ease: 'power4.out' })
            .fromTo('.collab-right', { xPercent: 100 }, { xPercent: 0, duration: 1.5, ease: 'power4.out' }, '-=1.5')
            .fromTo('.collab-item', { opacity: 0, x: 50 }, { opacity: 1, x: 0, stagger: 0.1, duration: 1, ease: 'power3.out' }, '-=0.5');
    }, []);

    // Auto-rotation removed as per user request
    /*
    useEffect(() => {
        if (isPaused) return;

        const interval = setInterval(() => {
            const currentIndex = interiors.findIndex(p => p.id === activeProject.id);
            const nextIndex = (currentIndex + 1) % interiors.length;
            const nextProject = interiors[nextIndex];

            gsap.to(imageRef.current, {
                opacity: 0,
                duration: 0.4,
                onComplete: () => {
                    setActiveProject(nextProject);
                    gsap.to(imageRef.current, { opacity: 1, duration: 0.6 });
                }
            });
        }, 3000); // Faster rotation for better demo

        return () => clearInterval(interval);
    }, [activeProject, isPaused]);
    */

    // Auto-scroll removed as per user request
    /*
    useEffect(() => {
        if (isPaused) return;
        const currentIndex = interiors.findIndex(p => p.id === activeProject.id);
        if (itemRefs.current[currentIndex]) {
            itemRefs.current[currentIndex].scrollIntoView({
                behavior: 'smooth',
                block: 'center',
                inline: 'nearest'
            });
        }
    }, [activeProject, isPaused]);
    */

    const handleHover = (project) => {
        if (activeProject.id === project.id) return;

        gsap.to(imageRef.current, {
            opacity: 0,
            duration: 0.4,
            onComplete: () => {
                setActiveProject(project);
                gsap.to(imageRef.current, { opacity: 1, duration: 0.6 });
            }
        });
    };

    return (
        <div className="collaboration-container">


            <div className="collab-layout">
                <div className="collab-left">
                    <div className="active-image-wrapper">
                        <img
                            ref={imageRef}
                            src={activeProject.image}
                            alt={activeProject.title}
                            className="active-collab-image"
                        />
                    </div>
                    <div className="collab-title-overlay">
                        <h1>{activeProject.title}</h1>
                    </div>
                </div>

                <div
                    className="collab-right"
                    ref={listRef}
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                >
                    <div className="collab-list-container">
                        <div className="arc-visual">
                            <div className="arc-line"></div>
                            <div className="arc-arrow top">↑</div>
                            <div className="arc-arrow bottom">↓</div>
                        </div>

                        <div className="collab-list">
                            {interiors.map((project, index) => (
                                <div
                                    key={project.id}
                                    ref={el => itemRefs.current[index] = el}
                                    className={`collab-item ${activeProject.id === project.id ? 'active' : ''}`}
                                    onMouseEnter={() => handleHover(project)}
                                    onClick={() => navigate(`/architecture/project/${(project.id % 3) + 1}`)}
                                >
                                    <h2 className="project-name">{project.title}</h2>
                                    <p className="project-loc">{project.location}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Interior;
