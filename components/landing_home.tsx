'use client'
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import DynamicOpacityMap from './map';

interface Position {
  x: number;
  y: number;
}

const Landing: React.FC = () => {
  const [pan, setPan] = useState({ x: 0, y: 0 });

  // Constants
  const PAN_THRESHOLD = 200; // Pixels from the edge to start panning
  const PAN_AMOUNT = 50; // Maximum pan distance

  const handleMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { innerWidth, innerHeight } = window;

    let panX = 0;
    let panY = 0;

    // Horizontal panning
    if (clientX < PAN_THRESHOLD) {
      panX = ((PAN_THRESHOLD - clientX) / PAN_THRESHOLD) * PAN_AMOUNT;
    } else if (clientX > innerWidth - PAN_THRESHOLD) {
      panX = -((clientX - (innerWidth - PAN_THRESHOLD)) / PAN_THRESHOLD) * PAN_AMOUNT;
    }

    // Vertical panning
    if (clientY < PAN_THRESHOLD) {
      panY = ((PAN_THRESHOLD - clientY) / PAN_THRESHOLD) * PAN_AMOUNT;
    } else if (clientY > innerHeight - PAN_THRESHOLD) {
      panY = -((clientY - (innerHeight - PAN_THRESHOLD)) / PAN_THRESHOLD) * PAN_AMOUNT;
    }

    setPan({ x: panX, y: panY });
  };

  useEffect(() => {
    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className='fixed scale-150 min-w-full h-auto justify-start align-start overflow-hidden overscroll-contain -top-full -left-1/2'>
      <DynamicOpacityMap />
        
      </div>
  );
};

export default Landing;