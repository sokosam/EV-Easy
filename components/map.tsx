'use client'
import React, { useState, useEffect } from 'react';

// Import the regions array from the TypeScript file
import regions from './regions.json';

type Region = {
    id: string;
    pathdata: string;
    density: number;
  };
// Define the type for the opacity state
type OpacityState = Record<string, number>;

const DynamicOpacityMap: React.FC = () => {
  const [opacities, setOpacities] = useState<OpacityState>({});

  // Initialize opacities for all regions
  useEffect(() => {
    const initialOpacities: OpacityState = {};
    regions.forEach((region: Region) => {
      initialOpacities[region.id] = 1; // Default opacity
    });
    setOpacities(initialOpacities);

    // Set up interval to update opacities randomly
    const interval = setInterval(() => {
      setOpacities((prev) => {
        const newOpacities = { ...prev };
        regions.forEach((region: Region) => {
          newOpacities[region.id] = newOpacities[region.id] != region.density ? region.density : 0.1 // Random opacity between 0 and 1
        });
        return newOpacities;
      });
    }, 3000 + Math.random()*3000); // Update every 5 second

    return () => clearInterval(interval);
  }, []);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="2289"
      height="1744"
      viewBox="0 0 2289 1744"
    >
      <g fill="#d3d3d3">
        {regions.map((region: Region) => (
          <path
            key={region.id}
            id={region.id}
            d={region.pathdata}
            style={{
              opacity: opacities[region.id],
              transition: 'opacity 3s',
              fill: 'green',
            }}
          />
        ))}
      </g>
    </svg>
  );
};

export default DynamicOpacityMap;
