import React, { createContext, useContext, useState, ReactNode } from 'react';
import { RitualMode, RitualTheme } from '../types';

interface RitualContextType {
  mode: RitualMode;
  setMode: (mode: RitualMode) => void;
  theme: RitualTheme;
}

const RitualContext = createContext<RitualContextType | undefined>(undefined);

export const themes: Record<RitualMode, RitualTheme> = {
  luxe: {
    name: "Mono-Luxe",
    bg: "bg-ink",
    text: "text-cream",
    accent: "text-mango",
    border: "border-mango/30",
    button: "bg-mango hover:bg-flame",
    buttonText: "text-ink"
  },
  classic: {
    name: "Clásico Rojo",
    bg: "bg-cream",
    text: "text-ink",
    accent: "text-chili",
    border: "border-chili/20",
    button: "bg-chili hover:bg-flame",
    buttonText: "text-cream"
  },
  tropical: {
    name: "Tropical Marfil",
    bg: "bg-cream",
    text: "text-jungle",
    accent: "text-mango",
    border: "border-mango/30",
    button: "bg-jungle hover:bg-green-800",
    buttonText: "text-cream"
  }
};

export const RitualProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<RitualMode>('classic');

  return (
    <RitualContext.Provider value={{ mode, setMode, theme: themes[mode] }}>
      {children}
    </RitualContext.Provider>
  );
};

export const useRitual = () => {
  const context = useContext(RitualContext);
  if (!context) throw new Error('useRitual must be used within a RitualProvider');
  return context;
};