'use client';

import { useState } from 'react';
import { Check, CreditCard, Wallet, QrCode, X } from 'lucide-react';
import type { Seat } from './seat-map';

export type PaymentMethod = 'cash' | 'transfer' | 'qris' | null;

interface PaymentModalProps {
  isOpen: boolean;
  selectedSeats: Seat[];
  total: number;
  onCancel: () => void;
  onSuccess: (paymentMethod: PaymentMethod) => void;
  movieTitle: string;
  showtime: string;
  date: string;
  studio: string;
}

export function PaymentModal({
  isOpen,
  selectedSeats,
  total,
  onCancel,
  onSuccess,
  movieTitle,
  showtime,
  date,
  studio,
}: PaymentModalProps) {
  const [step, setStep] = useState<'confirm' | 'payment'>('confirm');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = () => {
    setStep('payment');
  };

  const handleBack = () => {
    setStep('confirm');
    setSelectedMethod(null);
  };

  const handlePay = async () => {
    if (!selectedMethod) return;
    setIsProcessing(true);
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    onSuccess(selectedMethod);
  };

  const sortedSeats = [...selectedSeats].sort((a, b) => {
    if (a.row !== b.row) return a.row.localeCompare(b.row);
    return a.number - b.number;
  });

  const paymentMethods = [
    {
      id: 'cash' as const,
      name: 'Cash / Tunai',
      description: 'Bayar di loket bioskop',
      icon: Wallet,
      color: 'from-emerald-500 to-green-600',
      borderColor: 'border-emerald-500',
    },
    {
      id: 'transfer' as const,
      name: 'Bank Transfer',
      description: 'Transfer ke rekening CineMax',
      icon: CreditCard,
      color: 'from-blue-500 to-indigo-600',
      borderColor: 'border-blue-500',
    },
    {
      id: 'qris' as const,
      name: 'QRIS',
      description: 'Scan QR dari e-wallet',
      icon: QrCode,
      color: 'from-purple-500 to-pink-600',
      borderColor: 'border-purple-500',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 overflow-hidden animate-scale-in max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onCancel}
          className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center transition-all duration-200 hover:scale-110 z-10"
        >
          <X className="w-4 h-4 text-white" />
        </button>

        {/* Step 1: Confirmation */}
        {step === 'confirm' && (
          <div className="p-6">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-amber-400" strokeWidth={2.5} />
              </div>
              <h2 className="text-2xl font-bold text-neutral-100 mb-1">Konfirmasi Pesanan</h2>
              <p className="text-sm text-neutral-400">Periksa detail pesanan Anda sebelum melanjutkan</p>
            </div>

            {/* Order Summary */}
            <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 mb-6 space-y-4">
              {/* Movie */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Movie</p>
                <p className="text-base font-bold text-neutral-100">{movieTitle}</p>
              </div>

              {/* Date & Time */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Date</p>
                  <p className="text-sm font-semibold text-neutral-200">{date}</p>
                </div>
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Showtime</p>
                  <p className="text-sm font-semibold text-neutral-200">{showtime}</p>
                </div>
              </div>

              {/* Studio */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-1">Studio</p>
                <p className="text-sm font-semibold text-neutral-200">{studio}</p>
              </div>

              {/* Seats */}
              <div>
                <p className="text-xs text-neutral-500 uppercase tracking-wide mb-2">Seats ({sortedSeats.length})</p>
                <div className="flex flex-wrap gap-2">
                  {sortedSeats.map(seat => (
                    <span
                      key={seat.id}
                      className="px-3 py-1.5 bg-amber-500/20 border border-amber-500/40 rounded-md text-xs font-bold text-amber-300"
                    >
                      {seat.row}{seat.number}
                    </span>
                  ))}
                </div>
              </div>

              {/* Total */}
              <div className="pt-3 border-t border-neutral-700">
                <div className="flex justify-between items-center">
                  <span className="text-neutral-400 font-semibold">Total Payment</span>
                  <span className="text-xl font-bold text-amber-400">Rp {total.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button
                onClick={onCancel}
                className="flex-1 px-4 py-3.5 bg-neutral-800 hover:bg-neutral-700 text-neutral-300 font-semibold rounded-xl transition-all duration-200 hover:scale-105 active:scale-95 border border-neutral-700"
              >
                Batal
              </button>
              <button
                onClick={handleConfirm}
                className="flex-1 px-4 py-3.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-neutral-900 font-bold rounded-xl transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
              >
                Ya, Benar!
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Payment Method */}
        {step === 'payment' && (
          <div className="p-6">
            {/* Header */}
            <button
              onClick={handleBack}
              className="text-sm text-neutral-400 hover:text-amber-400 transition-colors mb-4 flex items-center gap-1"
            >
              ← Kembali
            </button>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-bold text-neutral-100 mb-1">Pilih Metode Pembayaran</h2>
              <p className="text-sm text-neutral-400">Pilih metode yang Anda inginkan</p>
            </div>

            {/* Payment Methods */}
            <div className="space-y-3 mb-6">
              {paymentMethods.map(method => {
                const Icon = method.icon;
                const isSelected = selectedMethod === method.id;
                return (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all duration-300 hover:scale-[1.02] ${
                      isSelected
                        ? `bg-gradient-to-r ${method.color} border-transparent shadow-lg`
                        : 'bg-neutral-800/50 border-neutral-700/50 hover:border-neutral-600'
                    }`}
                  >
                    <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-white/20' : 'bg-neutral-700'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-white' : 'text-neutral-300'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className={`font-bold ${isSelected ? 'text-white' : 'text-neutral-200'}`}>
                        {method.name}
                      </p>
                      <p className={`text-xs ${isSelected ? 'text-white/80' : 'text-neutral-500'}`}>
                        {method.description}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-neutral-900" strokeWidth={3} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>

            {/* QRIS Preview */}
            {selectedMethod === 'qris' && (
              <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 mb-6 animate-fade-in">
                <p className="text-xs text-neutral-400 text-center mb-3">Scan QR Code untuk pembayaran</p>
                <div className="w-48 h-48 mx-auto bg-white rounded-lg p-3 mb-3">
                  {/* Simulated QR Code */}
                  <div className="w-full h-full bg-neutral-900 rounded flex items-center justify-center">
                    <QrCode className="w-20 h-20 text-white" />
                  </div>
                </div>
                <p className="text-xs text-neutral-500 text-center">QRIS CineMax Grand Cinema</p>
              </div>
            )}

            {/* Transfer Preview */}
            {selectedMethod === 'transfer' && (
              <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 mb-6 animate-fade-in">
                <p className="text-xs text-neutral-400 mb-2">Transfer ke rekening:</p>
                <div className="bg-neutral-900/50 rounded-lg p-3 space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">Bank BCA</span>
                    <span className="text-sm font-bold text-neutral-200">1234567890</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-neutral-500">a.n</span>
                    <span className="text-sm font-bold text-neutral-200">PT CineMax Indonesia</span>
                  </div>
                </div>
              </div>
            )}

            {/* Cash Info */}
            {selectedMethod === 'cash' && (
              <div className="bg-neutral-800/50 rounded-xl p-4 border border-neutral-700/50 mb-6 animate-fade-in">
                <div className="flex items-start gap-3">
                  <Wallet className="w-5 h-5 text-amber-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-neutral-200 font-semibold mb-1">Bayar di Loket</p>
                    <p className="text-xs text-neutral-400">Tunjukkan bukti pemesanan di loket CineMax Grand Cinema</p>
                  </div>
                </div>
              </div>
            )}

            {/* Pay Button */}
            <button
              onClick={handlePay}
              disabled={!selectedMethod || isProcessing}
              className="w-full px-4 py-4 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-neutral-900 font-bold rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl disabled:hover:scale-100 relative overflow-hidden"
            >
              {isProcessing ? (
                <div className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-neutral-900 border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                `Bayar Rp ${total.toLocaleString()}`
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
