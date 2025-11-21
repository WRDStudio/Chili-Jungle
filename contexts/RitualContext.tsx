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
    bg: "bg-neutral-950",
    text: "text-neutral-200",
    accent: "text-luxe-gold",
    border: "border-luxe-gold/30",
    button: "bg-luxe-gold hover:bg-yellow-600",
    buttonText: "text-black"
  },
  classic: {
    name: "Clásico Rojo",
    bg: "bg-red-50",
    text: "text-gray-900",
    accent: "text-red-600",
    border: "border-red-200",
    button: "bg-red-600 hover:bg-red-700",
    buttonText: "text-white"
  },
  tropical: {
    name: "Tropical Marfil",
    bg: "bg-tropical-cream",
    text: "text-tropical-teal",
    accent: "text-tropical-mango",
    border: "border-tropical-mango/30",
    button: "bg-tropical-teal hover:bg-teal-800",
    buttonText: "text-white"
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
  if (!context) {
    throw new Error('useRitual must be used within a RitualProvider');
  }
  return context;
};