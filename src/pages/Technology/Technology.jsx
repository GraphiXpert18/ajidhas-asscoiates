import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { gsap } from 'gsap';
import { IoArrowBack, IoArrowForward, IoArrowBack as IoArrowLeft, IoClose } from 'react-icons/io5';
import './Technology.css';

import buildingNight from '../../assets/building_night.png';

const techItems = [
    {
        id: 1,
        title: "Notes on Vision",
        subtitle: "12 Images",
        image: buildingNight,
        description: "Exploring the boundaries of visual perception through architectural lens. A study in light, shadow, and form.",
        year: "2024",
        location: "Berlin",
        subdivisions: ["01. Light Analysis", "02. Shadow Mapping", "03. Form Studies", "04. Perception"]
    },
    {
        id: 2,
        title: "Undesignated",
        subtitle: "09 Images",
        image: buildingNight,
        description: "Spaces that defy traditional categorization. Fluid environments designed for adaptability and change.",
        year: "2023",
        location: "Tokyo",
        subdivisions: ["01. Fluid Spaces", "02. Adaptive Walls", "03. Kinetic Structures", "04. User Flow"]
    },
    {
        id: 3,
        title: "Florence",
        subtitle: "20 Images",
        image: buildingNight,
        description: "A modern reinterpretation of classical Renaissance principles. Harmony, proportion, and beauty in the digital age.",
        year: "2025",
        location: "Florence",
        subdivisions: ["01. Classical Ratio", "02. Digital Stone", "03. Renaissance AI", "04. Harmony"]
    },
    {
        id: 4,
        title: "Coherence",
        subtitle: "15 Images",
        image: buildingNight,
        description: "Finding unity in chaos. Structural integrity meets organic growth patterns.",
        year: "2024",
        location: "New York",
        subdivisions: ["01. Chaos Theory", "02. Organic Grid", "03. Structural Integrity", "04. Unity"]
    },
    {
        id: 5,
        title: "Urban Flux",
        subtitle: "18 Images",
        image: buildingNight,
        description: "Capturing the dynamic energy of metropolitan life. Architecture as a living, breathing entity.",
        year: "2023",
        location: "London",
        subdivisions: ["01. City Pulse", "02. Dynamic Facades", "03. Living Walls", "04. Energy Flow"]
    },
    {
        id: 6,
        title: "Silent Spaces",
        subtitle: "10 Images",
        image: buildingNight,
        description: "Minimalist sanctuaries designed for reflection and peace. The architecture of silence.",
        year: "2025",
        location: "Kyoto",
        subdivisions: ["01. Acoustic Dampening", "02. Visual Silence", "03. Zen Gardens", "04. Reflection"]
    }
];

const Technology = () => {
    const navigate = useNavigate();
    const scrollRef = useRef(null);
    const [selectedItem, setSelectedItem] = useState(null);
    const [isPaused, setIsPaused] = useState(false);

    // Auto-scroll removed as per user request
    /*
    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (!scrollContainer) return;

        let animationFrameId;

        const autoScroll = () => {
            if (!isPaused) {
                scrollContainer.scrollLeft += 1; // Adjust speed here
                // Reset to start if reached end (for infinite loop effect, requires duplicated items or logic)
                // For simple auto-scroll that stops at end:
                if (scrollContainer.scrollLeft >= scrollContainer.scrollWidth - scrollContainer.clientWidth) {
                    scrollContainer.scrollLeft = 0; // Loop back to start
                }
            }
            animationFrameId = requestAnimationFrame(autoScroll);
        };

        animationFrameId = requestAnimationFrame(autoScroll);

        return () => cancelAnimationFrame(animationFrameId);
    }, [isPaused]);
    */

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = 340; // card width + gap
            if (direction === 'left') {
                current.scrollLeft -= scrollAmount;
            } else {
                current.scrollLeft += scrollAmount;
            }
        }
    };

    const openModal = (item) => {
        setSelectedItem(item);
    };

    const closeModal = () => {
        setSelectedItem(null);
    };

    return (
        <div className="technology-container">


            <div
                className="tech-gallery-wrapper"
                ref={scrollRef}
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                {/* Duplicate items for smoother looping illusion if needed, but simple loop for now */}
                {[...techItems, ...techItems].map((item, index) => (
                    <div
                        key={`${item.id}-${index}`}
                        className="tech-card"
                        onClick={() => openModal(item)}
                    >
                        <div className="tech-image-container">
                            <img src={item.image} alt={item.title} />
                            <div className="tech-hover-overlay">
                                <h3 className="tech-hover-title">{item.title}</h3>
                                <div className="tech-subdivisions">
                                    {item.subdivisions.map((sub, i) => (
                                        <p key={i} className="tech-sub-item">{sub}</p>
                                    ))}
                                </div>
                            </div>
                        </div>
                        <div className="tech-info">
                            <h3 className="tech-card-title">{item.title}</h3>
                            <p className="tech-card-subtitle">{item.subtitle}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="tech-footer">
                <div className="tech-title-group">

                    <h2 className="tech-section-title">TECHNOLOGY</h2>
                </div>

            </div>

            {/* Detail Modal */}
            <div className={`tech-modal-overlay ${selectedItem ? 'open' : ''}`}>
                {selectedItem && (
                    <div className="tech-modal-content">
                        <button className="tech-modal-close" onClick={closeModal}>
                            <IoClose />
                        </button>
                        <div className="tech-modal-image">
                            <img src={selectedItem.image} alt={selectedItem.title} />
                        </div>
                        <div className="tech-modal-info">
                            <h2 className="tech-modal-title">{selectedItem.title}</h2>
                            <p className="tech-modal-desc">{selectedItem.description}</p>

                            <div className="tech-modal-meta">
                                <div className="meta-item">
                                    <h4>Year</h4>
                                    <p>{selectedItem.year}</p>
                                </div>
                                <div className="meta-item">
                                    <h4>Location</h4>
                                    <p>{selectedItem.location}</p>
                                </div>
                                <div className="meta-item">
                                    <h4>Images</h4>
                                    <p>{selectedItem.subtitle}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Technology;
