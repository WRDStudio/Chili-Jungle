
import React from 'react';

interface LogoProps {
  variant?: 'full' | 'simple';
  className?: string;
  lightMode?: boolean; // If true, forces monochrome (for footer). If false, uses Brand Colors.
}

export const Logo: React.FC<LogoProps> = ({ variant = 'full', className = "", lightMode = false }) => {
  
  // Official Brand Colors
  const cJungle = "#1F4E33"; 
  const cChili = "#C7432A";  
  const cFlame = "#E5812A"; 
  const cCream = "#FFF5E1";
  const cBrown = "#8B4513"; 

  // Color Assignment
  // If lightMode is true (footer/dark overlay), use Cream for everything.
  // Otherwise, use the Official Logo Colors.
  const colorText = lightMode ? cCream : cJungle;
  const colorPepper = lightMode ? cCream : cChili;
  const colorFlame = lightMode ? cCream : cFlame;
  const colorPalms = lightMode ? cCream : cJungle;
  const colorTagline = lightMode ? cCream : cBrown;
  
  // Stroke Logic:
  // On the real labels, the Green text needs a light outline to pop against the Red background.
  // We add a small cream stroke to the text when in full color mode.
  const textStroke = lightMode ? "none" : cCream;
  const textStrokeWidth = lightMode ? "0" : "3";

  return (
    <div className={`relative inline-block select-none ${className}`}>
      <svg viewBox="0 0 300 180" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
        
        {/* FLAMES (Background Layer) */}
        <path d="M180 100 Q 200 70 190 50 Q 210 60 220 30 Q 230 70 210 90" fill={colorFlame} />
        <path d="M160 110 Q 150 80 165 60" fill={colorFlame} opacity="0.9" />
        <path d="M140 100 Q 130 70 145 50" fill={colorFlame} opacity="0.8" />

        {/* PALM TREES (Middle Layer) */}
        <g>
          {/* Left Palm */}
          <path d="M100 100 Q 90 60 70 70" stroke={colorPalms} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M70 70 Q 50 75 60 85" stroke={colorPalms} strokeWidth="4" strokeLinecap="round" />
          <path d="M70 70 Q 60 50 80 60" stroke={colorPalms} strokeWidth="4" strokeLinecap="round" />
          
          {/* Center/Right Palm */}
          <path d="M140 100 Q 150 40 170 50" stroke={colorPalms} strokeWidth="5" fill="none" strokeLinecap="round" />
          <path d="M170 50 Q 180 30 160 40" stroke={colorPalms} strokeWidth="4" strokeLinecap="round" />
          <path d="M170 50 Q 190 40 180 60" stroke={colorPalms} strokeWidth="4" strokeLinecap="round" />
          <path d="M170 50 Q 150 30 140 45" stroke={colorPalms} strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* CHILI PEPPER (Main Icon) */}
        <g transform="rotate(-10, 150, 90)">
           {/* Stem */}
           <path d="M215 55 Q 220 45 230 40" stroke={cJungle} strokeWidth="6" strokeLinecap="round" />
           
           {/* Body Outline (Cream stroke to pop against flames if needed) */}
           {!lightMode && <path d="M215 55 C 235 80, 220 130, 120 140 C 100 142, 80 135, 75 130 C 110 125, 160 120, 215 55 Z" stroke={cCream} strokeWidth="3" fill="none" />}
           
           {/* Body Fill */}
           <path d="M215 55 C 235 80, 220 130, 120 140 C 100 142, 80 135, 75 130 C 110 125, 160 120, 215 55 Z" fill={colorPepper} />
           
           {/* Shine */}
           <path d="M180 80 Q 200 90 190 110" stroke={cCream} strokeWidth="3" strokeLinecap="round" opacity="0.5" />
        </g>

        {/* TYPOGRAPHY */}
        <g style={{ fontFamily: 'Oswald, sans-serif', fontWeight: 'bold' }}>
          {/* "CHILI" */}
          <text 
            x="35" y="95" 
            fontSize="62" 
            fill={colorText} 
            stroke={textStroke} 
            strokeWidth={textStrokeWidth}
            strokeLinejoin="round"
            transform="rotate(-5, 40, 95)" 
            style={{ paintOrder: 'stroke' }}
          >
            CHILI
          </text>
          
          {/* "JUNGLE" */}
          <text 
            x="85" y="145" 
            fontSize="62" 
            fill={colorText} 
            stroke={textStroke} 
            strokeWidth={textStrokeWidth}
            strokeLinejoin="round"
            transform="rotate(-2, 90, 145)" 
            style={{ paintOrder: 'stroke' }}
          >
            JUNGLE
          </text>

          {/* "SPICE FROM PARADISE" - Tagline */}
          {variant === 'full' && (
             <text 
               x="95" y="170" 
               fontSize="16" 
               fill={colorTagline} 
               letterSpacing="0.5" 
               fontWeight="700" 
               transform="rotate(-2, 100, 170)"
               stroke={lightMode ? "none" : cCream}
               strokeWidth={lightMode ? "0" : "2"}
               style={{ paintOrder: 'stroke' }}
             >
               SPICE FROM PARADISE
             </text>
          )}
        </g>
      </svg>
    </div>
  );
};
