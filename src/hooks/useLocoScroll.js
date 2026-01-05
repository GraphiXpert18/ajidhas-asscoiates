import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const useLocoScroll = (start = true) => {
    const location = useLocation();

    useEffect(() => {
        if (!start) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            orientation: 'vertical',
            gestureOrientation: 'vertical',
            smoothWheel: true,
            wheelMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        // Sync ScrollTrigger with Lenis
        lenis.on('scroll', ScrollTrigger.update);

        const raf = (time) => {
            lenis.raf(time);
            requestAnimationFrame(raf);
        };
        requestAnimationFrame(raf);

        // Re-sync on route change
        lenis.scrollTo(0, { immediate: true });

        // Handle resize
        const handleResize = () => {
            lenis.resize();
        };
        window.addEventListener('resize', handleResize);

        return () => {
            lenis.destroy();
            window.removeEventListener('resize', handleResize);
        };
    }, [start, location.pathname]);
};

export default useLocoScroll;
