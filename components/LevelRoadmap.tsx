'use client';

import { motion } from 'motion/react';
import Link from 'next/link';
import type { Level, UserLevelProgress } from '@/lib/types';

interface LevelRoadmapProps {
  levels: Level[];
  progress: UserLevelProgress[];
  categoryColor: string;
}

function getStars(score: number): number {
  if (score >= 90) return 3;
  if (score >= 80) return 2;
  if (score >= 60) return 1;
  return 0;
}

export function LevelRoadmap({ levels, progress, categoryColor }: LevelRoadmapProps) {
  return (
    <div className="flex flex-col items-center gap-6 py-4">
      {levels.map((level, i) => {
        const prog = progress.find(p => p.level_id === level.id);
        const stars = prog ? getStars(prog.best_score) : 0;
        const isCompleted = prog?.completed ?? false;
        const prevLevel = levels[i - 1];
        const prevProg = prevLevel ? progress.find(p => p.level_id === prevLevel.id) : null;
        const isLocked = i > 0 && !(prevProg?.completed);
        const isCurrent = !isCompleted && !isLocked;

        return (
          <div key={level.id} className="flex flex-col items-center">
            {i > 0 && (
              <div
                className="w-1 h-8 rounded-full mb-0"
                style={{ background: isLocked ? '#e5e7eb' : categoryColor + '66' }}
              />
            )}
            <motion.div
              whileHover={isLocked ? {} : { scale: 1.05 }}
              whileTap={isLocked ? {} : { scale: 0.95 }}
              animate={isCurrent ? { boxShadow: [`0 0 0 4px ${categoryColor}44`, `0 0 0 8px ${categoryColor}22`, `0 0 0 4px ${categoryColor}44`] } : {}}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Link href={isLocked ? '#' : `/lesson/${level.id}`} className={isLocked ? 'pointer-events-none' : ''}>
                <div
                  className={`relative w-24 h-24 rounded-full flex flex-col items-center justify-center shadow-lg transition-all ${isLocked ? 'bg-gray-200 dark:bg-gray-700 opacity-60' : 'cursor-pointer'}`}
                  style={!isLocked ? { background: `linear-gradient(135deg, ${categoryColor}cc, ${categoryColor})` } : {}}
                >
                  {isLocked && <span className="text-3xl">🔒</span>}
                  {!isLocked && (
                    <>
                      <span className="text-2xl font-black text-white">{level.level_number}</span>
                      <div className="flex gap-0.5 mt-1">
                        {[1, 2, 3].map(s => (
                          <span key={s} className={`text-sm ${s <= stars ? '' : 'opacity-30'}`}>⭐</span>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </Link>
            </motion.div>
            <p className={`mt-2 text-sm font-bold ${isLocked ? 'text-muted-foreground' : 'text-foreground'}`}>
              {level.label_he}
            </p>
          </div>
        );
      })}
    </div>
  );
}
