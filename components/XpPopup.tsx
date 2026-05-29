'use client';

import { motion, AnimatePresence } from 'motion/react';

interface XpPopupProps {
  show: boolean;
  amount: number;
}

export function XpPopup({ show, amount }: XpPopupProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1, y: 0, scale: 1 }}
          animate={{ opacity: 0, y: -60, scale: 1.2 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 pointer-events-none select-none"
        >
          <span className="text-2xl font-black text-yellow-400 drop-shadow-lg">
            +{amount} XP ⭐
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
