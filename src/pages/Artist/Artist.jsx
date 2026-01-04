import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { IoArrowBack } from 'react-icons/io5';
import './Artist.css';
import artistImg from '../../assets/artist_new_profile.png';

gsap.registerPlugin(ScrollTrigger);

const Artist = () => {
    const navigate = useNavigate();
    const sectionRef = useRef(null);
    const imageRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse',
            }
        });

        tl.fromTo(imageRef.current,
            { x: -100, opacity: 0 },
            { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
        )
            .fromTo(textRef.current.children,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: 'power3.out' },
                '-=0.8'
            );
    }, []);

    return (
        <div className="artist-page">
            <section className="about-artist-section" ref={sectionRef}>
                <div className="container">
                    <button className="back-btn-prof artist-back" onClick={() => navigate('/art')}>
                        <div className="arrow-circle">
                            <IoArrowBack />
                        </div>
                    </button>
                    <div className="artist-grid">
                        <div className="artist-image-container" ref={imageRef}>
                            <div className="artist-profile-img-wrapper">
                                <img src={artistImg} alt="Artist" className="artist-profile-img" />
                                <div className="image-overlay"></div>
                                <div className="artist-name-overlay">
                                    <span className="overlay-firstname">Artist</span>
                                    <span className="overlay-lastname">Ajidhas</span>
                                </div>
                            </div>
                        </div>
                        <div className="artist-details" ref={textRef}>
                            <span className="section-label">Visionary Creator</span>
                            <h2 className="section-title">About Artist</h2>
                            <h3 className="artist-name">Ajidhas</h3>
                            <p className="artist-bio">
                                Jeeshnu Ajidhas is an emerging artist with a deep-seated passion for art, which is vividly reflected in his work. His creations are not merely visual experiences but emotional expressions, capturing intricate feelings through his adept use of rich tones. He imbues his subjects with a striking physical presence, making his art both captivating and impactful.
                            </p>
                            <p className="artist-philosophy">
                                "My art is an extension of my architectural practice—a search for balance in a
                                world of chaos. Every stroke and every line is a step towards understanding the
                                essence of our surroundings."
                            </p>
                            <div className="artist-stats">
                                <div className="stat-item">
                                    <span className="stat-number">10+</span>
                                    <span className="stat-label">Exhibitions</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number">50+</span>
                                    <span className="stat-label">Artworks</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-number"></span>
                                    <span className="stat-label"></span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Artist;
