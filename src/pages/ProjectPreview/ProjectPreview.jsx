import React, { useEffect, useRef, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Navigation, Pagination } from 'swiper/modules';
import { IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { gsap } from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

import './ProjectPreview.css';

import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const projectImages = {
    1: [art1, art2, art3, art1, art2, art3],
    2: [art2, art3, art1, art2, art3, art1],
    3: [art3, art1, art2, art3, art1, art2],
    4: [art1, art2, art3, art1, art2, art3],
    5: [art2, art3, art1, art2, art3, art1],
    6: [art3, art1, art2, art3, art1, art2]
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
    const containerRef = useRef(null);
    const [activeIndex, setActiveIndex] = useState(0);

    useEffect(() => {
        window.scrollTo(0, 0);

        const tl = gsap.timeline();

        tl.fromTo('.preview-header-minimal',
            { y: -50, opacity: 0 },
            { y: 0, opacity: 1, duration: 1.2, ease: 'power4.out' }
        )
            .fromTo('.preview-swiper',
                { scale: 0.9, opacity: 0 },
                { scale: 1, opacity: 1, duration: 1.5, ease: 'expo.out' },
                '-=0.8'
            )
            .fromTo('.preview-footer-minimal',
                { y: 30, opacity: 0 },
                { y: 0, opacity: 1, duration: 1, ease: 'power3.out' },
                '-=1'
            );
    }, [id]);

    return (
        <div className="project-preview-page-3d" ref={containerRef}>
            {/* Dynamic Background */}
            <div className="preview-bg-glow"></div>

            <div className="preview-header-minimal">
                <button className="back-btn-prof" onClick={() => navigate('/art/gallery')}>
                    <div className="arrow-circle">
                        <IoArrowBack />
                    </div>
                </button>
                <div className="preview-title-minimal">
                    <span className="category-label">{project.category}</span>
                    <h2 className="project-title-main">{project.title}</h2>
                </div>
            </div>

            <div className="preview-carousel-wrapper">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    coverflowEffect={{
                        rotate: 5,
                        stretch: 0,
                        depth: 150,
                        modifier: 2,
                        slideShadows: false,
                    }}
                    autoplay={{
                        delay: 4000,
                        disableOnInteraction: false,
                    }}
                    onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
                    modules={[EffectCoverflow, Autoplay, Navigation, Pagination]}
                    className="preview-swiper"
                >
                    {images.map((img, index) => (
                        <SwiperSlide key={index}>
                            <div
                                className="preview-card-3d"
                                onClick={() => navigate(`/art/project/${id}`)}
                            >
                                <div className="preview-image-container">
                                    <img src={img} alt={`Preview ${index}`} />
                                    <div className="preview-card-overlay"></div>

                                    {/* Architectural Frame */}
                                    <div className="card-frame"></div>
                                </div>

                                <div className="hover-details-overlay">
                                    <div className="hover-content">
                                        <span className="hover-category">{project.category}</span>
                                        <h3 className="hover-title">{project.title}</h3>
                                        <div className="hover-divider"></div>
                                        <p className="hover-action">Explore Details</p>
                                    </div>
                                </div>

                                <div className="card-index">0{index + 1}</div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation */}
                <div className="preview-nav-controls">
                    <div className="nav-progress-bar">
                        <div
                            className="nav-progress-fill"
                            style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }}
                        ></div>
                    </div>
                </div>
            </div>

            <div className="preview-footer-minimal">
                <div className="footer-info">
                    <span className="scroll-text">Scroll to explore</span>
                    <div className="scroll-line-animated"></div>
                </div>
                <div className="project-year">{project.year} © Studio</div>
            </div>
        </div>
    );
};

export default ProjectPreview;
