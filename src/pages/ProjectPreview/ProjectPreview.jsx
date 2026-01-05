import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoArrowBack, IoAddOutline } from 'react-icons/io5';
import './ProjectPreview.css';

import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const projectImages = {
    1: [art1, art2, art3, art1, art2, art3, art1, art2],
    2: [art2, art3, art1, art2, art3, art1, art2, art3],
    3: [art3, art1, art2, art3, art1, art2, art3, art1],
    4: [art1, art2, art3, art1, art2, art3, art1, art2],
    5: [art2, art3, art1, art2, art3, art1, art2, art3],
    6: [art3, art1, art2, art3, art1, art2, art3, art1]
};

const projectData = {
    1: { title: 'Ethereal Silence', category: 'Series 01', year: '2025' },
    2: { title: 'Bronze Form No. 4', category: 'Series 02', year: '2024' },
    3: { title: 'Monolith', category: 'Series 03', year: '2025' },
    4: { title: 'Urban Echo', category: 'Series 04', year: '2024' },
    5: { title: 'Shadow Play', category: 'Series 05', year: '2025' },
    6: { title: 'Geometric Void', category: 'Series 06', year: '2025' }
};

const ProjectPreview = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const images = projectImages[id] || projectImages[1];
    const project = projectData[id] || projectData[1];

    const [rotation, setRotation] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const requestRef = useRef();

    // Calculate which image is currently at the front
    const total = images.length;
    const angleStep = 360 / total;
    const activeIndex = Math.round(((-rotation % 360) + 360) % 360 / angleStep) % total;

    useEffect(() => {
        window.scrollTo(0, 0);

        const animate = () => {
            if (!isPaused) {
                setRotation(prev => prev - 0.15);
            }
            requestRef.current = requestAnimationFrame(animate);
        };

        requestRef.current = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(requestRef.current);
    }, [isPaused]);

    const getCardStyle = (index) => {
        const currentAngle = (angleStep * index + rotation) % 360;
        const angleRad = (currentAngle * Math.PI) / 180;

        const radiusX = window.innerWidth > 1200 ? 500 : (window.innerWidth > 768 ? 400 : 250);
        const radiusZ = 500;

        const x = Math.sin(angleRad) * radiusX;
        const z = Math.cos(angleRad) * radiusZ;

        const normalizedZ = (z + radiusZ) / (2 * radiusZ);
        const scale = normalizedZ * 0.6 + 0.4;
        const opacity = normalizedZ * 0.8 + 0.2;
        const blur = (1 - normalizedZ) * 6;
        const rotateY = -Math.sin(angleRad) * 20;

        if (hoveredIndex === index) {
            return {
                transform: `translate3d(0, 0, 600px) scale(1.1) rotateY(0deg)`,
                zIndex: 2000,
                opacity: 1,
                filter: 'blur(0px)',
                transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease, filter 0.6s ease'
            };
        }

        return {
            transform: `translate3d(${x}px, 0, ${z}px) scale(${scale}) rotateY(${rotateY}deg)`,
            zIndex: Math.round(z + radiusZ),
            opacity: opacity,
            filter: `blur(${blur}px)`,
            transition: 'transform 0.1s linear, opacity 0.4s ease, filter 0.4s ease'
        };
    };

    return (
        <div className="project-preview-container circular-layout">
            {/* Dynamic Blurred Background */}
            <div className="preview-dynamic-bg">
                {images.map((img, index) => (
                    <div
                        key={index}
                        className={`bg-image-layer ${activeIndex === index ? 'active' : ''}`}
                        style={{ backgroundImage: `url(${img})` }}
                    />
                ))}
                <div className="bg-overlay-dark"></div>
            </div>

            <header className="preview-header">
                <div className="header-info">
                    <span className="category">{project.category}</span>
                    <h1 className="title">{project.title}</h1>
                </div>
            </header>

            <div className="preview-circular-viewport">
                <div className="nav-indicator left">
                    <div className="cross-icon"><IoAddOutline /></div>
                </div>

                <div className="cards-ring">
                    {images.map((img, index) => (
                        <div
                            key={index}
                            className={`preview-card-3d ${hoveredIndex === index ? 'hovered' : ''}`}
                            style={getCardStyle(index)}
                            onMouseEnter={() => {
                                setIsPaused(true);
                                setHoveredIndex(index);
                            }}
                            onMouseLeave={() => {
                                setIsPaused(false);
                                setHoveredIndex(null);
                            }}
                            onClick={() => navigate(`/art/project/${id}`)}
                        >
                            <div className="card-inner">
                                <img src={img} alt={`${project.title} ${index}`} />
                                <div className="card-overlay">
                                    <div className="card-info">
                                        <span className="card-index">0{index + 1}</span>
                                        <h3 className="card-title">{project.title}</h3>
                                        <p className="view-text">Explore Project</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="nav-indicator right">
                    <div className="cross-icon"><IoAddOutline /></div>
                </div>
            </div>

            <footer className="preview-footer">
                <div className="footer-meta">
                    <span>{project.year} © AJIDHAS ASSOCIATES</span>
                </div>
                <div className="scroll-hint">
                    <span>Hover to sharpen • Click to view</span>
                </div>
            </footer>
        </div>
    );
};

export default ProjectPreview;
