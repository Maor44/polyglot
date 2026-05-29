'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { SpeakButton } from '@/components/SpeakButton';
import { speak } from '@/lib/audio';
import type { BuildExercise } from '@/lib/types';

interface Props {
  exercise: BuildExercise;
  ttsLocale: string;
  onCorrect: () => void;
  onWrong: () => void;
}

export function SentenceBuilder({ exercise, ttsLocale, onCorrect, onWrong }: Props) {
  const [available, setAvailable] = useState<string[]>(exercise.words);
  const [built, setBuilt] = useState<string[]>([]);
  const [checked, setChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => speak(exercise.item.target_text, ttsLocale), 400);
    return () => clearTimeout(timer);
  }, [exercise.item.target_text, ttsLocale]);

  const addWord = (word: string, index: number) => {
    if (checked) return;
    const newAvailable = [...available];
    newAvailable.splice(index, 1);
    setAvailable(newAvailable);
    setBuilt([...built, word]);
  };

  const removeWord = (word: string, index: number) => {
    if (checked) return;
    const newBuilt = [...built];
    newBuilt.splice(index, 1);
    setBuilt(newBuilt);
    setAvailable([...available, word]);
  };

  const check = () => {
    const correct = built.join(' ') === exercise.correctOrder.join(' ');
    setChecked(true);
    setIsCorrect(correct);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    if (correct) {
      onCorrect();
    } else {
      onWrong();
      setTimeout(() => {
        setChecked(false);
        if (newAttempts >= 2) {
          // hint: add first correct word
          const firstWord = exercise.correctOrder[0];
          const idx = available.indexOf(firstWord);
          if (idx !== -1) {
            addWord(firstWord, idx);
          }
        }
      }, 800);
    }
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-gradient-to-br from-green-50 to-teal-50 dark:from-green-950/30 dark:to-teal-950/30 rounded-2xl p-5 shadow-inner">
        <p className="text-xs text-muted-foreground font-medium mb-2 text-center">סדר את המילים למשפט:</p>
        <div className="flex items-center justify-center gap-2">
          <p className="text-lg font-black text-center">{exercise.item.he}</p>
          <SpeakButton text={exercise.item.target_text} locale={ttsLocale} size="sm" />
        </div>
      </div>

      {/* Build area */}
      <div className="min-h-[60px] bg-muted/50 rounded-2xl p-3 flex flex-wrap gap-2 items-center border-2 border-dashed border-border ltr-text">
        <AnimatePresence>
          {built.length === 0 && (
            <p className="text-muted-foreground text-sm w-full text-center">לחץ על מילים כדי לבנות משפט</p>
          )}
          {built.map((word, i) => (
            <motion.button
              key={`${word}-${i}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => removeWord(word, i)}
              className={`px-3 py-1.5 rounded-xl text-sm font-bold shadow-sm border-2 transition-all
                ${checked && isCorrect ? 'bg-green-100 border-green-500 text-green-700 dark:bg-green-950/40 dark:text-green-300' :
                  checked && !isCorrect ? 'bg-red-100 border-red-500 text-red-700 dark:bg-red-950/40 dark:text-red-300' :
                  'bg-white dark:bg-gray-800 border-primary/40 text-foreground hover:border-primary'}`}
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {/* Word chips */}
      <div className="flex flex-wrap gap-2 justify-center ltr-text">
        <AnimatePresence>
          {available.map((word, i) => (
            <motion.button
              key={`avail-${word}-${i}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => addWord(word, i)}
              className="px-3 py-1.5 bg-card border-2 border-border rounded-xl text-sm font-bold hover:border-primary hover:bg-primary/5 transition-all shadow-sm"
            >
              {word}
            </motion.button>
          ))}
        </AnimatePresence>
      </div>

      {built.length > 0 && !checked && (
        <motion.button
          whileTap={{ scale: 0.96 }}
          onClick={check}
          className="w-full py-3 bg-primary text-primary-foreground rounded-2xl font-black text-base shadow-lg hover:opacity-90 transition-opacity"
        >
          בדיקה ✓
        </motion.button>
      )}

      {attempts >= 2 && !isCorrect && (
        <p className="text-xs text-center text-amber-600 dark:text-amber-400">💡 רמז: המילה הראשונה הוצגה</p>
      )}
    </div>
  );
}
