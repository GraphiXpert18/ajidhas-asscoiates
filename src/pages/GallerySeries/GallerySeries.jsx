import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { IoPlayOutline, IoArrowBack, IoArrowForward } from 'react-icons/io5';
import { gsap } from 'gsap';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import './GallerySeries.css';

import art1 from '../../assets/art_1.png';
import art2 from '../../assets/art_2.png';
import art3 from '../../assets/art_3.png';

const backgroundImages = [art1, art2, art3];

const projects = [
    {
        id: 1,
        title: 'Hatha Yoga',
        subtitle: 'Balance • Energy • Calm',
        image: art1,
        category: 'Series 01'
    },
    {
        id: 2,
        title: 'Vinyasa Yoga',
        subtitle: 'Flow • Strength • Breath',
        image: art2,
        category: 'Series 02'
    },
    {
        id: 3,
        title: 'Ashtanga Yoga',
        subtitle: 'Power • Discipline • Focus',
        image: art3,
        category: 'Series 03'
    },
    {
        id: 4,
        title: 'Yin Yoga',
        subtitle: 'Deep • Still • Restore',
        image: art1,
        category: 'Series 04'
    },
    {
        id: 5,
        title: 'Kundalini Yoga',
        subtitle: 'Spirit • Awaken • Vitality',
        image: art2,
        category: 'Series 05'
    },
    {
        id: 6,
        title: 'Restorative Yoga',
        subtitle: 'Heal • Relax • Renew',
        image: art3,
        category: 'Series 06'
    }
];

const GallerySeries = () => {
    const navigate = useNavigate();
    const containerRef = useRef(null);
    const [currentBg, setCurrentBg] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentBg((prev) => (prev + 1) % backgroundImages.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        gsap.fromTo(containerRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: 'power2.out' }
        );
    }, []);

    return (
        <div className="gallery-series-3d" ref={containerRef}>
            <div className="gallery-background-slider">
                {backgroundImages.map((img, index) => (
                    <img
                        key={index}
                        src={img}
                        alt={`Background ${index}`}
                        className={`gallery-bg-slide ${index === currentBg ? 'active' : ''}`}
                    />
                ))}
                <div className="gallery-bg-overlay"></div>
            </div>

            <header className="gallery-3d-header">
                <button className="back-btn-prof" onClick={() => navigate('/art')}>
                    <div className="arrow-circle">
                        <IoArrowBack />
                    </div>
                </button>
                <span className="label">Artistic Series</span>
                <h1>Gallery Collection</h1>
            </header>

            <div className="swiper-container-wrapper">
                <Swiper
                    effect={'coverflow'}
                    grabCursor={true}
                    centeredSlides={true}
                    slidesPerView={'auto'}
                    loop={true}
                    coverflowEffect={{
                        rotate: 30,
                        stretch: 0,
                        depth: 200,
                        modifier: 1,
                        slideShadows: true,
                    }}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true
                    }}
                    pagination={{
                        clickable: true,
                        dynamicBullets: true
                    }}
                    navigation={{
                        nextEl: '.swiper-button-next-custom',
                        prevEl: '.swiper-button-prev-custom',
                    }}
                    modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
                    className="mySwiper"
                >
                    {projects.map((project) => (
                        <SwiperSlide key={project.id}>
                            <div
                                className="card-3d"
                                onClick={() => navigate(`/art/preview/${project.id}`)}
                            >
                                <div className="card-image-wrapper">
                                    <img src={project.image} alt={project.title} />
                                    <div className="card-overlay"></div>
                                </div>

                                <div className="card-content-top">
                                    <h2 className="card-title">{project.title}</h2>
                                    <p className="card-subtitle">{project.subtitle}</p>
                                </div>


                                <div className="card-footer">
                                    <span className="card-category">{project.category}</span>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <div className="swiper-button-prev-custom">
                    <div className="nav-icon-wrapper">
                        <IoArrowBack />
                    </div>
                    <div className="nav-line"></div>
                </div>
                <div className="swiper-button-next-custom">
                    <div className="nav-icon-wrapper">
                        <IoArrowForward />
                    </div>
                    <div className="nav-line"></div>
                </div>
            </div>

            <div className="scroll-hint">
                <p> explore the collection</p>
                <div className="drag-line"></div>
            </div>
        </div>
    );
};

export default GallerySeries;
