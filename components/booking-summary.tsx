'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { X, ShoppingCart, Sparkles } from 'lucide-react';
import type { Seat } from './seat-map';

interface BookingSummaryProps {
  selectedSeats: Seat[];
  onRemoveSeat: (seatId: string) => void;
  onCheckout: () => void;
}

export function BookingSummary({ selectedSeats, onRemoveSeat, onCheckout }: BookingSummaryProps) {
  const categoryBreakdown = selectedSeats.reduce(
    (acc, seat) => {
      const existing = acc.find(item => item.category === seat.category);
      if (existing) {
        existing.count += 1;
        existing.subtotal += seat.price;
      } else {
        acc.push({
          category: seat.category,
          count: 1,
          pricePerSeat: seat.price,
          subtotal: seat.price,
        });
      }
      return acc;
    },
    [] as Array<{ category: string; count: number; pricePerSeat: number; subtotal: number }>
  );

  const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
  const serviceFee = selectedSeats.length * 5000;
  const total = subtotal + serviceFee;

  const sortOrder = { vip: 0, premium: 1, regular: 2 };
  const sortedBreakdown = categoryBreakdown.sort(
    (a, b) => sortOrder[a.category as keyof typeof sortOrder] - sortOrder[b.category as keyof typeof sortOrder]
  );

  return (
    <Card className="bg-neutral-900 border-neutral-800 rounded-xl shadow-xl overflow-hidden group">
      {/* Gradient top border */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500" />

      <div className="p-4 md:p-6 flex flex-col gap-4 md:gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="w-4 h-4 md:w-5 md:h-5 text-amber-400" />
            <h2 className="text-base md:text-xl font-bold text-amber-400">Booking Summary</h2>
          </div>
          {selectedSeats.length > 0 && (
            <div className="bg-amber-500/20 border border-amber-500/30 rounded-full px-2 md:px-3 py-1">
              <span className="text-xs font-bold text-amber-300">{selectedSeats.length} seats</span>
            </div>
          )}
        </div>

        {selectedSeats.length === 0 ? (
          <div className="text-center py-8 md:py-12 flex flex-col items-center justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 bg-neutral-800/50 rounded-full flex items-center justify-center mb-4">
              <X className="w-8 h-8 md:w-10 md:h-10 text-neutral-600" />
            </div>
            <p className="text-neutral-400 text-sm mb-2">No seats selected yet</p>
            <p className="text-neutral-500 text-xs">Click on available seats to select</p>
          </div>
        ) : (
          <>
            {/* Selected Seats List */}
            <div className="bg-neutral-800/40 rounded-lg p-3 md:p-4 border border-neutral-700/40">
              <p className="text-xs font-bold text-neutral-300 mb-3 uppercase tracking-wide">Selected Seats</p>
              <div className="flex flex-wrap gap-2">
                {selectedSeats.map((seat, index) => (
                  <div
                    key={seat.id}
                    className="flex items-center gap-1 bg-gradient-to-r from-amber-500/25 to-yellow-500/25 border border-amber-500/60 rounded-lg px-2 md:px-3 py-1.5 md:py-2 text-xs font-semibold animate-seat-pop hover:from-amber-500/35 hover:to-yellow-500/35 transition-all duration-200 hover:scale-105"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <span className="text-amber-200">
                      {seat.row}{seat.number}
                    </span>
                    <button
                      onClick={() => onRemoveSeat(seat.id)}
                      className="hover:text-amber-100 transition-colors hover:scale-110"
                      aria-label={`Remove seat ${seat.row}${seat.number}`}
                    >
                      <X size={12} className="md:w-4 md:h-4 text-amber-200" />
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Breakdown */}
            <div className="bg-neutral-800/20 rounded-lg p-3 md:p-4 space-y-3">
              <p className="text-xs font-bold text-neutral-300 uppercase tracking-wide">Price Breakdown</p>
              {sortedBreakdown.map((item, index) => (
                <div 
                  key={item.category} 
                  className="flex justify-between items-center text-xs animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${
                      item.category === 'vip' ? 'bg-emerald-500' :
                      item.category === 'premium' ? 'bg-blue-500' : 'bg-slate-500'
                    }`} />
                    <span className="text-neutral-400">
                      {item.count}x {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                    </span>
                  </div>
                  <span className="font-semibold text-neutral-200">Rp {item.subtotal.toLocaleString()}</span>
                </div>
              ))}
            </div>

            {/* Totals Section */}
            <div className="space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Subtotal</span>
                <span className="text-neutral-200 font-medium">Rp {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-neutral-400">Service Fee</span>
                <span className="text-neutral-200 font-medium">Rp {serviceFee.toLocaleString()}</span>
              </div>
              <div className="relative mt-4">
                {/* Animated background */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-lg animate-pulse-slow" />
                <div className="relative flex justify-between items-center bg-gradient-to-r from-amber-500/15 to-yellow-500/15 rounded-lg p-3 md:p-4 border border-amber-500/30">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-3 h-3 md:w-4 md:h-4 text-amber-400 animate-sparkle" />
                    <span className="text-amber-300 font-bold text-xs md:text-sm">Total</span>
                  </div>
                  <span className="text-lg md:text-2xl font-bold text-amber-200">Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <Button
              onClick={onCheckout}
              disabled={selectedSeats.length === 0}
              className="relative w-full bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-neutral-900 font-bold py-3 md:py-4 text-xs md:text-sm rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl hover:shadow-amber-500/25 overflow-hidden group/btn"
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
              <span className="relative flex items-center justify-center gap-2">
                <ShoppingCart className="w-4 h-4" />
                Proceed to Checkout
              </span>
            </Button>
          </>
        )}
      </div>
    </Card>
  );
}
