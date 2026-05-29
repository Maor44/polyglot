'use client';

import { motion } from 'motion/react';
import Link from 'next/link';

interface CategoryCardProps {
  id: string;
  name_he: string;
  emoji: string;
  color: string;
  completedCount: number;
  totalLevels: number;
  totalXp: number;
  index: number;
}

export function CategoryCard({ id, name_he, emoji, color, completedCount, totalLevels, totalXp, index }: CategoryCardProps) {
  const pct = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;
  const isDone = completedCount === totalLevels && totalLevels > 0;
  const hasProgress = completedCount > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.05, type: 'spring', stiffness: 240, damping: 22 }}
      whileHover={{ y: -5, scale: 1.03 }}
      whileTap={{ scale: 0.96 }}
      className="group"
    >
      <Link href={`/category/${id}`} className="block h-full">
        <div
          className="relative rounded-3xl overflow-hidden h-full min-h-[168px] cursor-pointer"
          style={{
            background: `linear-gradient(150deg, ${color}ff 0%, ${color}cc 100%)`,
            boxShadow: `0 8px 24px ${color}55, 0 2px 8px ${color}33`,
          }}
        >
          {/* Top shine */}
          <div className="absolute inset-0 bg-gradient-to-b from-white/25 via-transparent to-black/20 pointer-events-none" />

          {/* Done ribbon */}
          {isDone && (
            <div className="absolute top-0 left-0 right-0 h-1 bg-white/60" />
          )}

          {/* Top row: emoji bubble + done badge */}
          <div className="absolute top-3 right-3 left-3 flex items-start justify-between">
            {/* Emoji in frosted pill */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center text-2xl shadow-md"
              style={{ background: 'rgba(255,255,255,0.28)', backdropFilter: 'blur(6px)' }}
            >
              {emoji}
            </div>

            {isDone ? (
              <div className="bg-white/90 text-xs font-black rounded-full px-2.5 py-1 shadow-sm" style={{ color }}>
                ✓ הושלם
              </div>
            ) : hasProgress ? (
              <div className="bg-black/20 backdrop-blur-sm text-white text-xs font-bold rounded-full px-2.5 py-1">
                {pct}%
              </div>
            ) : null}
          </div>

          {/* Bottom content */}
          <div className="absolute bottom-0 inset-x-0 p-4 pt-14">
            <h3 className="font-black text-white text-[15px] leading-snug mb-2.5 drop-shadow-sm">
              {name_he}
            </h3>

            {/* Progress bar */}
            <div className="h-1.5 bg-white/25 rounded-full overflow-hidden mb-2">
              <motion.div
                className="h-full rounded-full bg-white"
                initial={false}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: index * 0.05 + 0.3 }}
              />
            </div>

            {/* Level count + xp */}
            <div className="flex items-center justify-between">
              <span className="text-white/90 text-xs font-bold">{totalLevels} רמות</span>
              {totalXp > 0 && (
                <span className="text-white/80 text-xs font-bold">{totalXp} XP ⭐</span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
