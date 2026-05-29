'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { speak } from '@/lib/audio';
import type { MatchingExercise } from '@/lib/types';

interface Props {
  exercise: MatchingExercise;
  ttsLocale: string;
  onComplete: () => void;
  onWrong: () => void;
}

interface PairItem {
  id: string;
  text: string;
}

export function MatchingPairs({ exercise, ttsLocale, onComplete, onWrong }: Props) {
  const [leftItems] = useState<PairItem[]>(() =>
    exercise.pairs.map(p => ({ id: p.id, text: p.target }))
  );
  const [rightItems] = useState<PairItem[]>(() =>
    [...exercise.pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, text: p.he }))
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);

  const handleLeft = (id: string, text: string) => {
    if (matched.has(id)) return;
    speak(text, ttsLocale);
    setSelectedLeft(id);
    checkMatch(id, selectedRight);
  };

  const handleRight = (id: string) => {
    if (matched.has(id)) return;
    setSelectedRight(id);
    checkMatch(selectedLeft, id);
  };

  const checkMatch = (leftId: string | null, rightId: string | null) => {
    if (!leftId || !rightId) return;
    if (leftId === rightId) {
      const newMatched = new Set(matched);
      newMatched.add(leftId);
      setMatched(newMatched);
      setSelectedLeft(null);
      setSelectedRight(null);
      if (newMatched.size === exercise.pairs.length) {
        setTimeout(onComplete, 500);
      }
    } else {
      setWrongPair([leftId, rightId]);
      onWrong();
      setTimeout(() => {
        setWrongPair(null);
        setSelectedLeft(null);
        setSelectedRight(null);
      }, 600);
    }
  };

  const getStyle = (id: string, side: 'left' | 'right') => {
    const isMatched = matched.has(id);
    const isSelected = side === 'left' ? selectedLeft === id : selectedRight === id;
    const isWrong = wrongPair && (wrongPair[0] === id || wrongPair[1] === id);
    if (isMatched) return 'bg-green-100 border-green-500 dark:bg-green-950/40 opacity-60';
    if (isWrong) return 'bg-red-100 border-red-500 dark:bg-red-950/40';
    if (isSelected) return 'bg-primary/10 border-primary ring-2 ring-primary/30';
    return 'bg-card border-border hover:border-primary hover:bg-primary/5';
  };

  return (
    <div className="flex flex-col gap-4">
      <p className="text-center text-sm text-muted-foreground font-medium">
        חבר כל מילה לתרגום שלה • לחץ על הרומנית לשמוע 🔊
      </p>
      <div className="grid grid-cols-2 gap-3">
        {/* Left column — target language, tappable to speak */}
        <div className="flex flex-col gap-2">
          {leftItems.map(item => (
            <motion.button
              key={item.id}
              animate={matched.has(item.id) ? { scale: [1, 1.05, 1] } : {}}
              whileTap={matched.has(item.id) ? {} : { scale: 0.96 }}
              onClick={() => handleLeft(item.id, item.text)}
              disabled={matched.has(item.id)}
              className={`${getStyle(item.id, 'left')} border-2 rounded-xl p-3 text-sm font-bold text-center transition-all min-h-[52px] flex items-center justify-between gap-1`}
            >
              <span className="ltr-text flex-1 text-center">{item.text}</span>
              {!matched.has(item.id) && (
                <span className="text-xs opacity-40 flex-shrink-0">🔊</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Right column — Hebrew */}
        <div className="flex flex-col gap-2">
          {rightItems.map(item => (
            <motion.button
              key={item.id}
              animate={matched.has(item.id) ? { scale: [1, 1.05, 1] } : {}}
              whileTap={matched.has(item.id) ? {} : { scale: 0.96 }}
              onClick={() => handleRight(item.id)}
              disabled={matched.has(item.id)}
              className={`${getStyle(item.id, 'right')} border-2 rounded-xl p-3 text-sm font-bold text-center transition-all min-h-[52px] flex items-center justify-center`}
            >
              {item.text}
            </motion.button>
          ))}
        </div>
      </div>
      <p className="text-center text-xs text-muted-foreground">
        {matched.size}/{exercise.pairs.length} זוגות התאמו ✓
      </p>
    </div>
  );
}
