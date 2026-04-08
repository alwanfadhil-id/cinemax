'use client';

import { useEffect, useState } from 'react';
import { Check, Ticket, X, Wallet, CreditCard, QrCode } from 'lucide-react';
import type { Seat } from './seat-map';

export type PaymentMethod = 'cash' | 'transfer' | 'qris' | null;

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSeats: Seat[];
  total: number;
  movieTitle: string;
  showtime: string;
  date: string;
  studio: string;
  paymentMethod: PaymentMethod;
}

export function CheckoutSuccessModal({
  isOpen,
  onClose,
  selectedSeats,
  total,
  movieTitle,
  showtime,
  date,
  studio,
  paymentMethod,
}: CheckoutSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [confettiPieces, setConfettiPieces] = useState<Array<{ left: number; color: string; delay: number; duration: number }>>([]);

  useEffect(() => {
    if (isOpen) {
      setCurrentStep(0);
      setShowConfetti(true);
      // Generate confetti positions client-side only
      setConfettiPieces(
        Array.from({ length: 50 }).map(() => ({
          left: Math.random() * 100,
          color: ['#f59e0b', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6'][Math.floor(Math.random() * 5)],
          delay: Math.random() * 2,
          duration: 2 + Math.random() * 2,
        }))
      );

      const timer1 = setTimeout(() => setCurrentStep(1), 300);
      const timer2 = setTimeout(() => setCurrentStep(2), 600);
      const timer3 = setTimeout(() => setCurrentStep(3), 900);
      const timer4 = setTimeout(() => setShowConfetti(false), 3000);
      
      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
        clearTimeout(timer4);
      };
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const sortedSeats = [...selectedSeats].sort((a, b) => {
    if (a.row !== b.row) return a.row.localeCompare(b.row);
    return a.number - b.number;
  });

  const seatIds = sortedSeats.map(s => `${s.row}${s.number}`).join(', ');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop with blur */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />

      {/* Confetti Effect */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {confettiPieces.map((confetti, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 rounded-full animate-confetti"
              style={{
                left: `${confetti.left}%`,
                top: '-10px',
                backgroundColor: confetti.color,
                animationDelay: `${confetti.delay}s`,
                animationDuration: `${confetti.duration}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden animate-scale-in">
        {/* Success Header with Animation */}
        <div className="relative bg-gradient-to-r from-amber-500 via-yellow-500 to-amber-500 p-8 overflow-hidden">
          {/* Animated circles */}
          <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16 animate-pulse" />
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12 animate-pulse" />
          
          <div className="relative flex flex-col items-center">
            {/* Check Icon with Animation */}
            <div
              className={`w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-xl transition-all duration-500 ${
                currentStep >= 0 ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              }`}
            >
              <Check className="w-10 h-10 text-amber-600 animate-check-bounce" strokeWidth={3} />
            </div>

            <h2
              className={`mt-4 text-2xl font-bold text-neutral-900 transition-all duration-500 ${
                currentStep >= 1 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Booking Confirmed! 🎉
            </h2>
            <p
              className={`mt-1 text-sm text-neutral-800 transition-all duration-500 ${
                currentStep >= 2 ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
              }`}
            >
              Your tickets are ready!
            </p>
          </div>
        </div>

        {/* Ticket Details */}
        <div
          className={`p-6 transition-all duration-500 ${
            currentStep >= 3 ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
          }`}
        >
          {/* Dashed separator line */}
          <div className="relative mb-6">
            <div className="absolute -left-6 top-1/2 w-4 h-4 bg-neutral-950 rounded-full -translate-y-1/2" />
            <div className="border-t-2 border-dashed border-neutral-600" />
            <div className="absolute -right-6 top-1/2 w-4 h-4 bg-neutral-950 rounded-full -translate-y-1/2" />
          </div>

          {/* Movie Info */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Ticket className="w-5 h-5 text-amber-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Movie</p>
                <p className="text-lg font-bold text-neutral-100">{movieTitle}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Date</p>
                <p className="text-sm font-semibold text-neutral-200">{date}</p>
              </div>
              <div>
                <p className="text-xs text-neutral-400 uppercase tracking-wide">Showtime</p>
                <p className="text-sm font-semibold text-neutral-200">{showtime}</p>
              </div>
            </div>

            <div>
              <p className="text-xs text-neutral-400 uppercase tracking-wide">Studio</p>
              <p className="text-sm font-semibold text-neutral-200">{studio}</p>
            </div>

            {/* Seats */}
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-2">Your Seats</p>
              <div className="flex flex-wrap gap-2">
                {sortedSeats.map(seat => (
                  <span
                    key={seat.id}
                    className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-md text-xs font-bold text-amber-300 animate-seat-pop"
                    style={{
                      animationDelay: `${sortedSeats.indexOf(seat) * 50}ms`,
                    }}
                  >
                    {seat.row}{seat.number}
                  </span>
                ))}
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-neutral-800/50 rounded-lg p-4 border border-neutral-700">
              <p className="text-xs text-neutral-400 uppercase tracking-wide mb-3">Payment Method</p>
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  paymentMethod === 'cash' ? 'bg-emerald-500/20' :
                  paymentMethod === 'transfer' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                }`}>
                  {paymentMethod === 'cash' ? (
                    <Wallet className="w-5 h-5 text-emerald-400" />
                  ) : paymentMethod === 'transfer' ? (
                    <CreditCard className="w-5 h-5 text-blue-400" />
                  ) : (
                    <QrCode className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-neutral-200">
                    {paymentMethod === 'cash' ? 'Cash / Tunai' :
                     paymentMethod === 'transfer' ? 'Bank Transfer' : 'QRIS'}
                  </p>
                  <p className="text-xs text-neutral-500">
                    {paymentMethod === 'cash' ? 'Bayar di loket bioskop' :
                     paymentMethod === 'transfer' ? 'Transfer ke rekening CineMax' : 'Scan QR dari e-wallet'}
                  </p>
                </div>
              </div>
            </div>

            {/* Total */}
            <div className="bg-gradient-to-r from-amber-500/10 to-yellow-500/10 rounded-lg p-4 border border-amber-500/30">
              <div className="flex justify-between items-center">
                <span className="text-neutral-300 font-semibold">
                  {paymentMethod === 'cash' ? 'Total to Pay' : 'Total Paid'}
                </span>
                <span className="text-2xl font-bold text-amber-400">
                  Rp {total.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="mt-6 flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 border border-neutral-700"
            >
              Close
            </button>
            <button
              onClick={() => {
                // Simulate download ticket
                alert('Downloading ticket...');
              }}
              className="flex-1 px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-neutral-900 font-bold rounded-lg transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
            >
              Download Ticket
            </button>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}
