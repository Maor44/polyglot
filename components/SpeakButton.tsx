'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { speak } from '@/lib/audio';

interface SpeakButtonProps {
  text: string;
  locale: string;
  size?: 'sm' | 'md' | 'lg';
}

export function SpeakButton({ text, locale, size = 'md' }: SpeakButtonProps) {
  const [speaking, setSpeaking] = useState(false);

  const handleSpeak = () => {
    setSpeaking(true);
    speak(text, locale);
    setTimeout(() => setSpeaking(false), 1000);
  };

  const sizeClass = { sm: 'w-7 h-7 text-sm', md: 'w-9 h-9 text-base', lg: 'w-11 h-11 text-xl' }[size];

  return (
    <motion.button
      whileTap={{ scale: 0.85 }}
      animate={speaking ? { scale: [1, 1.2, 1] } : {}}
      transition={{ duration: 0.3 }}
      onClick={handleSpeak}
      aria-label={`השמע את "${text}"`}
      className={`${sizeClass} rounded-full bg-blue-100 dark:bg-blue-900/40 text-blue-600 dark:text-blue-300 flex items-center justify-center hover:bg-blue-200 transition-colors flex-shrink-0`}
    >
      🔊
    </motion.button>
  );
}
