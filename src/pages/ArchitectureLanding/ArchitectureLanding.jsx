import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import './ArchitectureLanding.css';
import homeBg from '../../assets/hero_bg_night.png';

const architectureOptions = [
    { id: 1, title: 'All Work', path: '/architecture/all-work', description: 'Complete portfolio' },
    { id: 2, title: 'Projects', path: '/architecture/projects', description: 'Featured projects' },
    { id: 3, title: 'Collaboration', path: '/architecture/collaboration', description: 'Partner with us' },
    { id: 4, title: 'Interior', path: '/architecture/interior', description: 'Interior design' },
    { id: 5, title: 'Landscape', path: '/architecture/landscape', description: 'Landscape architecture' },
    { id: 6, title: 'Technology', path: '/architecture/technology', description: 'Tech & innovation' },
    { id: 7, title: 'Visualisation', path: '/architecture/visualisation', description: '3D & renders' },
    { id: 8, title: 'About', path: '/architecture/about', description: 'Our story' },
    { id: 9, title: 'Contact', path: '/architecture/contact', description: 'Get in touch' },
];

const ArchitectureLanding = () => {
    const navigate = useNavigate();
    const headerRef = useRef(null);
    const gridRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            headerRef.current,
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
        );

        tl.fromTo(
            gridRef.current.children,
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.6, stagger: 0.08, ease: 'power3.out' },
            '-=0.5'
        );
    }, []);

    return (
        <div className="arch-landing-page">
            <div className="arch-background">
                <img src={homeBg} alt="Background" />
                <div className="arch-overlay"></div>
            </div>

            <div className="arch-content">
                <div className="arch-header" ref={headerRef}>
                    <h1>Architecture</h1>
                    <p>Explore our comprehensive architectural services</p>
                </div>

                <div className="arch-grid" ref={gridRef}>
                    {architectureOptions.map((option) => (
                        <div
                            key={option.id}
                            className="arch-card"
                            onClick={() => navigate(option.path)}
                        >
                            <div className="card-content">
                                <h3>{option.title}</h3>
                                <p>{option.description}</p>
                            </div>
                            <div className="card-arrow">→</div>
                        </div>
                    ))}
                </div>
            </div>
        
        </div>
    );
};

export default ArchitectureLanding;
