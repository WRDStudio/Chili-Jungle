import React from 'react';

export const Logo: React.FC<{ lightMode?: boolean; className?: string; variant?: string; useTransparent?: boolean }> = ({ lightMode, className, useTransparent }) => {
  return (
    <div className={`${className}`}>
      <img
        src="/images/logo_main.png.webp"
        alt="Chili Jungle"
        className="w-full h-full object-contain"
      />
    </div>
  );
};