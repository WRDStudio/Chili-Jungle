import React from 'react';
import { Track } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { ThumbsUp, ListMusic, Share2, Shuffle, Repeat, SkipBack, Play, Pause, SkipForward } from 'lucide-react';
interface LuxePlayerProps {
  track: Track | null;
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  onPlayToggle: () => void;
  onNext: () => void;
  onPrev: () => void;
  onShuffle: () => void;
}

const formatTime = (time: number) => {
  if (!time || isNaN(time)) return '00:00';
  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const LuxePlayer: React.FC<LuxePlayerProps> = ({ track, isPlaying, currentTime, duration, onPlayToggle, onNext, onPrev, onShuffle }) => {
  if (!track) return null;
  
  const coverUrl = track?.cover_url || '';
  const progressPercent = duration > 0 ? (currentTime / duration) * 100 : 0;
  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}${window.location.pathname}?theme=${track.theme}&track=${track.title.replace(/\s+/g, '-')}`);
    alert('Copied specific track link to clipboard!');
  };

  const handleLike = async () => {
    try {
      await supabase.rpc('increment_like', { track_title: track.title });
      alert('Track Liked!');
    } catch (e) {
      console.warn('Like tracking requires Supabase track_likes schema migration');
    }
  };
  return (
    <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden relative shadow-[0_40px_100px_rgba(0,0,0,0.9)] flex flex-col md:flex-row items-stretch min-h-[280px] border border-[#F5F5DC]/20" style={{
        backgroundColor: '#0A0A0A',
        backgroundImage: `radial-gradient(circle at 50% 50%, rgba(20, 20, 20, 0.8) 0%, rgba(5, 5, 5, 1) 100%), url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23F5F5DC' fill-opacity='0.03' fill-rule='evenodd'%3E%3Cpath d='M0 40L40 0H20L0 20M40 40V20L20 40'/%3E%3C/g%3E%3C/svg%3E")`,
        backgroundAttachment: 'fixed',
      }}>
      
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'linear-gradient(180deg, rgba(245, 245, 220, 0.03) 0%, rgba(0, 0, 0, 0) 100%)' }}></div>
      
      <div className="relative z-10 flex flex-col md:flex-row items-center w-full p-8 md:p-10 gap-8 md:gap-12">
        {/* Cover Art */}
        <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-[#F5F5DC]/20 group relative">
           <div className="absolute inset-0 opacity-10 blur-2xl group-hover:opacity-30 transition-opacity duration-700" style={{ background: 'linear-gradient(135deg, #F5F5DC 0%, #E1E1C8 100%)' }}></div>
           <img loading="lazy" className="w-full h-full object-cover relative z-10 group-hover:scale-105 transition-transform duration-700" alt={`${track.title} Cover`} src={coverUrl} />
        </div>

        {/* Info & Controls Wrapper */}
        <div className="flex-1 w-full flex flex-col justify-center gap-6">
          {/* Metadata */}
          <div className="mb-2 text-center md:text-left">
            <span className="font-serif italic text-lg block mb-1" style={{ color: 'rgba(245, 245, 220, 0.6)' }}>Luxe Selection</span>
            <h2 className="font-display text-4xl md:text-5xl leading-none uppercase tracking-tighter" style={{ color: '#F5F5DC', textShadow: '0 0 20px rgba(245, 245, 220, 0.3)'}}>{track.title}</h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2" style={{ color: 'rgba(245, 245, 220, 0.8)' }}>
              <span className="font-medium text-[10px] md:text-xs tracking-widest uppercase opacity-80">Música seleccionada para acompañar la cena</span>
            </div>
          </div>

          {/* Controls Wrapper */}
          <div className="w-full max-w-xl mx-auto md:mx-0">
            {/* Progress Bar */}
            <div className="group relative w-full h-1.5 bg-[#F5F5DC]/10 mb-8 rounded-full cursor-pointer">
              <div className="absolute left-0 top-0 h-full shadow-[0_0_15px_rgba(245,245,220,0.5)] rounded-full transition-all duration-300" style={{ background: 'linear-gradient(135deg, #F5F5DC 0%, #E1E1C8 100%)', width: `${progressPercent}%` }}></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 rounded-full transition-all shadow-lg" style={{ background: '#F5F5DC', left: `${progressPercent}%`, transform: 'translateY(-50%)' }}></div>
              <div className="absolute -bottom-6 left-0 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>{formatTime(currentTime)}</div>
              <div className="absolute -bottom-6 right-0 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(245, 245, 220, 0.5)' }}>{formatTime(duration)}</div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-6" style={{ color: '#F5F5DC' }}>
                <button onClick={onShuffle} className="opacity-60 hover:opacity-100 hover:drop-shadow-[0_0_10px_rgba(245,245,220,0.6)] transition-all"><Shuffle className="w-6 h-6" /></button>
                <button onClick={onPrev} className="opacity-80 hover:opacity-100 hover:scale-110 active:scale-90 hover:drop-shadow-[0_0_10px_rgba(245,245,220,0.6)] transition-all"><SkipBack className="w-8 h-8" /></button>
              </div>
              
              <button 
                onClick={onPlayToggle}
                className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(245,245,220,0.15)] hover:shadow-[0_0_40px_rgba(245,245,220,0.3)] hover:scale-105 active:scale-95 transition-all group" 
                style={{ backgroundColor: '#F5F5DC', color: '#0A0A0A' }}
              >
                {isPlaying ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 ml-2 fill-current" />}
              </button>
              
              <div className="flex items-center gap-6" style={{ color: '#F5F5DC' }}>
                <button onClick={onNext} className="opacity-80 hover:opacity-100 hover:scale-110 active:scale-90 hover:drop-shadow-[0_0_10px_rgba(245,245,220,0.6)] transition-all"><SkipForward className="w-8 h-8" /></button>
                <div className="flex items-center gap-4 ml-1">
                  <button onClick={handleLike} className="hover:opacity-100 hover:scale-110 active:scale-95 transition-all" style={{ color: 'rgba(245, 245, 220, 0.5)' }}><ThumbsUp className="w-6 h-6" /></button>
                  <button onClick={handleShare} className="hover:opacity-100 hover:scale-110 active:scale-95 transition-all" style={{ color: 'rgba(245, 245, 220, 0.5)' }}><Share2 className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      

      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#F5F5DC' }}>Spice from Paradise</div>
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#F5F5DC' }}>Luxe Midnight Special</div>
      </div>
    </div>
  );
};
