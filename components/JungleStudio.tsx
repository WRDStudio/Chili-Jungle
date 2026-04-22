import React, { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Track } from '../types';
import { supabase } from '../lib/supabaseClient';

const ClassicPlayer = lazy(() => import('./players/ClassicPlayer').then(m => ({ default: m.ClassicPlayer })));
const LuxePlayer    = lazy(() => import('./players/LuxePlayer').then(m => ({ default: m.LuxePlayer })));
const TropicalPlayer = lazy(() => import('./players/TropicalPlayer').then(m => ({ default: m.TropicalPlayer })));


const THEME_METADATA: Record<'classic' | 'luxe' | 'tropical', Partial<Track>> = {
  luxe: {
    artist: 'Midnight Series',
    cover_url: '/covers/luxe.png',
    theme: 'luxe'
  },
  classic: {
    artist: 'Jungle Studio Collective',
    cover_url: '/covers/classic.png',
    theme: 'classic'
  },
  tropical: {
    artist: 'Ritmo del Sol',
    cover_url: '/covers/tropical.png',
    theme: 'tropical'
  }
};

const BUCKET_NAME = 'Jungle Studio';
const THEME_FOLDERS = ['LUXE', 'CLASSIC', 'TROPICAL'];

type PlaylistState = {
  activeTheme: 'luxe' | 'classic' | 'tropical' | null;
  activeIndex: number;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
};

export const JungleStudio: React.FC = () => {
  const [playlists, setPlaylists] = useState<Record<string, Track[]>>({
    luxe: [{ ...THEME_METADATA.luxe, id: 'luxemock', title: 'Ritual Nocturno', audio_url: 'https://actions.google.com/sounds/v1/water/rain_on_roof.ogg', duration: '5:30' } as Track],
    classic: [{ ...THEME_METADATA.classic, id: 'classicmock', title: 'Esencia del Sol', audio_url: 'https://actions.google.com/sounds/v1/weather/thunder_crack.ogg', duration: '4:12' } as Track],
    tropical: [{ ...THEME_METADATA.tropical, id: 'tropicalmock', title: 'Brisa de Selva', audio_url: 'https://actions.google.com/sounds/v1/foley/walking_in_tall_grass.ogg', duration: '4:15' } as Track]
  });
  
  const [playerState, setPlayerState] = useState<PlaylistState>({
    activeTheme: null,
    activeIndex: 0,
    isPlaying: false,
    currentTime: 0,
    duration: 0
  });
  
  // Track specific positions per playlist so they remember where they were paused
  const [themeIndices, setThemeIndices] = useState<Record<string, number>>({
    luxe: 0,
    classic: 0,
    tropical: 0
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    async function fetchBucketTracks() {
      if (!supabase) return;

      const loadedPlaylists: Record<string, Track[]> = { luxe: [], classic: [], tropical: [] };
      let updatedAny = false;

      for (const folder of THEME_FOLDERS) {
        try {
          const { data, error } = await supabase.storage.from(BUCKET_NAME).list(folder, {
            limit: 100,
            offset: 0,
            sortBy: { column: 'name', order: 'asc' },
          });

          if (!error && data && data.length > 0) {
            const themeKey = folder.toLowerCase() as 'luxe' | 'classic' | 'tropical';
            
            // Filter audio files only
            const audioFiles = data.filter(f => f.name.endsWith('.m4a') || f.name.endsWith('.mp3') || f.name.endsWith('.ogg'));
            
            if (audioFiles.length > 0) {
              updatedAny = true;
              loadedPlaylists[themeKey] = audioFiles.map(file => {
                // Parse clean title out of filename
                let cleanTitle = file.name.replace(/\.[^/.]+$/, ""); // Strip extension
                cleanTitle = cleanTitle.replace(/^\d+_/, '').trim(); // Strip leading sequence like 001_
                
                const audioUrl = supabase.storage.from(BUCKET_NAME).getPublicUrl(`${folder}/${file.name}`).data.publicUrl;

                return {
                  id: file.id || file.name,
                  title: cleanTitle,
                  artist: THEME_METADATA[themeKey].artist!,
                  duration: '--:--', // dynamic duration tracking would require reading streams
                  cover_url: THEME_METADATA[themeKey].cover_url!,
                  audio_url: audioUrl,
                  theme: themeKey
                };
              });
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch from ${folder}`);
        }
      }

      if (updatedAny) {
        setPlaylists(prev => ({
          ...prev,
          ...Object.fromEntries(Object.entries(loadedPlaylists).filter(([_, arr]) => arr.length > 0))
        }));
      }
    }
    
    fetchBucketTracks();
  }, []);

  // Parse Share URLs
  useEffect(() => {
    if (!playlists.luxe.length && !playlists.classic.length && !playlists.tropical.length) return;

    const params = new URLSearchParams(window.location.search);
    const targetTheme = params.get('theme') as 'luxe' | 'classic' | 'tropical' | null;
    const targetTrack = params.get('track');

    if (targetTheme && targetTrack && playlists[targetTheme]) {
      const idx = playlists[targetTheme].findIndex(t => t.title.replace(/\s+/g, '-') === targetTrack);
      if (idx !== -1) {
        window.history.replaceState({}, document.title, window.location.pathname);
        setListIndex(targetTheme, idx);
        setPlayerState(prev => ({
          ...prev,
          activeTheme: targetTheme,
          activeIndex: idx,
          isPlaying: true
        }));
      }
    }
  }, [playlists]);

  // Global Audio Manager
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      
      audioRef.current.ontimeupdate = () => {
        setPlayerState(prev => ({
          ...prev,
          currentTime: audioRef.current?.currentTime || 0
        }));
      };
      
      audioRef.current.onloadedmetadata = () => {
        setPlayerState(prev => ({
          ...prev,
          duration: audioRef.current?.duration || 0
        }));
      };
    }
    return () => {
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [playlists]);

  // Sync Audio source when state changes
  useEffect(() => {
    if (playerState.activeTheme === null || !audioRef.current) return;
    
    const activeList = playlists[playerState.activeTheme];
    if (!activeList || activeList.length === 0) return;
    
    const track = activeList[playerState.activeIndex];
    if (!track) return;

    // Attach fresh auto-advance loop with non-stale state
    audioRef.current.onended = () => {
      const list = playlists[playerState.activeTheme!];
      const nextIndex = (playerState.activeIndex + 1) % list.length;
      setListIndex(playerState.activeTheme!, nextIndex);
    };

    if (audioRef.current.src !== track.audio_url) {
      audioRef.current.pause();
      audioRef.current.src = track.audio_url || '';
    }

    if (playerState.isPlaying) {
      audioRef.current.play().catch(console.error);
    } else {
      audioRef.current.pause();
    }
  }, [playerState.activeTheme, playerState.activeIndex, playerState.isPlaying, playlists]);

  const setListIndex = (theme: string, index: number) => {
    setThemeIndices(prev => ({ ...prev, [theme]: index }));
    if (playerState.activeTheme === theme) {
      setPlayerState(prev => ({ ...prev, activeIndex: index, isPlaying: true }));
    }
  };

  const handlePlayToggle = (theme: 'luxe' | 'classic' | 'tropical') => {
    if (playerState.activeTheme === theme) {
      // Toggle current
      setPlayerState(prev => ({ ...prev, isPlaying: !prev.isPlaying }));
    } else {
      // Switch active playlist
      setPlayerState(prev => ({
        ...prev,
        activeTheme: theme,
        activeIndex: themeIndices[theme],
        isPlaying: true
      }));
    }
  };

  const handleNext = (targetTheme?: 'luxe' | 'classic' | 'tropical') => {
    const theme = targetTheme || playerState.activeTheme;
    if (!theme) return;
    const list = playlists[theme];
    if (!list.length) return;
    
    const currentIndex = theme === playerState.activeTheme ? playerState.activeIndex : themeIndices[theme];
    const nextIndex = (currentIndex + 1) % list.length;
    
    setListIndex(theme, nextIndex);
  };

  const handlePrev = (targetTheme?: 'luxe' | 'classic' | 'tropical') => {
    const theme = targetTheme || playerState.activeTheme;
    if (!theme) return;
    const list = playlists[theme];
    if (!list.length) return;
    
    const currentIndex = theme === playerState.activeTheme ? playerState.activeIndex : themeIndices[theme];
    const prevIndex = currentIndex === 0 ? list.length - 1 : currentIndex - 1;
    
    setListIndex(theme, prevIndex);
  };

  const handleShuffle = (targetTheme: 'luxe' | 'classic' | 'tropical') => {
    const list = playlists[targetTheme];
    if (!list.length) return;
    const randomIdx = Math.floor(Math.random() * list.length);
    setListIndex(targetTheme, randomIdx);
  };

  return (
    <section id="studio" className="py-24 px-4 bg-ink text-cream border-t border-white/10 scroll-mt-20 md:scroll-mt-28 lg:scroll-mt-36">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center border-b border-white/10 pb-12 mb-16">
        <div>
          <h2 className="text-6xl md:text-7xl font-display uppercase tracking-tighter mb-4">Jungle Studio</h2>
          <p className="font-serif italic text-2xl md:text-3xl lg:text-4xl opacity-70">Salsas que suenan bien.</p>
        </div>
        <div className="mt-8 md:mt-0 text-right max-w-sm">
          <p className="text-white/60 text-sm tracking-wide leading-relaxed">
            <span className="block text-white/80 font-semibold mb-1">Nuestros Ritmos Curados</span>
            Experimenta con nuestra colección original de música especialmente diseñada para cada momento del día.
            <span className="block mt-2 text-white/40 text-xs tracking-widest uppercase">LO-FI · Trip-Hop · House · Música del mundo</span>
          </p>
        </div>
      </div>
      
      <Suspense fallback={
        <div className="flex items-center justify-center py-24">
          <div className="w-10 h-10 rounded-full border-2 border-white/20 border-t-white/80 animate-spin" />
        </div>
      }>
        <div className="max-w-7xl mx-auto flex flex-col gap-12 items-center">
          {playlists.luxe.length > 0 && (
            <LuxePlayer 
              track={playlists.luxe[playerState.activeTheme === 'luxe' ? playerState.activeIndex : themeIndices.luxe]} 
              isPlaying={playerState.activeTheme === 'luxe' && playerState.isPlaying}
              currentTime={playerState.activeTheme === 'luxe' ? playerState.currentTime : 0}
              duration={playerState.activeTheme === 'luxe' ? playerState.duration : 1}
              onPlayToggle={() => handlePlayToggle('luxe')}
              onNext={() => handleNext('luxe')}
              onPrev={() => handlePrev('luxe')}
              onShuffle={() => handleShuffle('luxe')}
            />
          )}
          
          {playlists.classic.length > 0 && (
            <ClassicPlayer 
              track={playlists.classic[playerState.activeTheme === 'classic' ? playerState.activeIndex : themeIndices.classic]} 
              isPlaying={playerState.activeTheme === 'classic' && playerState.isPlaying}
              currentTime={playerState.activeTheme === 'classic' ? playerState.currentTime : 0}
              duration={playerState.activeTheme === 'classic' ? playerState.duration : 1}
              onPlayToggle={() => handlePlayToggle('classic')}
              onNext={() => handleNext('classic')}
              onPrev={() => handlePrev('classic')}
              onShuffle={() => handleShuffle('classic')}
            />
          )}
          
          {playlists.tropical.length > 0 && (
            <TropicalPlayer 
              track={playlists.tropical[playerState.activeTheme === 'tropical' ? playerState.activeIndex : themeIndices.tropical]} 
              isPlaying={playerState.activeTheme === 'tropical' && playerState.isPlaying}
              currentTime={playerState.activeTheme === 'tropical' ? playerState.currentTime : 0}
              duration={playerState.activeTheme === 'tropical' ? playerState.duration : 1}
              onPlayToggle={() => handlePlayToggle('tropical')}
              onNext={() => handleNext('tropical')}
              onPrev={() => handlePrev('tropical')}
              onShuffle={() => handleShuffle('tropical')}
            />
          )}
        </div>
      </Suspense>
    </section>
  );
};