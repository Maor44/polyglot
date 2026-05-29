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
  const reversed = exercise.reversed ?? false;
  // left = speaking side (target language) unless reversed
  const [leftItems] = useState<PairItem[]>(() =>
    exercise.pairs.map(p => ({ id: p.id, text: reversed ? p.he : p.target }))
  );
  const [rightItems] = useState<PairItem[]>(() =>
    [...exercise.pairs].sort(() => Math.random() - 0.5).map(p => ({ id: p.id, text: reversed ? p.target : p.he }))
  );
  const [selectedLeft, setSelectedLeft] = useState<string | null>(null);
  const [selectedRight, setSelectedRight] = useState<string | null>(null);
  const [matched, setMatched] = useState<Set<string>>(new Set());
  const [wrongPair, setWrongPair] = useState<[string, string] | null>(null);

  const handleLeft = (id: string, text: string) => {
    if (matched.has(id) || wrongPair !== null) return;
    if (!reversed) speak(text, ttsLocale);
    setSelectedLeft(id);
    checkMatch(id, selectedRight);
  };

  const handleRight = (id: string, text: string) => {
    if (matched.has(id) || wrongPair !== null) return;
    if (reversed) speak(text, ttsLocale);
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
      setSelectedLeft(null);
      setSelectedRight(null);
      onWrong();
      setTimeout(() => {
        setWrongPair(null);
      }, 600);
    }
  };

  const getStyle = (id: string, side: 'left' | 'right') => {
    const isMatched = matched.has(id);
    const isSelected = side === 'left' ? selectedLeft === id : selectedRight === id;
    const isWrong = wrongPair !== null && (side === 'left' ? wrongPair[0] === id : wrongPair[1] === id);
    if (isMatched) return 'bg-emerald-50 border-emerald-400 dark:bg-emerald-950/40 dark:border-emerald-600 opacity-50 shadow-none';
    if (isWrong) return 'bg-red-50 border-red-400 dark:bg-red-950/40 dark:border-red-500 shadow-none';
    if (isSelected) return 'bg-violet-50 border-violet-500 dark:bg-violet-950/40 dark:border-violet-400 shadow-lg shadow-violet-100 dark:shadow-violet-900/20 ring-2 ring-violet-300/50 dark:ring-violet-500/30';
    return 'bg-card border-border shadow-sm hover:border-violet-400 hover:shadow-md hover:shadow-violet-50 dark:hover:shadow-violet-900/20 hover:-translate-y-0.5';
  };

  const isWrongItem = (id: string, side: 'left' | 'right') =>
    wrongPair !== null && (side === 'left' ? wrongPair[0] === id : wrongPair[1] === id);

  const matchedCount = matched.size;
  const totalCount = exercise.pairs.length;
  const progressPct = (matchedCount / totalCount) * 100;

  return (
    <div className="flex flex-col gap-5 w-full">
      {/* Instruction + mini progress */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-muted-foreground font-medium">
          {reversed ? 'חבר כל מילה לתרגום שלה 🔊' : 'חבר כל מילה לתרגום שלה 🔊'}
        </p>
        <span className="text-xs font-bold text-muted-foreground tabular-nums">{matchedCount}/{totalCount}</span>
      </div>

      {/* Thin progress bar */}
      <div className="h-1 bg-muted rounded-full overflow-hidden -mt-2">
        <motion.div
          animate={{ width: `${progressPct}%` }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className="h-full bg-gradient-to-r from-violet-500 to-emerald-500 rounded-full"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        {/* Left column */}
        <div className="flex flex-col gap-2.5">
          {leftItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={
                matched.has(item.id)
                  ? { opacity: 0.5, scale: [1, 1.06, 1], y: 0 }
                  : isWrongItem(item.id, 'left')
                  ? { x: [0, -10, 10, -7, 7, 0], opacity: 1, y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={
                isWrongItem(item.id, 'left')
                  ? { duration: 0.4 }
                  : { delay: i * 0.04, duration: 0.25 }
              }
              whileTap={matched.has(item.id) ? {} : { scale: 0.95 }}
              onClick={() => handleLeft(item.id, item.text)}
              disabled={matched.has(item.id)}
              className={`${getStyle(item.id, 'left')} border-2 rounded-2xl px-4 py-4 text-sm font-bold text-center transition-all duration-150 min-h-[64px] flex items-center justify-center gap-2 cursor-pointer select-none`}
            >
              {matched.has(item.id) && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base">✓</motion.span>
              )}
              <span className={`${reversed ? '' : 'ltr-text'} leading-snug`}>{item.text}</span>
              {!reversed && !matched.has(item.id) && (
                <span className="text-[11px] opacity-30 flex-shrink-0">🔊</span>
              )}
            </motion.button>
          ))}
        </div>

        {/* Right column */}
        <div className="flex flex-col gap-2.5">
          {rightItems.map((item, i) => (
            <motion.button
              key={item.id}
              initial={{ opacity: 0, y: 12 }}
              animate={
                matched.has(item.id)
                  ? { opacity: 0.5, scale: [1, 1.06, 1], y: 0 }
                  : isWrongItem(item.id, 'right')
                  ? { x: [0, -10, 10, -7, 7, 0], opacity: 1, y: 0 }
                  : { opacity: 1, scale: 1, y: 0 }
              }
              transition={
                isWrongItem(item.id, 'right')
                  ? { duration: 0.4 }
                  : { delay: i * 0.04 + 0.02, duration: 0.25 }
              }
              whileTap={matched.has(item.id) ? {} : { scale: 0.95 }}
              onClick={() => handleRight(item.id, item.text)}
              disabled={matched.has(item.id)}
              className={`${getStyle(item.id, 'right')} border-2 rounded-2xl px-4 py-4 text-sm font-bold text-center transition-all duration-150 min-h-[64px] flex items-center justify-center gap-2 cursor-pointer select-none`}
            >
              {matched.has(item.id) && (
                <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-base">✓</motion.span>
              )}
              {reversed ? (
                <>
                  <span className="ltr-text leading-snug">{item.text}</span>
                  {!matched.has(item.id) && <span className="text-[11px] opacity-30 flex-shrink-0">🔊</span>}
                </>
              ) : (
                <span className="ltr-text leading-snug">{item.text}</span>
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
