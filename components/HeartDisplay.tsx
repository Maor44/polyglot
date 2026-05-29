'use client';

import { motion } from 'motion/react';

interface HeartDisplayProps {
  hearts: number;
  maxHearts?: number;
}

export function HeartDisplay({ hearts, maxHearts = 3 }: HeartDisplayProps) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: maxHearts }).map((_, i) => (
        <motion.span
          key={i}
          animate={i === hearts ? { scale: [1, 1.4, 0.8, 1] } : {}}
          transition={{ duration: 0.4 }}
          className={`text-xl ${i < hearts ? '' : 'opacity-25 grayscale'}`}
        >
          ❤️
        </motion.span>
      ))}
    </div>
  );
}
