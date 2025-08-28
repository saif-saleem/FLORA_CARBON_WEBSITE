import React, { useEffect, useState } from 'react';

const AnimatedCursor: React.FC = () => {
  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      document.documentElement.style.setProperty('--x', `${e.clientX}px`);
      document.documentElement.style.setProperty('--y', `${e.clientY}px`);
    };

    const addSpotlight = () => document.body.classList.add('spotlight-active');
    const removeSpotlight = () => document.body.classList.remove('spotlight-active');

    window.addEventListener('mousemove', updateMousePosition);
    document.documentElement.addEventListener('mouseenter', addSpotlight);
    document.documentElement.addEventListener('mouseleave', removeSpotlight);
    
    // Disable on touch devices
    const touchDevice = ('ontouchstart' in window);
    if(touchDevice) {
      document.body.classList.add('disable-spotlight');
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      document.documentElement.removeEventListener('mouseenter', addSpotlight);
      document.documentElement.removeEventListener('mouseleave', removeSpotlight);
    };
  }, []);

  return null;
};

export default AnimatedCursor;