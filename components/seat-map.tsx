'use client';

import React, { useState } from 'react';

export interface Seat {
  id: string;
  row: string;
  number: number;
  category: 'regular' | 'premium' | 'vip';
  status: 'available' | 'selected' | 'occupied';
  price: number;
}

interface SeatMapProps {
  seats: Seat[];
  onSeatClick: (seat: Seat) => void;
  maxSeats: number;
  selectedCount: number;
}

export function SeatMap({ seats, onSeatClick, maxSeats, selectedCount }: SeatMapProps) {
  const rows = Array.from(new Set(seats.map(s => s.row))).sort();
  const [hoveredSeat, setHoveredSeat] = useState<string | null>(null);

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'occupied') return;
    if (seat.status === 'selected') {
      onSeatClick(seat);
      return;
    }
    if (seat.status === 'available' && selectedCount >= maxSeats) {
      return;
    }
    onSeatClick(seat);
  };

  const getSeatColor = (seat: Seat) => {
    switch (seat.status) {
      case 'selected':
        return 'bg-gradient-to-br from-amber-400 to-yellow-500 text-neutral-900';
      case 'occupied':
        return 'bg-neutral-800/50 cursor-not-allowed';
      case 'available':
        if (seat.category === 'vip') {
          return 'bg-gradient-to-br from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500';
        }
        if (seat.category === 'premium') {
          return 'bg-gradient-to-br from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500';
        }
        return 'bg-gradient-to-br from-slate-600 to-slate-700 hover:from-slate-500 hover:to-slate-600';
    }
  };

  const getSeatLabel = (seat: Seat) => {
    if (seat.category === 'vip') {
      return '♔';
    }
    return '';
  };

  return (
    <div className="flex flex-col items-center gap-4 md:gap-10 w-full">
      {/* Screen Indicator with 3D effect */}
      <div className="w-full max-w-[280px] sm:max-w-sm md:max-w-md lg:max-w-2xl">
        <div className="relative">
          {/* Screen glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-400/20 to-transparent blur-lg" />
          <div className="relative h-1 sm:h-1.5 md:h-2 bg-gradient-to-r from-transparent via-yellow-400 to-transparent rounded-full shadow-lg shadow-yellow-400/50" />
          {/* Screen curve effect */}
          <div className="absolute -bottom-4 sm:-bottom-6 md:-bottom-8 left-0 right-0 h-4 sm:h-6 md:h-8 bg-gradient-to-b from-yellow-400/5 to-transparent rounded-b-full blur-sm" />
        </div>
        <p className="text-center text-[10px] sm:text-xs md:text-sm font-bold text-neutral-300 mt-6 sm:mt-8 md:mt-10 tracking-[0.15em] sm:tracking-[0.2em] md:tracking-[0.3em] uppercase">
          Screen
        </p>
      </div>

      {/* Seat Grid - Scrollable on mobile */}
      <div className="w-full overflow-x-auto pb-2">
        <div className="min-w-[320px] sm:min-w-[400px] mx-auto">
          <div className="flex flex-col gap-2 sm:gap-3 md:gap-4 items-center animate-fade-in px-2">
            {rows.map((row, rowIndex) => (
              <div
                key={row}
                className="flex items-center justify-center gap-1.5 sm:gap-2 md:gap-3 lg:gap-5 animate-seat-row-enter"
                style={{
                  animationDelay: `${rowIndex * 100}ms`,
                  animationFillMode: 'both',
                }}
              >
                {/* Row Label */}
                <span className="w-4 sm:w-5 md:w-7 text-center font-bold text-neutral-400 text-xs sm:text-sm md:text-lg flex-shrink-0">
                  {row}
                </span>

                {/* Seats Container */}
                <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                  {/* Left Section */}
                  <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                    {seats
                      .filter(s => s.row === row && s.number <= 5)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === 'occupied'}
                          onMouseEnter={() => setHoveredSeat(seat.id)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm lg:text-base
                            transition-all duration-300 ease-out flex-shrink-0 relative
                            ${getSeatColor(seat)}
                            ${seat.status === 'occupied' ? 'opacity-30' : 'cursor-pointer'}
                            ${seat.status === 'selected' ? 'shadow-md sm:shadow-lg md:shadow-xl shadow-amber-500/60 scale-105 sm:scale-105 md:scale-110 ring-1 md:ring-2 ring-amber-300' : ''}
                            ${seat.status !== 'occupied' ? 'active:scale-90 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5' : ''}
                            flex items-center justify-center
                          `}
                          title={`${seat.row}${seat.number} - ${seat.category} - Rp ${seat.price.toLocaleString()}`}
                          aria-label={`Seat ${seat.row}${seat.number}, ${seat.status}`}
                        >
                          {getSeatLabel(seat)}

                          {/* Tooltip on hover - desktop only */}
                          {hoveredSeat === seat.id && seat.status !== 'occupied' && (
                            <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl border border-neutral-700 whitespace-nowrap z-10 animate-tooltip-fade-in">
                              <p className="font-semibold">{seat.row}{seat.number}</p>
                              <p className="text-neutral-400 text-[10px]">{seat.category} - Rp {seat.price.toLocaleString()}</p>
                            </div>
                          )}
                        </button>
                      ))}
                  </div>

                  {/* Gap in middle */}
                  <div className="w-1 sm:w-1.5 md:w-2 lg:w-3 flex-shrink-0" />

                  {/* Right Section */}
                  <div className="flex gap-1 sm:gap-1.5 md:gap-2 lg:gap-3">
                    {seats
                      .filter(s => s.row === row && s.number > 5)
                      .map(seat => (
                        <button
                          key={seat.id}
                          onClick={() => handleSeatClick(seat)}
                          disabled={seat.status === 'occupied'}
                          onMouseEnter={() => setHoveredSeat(seat.id)}
                          onMouseLeave={() => setHoveredSeat(null)}
                          className={`
                            w-7 h-7 sm:w-9 sm:h-9 md:w-12 md:h-12 lg:w-14 lg:h-14 rounded-md sm:rounded-lg md:rounded-xl font-bold text-[10px] sm:text-xs md:text-sm lg:text-base
                            transition-all duration-300 ease-out flex-shrink-0 relative
                            ${getSeatColor(seat)}
                            ${seat.status === 'occupied' ? 'opacity-30' : 'cursor-pointer'}
                            ${seat.status === 'selected' ? 'shadow-md sm:shadow-lg md:shadow-xl shadow-amber-500/60 scale-105 sm:scale-105 md:scale-110 ring-1 md:ring-2 ring-amber-300' : ''}
                            ${seat.status !== 'occupied' ? 'active:scale-90 hover:shadow-lg hover:scale-105 hover:-translate-y-0.5' : ''}
                            flex items-center justify-center
                          `}
                          title={`${seat.row}${seat.number} - ${seat.category} - Rp ${seat.price.toLocaleString()}`}
                          aria-label={`Seat ${seat.row}${seat.number}, ${seat.status}`}
                        >
                          {getSeatLabel(seat)}

                          {/* Tooltip on hover - desktop only */}
                          {hoveredSeat === seat.id && seat.status !== 'occupied' && (
                            <div className="hidden md:block absolute -top-12 left-1/2 -translate-x-1/2 bg-neutral-900 text-white text-xs px-3 py-1.5 rounded-lg shadow-xl border border-neutral-700 whitespace-nowrap z-10 animate-tooltip-fade-in">
                              <p className="font-semibold">{seat.row}{seat.number}</p>
                              <p className="text-neutral-400 text-[10px]">{seat.category} - Rp {seat.price.toLocaleString()}</p>
                            </div>
                          )}
                        </button>
                      ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
