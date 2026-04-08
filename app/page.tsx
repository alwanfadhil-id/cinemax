'use client';

import { useEffect, useState, useCallback, useRef } from 'react';
import { SeatMap, type Seat } from '@/components/seat-map';
import { SeatLegend } from '@/components/seat-legend';
import { BookingSummary } from '@/components/booking-summary';
import { MovieInfo } from '@/components/movie-info';
import { CheckoutSuccessModal } from '@/components/checkout-modal';
import { PaymentModal, type PaymentMethod } from '@/components/payment-modal';
import { FloatingParticles } from '@/components/floating-particles';
import { Navbar } from '@/components/navbar';
import { Footer } from '@/components/footer';
import { LoadingScreen } from '@/components/loading-screen';
import { Toast } from '@/components/toast';
import { ScrollReveal } from '@/components/scroll-reveal';
import { generateSeats } from '@/lib/seat-utils';
import { ShoppingCart, ChevronDown, ChevronUp } from 'lucide-react';

const MAX_SEATS = 10;

export default function Home() {
  const seatsRef = useRef<Seat[]>([]);
  const [allSeats, setAllSeats] = useState<Seat[]>([]);
  const [selectedSeatIds, setSelectedSeatIds] = useState<string[]>([]);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'error' | 'success' | 'info'>('error');
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSummaryOpen, setIsSummaryOpen] = useState(false);

  useEffect(() => {
    if (seatsRef.current.length === 0) {
      seatsRef.current = generateSeats();
      setAllSeats(seatsRef.current);
    }
    
    // Simulate loading time
    const timer = setTimeout(() => setIsLoading(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  const handleSeatClick = useCallback(
    (seat: Seat) => {
      if (seat.status === 'selected') {
        // Deselect the seat
        setSelectedSeatIds(prev => prev.filter(id => id !== seat.id));
        setAllSeats(prevSeats =>
          prevSeats.map(s => (s.id === seat.id ? { ...s, status: 'available' } : s))
        );
      } else if (seat.status === 'available') {
        // Try to select the seat
        if (selectedSeatIds.length >= MAX_SEATS) {
          setToastType('error');
          setToastMessage(`Maximum ${MAX_SEATS} seats allowed per booking`);
          setTimeout(() => {
            setToastMessage('');
            setToastType('error');
          }, 3000);
          return;
        }

        // Select the seat
        setSelectedSeatIds(prev => [...prev, seat.id]);
        setAllSeats(prevSeats =>
          prevSeats.map(s => (s.id === seat.id ? { ...s, status: 'selected' } : s))
        );
      }
    },
    [selectedSeatIds.length]
  );

  const handleRemoveSeat = useCallback((seatId: string) => {
    setAllSeats(prevSeats =>
      prevSeats.map(s => (s.id === seatId ? { ...s, status: 'available' } : s))
    );
    setSelectedSeatIds(prev => prev.filter(id => id !== seatId));
  }, []);

  const selectedSeats = allSeats.filter(s => selectedSeatIds.includes(s.id));

  const handleCheckout = () => {
    if (selectedSeats.length > 0) {
      setShowPaymentModal(true);
    }
  };

  const handlePaymentCancel = () => {
    setShowPaymentModal(false);
  };

  const handlePaymentSuccess = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setShowPaymentModal(false);
    setShowSuccessModal(true);
  };

  const handleSuccessClose = () => {
    setShowSuccessModal(false);
    // Reset seats after checkout
    setAllSeats(prevSeats =>
      prevSeats.map(s => (s.status === 'selected' ? { ...s, status: 'occupied' } : s))
    );
    setSelectedSeatIds([]);
    setSelectedPaymentMethod(null);
  };

  const calculateTotal = () => {
    const subtotal = selectedSeats.reduce((sum, seat) => sum + seat.price, 0);
    const serviceFee = selectedSeats.length * 5000;
    return subtotal + serviceFee;
  };

  return (
    <div className="min-h-screen bg-neutral-950 relative">
      {/* Loading Screen */}
      <LoadingScreen />

      {/* Floating Particles Background */}
      <FloatingParticles />

      {/* Navbar */}
      <Navbar />

      {/* Toast Notification */}
      {toastMessage && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => {
            setToastMessage('');
            setToastType('error');
          }}
        />
      )}

      {/* Payment Modal (Confirmation + Payment Method) */}
      <PaymentModal
        isOpen={showPaymentModal}
        selectedSeats={selectedSeats}
        total={calculateTotal()}
        onCancel={handlePaymentCancel}
        onSuccess={handlePaymentSuccess}
        movieTitle="Interstellar: Remastered"
        showtime="19:30 WIB"
        date="Saturday, 12 April 2026"
        studio="Studio 1 — CineMax Grand"
      />

      {/* Checkout Success Modal */}
      <CheckoutSuccessModal
        isOpen={showSuccessModal}
        onClose={handleSuccessClose}
        selectedSeats={selectedSeats}
        total={calculateTotal()}
        movieTitle="Interstellar: Remastered"
        showtime="19:30 WIB"
        date="Saturday, 12 April 2026"
        studio="Studio 1 — CineMax Grand"
        paymentMethod={selectedPaymentMethod}
      />

      {/* Main Content */}
      <div className="relative z-10 pt-16 sm:pt-20 md:pt-24">
        {/* Header Section */}
        <ScrollReveal delay={0.1} direction="down">
          <div className="bg-gradient-to-b from-neutral-900/80 to-transparent py-4 sm:py-6 md:py-8">
            <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6">
              <div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-neutral-50 mb-1.5 sm:mb-2 md:mb-3 bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                  Select Your Seats
                </h1>
                <p className="text-neutral-400 text-xs sm:text-sm md:text-base lg:text-lg">Choose your perfect spot for an unforgettable movie experience</p>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Main Content Area */}
        <div className="w-full px-3 sm:px-4 lg:px-6 py-4 sm:py-6 md:py-8">
          <ScrollReveal delay={0.2}>
            <div className="grid grid-cols-1 xl:grid-cols-5 gap-6 max-w-screen-2xl mx-auto">
              {/* Left Sidebar - Movie Info */}
              <div className="hidden xl:block xl:col-span-1">
                <div className="sticky top-24">
                  <MovieInfo />
                </div>
              </div>

              {/* Center - Main Seat Map Area */}
              <div className="xl:col-span-3">
                {/* Seat Map Container */}
                <div className="bg-neutral-900/90 backdrop-blur-sm rounded-xl md:rounded-2xl p-4 sm:p-6 md:p-10 border border-neutral-800 shadow-2xl mb-4 md:mb-6 hover:border-neutral-700/50 transition-all duration-500">
                  <SeatMap
                    seats={allSeats}
                    onSeatClick={handleSeatClick}
                    maxSeats={MAX_SEATS}
                    selectedCount={selectedSeats.length}
                  />
                </div>

                {/* Legend */}
                <ScrollReveal delay={0.3}>
                  <div className="bg-neutral-900/70 backdrop-blur-sm rounded-xl p-3 sm:p-4 md:p-6 border border-neutral-800">
                    <SeatLegend />
                  </div>
                </ScrollReveal>

                {/* Movie Info on Mobile/Tablet */}
                <div className="xl:hidden mt-4 md:mt-6">
                  <MovieInfo />
                </div>
              </div>

              {/* Mobile Booking Summary Toggle */}
              <div className="xl:hidden mb-6">
                <button
                  onClick={() => setIsSummaryOpen(!isSummaryOpen)}
                  className="w-full bg-neutral-900/90 backdrop-blur-sm border border-neutral-800 rounded-xl p-4 flex items-center justify-between hover:border-neutral-700/50 transition-all duration-300"
                >
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <ShoppingCart className="w-5 h-5 text-amber-400" />
                      {selectedSeats.length > 0 && (
                        <span className="absolute -top-2 -right-2 bg-amber-500 text-neutral-900 text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                          {selectedSeats.length}
                        </span>
                      )}
                    </div>
                    <div className="text-left">
                      <p className="text-sm font-bold text-amber-400">
                        {selectedSeats.length > 0 ? `${selectedSeats.length} Seat${selectedSeats.length > 1 ? 's' : ''} Selected` : 'View Booking Summary'}
                      </p>
                      {selectedSeats.length > 0 && (
                        <p className="text-xs text-neutral-400">
                          Rp {calculateTotal().toLocaleString()}
                        </p>
                      )}
                    </div>
                  </div>
                  {isSummaryOpen ? (
                    <ChevronUp className="w-5 h-5 text-amber-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-amber-400" />
                  )}
                </button>

                {/* Expandable Booking Summary on Mobile */}
                {isSummaryOpen && (
                  <div className="mt-4 animate-fade-in">
                    <BookingSummary
                      selectedSeats={selectedSeats}
                      onRemoveSeat={handleRemoveSeat}
                      onCheckout={() => {
                        handleCheckout();
                        setIsSummaryOpen(false);
                      }}
                    />
                  </div>
                )}
              </div>

              {/* Right Sidebar - Booking Summary (Desktop) */}
              <div className="hidden xl:block xl:col-span-1">
                <div className="sticky top-24">
                  <BookingSummary
                    selectedSeats={selectedSeats}
                    onRemoveSeat={handleRemoveSeat}
                    onCheckout={handleCheckout}
                  />
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}
