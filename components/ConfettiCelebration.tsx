'use client';

import { useEffect } from 'react';
import confetti from 'canvas-confetti';

interface ConfettiCelebrationProps {
  trigger: boolean;
  intensity?: 'small' | 'full';
}

export function ConfettiCelebration({ trigger, intensity = 'full' }: ConfettiCelebrationProps) {
  useEffect(() => {
    if (!trigger) return;
    if (intensity === 'full') {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 },
        colors: ['#FF6B6B', '#845EF7', '#51CF66', '#FF922B', '#339AF0', '#F06595'],
      });
    } else {
      confetti({
        particleCount: 30,
        spread: 50,
        origin: { y: 0.5 },
        scalar: 0.8,
      });
    }
  }, [trigger, intensity]);

  return null;
}
