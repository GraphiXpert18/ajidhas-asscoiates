import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoArrowBack } from 'react-icons/io5';
import './Visualisation.css';

import buildingNight from '../../assets/building_night.png';

gsap.registerPlugin(ScrollTrigger);

const projects = [
    { id: 1, title: 'Haus am See', category: 'Residential', image: buildingNight },
    { id: 2, title: 'Urban Loft', category: 'Property', image: buildingNight },
    { id: 3, title: 'Alpine Retreat', category: 'Hospitality', image: buildingNight },
    { id: 4, title: 'Tech Hub', category: 'Corporate', image: buildingNight },
    { id: 5, title: 'Modern Villa', category: 'Residential', image: buildingNight },
    { id: 6, title: 'City Center', category: 'Property', image: buildingNight },
];

const categories = ['Alle', 'Residential', 'Property', 'Hospitality', 'Corporate'];

const Visualisation = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState('Alle');
    const [activeProject, setActiveProject] = useState(projects[0]);
    const [isPaused, setIsPaused] = useState(false);
    const titleRef = useRef(null);
    const contentRef = useRef(null);
    const projectRefs = useRef([]);

    const filteredProjects = activeCategory === 'Alle'
        ? projects
        : projects.filter(p => p.category === activeCategory);

    useEffect(() => {
        // Animate title change
        gsap.fromTo(titleRef.current,
            { y: 20, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
        );
    }, [activeProject]);

    // Auto-scroll removed as per user request
    /*
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        let animationFrameId;
        const scrollSpeed = 1; // Pixels per frame

        const autoScroll = () => {
            if (!isPaused) {
                if (content.scrollTop + content.clientHeight >= content.scrollHeight - 1) {
                    // Reset to top if reached bottom (optional, or just stop)
                    content.scrollTop = 0;
                } else {
                    content.scrollTop += scrollSpeed;
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused, activeCategory]); // Restart when category changes
    */

    useEffect(() => {
        // Intersection Observer for scroll detection
        const observerOptions = {
            root: contentRef.current,
            threshold: 0.6 // Trigger when 60% of image is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const index = Number(entry.target.dataset.index);
                    if (filteredProjects[index]) {
                        setActiveProject(filteredProjects[index]);
                    }
                    entry.target.classList.add('in-view');
                } else {
                    entry.target.classList.remove('in-view');
                }
            });
        }, observerOptions);

        projectRefs.current.forEach(ref => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, [filteredProjects]);

    const handleCategoryChange = (cat) => {
        setActiveCategory(cat);
        // Reset scroll
        if (contentRef.current) {
            contentRef.current.scrollTop = 0;
        }
    };

    const scrollToProject = (index) => {
        const target = projectRefs.current[index];
        if (target && contentRef.current) {
            target.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    };

    return (
        <div className="visualisation-container">


            <div className="vis-sidebar">
                <div className="vis-logo">
                    Marcel Eberharter
                </div>

                <div className="vis-active-info">
                    <h1 className="vis-project-title" ref={titleRef}>
                        {activeProject.title}
                    </h1>
                </div>

                <div className="vis-filters">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            className={`vis-filter-btn ${activeCategory === cat ? 'active' : ''}`}
                            onClick={() => handleCategoryChange(cat)}
                        >
                            {cat}
                        </button>
                    ))}
                </div>
            </div>

            <div
                className="vis-content"
                ref={contentRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {filteredProjects.map((project, index) => (
                    <div
                        key={project.id}
                        className="vis-image-wrapper"
                        ref={el => projectRefs.current[index] = el}
                        data-index={index}
                    >
                        <img src={project.image} alt={project.title} />
                    </div>
                ))}
            </div>

            <div className="vis-indicators">
                {filteredProjects.map((_, index) => (
                    <button
                        key={index}
                        className={`vis-dot ${activeProject.id === filteredProjects[index].id ? 'active' : ''}`}
                        onClick={() => scrollToProject(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Visualisation;
