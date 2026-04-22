import React from 'react';
import { Track } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { ThumbsUp, ListMusic, Share2, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-react';
interface ClassicPlayerProps {
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

export const ClassicPlayer: React.FC<ClassicPlayerProps> = ({ track, isPlaying, currentTime, duration, onPlayToggle, onNext, onPrev, onShuffle }) => {
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
    <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col md:flex-row items-stretch min-h-[280px] relative border border-white/5" style={{
      backgroundColor: '#d97706',
      backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255, 215, 0, 0.2) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(184, 134, 11, 0.3) 0%, transparent 50%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuAo3TV7b_dPgBf-2vwG_OplEYqpsCf7xIPELqGtwrHd4wqoPPRq35b16F_1uGHa4R019dZAHYYgsk92Ui6H8ENOe-V3P0K91gRLFRO69OoAHnjUeUXa_YGC_nyBECCcTmZsSYd5Ve9kSOaZX2eSzQFn-3hp5UZvT1K40e6c-3-RZzBOnAIFkXDQQVYUgPoOsqsEpIxsfQEPxazxDIkK3A7WjGj36BQily1vn-RV8PC9QHeywcpb_0Pe48kzF9xkkfxNXIa9bTfJWBlW'), conic-gradient(from 180deg at 50% 50%, #b45309, #d97706, #fbbf24, #d97706, #b45309)`,
      backgroundBlendMode: 'soft-light, overlay, multiply, normal'
    }}>
      {/* Energy Texture Overlay */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        opacity: 0.07,
        mixBlendMode: 'overlay'
      }}></div>

      {/* Decorative Pattern Overlay (Subtle) */}
      <div className="absolute right-0 top-0 h-full w-1/3 opacity-20 pointer-events-none mix-blend-overlay">
        <svg className="h-full w-full" preserveAspectRatio="none" viewBox="0 0 100 100">
          <path d="M0,0 Q50,50 100,0 T200,0" fill="none" stroke="#FFD700" strokeWidth="0.5"></path>
          <path d="M0,20 Q50,70 100,20 T200,20" fill="none" stroke="#FFD700" strokeWidth="0.5"></path>
          <path d="M0,40 Q50,90 100,40 T200,40" fill="none" stroke="#FFD700" strokeWidth="0.5"></path>
        </svg>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center w-full p-8 md:p-10 gap-8 md:gap-12">
        {/* Cover Art */}
        <div className="w-48 h-48 md:w-56 md:h-56 shrink-0 rounded-2xl overflow-hidden shadow-2xl border border-white/10 group">
          <img loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" alt={`${track.title} Cover`} src={coverUrl} />
        </div>

        {/* Info and Controls */}
        <div className="flex-1 w-full flex flex-col justify-center gap-6">
          {/* Metadata */}
          <div className="mb-2 text-center md:text-left">
            <span className="font-serif italic text-lg block mb-1" style={{ color: 'rgba(245, 245, 220, 0.7)' }}>Jungle Studio</span>
            <h2 className="font-display text-4xl md:text-5xl leading-none uppercase tracking-tighter" style={{ color: '#F5F5DC', textShadow: '0 0 12px rgba(245, 245, 220, 0.25)'}}>{track.title}</h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2" style={{ color: 'rgba(245, 245, 220, 0.9)' }}>
              <span className="font-medium text-[10px] md:text-xs tracking-widest uppercase opacity-80">Música seleccionada para un día en la playa</span>
            </div>
          </div>

          {/* Controls Wrapper */}
          <div className="w-full max-w-xl mx-auto md:mx-0">
            {/* Progress Bar */}
            <div className="group relative w-full h-1.5 bg-black/20 mb-8 rounded-full cursor-pointer backdrop-blur-sm border border-white/5">
              <div className="absolute left-0 top-0 h-full shadow-[0_0_8px_rgba(255,215,0,0.5)] bg-[#F5F5DC] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#F5F5DC] rounded-full transition-all shadow-lg" style={{ left: `${progressPercent}%`, transform: 'translateY(-50%)' }}></div>
              <div className="absolute -bottom-6 left-0 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(245, 245, 220, 0.7)' }}>{formatTime(currentTime)}</div>
              <div className="absolute -bottom-6 right-0 text-[10px] font-bold tracking-widest uppercase" style={{ color: 'rgba(245, 245, 220, 0.7)' }}>{formatTime(duration)}</div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-6" style={{ color: '#F5F5DC' }}>
                <button onClick={onShuffle} className="opacity-60 hover:opacity-100 transition-opacity"><Shuffle className="w-6 h-6" /></button>
                <button onClick={onPrev} className="opacity-80 hover:opacity-100 hover:scale-110 active:scale-90 transition-all"><SkipBack className="w-8 h-8" /></button>
              </div>
              
              <button 
                onClick={onPlayToggle}
                className="w-20 h-20 rounded-full bg-[#0e0e0e] flex items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] border border-white/10 hover:scale-105 active:scale-95 transition-all group" 
                style={{ color: '#F5F5DC' }}
              >
                {isPlaying ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 ml-2 fill-current" />}
              </button>
              
              <div className="flex items-center gap-6" style={{ color: '#F5F5DC' }}>
                <button onClick={onNext} className="opacity-80 hover:opacity-100 hover:scale-110 active:scale-90 transition-all"><SkipForward className="w-8 h-8" /></button>
                <div className="flex items-center gap-4 ml-1">
                  <button onClick={handleLike} className="hover:opacity-100 hover:scale-110 active:scale-95 transition-all" style={{ color: 'rgba(245, 245, 220, 0.6)' }}><ThumbsUp className="w-6 h-6" /></button>
                  <button onClick={handleShare} className="hover:opacity-100 hover:scale-110 active:scale-95 transition-all" style={{ color: 'rgba(245, 245, 220, 0.6)' }}><Share2 className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      

      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#F5F5DC' }}>Spicy Lovers</div>
        <div className="text-[10px] uppercase tracking-[0.3em]" style={{ color: '#F5F5DC' }}>Classic Party Beats</div>
      </div>
    </div>
  );
};
