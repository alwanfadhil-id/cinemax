'use client';

import { Film, Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative bg-neutral-900/80 border-t border-neutral-800/50 mt-20">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent" />

      <div className="max-w-screen-2xl mx-auto px-4 lg:px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-br from-amber-500 to-yellow-600 p-2 rounded-xl">
                <Film className="w-6 h-6 text-neutral-900" strokeWidth={2.5} />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                  CineMax
                </h3>
                <p className="text-xs text-neutral-500 tracking-widest uppercase">Grand Cinema</p>
              </div>
            </div>
            <p className="text-sm text-neutral-400 mb-4">
              Premium cinema experience with state-of-the-art sound and visual technology.
            </p>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Facebook className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Twitter className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-neutral-800 hover:bg-amber-500/20 rounded-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
              >
                <Instagram className="w-4 h-4 text-neutral-400 group-hover:text-amber-400" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wide mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Now Playing
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Coming Soon
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Cinemas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Promotions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Gift Cards
                </a>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wide mb-4">
              Support
            </h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  My Bookings
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Refund Policy
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Terms & Conditions
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-neutral-400 hover:text-amber-400 transition-colors">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-bold text-neutral-200 uppercase tracking-wide mb-4">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                <span className="text-sm text-neutral-400">
                  Jl. Sudirman No. 123, Jakarta Pusat
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-neutral-400">+62 21 1234 5678</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                <span className="text-sm text-neutral-400">support@cinemax.co.id</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-neutral-800/50">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-neutral-500">
              © 2026 CineMax Grand Cinema. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors">
                Terms
              </a>
              <a href="#" className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-neutral-500 hover:text-neutral-400 transition-colors">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
