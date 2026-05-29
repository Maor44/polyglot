'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';
import { BottomNav } from './BottomNav';
import { StreakBadge } from './StreakBadge';
import { LanguageSwitcher } from './LanguageSwitcher';
import type { Profile, UserLanguageProgress, Language } from '@/lib/types';

interface Props {
  children: React.ReactNode;
  profile: Profile;
  langProgress: UserLanguageProgress | null;
  languages: Language[];
}

const navItems = [
  { href: '/home',     icon: '🏠', label: 'בית' },
  { href: '/progress', icon: '📊', label: 'התקדמות' },
  { href: '/languages',icon: '🌐', label: 'שפות' },
  { href: '/profile',  icon: '👤', label: 'פרופיל' },
];

export function DashboardLayout({ children, profile, langProgress, languages }: Props) {
  const pathname = usePathname();
  const totalXp  = langProgress?.total_xp ?? 0;
  const streak   = langProgress?.streak ?? 0;
  const xpLevel  = Math.floor(totalXp / 500) + 1;
  const xpInLevel = totalXp % 500;

  return (
    <div className="min-h-screen flex">
      {/* ── Desktop Sidebar (RTL: fixed to the right) ── */}
      <aside className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-72 z-30
                        bg-gradient-to-b from-violet-700 via-violet-800 to-indigo-900
                        border-l border-white/10 shadow-2xl">

        {/* Logo */}
        <div className="px-6 pt-8 pb-6 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center text-2xl shadow-inner">
              🌍
            </div>
            <div>
              <h1 className="text-white font-black text-xl leading-none">Polyglot</h1>
              <p className="text-violet-300 text-xs mt-0.5">למד שפות בקלי קלות</p>
            </div>
          </div>
        </div>

        {/* User card */}
        <div className="px-4 py-4 border-b border-white/10">
          <div className="bg-white/10 rounded-2xl p-4 backdrop-blur-sm">
            <div className="flex items-center justify-between mb-3">
              <div>
                <p className="text-violet-200 text-xs">שלום,</p>
                <p className="text-white font-black text-base leading-tight">{profile.display_name || 'לומד'}</p>
              </div>
              <StreakBadge streak={streak} />
            </div>
            {/* XP bar */}
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="text-violet-300 font-medium">רמה {xpLevel}</span>
              <span className="text-yellow-300 font-black">{totalXp} ⭐</span>
            </div>
            <div className="h-2 bg-white/20 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(xpInLevel / 500) * 100}%` }}
                transition={{ duration: 1.2, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full"
              />
            </div>
            <p className="text-violet-300 text-xs mt-1 text-center">{xpInLevel}/500 לרמה הבאה</p>
          </div>
        </div>

        {/* Language switcher */}
        <div className="px-4 py-3 border-b border-white/10">
          <LanguageSwitcher
            languages={languages}
            activeLanguageId={profile.active_language_id}
            userId={profile.id}
          />
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 flex flex-col gap-1">
          {navItems.map(item => {
            const active = pathname.startsWith(item.href);
            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all cursor-pointer
                    ${active
                      ? 'bg-white/20 text-white shadow-md'
                      : 'text-violet-300 hover:bg-white/10 hover:text-white'}`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="font-bold text-sm">{item.label}</span>
                  {active && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="mr-auto w-1.5 h-1.5 rounded-full bg-yellow-400"
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="px-4 pb-6 pt-2 border-t border-white/10">
          <p className="text-violet-400 text-xs text-center">Polyglot v1.0 🌍</p>
        </div>
      </aside>

      {/* ── Main content (offset from sidebar on desktop) ── */}
      <main className="flex-1 min-w-0 lg:mr-72 pb-20 lg:pb-0">
        {children}
      </main>

      {/* ── Mobile bottom nav ── */}
      <div className="lg:hidden">
        <BottomNav />
      </div>
    </div>
  );
}
