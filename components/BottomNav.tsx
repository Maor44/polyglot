'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'motion/react';

const tabs = [
  { href: '/home', label: 'בית', icon: '🏠' },
  { href: '/progress', label: 'התקדמות', icon: '📊' },
  { href: '/languages', label: 'שפות', icon: '🌐' },
  { href: '/profile', label: 'פרופיל', icon: '👤' },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 inset-x-0 z-50 bg-card/95 backdrop-blur border-t border-border safe-bottom">
      <div className="flex items-center justify-around max-w-lg mx-auto px-2 pt-2 pb-1">
        {tabs.map(tab => {
          const active = pathname.startsWith(tab.href);
          return (
            <Link key={tab.href} href={tab.href} className="relative flex flex-col items-center gap-0.5 px-3 py-1 min-w-[56px]">
              {active && (
                <motion.div
                  layoutId="nav-indicator"
                  className="absolute inset-0 bg-primary/10 rounded-xl"
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }}
                />
              )}
              <span className={`text-2xl leading-none transition-transform ${active ? 'scale-110' : ''}`}>
                {tab.icon}
              </span>
              <span className={`text-[10px] font-medium transition-colors ${active ? 'text-primary' : 'text-muted-foreground'}`}>
                {tab.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
