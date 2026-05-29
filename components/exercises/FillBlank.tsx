'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeakButton } from '@/components/SpeakButton';
import { speak } from '@/lib/audio';
import type { FillExercise } from '@/lib/types';

interface Props {
  exercise: FillExercise;
  ttsLocale: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function FillBlank({ exercise, ttsLocale, onCorrect, onWrong }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => speak(exercise.item.target_text, ttsLocale), 400);
    return () => clearTimeout(timer);
  }, [exercise.item.target_text, ttsLocale]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === exercise.missingWord) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const parts = exercise.blankedText.split('____');

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30 rounded-2xl p-5 shadow-inner">
        <p className="text-xs text-muted-foreground font-medium mb-2 text-center">השלם את המשפט:</p>
        <p className="text-sm text-muted-foreground text-center mb-3">🇮🇱 {exercise.item.he}</p>
        <div className="flex items-center justify-center gap-1 flex-wrap ltr-text text-lg font-bold">
          <span>{parts[0]}</span>
          <AnimatePresence mode="wait">
            {answered ? (
              <motion.span
                key="filled"
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className={`px-2 py-0.5 rounded-lg border-2 ${selected === exercise.missingWord ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-red-100 border-red-500 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}
              >
                {answered && selected !== exercise.missingWord ? exercise.missingWord : selected}
              </motion.span>
            ) : (
              <span key="blank" className="px-6 py-0.5 rounded-lg border-2 border-dashed border-primary/50 bg-primary/5 min-w-[60px] text-center">
                ____
              </span>
            )}
          </AnimatePresence>
          <span>{parts[1]}</span>
          <SpeakButton text={exercise.item.target_text} locale={ttsLocale} size="sm" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map(option => {
          const isCorrect = option === exercise.missingWord;
          const isSelected = option === selected;
          let style = 'bg-card border-2 border-border hover:border-primary hover:bg-primary/5';
          if (answered && isSelected && isCorrect) style = 'bg-green-100 border-green-500 dark:bg-green-950/40';
          if (answered && isSelected && !isCorrect) style = 'bg-red-100 border-red-500 dark:bg-red-950/40';
          if (answered && !isSelected && isCorrect) style = 'bg-green-100 border-green-500 dark:bg-green-950/40';

          return (
            <motion.button
              key={option}
              whileTap={answered ? {} : { scale: 0.96 }}
              animate={answered && isSelected && !isCorrect ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`${style} rounded-xl p-3 text-sm font-bold ltr-text text-center transition-all shadow-sm min-h-[48px]`}
            >
              {option}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
