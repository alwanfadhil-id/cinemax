'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Calendar, Clock, MapPin, Ticket, Star, Users } from 'lucide-react';

export function MovieInfo() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Card 
      className="bg-neutral-900 border-neutral-800 overflow-hidden rounded-xl group hover:border-amber-500/40 transition-all duration-500 hover:shadow-2xl hover:shadow-amber-500/10"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Movie Poster with Real Image */}
      <div className="relative bg-neutral-800 overflow-hidden">
        {/* Poster Image with hover lift and scale */}
        <div className={`relative w-full h-72 flex items-center justify-center bg-neutral-800 transition-all duration-500 ${
          isHovered ? '-translate-y-1 scale-[1.02]' : 'translate-y-0 scale-100'
        }`}>
          <img 
            src="/Interstellar.jpg" 
            alt="Interstellar Movie Poster"
            className="w-full h-full object-contain"
          />
        </div>
        
        {/* Gradient Overlay - darker at bottom for text readability */}
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-900 via-neutral-900/50 to-transparent pointer-events-none" />
        <div className={`absolute inset-0 bg-gradient-to-t from-neutral-900 to-transparent transition-opacity duration-500 pointer-events-none ${
          isHovered ? 'opacity-80' : 'opacity-60'
        }`} />
        
        {/* Film strip effect */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div className="absolute top-0 left-0 right-0 h-3" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.3) 18px, rgba(255,255,255,0.3) 36px)'
          }} />
          <div className="absolute bottom-0 left-0 right-0 h-3" style={{
            backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 18px, rgba(255,255,255,0.3) 18px, rgba(255,255,255,0.3) 36px)'
          }} />
        </div>

        {/* Content Overlay - positioned at very bottom */}
        <div className="absolute bottom-2 left-0 right-0 px-5 pb-5 z-10">
          <div className={`transition-all duration-500 ${isHovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-90'}`}>
            <p className="text-xs text-amber-400 font-semibold uppercase tracking-wide mb-1">Now Showing</p>
            <p className="text-lg font-bold text-white drop-shadow-lg">Interstellar</p>
          </div>
        </div>

        {/* Rating badge */}
        <div className="absolute top-3 right-3 bg-neutral-900/90 backdrop-blur-sm rounded-lg px-2.5 py-1.5 border border-neutral-700 shadow-lg">
          <div className="flex items-center gap-1.5">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-sm font-bold text-neutral-100">8.6</span>
          </div>
        </div>
      </div>

      {/* Movie Details */}
      <div className="p-5 space-y-4">
        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-neutral-50 leading-tight mb-1 group-hover:text-amber-400 transition-colors duration-300">
            Interstellar: Remastered
          </h2>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-xs text-neutral-400">Sci-Fi</span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs text-neutral-400">Adventure</span>
            <span className="text-neutral-600">•</span>
            <span className="text-xs text-neutral-400">Drama</span>
          </div>
        </div>

        {/* Rating & Duration */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-neutral-800/50 rounded-lg px-3 py-1.5">
            <Clock className="w-3.5 h-3.5 text-amber-500" />
            <span className="text-xs font-medium text-neutral-300">169 min</span>
          </div>
          <div className="px-2.5 py-1.5 bg-amber-500/20 border border-amber-500/30 rounded-lg">
            <span className="text-xs font-bold text-amber-400">PG-13</span>
          </div>
          <div className="flex items-center gap-1">
            <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" />
            <span className="text-xs font-semibold text-neutral-200">8.6</span>
            <span className="text-xs text-neutral-500">/10</span>
          </div>
        </div>

        {/* Director & Cast */}
        <div className="space-y-2 text-xs">
          <div className="flex items-start gap-2">
            <Users className="w-3.5 h-3.5 text-amber-500 mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-neutral-500">Director</p>
              <p className="font-medium text-neutral-200">Christopher Nolan</p>
            </div>
          </div>
        </div>

        {/* Show Info */}
        <div className="pt-3 border-t border-neutral-700/50 space-y-3">
          <div className="flex items-start gap-3 group/item">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
              <Calendar className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Date</p>
              <p className="font-semibold text-neutral-200 text-sm">Saturday, 12 April 2026</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group/item">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Showtime</p>
              <p className="font-semibold text-neutral-200 text-sm">19:30 WIB</p>
            </div>
          </div>

          <div className="flex items-start gap-3 group/item">
            <div className="w-8 h-8 bg-amber-500/10 rounded-lg flex items-center justify-center flex-shrink-0 group-hover/item:bg-amber-500/20 transition-colors">
              <MapPin className="w-4 h-4 text-amber-500" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-neutral-500">Theater</p>
              <p className="font-semibold text-neutral-200 text-sm">Studio 1 — CineMax Grand</p>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
