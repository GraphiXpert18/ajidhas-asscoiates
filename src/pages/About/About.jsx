import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import './About.css';

import team1 from '../../assets/team_1.png';
import team2 from '../../assets/team_2.png';
import team3 from '../../assets/team_3.png';
import team4 from '../../assets/team_4.png';

const teamMembers = [
    { id: 1, name: "Ajidhas", role: "Principal Architect", image: team1 },
    { id: 2, name: "Pradeep", role: "Creative Director", image: team2 },
    { id: 3, name: "Sarah Chen", role: "Lead Designer", image: team3 },
    { id: 4, name: "Marcus Vane", role: "Technical Lead", image: team4 },
    { id: 5, name: "Elena Rossi", role: "Art Consultant", image: team1 },
    { id: 6, name: "David Park", role: "Project Manager", image: team2 },
];

const About = () => {
    const teamTrackRef = useRef(null);

    useEffect(() => {
        const teamTrack = teamTrackRef.current;
        if (!teamTrack) return;

        // Clone items for seamless loop
        const totalWidth = teamTrack.scrollWidth / 2;

        const marquee = gsap.to(teamTrack, {
            x: -totalWidth,
            duration: 30,
            ease: "none",
            repeat: -1
        });

        // Pause on hover
        teamTrack.addEventListener('mouseenter', () => marquee.pause());
        teamTrack.addEventListener('mouseleave', () => marquee.play());

        return () => {
            marquee.kill();
        };
    }, []);

    return (
        <div className="about-container">

            <section className="about-team-section">
                <div className="team-header">
                    <h2 className="team-section-title">Our Team</h2>
                    <div className="team-line"></div>
                </div>

                <div className="team-marquee-container">
                    <div className="team-track" ref={teamTrackRef}>
                        {[...teamMembers, ...teamMembers].map((member, index) => (
                            <div key={`${member.id}-${index}`} className="team-card">
                                <div className="team-image-container">
                                    <img src={member.image} alt={member.name} className="team-img" />
                                    <div className="team-hover-info">
                                        <h3 className="team-name">{member.name}</h3>
                                        <p className="team-role">{member.role}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
