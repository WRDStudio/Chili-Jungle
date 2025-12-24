import React from 'react';

export const Logo: React.FC<{ lightMode?: boolean; className?: string; variant?: string }> = ({ lightMode, className }) => {
  const color = lightMode ? "#FFF5E1" : "#1F4E33";
  return (
    <div className={`w-full ${className}`}>
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg">
        <text x="50%" y="80" textAnchor="middle" fontSize="60" fontWeight="bold" fill={color} fontFamily="Oswald, sans-serif">CHILI</text>
        <text x="50%" y="140" textAnchor="middle" fontSize="60" fontWeight="bold" fill={color} fontFamily="Oswald, sans-serif">JUNGLE</text>
      </svg>
    </div>
  );
};