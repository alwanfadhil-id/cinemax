'use client';

import { useEffect, useState } from 'react';
import { Film } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const [particles, setParticles] = useState<Array<{ left: number; top: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    // Generate particles client-side only
    setParticles(
      Array.from({ length: 30 }).map(() => ({
        left: Math.random() * 100,
        top: Math.random() * 100,
        delay: Math.random() * 3,
        duration: 3 + Math.random() * 2,
      }))
    );

    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsComplete(true);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(interval);
  }, []);

  if (isComplete) return null;

  return (
    <div
      className={`fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center transition-opacity duration-500 ${
        isComplete ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Animated background particles */}
      <div className="absolute inset-0 overflow-hidden">
        {particles.map((particle, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-amber-500/30 rounded-full animate-loading-float"
            style={{
              left: `${particle.left}%`,
              top: `${particle.top}%`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
            }}
          />
        ))}
      </div>

      {/* Logo */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="relative mb-8">
          {/* Glow effect */}
          <div className="absolute inset-0 bg-amber-500 rounded-2xl blur-2xl opacity-30 animate-pulse" />
          <div className="relative bg-gradient-to-br from-amber-500 to-yellow-600 p-5 rounded-2xl animate-loading-logo">
            <Film className="w-16 h-16 text-neutral-900" strokeWidth={2} />
          </div>
        </div>

        {/* Brand name */}
        <h1 className="text-4xl font-bold bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500 bg-clip-text text-transparent mb-2">
          CineMax
        </h1>
        <p className="text-sm text-neutral-500 tracking-[0.3em] uppercase mb-12">
          Grand Cinema
        </p>

        {/* Loading bar */}
        <div className="w-64">
          <div className="relative h-1.5 bg-neutral-800 rounded-full overflow-hidden">
            <div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full transition-all duration-100 ease-linear"
              style={{ width: `${progress}%` }}
            />
            {/* Shimmer effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-loading-shimmer" />
          </div>
          <p className="text-center text-xs text-neutral-500 mt-3">
            Loading experience... {progress}%
          </p>
        </div>
      </div>
    </div>
  );
}
