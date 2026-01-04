import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack, IoClose, IoLocationOutline, IoCalendarOutline, IoBuildOutline, IoCubeOutline } from 'react-icons/io5';
import './ArchitectureAllWork.css';

import bg1 from '../../assets/hero_bg_night.png';
import bg2 from '../../assets/hero_bg_architecture.png';
import bg3 from '../../assets/home_bg.png';
import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const allProjects = [
    {
        id: 1,
        image: bg1,
        title: 'The Nexus Tower',
        category: 'Urban Development',
        location: 'Dubai, UAE',
        year: '2024',
        status: 'Under Construction',
        type: 'Mixed-Use High-Rise',
        desc: 'A vertical city within a city, redefining urban living with sustainable innovation. The Nexus Tower integrates vertical farming, renewable energy systems, and modular living units to create a self-sustaining ecosystem in the heart of the desert.'
    },
    {
        id: 2,
        image: bg2,
        title: 'Horizon House',
        category: 'Residential',
        location: 'Swiss Alps',
        year: '2023',
        status: 'Completed',
        type: 'Private Villa',
        desc: 'Where earth meets sky. A cantilevered masterpiece suspended over the valley, designed to minimize its footprint while maximizing panoramic views of the alpine landscape.'
    },
    {
        id: 3,
        image: bg3,
        title: 'Aqua Residence',
        category: 'Hospitality',
        location: 'Maldives',
        year: '2024',
        status: 'Concept',
        type: 'Luxury Resort',
        desc: 'Fluid architecture inspired by water. Curves and reflections create a living sculpture that blurs the line between the built environment and the Indian Ocean.'
    },
    {
        id: 4,
        image: art1,
        title: 'The Void Gallery',
        category: 'Cultural',
        location: 'Berlin, Germany',
        year: '2022',
        status: 'Completed',
        type: 'Museum',
        desc: 'Negative space becomes the artwork. A museum that celebrates emptiness, using light and shadow as the primary materials to guide visitors through a journey of introspection.'
    },
    {
        id: 5,
        image: art2,
        title: 'Copper Sanctuary',
        category: 'Spiritual',
        location: 'Kyoto, Japan',
        year: '2023',
        status: 'Completed',
        type: 'Meditation Retreat',
        desc: 'Oxidized metal meets sacred geometry. This sanctuary provides a tranquil space for reflection, with copper walls that age gracefully, reflecting the passage of time.'
    },
    {
        id: 6,
        image: art3,
        title: 'Crystal Pavilion',
        category: 'Public Space',
        location: 'Singapore',
        year: '2024',
        status: 'In Progress',
        type: 'Botanical Garden',
        desc: 'Transparent walls dissolve boundaries between nature and architecture. The pavilion houses rare tropical flora within a climate-controlled glass structure that mimics natural light patterns.'
    },
    {
        id: 7,
        image: bg1,
        title: 'Midnight Studios',
        category: 'Commercial',
        location: 'London, UK',
        year: '2023',
        status: 'Completed',
        type: 'Creative Hub',
        desc: 'Creative spaces bathed in controlled darkness and dramatic light. Designed for digital artists and filmmakers, the studios offer perfectly calibrated environments for high-end production.'
    },
    {
        id: 8,
        image: bg2,
        title: 'Bamboo Residence',
        category: 'Sustainable',
        location: 'Bali, Indonesia',
        year: '2022',
        status: 'Completed',
        type: 'Eco-Home',
        desc: 'Sustainable living through traditional materials and modern design. This residence utilizes locally sourced bamboo and passive cooling techniques to create a luxury home with zero carbon footprint.'
    },
    {
        id: 9,
        image: bg3,
        title: 'Cliffside Villa',
        category: 'Residential',
        location: 'Amalfi Coast, Italy',
        year: '2024',
        status: 'Concept',
        type: 'Luxury Villa',
        desc: 'Perched on the edge of possibility, embracing the dramatic landscape. The villa is carved directly into the limestone cliffs, offering unparalleled views of the Mediterranean.'
    },
    {
        id: 10,
        image: art1,
        title: 'Concrete Poetry',
        category: 'Cultural',
        location: 'Mexico City',
        year: '2023',
        status: 'Completed',
        type: 'Library',
        desc: 'Brutalist forms softened by natural light and green terraces. This library redefines concrete as a warm, inviting material that fosters learning and community engagement.'
    },
    {
        id: 11,
        image: art2,
        title: 'White Cube Loft',
        category: 'Residential',
        location: 'New York, USA',
        year: '2022',
        status: 'Completed',
        type: 'Penthouse',
        desc: 'Pure minimalism. Every element serves a purpose, nothing more. This loft is a study in white, using texture and proportion to create a serene sanctuary above the city chaos.'
    },
    {
        id: 12,
        image: art3,
        title: 'Garden Bridge House',
        category: 'Infrastructure',
        location: 'Seoul, South Korea',
        year: '2025',
        status: 'In Progress',
        type: 'Urban Bridge',
        desc: 'A living connection between two hillsides, wrapped in vegetation. This pedestrian bridge doubles as a public park, bringing nature back to the heart of the urban grid.'
    },
];

const ArchitectureAllWork = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const viewportRef = useRef(null);
    const timelines = useRef([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const modalImgRef = useRef(null);
    const modalInfoRef = useRef(null);
    const [isHovering, setIsHovering] = useState(false);

    useEffect(() => {
        timelines.current = [];
        const items = gsap.utils.toArray('.tunnel-item');
        const totalItems = items.length;
        const duration = 50;
        const zStart = -totalItems * 1500;
        const zEnd = 2000;

        items.forEach((item, i) => {
            gsap.set(item, {
                z: zStart,
                opacity: 0,
                filter: 'blur(20px)'
            });

            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: 'none' }
            });

            tl.to(item, {
                z: zEnd,
                duration: duration,
                onUpdate: function () {
                    const p = this.progress();

                    let opacity = 0;
                    let blur = 0;
                    let scale = 1;

                    if (p < 0.2) {
                        opacity = gsap.utils.mapRange(0, 0.2, 0, 1, p);
                        blur = gsap.utils.mapRange(0, 0.2, 20, 0, p);
                    } else if (p > 0.7) {
                        opacity = gsap.utils.mapRange(0.7, 1, 1, 0, p);
                        blur = gsap.utils.mapRange(0.7, 1, 0, 15, p);
                        scale = gsap.utils.mapRange(0.7, 1, 1, 1.5, p);
                    } else {
                        opacity = 1;
                        blur = 0;
                        scale = 1;
                    }

                    gsap.set(item, {
                        opacity: opacity,
                        filter: `blur(${blur}px)`,
                        scale: scale,
                        visibility: opacity > 0 ? 'visible' : 'hidden'
                    });
                }
            });

            tl.progress(i / totalItems);
            timelines.current.push(tl);
        });

        gsap.to(viewportRef.current, {
            rotationY: 2,
            rotationX: 1,
            duration: 8,
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut'
        });

        gsap.fromTo('.tunnel-center-text h1',
            { y: 100, opacity: 0, skewY: 7 },
            { y: 0, opacity: 1, skewY: 0, duration: 2, ease: 'power4.out', delay: 0.5 }
        );

        return () => {
            timelines.current.forEach(tl => tl.kill());
        };
    }, []);

    const handleProjectClick = (project) => {
        // Stop all animations immediately
        timelines.current.forEach(tl => {
            gsap.to(tl, { timeScale: 0, duration: 0.2 });
        });
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        const tl = gsap.timeline({
            onComplete: () => {
                setSelectedProject(null);
                // Resume animations if not hovering
                if (!isHovering) {
                    timelines.current.forEach(tl => {
                        gsap.to(tl, { timeScale: 1, duration: 1.5, ease: 'power3.inOut' });
                    });
                }
            }
        });

        tl.to([modalImgRef.current, modalInfoRef.current], {
            y: 100,
            opacity: 0,
            duration: 0.6,
            ease: 'power4.in'
        });
    };

    useEffect(() => {
        if (selectedProject) {
            const tl = gsap.timeline();
            tl.fromTo(modalImgRef.current,
                { y: 100, opacity: 0, scale: 0.9 },
                { y: 0, opacity: 1, scale: 1, duration: 1.2, ease: 'power4.out' }
            )
                .fromTo(modalInfoRef.current,
                    { y: 50, opacity: 0 },
                    { y: 0, opacity: 1, duration: 1, ease: 'power4.out' },
                    '-=0.8'
                );
        }
    }, [selectedProject]);

    const handleMouseEnter = () => {
        setIsHovering(true);
        if (!selectedProject) {
            timelines.current.forEach(tl => {
                gsap.to(tl, { timeScale: 0, duration: 0.2, ease: 'power2.out' });
            });
        }
    };

    const handleMouseLeave = () => {
        setIsHovering(false);
        if (!selectedProject) {
            timelines.current.forEach(tl => {
                gsap.to(tl, { timeScale: 1, duration: 0.8, ease: 'power2.inOut' });
            });
        }
    };

    const handleBack = () => {
        navigate('/architecture');
    };

    return (
        <div className="all-work-tunnel-container" ref={containerRef}>
            <div className="tunnel-grain"></div>

            <button className="aw-back-button" onClick={handleBack} aria-label="Go back">
                <IoArrowBack size={24} />
            </button>

            <div className="tunnel-center-text" style={{ opacity: selectedProject ? 0 : 1, transition: 'opacity 0.5s' }}>
                <span className="tunnel-label">Portfolio</span>
                <h1>ALL WORK</h1>
                <div className="tunnel-line"></div>
                <p>A curated journey through architectural precision.</p>
            </div>

            <div className="tunnel-viewport" ref={viewportRef}>
                {allProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`tunnel-item item-pos-${index % 12}`}
                        style={{ pointerEvents: selectedProject ? 'none' : 'auto' }}
                    >
                        <div
                            className="tunnel-card"
                            onClick={() => handleProjectClick(project)}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                        >
                            <div className="card-image-wrapper">
                                <img src={project.image} alt={project.title} />
                            </div>
                            <div className="tunnel-card-overlay">
                                <div className="overlay-content">
                                    <span className="project-index">0{index + 1}</span>
                                    <h3 className="tunnel-card-title">{project.title}</h3>
                                    <div className="view-btn">
                                        <span>View Project</span>
                                        <div className="btn-line"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Modal */}
            <div className={`aw-modal ${selectedProject ? 'active' : ''}`}>
                {selectedProject && (
                    <>
                        <div className="aw-modal-bg-overlay"></div>
                        <img src={selectedProject.image} alt="bg" className="aw-modal-bg" />
                        <button className="aw-modal-close" onClick={handleCloseModal}>
                            <IoClose />
                        </button>
                        <div className="aw-modal-content">
                            <div className="aw-modal-inner">
                                <div className="aw-modal-image-container" ref={modalImgRef}>
                                    <img src={selectedProject.image} alt={selectedProject.title} />
                                </div>
                                <div className="aw-modal-info" ref={modalInfoRef}>
                                    <span className="modal-category">{selectedProject.category}</span>
                                    <h2 className="aw-modal-title">{selectedProject.title}</h2>
                                    <p className="aw-modal-desc">{selectedProject.desc}</p>

                                    <div className="aw-modal-meta">
                                        <div className="aw-meta-item">
                                            <div className="meta-header">
                                                <IoLocationOutline />
                                                <h4>Location</h4>
                                            </div>
                                            <p>{selectedProject.location}</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <div className="meta-header">
                                                <IoCalendarOutline />
                                                <h4>Year</h4>
                                            </div>
                                            <p>{selectedProject.year}</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <div className="meta-header">
                                                <IoBuildOutline />
                                                <h4>Status</h4>
                                            </div>
                                            <p>{selectedProject.status}</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <div className="meta-header">
                                                <IoCubeOutline />
                                                <h4>Type</h4>
                                            </div>
                                            <p>{selectedProject.type}</p>
                                        </div>
                                    </div>

                                    <div className="modal-actions">
                                        <button className="modal-cta">Explore Case Study</button>
                                        <button className="modal-secondary" onClick={handleCloseModal}>Back to Gallery</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default ArchitectureAllWork;
