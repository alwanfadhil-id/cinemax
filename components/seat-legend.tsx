'use client';

import { Badge } from '@/components/ui/badge';
import { Crown, Star, Ticket } from 'lucide-react';

export function SeatLegend() {
  const categories = [
    {
      name: 'VIP',
      color: 'from-emerald-500 to-emerald-600',
      price: 'Rp 100.000',
      icon: Crown,
      description: 'Best seats in the house',
    },
    {
      name: 'Premium',
      color: 'from-blue-500 to-blue-600',
      price: 'Rp 75.000',
      icon: Star,
      description: 'Great view, great price',
    },
    {
      name: 'Regular',
      color: 'from-slate-600 to-slate-700',
      price: 'Rp 50.000',
      icon: Ticket,
      description: 'Budget-friendly option',
    },
    {
      name: 'Selected',
      color: 'from-amber-400 to-yellow-500',
      price: 'Your choice',
      icon: null,
      description: 'Ready to book',
    },
    {
      name: 'Occupied',
      color: 'bg-neutral-800/50',
      price: 'Not available',
      icon: null,
      description: 'Already taken',
    },
  ];

  return (
    <div className="bg-neutral-900/60 rounded-xl p-6 border border-neutral-800/60">
      <h3 className="text-lg font-bold text-neutral-200 mb-6 uppercase tracking-wide flex items-center gap-2">
        <Ticket className="w-5 h-5 text-amber-400" />
        Seat Legend
      </h3>
      <div className="grid grid-cols-1 gap-3">
        {categories.map((cat, index) => {
          const Icon = cat.icon;
          return (
            <div 
              key={cat.name} 
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-neutral-800/30 transition-all duration-300 hover:scale-105 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${cat.color} flex items-center justify-center text-base font-bold flex-shrink-0 shadow-lg`}>
                {Icon && <Icon className="w-5 h-5 text-white" />}
                {!Icon && cat.name === 'Occupied' && (
                  <div className="w-3 h-3 bg-neutral-600 rounded-sm" />
                )}
                {!Icon && cat.name === 'Selected' && (
                  <div className="w-3 h-3 bg-neutral-900 rounded-sm" />
                )}
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-neutral-200">{cat.name}</p>
                  <p className="text-sm font-bold text-amber-400">{cat.price}</p>
                </div>
                <p className="text-xs text-neutral-500 mt-0.5">{cat.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
