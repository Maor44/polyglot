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

function StarRow({ stars, entryDelay }: { stars: number; entryDelay: number }) {
  return (
    <div className="flex gap-1 items-center">
      {[1, 2, 3].map(s => (
        <motion.span
          key={s}
          initial={{ scale: 0, rotate: -30 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: entryDelay + s * 0.08, type: 'spring', stiffness: 500, damping: 18 }}
          className="text-base leading-none select-none"
          style={
            s <= stars
              ? { filter: 'drop-shadow(0 0 5px #fbbf24)', color: '#f59e0b' }
              : { opacity: 0.18, color: '#9ca3af' }
          }
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

function Connector({ unlocked, color }: { unlocked: boolean; color: string }) {
  return (
    <div className="flex justify-center items-center py-1 relative" style={{ height: 28 }}>
      <motion.div
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="w-px h-full rounded-full"
        style={{
          background: unlocked
            ? `linear-gradient(to bottom, ${color}88, ${color}33)`
            : 'linear-gradient(to bottom, #d1d5db, #e5e7eb)',
          transformOrigin: 'top',
        }}
      />
    </div>
  );
}

export function LevelRoadmap({ levels, progress, categoryColor }: LevelRoadmapProps) {
  return (
    <div className="flex flex-col py-2">
      {levels.map((level, i) => {
        const prog = progress.find(p => p.level_id === level.id);
        const stars = prog ? getStars(prog.best_score) : 0;
        const isCompleted = prog?.completed ?? false;
        const prevLevel = levels[i - 1];
        const prevProg = prevLevel ? progress.find(p => p.level_id === prevLevel.id) : null;
        const isLocked = i > 0 && !(prevProg?.completed);
        const isCurrent = !isCompleted && !isLocked;
        const entryDelay = i * 0.12;

        return (
          <div key={level.id}>
            {i > 0 && <Connector unlocked={!isLocked} color={categoryColor} />}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: entryDelay, type: 'spring', stiffness: 280, damping: 26 }}
            >
              <Link
                href={isLocked ? '#' : `/lesson/${level.id}`}
                className={isLocked ? 'pointer-events-none' : 'block'}
                tabIndex={isLocked ? -1 : undefined}
              >
                <motion.div
                  whileHover={isLocked ? {} : { y: -3 }}
                  whileTap={isLocked ? {} : { scale: 0.985 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className={`relative rounded-2xl border overflow-hidden transition-shadow ${
                    isLocked
                      ? 'border-border/20 bg-muted/30'
                      : isCompleted
                      ? 'border-border/50 bg-card shadow-sm'
                      : 'border-transparent bg-card'
                  }`}
                  style={
                    isCurrent
                      ? { boxShadow: `0 0 0 2px ${categoryColor}99, 0 8px 28px ${categoryColor}28` }
                      : isCompleted
                      ? { boxShadow: `0 2px 10px ${categoryColor}18` }
                      : {}
                  }
                >
                  {/* Pulsing glow ring for active level */}
                  {isCurrent && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      animate={{ opacity: [0.35, 0.75, 0.35] }}
                      transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
                      style={{ boxShadow: `inset 0 0 0 2px ${categoryColor}` }}
                    />
                  )}

                  <div className="flex items-center gap-3 p-4">
                    {/* Badge */}
                    <motion.div
                      initial={{ scale: 0.6, opacity: 0 }}
                      animate={{ scale: 1, opacity: isLocked ? 0.45 : 1 }}
                      transition={{ delay: entryDelay + 0.1, type: 'spring', stiffness: 360, damping: 22 }}
                      className="shrink-0 w-14 h-14 rounded-xl flex flex-col items-center justify-center shadow-md"
                      style={
                        isLocked
                          ? { background: '#e5e7eb' }
                          : {
                              background: `linear-gradient(150deg, ${categoryColor}ee 0%, ${categoryColor} 100%)`,
                              boxShadow: `0 4px 14px ${categoryColor}55`,
                            }
                      }
                    >
                      {isLocked ? (
                        <span className="text-2xl select-none">🔒</span>
                      ) : (
                        <>
                          <span className="text-xl font-black text-white leading-none">
                            {level.level_number}
                          </span>
                          {isCompleted && (
                            <span className="text-[11px] font-black text-white/80 mt-0.5 leading-none">✓</span>
                          )}
                        </>
                      )}
                    </motion.div>

                    {/* Text content */}
                    <div className="flex-1 min-w-0">
                      <p
                        className={`text-[15px] font-black leading-tight truncate ${
                          isLocked ? 'text-muted-foreground' : 'text-foreground'
                        }`}
                      >
                        {level.label_he}
                      </p>
                      <div className="mt-1.5">
                        {isLocked ? (
                          <span className="text-xs text-muted-foreground/70">
                            השלם את הרמה הקודמת
                          </span>
                        ) : (
                          <StarRow stars={stars} entryDelay={entryDelay + 0.2} />
                        )}
                      </div>
                    </div>

                    {/* CTA button */}
                    {!isLocked && (
                      <motion.div
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: entryDelay + 0.25 }}
                        className="shrink-0 rounded-xl px-3.5 py-2 text-xs font-black text-white shadow-sm"
                        style={{
                          background: `linear-gradient(135deg, ${categoryColor}cc, ${categoryColor})`,
                          opacity: isCompleted ? 0.75 : 1,
                        }}
                      >
                        {isCompleted ? 'שוב' : 'התחל ▶'}
                      </motion.div>
                    )}
                  </div>

                  {/* Completion bar at bottom */}
                  {isCompleted && (
                    <motion.div
                      className="h-[3px]"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ delay: entryDelay + 0.35, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        background: `linear-gradient(to left, ${categoryColor}cc, ${categoryColor}44)`,
                        transformOrigin: 'right',
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}
