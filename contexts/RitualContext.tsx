import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RitualMode, RitualTheme } from '../types';

interface RitualContextType {
  mode: RitualMode;
  setMode: (mode: RitualMode) => void;
  cycleMode: () => void;
  theme: RitualTheme;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

const trans = "transition-colors duration-700 ease-in-out";

export const themes: Record<RitualMode, RitualTheme> = {
  luxe: {
    name: "Mono-Luxe",
    bg: `bg-ink ${trans}`,
    text: `text-cream ${trans}`,
    accent: `text-mango ${trans}`,
    border: `border-mango/30 transition-colors duration-700 ease-in-out`,
    button: `bg-mango hover:bg-flame ${trans}`,
    buttonText: `text-ink ${trans}`
  },
  classic: {
    name: "Clásico",
    bg: `bg-gradient-to-br from-[#E5812A] to-[#C7432A] ${trans}`,
    text: `text-cream ${trans}`,
    accent: `text-mango ${trans}`,
    border: `border-cream/20 transition-colors duration-700 ease-in-out`,
    button: `bg-cream hover:bg-white ${trans}`,
    buttonText: `text-chili ${trans}`
  },
  tropical: {
    name: "Tropical",
    bg: `bg-cream ${trans}`,
    text: `text-jungle ${trans}`,
    accent: `text-flame ${trans}`,
    border: `border-jungle/10 transition-colors duration-700 ease-in-out`,
    button: `bg-jungle hover:bg-green-800 ${trans}`,
    buttonText: `text-cream ${trans}`
  }
};

export const RitualProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<RitualMode>('luxe');

  const cycleMode = () => {
    setMode(prev => {
      const modes: RitualMode[] = ['luxe', 'classic', 'tropical'];
      const nextIdx = (modes.indexOf(prev) + 1) % modes.length;
      return modes[nextIdx];
    });
  };

  return (
    <RitualContext.Provider value={{ mode, setMode, cycleMode, theme: themes[mode] }}>
      {children}
    </RitualContext.Provider>
  );
};

export const useRitual = () => {
  const context = useContext(RitualContext);
  if (!context) throw new Error('useRitual must be used within a RitualProvider');
  return context;
};