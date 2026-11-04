import { useEffect } from 'react';

/**
 * Custom hook providing Animate On Scroll (AOS) equivalent behavior in React.
 * Uses IntersectionObserver to trigger entry animations on elements with data-aos attributes.
 */
export function useAOS() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>('[data-aos]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('aos-animate');
          } else {
            // Mirrors mirror: true from original script.js
            entry.target.classList.remove('aos-animate');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    elements.forEach((el) => observer.observe(el));

    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);
}
