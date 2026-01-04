import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack, IoClose } from 'react-icons/io5';
import './ArchitectureAllWork.css';

import bg1 from '../../assets/hero_bg_night.png';
import bg2 from '../../assets/hero_bg_architecture.png';
import bg3 from '../../assets/home_bg.png';
import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const allProjects = [
    { id: 1, image: bg1, title: 'The Nexus Tower', desc: 'A vertical city within a city, redefining urban living with sustainable innovation.' },
    { id: 2, image: bg2, title: 'Horizon House', desc: 'Where earth meets sky. A cantilevered masterpiece suspended over the valley.' },
    { id: 3, image: bg3, title: 'Aqua Residence', desc: 'Fluid architecture inspired by water. Curves and reflections create a living sculpture.' },
    { id: 4, image: art1, title: 'The Void Gallery', desc: 'Negative space becomes the artwork. A museum that celebrates emptiness.' },
    { id: 5, image: art2, title: 'Copper Sanctuary', desc: 'Oxidized metal meets sacred geometry in this meditation retreat.' },
    { id: 6, image: art3, title: 'Crystal Pavilion', desc: 'Transparent walls dissolve boundaries between nature and architecture.' },
    { id: 7, image: bg1, title: 'Midnight Studios', desc: 'Creative spaces bathed in controlled darkness and dramatic light.' },
    { id: 8, image: bg2, title: 'Bamboo Residence', desc: 'Sustainable living through traditional materials and modern design.' },
    { id: 9, image: bg3, title: 'Cliffside Villa', desc: 'Perched on the edge of possibility, embracing the dramatic landscape.' },
    { id: 10, image: art1, title: 'Concrete Poetry', desc: 'Brutalist forms softened by natural light and green terraces.' },
    { id: 11, image: art2, title: 'White Cube Loft', desc: 'Pure minimalism. Every element serves a purpose, nothing more.' },
    { id: 12, image: art3, title: 'Garden Bridge House', desc: 'A living connection between two hillsides, wrapped in vegetation.' },
];

const ArchitectureAllWork = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const timelines = useRef([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const modalImgRef = useRef(null);
    const modalInfoRef = useRef(null);

    useEffect(() => {
        timelines.current = []; // Clear array on mount/remount
        const items = gsap.utils.toArray('.tunnel-item');
        const totalItems = items.length;
        const duration = 40; // Slower loop
        const zStart = -totalItems * 1000;
        const zEnd = 2000;

        items.forEach((item, i) => {
            // Initial position
            gsap.set(item, {
                z: -i * 1000 - 500,
                opacity: 0
            });

            // Create a looping animation for each item
            const tl = gsap.timeline({
                repeat: -1,
                defaults: { ease: 'none' }
            });

            tl.fromTo(item,
                { z: zStart, opacity: 0 },
                {
                    z: zEnd,
                    duration: duration,
                    onUpdate: function () {
                        const p = this.progress();
                        // Smooth fade in/out based on z-position
                        if (p < 0.1) gsap.set(item, { opacity: p * 10 });
                        else if (p > 0.85) gsap.set(item, { opacity: Math.max(0, 1 - (p - 0.85) * 6.6) });
                        else gsap.set(item, { opacity: 1 });
                    }
                }
            );

            // Distribute items evenly in the tunnel
            tl.progress(1 - (i / totalItems));

            timelines.current.push(tl);
        });

        // Entrance animation
        gsap.fromTo('.tunnel-center-text',
            { opacity: 0, scale: 0.8, filter: 'blur(10px)' },
            { opacity: 1, scale: 1, filter: 'blur(0px)', duration: 2, ease: 'power4.out' }
        );

        return () => {
            timelines.current.forEach(tl => tl.kill());
        };
    }, []);

    const handleProjectClick = (project) => {
        setSelectedProject(project);
    };

    const handleCloseModal = () => {
        const tl = gsap.timeline({
            onComplete: () => setSelectedProject(null)
        });
        tl.to([modalImgRef.current, modalInfoRef.current], {
            y: 50,
            opacity: 0,
            duration: 0.4,
            ease: 'power2.in'
        });
    };

    // Animate Modal In
    useEffect(() => {
        if (selectedProject) {
            const tl = gsap.timeline();
            tl.to(modalImgRef.current, {
                y: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                delay: 0.1
            })
                .to(modalInfoRef.current, {
                    y: 0,
                    opacity: 1,
                    duration: 0.8,
                    ease: 'power3.out'
                }, '-=0.6');
        }
    }, [selectedProject]);

    const handleMouseEnter = () => {
        timelines.current.forEach(tl => gsap.to(tl, { timeScale: 0, duration: 0.5 }));
    };

    const handleMouseLeave = () => {
        timelines.current.forEach(tl => gsap.to(tl, { timeScale: 1, duration: 0.5 }));
    };

    return (
        <div className="all-work-tunnel-container" ref={containerRef}>


            <div className="tunnel-center-text">
                <h1>ALL WORK</h1>
                <p>A curated journey through architectural precision.</p>
            </div>

            <div className="tunnel-viewport">
                {allProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`tunnel-item item-pos-${index % 12}`}
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
                                <h3 className="tunnel-card-title">{project.title}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Full Screen Modal */}
            <div className={`aw-modal ${selectedProject ? 'active' : ''}`}>
                {selectedProject && (
                    <>
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
                                    <h2 className="aw-modal-title">{selectedProject.title}</h2>
                                    <p className="aw-modal-desc">{selectedProject.desc}</p>
                                    <div className="aw-modal-meta">
                                        <div className="aw-meta-item">
                                            <h4>Location</h4>
                                            <p>Europe</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <h4>Year</h4>
                                            <p>2024</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <h4>Status</h4>
                                            <p>Completed</p>
                                        </div>
                                        <div className="aw-meta-item">
                                            <h4>Type</h4>
                                            <p>Residential</p>
                                        </div>
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
