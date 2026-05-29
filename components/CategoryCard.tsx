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

function StarRating({ completed, total }: { completed: number; total: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: total }).map((_, i) => (
        <span key={i} className={`text-xs transition-all ${i < completed ? 'opacity-100' : 'opacity-25'}`}>
          {i < completed ? '⭐' : '☆'}
        </span>
      ))}
    </div>
  );
}

// Circular progress ring
function ProgressRing({ pct, color, size = 48 }: { pct: number; color: string; size?: number }) {
  const r = (size - 8) / 2;
  const circ = 2 * Math.PI * r;
  const dash = (pct / 100) * circ;
  return (
    <svg width={size} height={size} className="-rotate-90">
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(255,255,255,0.2)" strokeWidth="4" />
      <motion.circle
        cx={size / 2} cy={size / 2} r={r}
        fill="none" stroke="white" strokeWidth="4"
        strokeLinecap="round"
        strokeDasharray={`${circ}`}
        initial={{ strokeDashoffset: circ }}
        animate={{ strokeDashoffset: circ - dash }}
        transition={{ duration: 1, ease: 'easeOut', delay: 0.2 }}
      />
    </svg>
  );
}

export function CategoryCard({ id, name_he, emoji, color, completedCount, totalLevels, totalXp, index }: CategoryCardProps) {
  const pct = totalLevels > 0 ? Math.round((completedCount / totalLevels) * 100) : 0;
  const isDone = completedCount === totalLevels && totalLevels > 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, type: 'spring', stiffness: 220, damping: 20 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      className="group"
    >
      <Link href={`/category/${id}`} className="block h-full">
        <div
          className="relative rounded-3xl overflow-hidden h-full min-h-[156px] cursor-pointer shadow-lg group-hover:shadow-xl transition-shadow"
          style={{ background: `linear-gradient(145deg, ${color}dd 0%, ${color} 100%)` }}
        >
          {/* Subtle shine overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent pointer-events-none" />

          {/* Done badge */}
          {isDone && (
            <div className="absolute top-3 left-3 bg-white/25 backdrop-blur-sm rounded-full px-2 py-0.5 text-xs font-black text-white">
              ✓ הושלם
            </div>
          )}

          {/* Ring + emoji */}
          <div className="absolute top-3 right-3">
            <div className="relative flex items-center justify-center">
              <ProgressRing pct={pct} color={color} size={52} />
              <span className="absolute text-2xl leading-none">{emoji}</span>
            </div>
          </div>

          {/* Content */}
          <div className="absolute bottom-0 inset-x-0 p-4">
            <h3 className="font-black text-white text-base leading-tight mb-1 drop-shadow">{name_he}</h3>
            <div className="flex items-center justify-between">
              <StarRating completed={completedCount} total={totalLevels} />
              <span className="text-white/70 text-xs font-bold">{totalXp > 0 ? `${totalXp} XP` : `${totalLevels} רמות`}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
