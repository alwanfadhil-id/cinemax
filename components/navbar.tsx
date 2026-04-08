'use client';

import { useState, useEffect } from 'react';
import { Film, Menu, X, Ticket } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? 'bg-neutral-950/80 backdrop-blur-xl shadow-2xl shadow-black/20 border-b border-neutral-800/50'
          : 'bg-gradient-to-b from-neutral-950/90 to-transparent'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-3 sm:px-4 lg:px-6">
        <div className="flex items-center justify-between h-14 sm:h-16 lg:h-20">
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-500 rounded-xl blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-300" />
              <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-1.5 sm:p-2 rounded-xl group-hover:scale-110 transition-transform duration-300">
                <Film className="w-5 h-5 sm:w-6 sm:h-6 text-neutral-900" strokeWidth={2.5} />
              </div>
            </div>
            <div>
              <h1 className="text-base sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                CineMax
              </h1>
              <p className="text-[8px] sm:text-[10px] lg:text-xs text-neutral-400 -mt-0.5 sm:-mt-1 tracking-widest uppercase">
                Grand Cinema
              </p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a
              href="#now-playing"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative group"
            >
              Now Playing
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#coming-soon"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative group"
            >
              Coming Soon
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#promotions"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative group"
            >
              Promotions
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="#my-bookings"
              className="text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200 relative group"
            >
              My Bookings
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-500 group-hover:w-full transition-all duration-300" />
            </a>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors duration-200">
              <Ticket className="w-4 h-4" />
              <span>My Tickets</span>
            </button>
            <button className="px-5 py-2.5 bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600 text-neutral-900 font-bold text-sm rounded-lg transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-amber-500/25">
              Sign In
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-1.5 sm:p-2 text-neutral-300 hover:text-amber-400 transition-colors"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-neutral-950/95 backdrop-blur-xl border-t border-neutral-800/50 animate-slide-down">
          <div className="px-4 py-6 space-y-4">
            <a
              href="#now-playing"
              className="block text-base font-medium text-neutral-300 hover:text-amber-400 transition-colors py-2"
            >
              Now Playing
            </a>
            <a
              href="#coming-soon"
              className="block text-base font-medium text-neutral-300 hover:text-amber-400 transition-colors py-2"
            >
              Coming Soon
            </a>
            <a
              href="#promotions"
              className="block text-base font-medium text-neutral-300 hover:text-amber-400 transition-colors py-2"
            >
              Promotions
            </a>
            <a
              href="#my-bookings"
              className="block text-base font-medium text-neutral-300 hover:text-amber-400 transition-colors py-2"
            >
              My Bookings
            </a>
            <div className="pt-4 border-t border-neutral-800 space-y-3">
              <button className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-neutral-300 hover:text-amber-400 transition-colors border border-neutral-700 rounded-lg">
                <Ticket className="w-4 h-4" />
                <span>My Tickets</span>
              </button>
              <button className="w-full px-4 py-3 bg-gradient-to-r from-amber-500 to-yellow-500 text-neutral-900 font-bold text-sm rounded-lg">
                Sign In
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
