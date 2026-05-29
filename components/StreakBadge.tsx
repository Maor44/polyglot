'use client';

import { motion } from 'motion/react';

interface StreakBadgeProps {
  streak: number;
}

export function StreakBadge({ streak }: StreakBadgeProps) {
  const isHot = streak >= 3;
  return (
    <motion.div
      animate={isHot ? { scale: [1, 1.05, 1] } : {}}
      transition={{ repeat: Infinity, duration: 2 }}
      className="flex items-center gap-1 bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-300 rounded-full px-3 py-1 font-bold text-sm"
    >
      <span className={`text-lg ${isHot ? 'animate-bounce' : ''}`}>🔥</span>
      <span>{streak}</span>
    </motion.div>
  );
}
