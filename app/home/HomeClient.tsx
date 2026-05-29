'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { DashboardLayout } from '@/components/DashboardLayout';
import { CategoryCard } from '@/components/CategoryCard';
import type { Profile, UserLanguageProgress, Category, Level, UserLevelProgress, Language } from '@/lib/types';

interface Props {
  profile: Profile;
  langProgress: UserLanguageProgress;
  categories: Category[];
  levels: Level[];
  userProgress: UserLevelProgress[];
  languages: Language[];
}

export function HomeClient({ profile, langProgress, categories, levels, userProgress, languages }: Props) {
  const totalXp = langProgress?.total_xp ?? 0;
  const streak  = langProgress?.streak ?? 0;

  const enrichedCategories = categories.map((cat, i) => {
    const catLevels   = levels.filter(l => l.category_id === cat.id);
    const catProgress = catLevels.map(l => userProgress.find(p => p.level_id === l.id));
    const completedCount = catProgress.filter(p => p?.completed).length;
    const totalXpCat     = catProgress.reduce((sum, p) => sum + (p?.best_score ?? 0), 0);
    return { ...cat, completedCount, totalLevels: catLevels.length, totalXp: totalXpCat, index: i };
  });

  const [greeting, setGreeting] = useState('שלום');
  useEffect(() => {
    const hour = new Date().getHours();
    setGreeting(hour < 12 ? 'בוקר טוב' : hour < 17 ? 'צהריים טובים' : 'ערב טוב');
  }, []);
  const name = profile.display_name || 'לומד';

  const completedLevels = userProgress.filter(p => p.completed).length;
  const totalLevels     = levels.length;

  return (
    <DashboardLayout profile={profile} langProgress={langProgress} languages={languages}>
      {/* ── Mobile-only header (sidebar replaces this on desktop) ── */}
      <div className="lg:hidden bg-gradient-to-br from-violet-600 to-purple-700 pt-12 pb-6 px-4">
        <div className="max-w-lg mx-auto">
          <div className="flex items-start justify-between mb-4">
            <div>
              <p className="text-purple-200 text-sm font-medium">{greeting},</p>
              <h1 className="text-white text-2xl font-black">{name} 👋</h1>
            </div>
            <div className="text-2xl">🔥 {streak}</div>
          </div>
          <div className="mt-2">
            <div className="flex justify-between text-xs mb-1">
              <span className="text-purple-200">סה״כ XP</span>
              <span className="text-white font-black">{totalXp} ⭐</span>
            </div>
            <div className="h-2.5 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={false}
                animate={{ width: `${Math.min((totalXp % 500) / 5, 100)}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-yellow-400 rounded-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Desktop hero bar ── */}
      <div className="hidden lg:block bg-gradient-to-l from-violet-600/10 to-transparent border-b border-border/40 px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-muted-foreground text-sm">{greeting},</p>
            <h1 className="text-3xl font-black">{name} 👋</h1>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center">
              <p className="text-3xl font-black text-yellow-500">{totalXp}</p>
              <p className="text-xs text-muted-foreground font-medium">XP כולל</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-violet-600">{completedLevels}</p>
              <p className="text-xs text-muted-foreground font-medium">רמות הושלמו</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-black text-orange-500">{streak}</p>
              <p className="text-xs text-muted-foreground font-medium">ימי רצף 🔥</p>
            </div>
          </div>
        </div>
        {/* Overall progress bar */}
        <div className="mt-4 h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={false}
            animate={{ width: totalLevels > 0 ? `${(completedLevels / totalLevels) * 100}%` : '0%' }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
          />
        </div>
        <p className="text-xs text-muted-foreground mt-1">{completedLevels} מתוך {totalLevels} רמות הושלמו</p>
      </div>

      {/* ── Category grid ── */}
      <div className="px-4 lg:px-8 pt-6 lg:pt-8">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-black">קטגוריות</h2>
          <span className="text-sm text-muted-foreground">{categories.length} נושאים</span>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
          {enrichedCategories.map(cat => (
            <CategoryCard key={cat.id} {...cat} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
