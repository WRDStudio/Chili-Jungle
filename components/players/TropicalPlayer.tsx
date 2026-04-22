import React from 'react';
import { Track } from '../../types';
import { supabase } from '../../lib/supabaseClient';
import { ThumbsUp, ListMusic, Share2, Shuffle, SkipBack, Play, Pause, SkipForward, Repeat } from 'lucide-react';
interface TropicalPlayerProps {
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

export const TropicalPlayer: React.FC<TropicalPlayerProps> = ({ track, isPlaying, currentTime, duration, onPlayToggle, onNext, onPrev, onShuffle }) => {
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
    <div className="w-full max-w-5xl rounded-[2.5rem] overflow-hidden bg-white/80 border border-[#1A3C34]/10 shadow-2xl flex flex-col md:flex-row items-stretch min-h-[280px] relative">
      {/* Background Image Layer */}
      <div className="absolute inset-0 z-0">
        <img alt="Tropical Jungle overlay" className="w-full h-full object-cover opacity-10 mix-blend-multiply" src="https://lh3.googleusercontent.com/aida-public/AB6AXuANBPDRQXrm6j0tFKIMMcEpDiSVHQ0XgVUfteB_3txTXNwO2BOkmzG1fq_4FLUh7EFtOsQphYhjVJRfe7MGUQA7G2T0mS52myU0G8dhGnKEPoXOGK8vSoOvP5CKwI_-4mWiTQG_jKXi-jZjD-ifN5oeVLTrJlTtOzpWbQGTwLBJRa19f1dS89MbDGv1AV1JAdCJattlYmMvIx8YvdRJx8fQpDg86yTB4BhxUm6gYSO5LDhlNFaxgQX8V7ZjgiH0K8rg7dXF-9PWj8FE" />
        <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent"></div>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center w-full p-8 md:p-10 gap-8 md:gap-12">
        {/* Cover Art Wrapper */}
        <div className="relative w-48 h-48 md:w-56 md:h-56 shrink-0 group">
          <div className="absolute inset-0 bg-[#f1b335] rotate-3 rounded-2xl opacity-20"></div>
          <div className="absolute inset-0 bg-black/40 -rotate-2 rounded-2xl backdrop-blur-sm"></div>
          <img loading="lazy" alt={`${track.title} Cover`} className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl border border-white/5 group-hover:scale-105 transition-transform duration-700" src={coverUrl} />
        </div>

        {/* Info & Controls Area */}
        <div className="flex-1 w-full flex flex-col justify-center gap-6">
          {/* Metadata */}
          <div className="mb-2 text-center md:text-left">
            <span className="text-[#1A3C34]/60 font-serif italic text-lg block mb-1">Tropical Selection</span>
            <h2 className="text-[#1A3C34] font-display text-4xl md:text-5xl leading-none uppercase tracking-tighter">{track.title}</h2>
            <div className="flex items-center justify-center md:justify-start gap-3 mt-2">
              <span className="text-[#1A3C34]/60 font-medium text-[10px] md:text-xs tracking-widest uppercase">Música seleccionada para alegrar las mañanas</span>
            </div>
          </div>

          {/* Player Controls Wrapper */}
          <div className="w-full max-w-xl mx-auto md:mx-0">
            {/* Progress Bar */}
            <div className="group relative w-full h-1.5 bg-[#1A3C34]/10 mb-8 rounded-full cursor-pointer">
              <div className="absolute left-0 top-0 h-full bg-[#1A3C34] shadow-[0_0_15px_rgba(26,60,52,0.3)] rounded-full transition-all duration-300" style={{ width: `${progressPercent}%` }}></div>
              <div className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-[#1A3C34] rounded-full transition-all shadow-lg border-2 border-white" style={{ left: `${progressPercent}%`, transform: 'translateY(-50%)' }}></div>
              <div className="absolute -bottom-6 left-0 text-[10px] font-bold text-[#1A3C34]/50 tracking-widest uppercase">{formatTime(currentTime)}</div>
              <div className="absolute -bottom-6 right-0 text-[10px] font-bold text-[#1A3C34]/50 tracking-widest uppercase">{formatTime(duration)}</div>
            </div>

            {/* Buttons Row */}
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-6">
                <button onClick={onShuffle} className="text-[#1A3C34]/40 hover:text-[#f1b335] transition-colors"><Shuffle className="w-6 h-6" /></button>
                <button onClick={onPrev} className="text-[#1A3C34]/80 hover:text-[#1A3C34] transition-all hover:scale-110 active:scale-90"><SkipBack className="w-8 h-8" /></button>
              </div>
              
              <button 
                onClick={onPlayToggle}
                className="w-20 h-20 rounded-full bg-[#1A3C34] text-white flex items-center justify-center shadow-[0_8px_25px_rgba(26,60,52,0.3)] hover:scale-105 active:scale-95 transition-all group"
              >
                {isPlaying ? <Pause className="w-12 h-12 fill-current" /> : <Play className="w-12 h-12 ml-2 fill-current" />}
              </button>
              
              <div className="flex items-center gap-6">
                <button onClick={onNext} className="text-[#1A3C34]/80 hover:text-[#1A3C34] transition-all hover:scale-110 active:scale-90"><SkipForward className="w-8 h-8" /></button>
                <div className="flex items-center gap-4 ml-1">
                  <button onClick={handleLike} className="text-[#1A3C34]/40 hover:text-[#1A3C34]/80 hover:scale-110 active:scale-95 transition-all"><ThumbsUp className="w-6 h-6" /></button>
                  <button onClick={handleShare} className="text-[#1A3C34]/40 hover:text-[#1A3C34]/80 hover:scale-110 active:scale-95 transition-all"><Share2 className="w-6 h-6" /></button>
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>
      

      <div className="absolute bottom-4 left-6 right-6 flex justify-between items-center opacity-30 pointer-events-none">
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#1A3C34]">Luxury Heat</div>
        <div className="text-[10px] uppercase tracking-[0.3em] text-[#1A3C34]">Premium Tropical Vibes</div>
      </div>
    </div>
  );
};
