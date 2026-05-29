'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeakButton } from '@/components/SpeakButton';
import { speak } from '@/lib/audio';
import type { MCExercise } from '@/lib/types';

interface Props {
  exercise: MCExercise;
  ttsLocale: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function MultipleChoice({ exercise, ttsLocale, onCorrect, onWrong }: Props) {
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);

  // Auto-play the target-language word when the exercise loads
  useEffect(() => {
    const timer = setTimeout(() => speak(exercise.item.target_text, ttsLocale), 400);
    return () => clearTimeout(timer);
  }, [exercise.item.target_text, ttsLocale]);

  const handleSelect = (option: string) => {
    if (answered) return;
    setSelected(option);
    setAnswered(true);
    if (option === exercise.correctAnswer) {
      onCorrect();
    } else {
      onWrong();
    }
  };

  const isTarget2he = exercise.direction === 'target2he';
  const prompt = isTarget2he ? exercise.item.target_text : exercise.item.he;
  const promptLabel = isTarget2he ? 'ברומנית:' : 'בעברית:';

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-2xl p-5 flex flex-col items-center gap-3 shadow-inner">
        <p className="text-xs text-muted-foreground font-medium">{promptLabel}</p>
        {isTarget2he && (
          <div className="flex items-center gap-3">
            <p className="ltr-text text-2xl font-black text-center">{prompt}</p>
            <SpeakButton text={prompt} locale={ttsLocale} size="md" />
          </div>
        )}
        {!isTarget2he && (
          <p className="text-2xl font-black text-center">{prompt}</p>
        )}
        {isTarget2he && exercise.item.translit && (
          <p className="text-sm text-muted-foreground ltr-text">[{exercise.item.translit}]</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-3">
        {exercise.options.map(option => {
          const isCorrect = option === exercise.correctAnswer;
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
              transition={{ duration: 0.4 }}
              onClick={() => handleSelect(option)}
              disabled={answered}
              className={`${style} rounded-xl p-3 text-sm font-bold text-center transition-all shadow-sm min-h-[52px] flex items-center justify-center`}
            >
              <span className={isTarget2he ? '' : 'ltr-text'}>{option}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {answered && !exercise.options.every(o => o !== exercise.correctAnswer) && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className={`rounded-xl p-3 text-sm font-medium flex items-center gap-2 ${selected === exercise.correctAnswer ? 'bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300' : 'bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300'}`}
          >
            {selected === exercise.correctAnswer ? (
              <>
                <span>✅ מעולה!</span>
                <SpeakButton text={exercise.item.target_text} locale={ttsLocale} size="sm" />
              </>
            ) : (
              <>
                <span>❌ תשובה נכונה:</span>
                <span className={isTarget2he ? '' : 'ltr-text font-bold'}>{exercise.correctAnswer}</span>
                <SpeakButton text={exercise.item.target_text} locale={ttsLocale} size="sm" />
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
