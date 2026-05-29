'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { DashboardLayout } from '@/components/DashboardLayout';
import type { Profile, UserLanguageProgress, Language } from '@/lib/types';

interface Props {
  profile: Profile | null;
  email: string;
  langProgress: UserLanguageProgress | null;
  languages: Language[];
}

export function ProfileClient({ profile, email, langProgress, languages }: Props) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const [name, setName] = useState(profile?.display_name ?? '');
  const [saving, setSaving] = useState(false);

  const saveName = async () => {
    if (!profile?.id) return;
    setSaving(true);
    const supabase = createClient();
    await supabase.from('profiles').update({ display_name: name }).eq('id', profile.id);
    setSaving(false);
  };

  const signOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push('/onboarding');
  };

  return (
    <DashboardLayout profile={profile!} langProgress={langProgress} languages={languages}>
      {/* Mobile header */}
      <div className="lg:hidden bg-gradient-to-br from-violet-600 to-purple-700 pt-12 pb-8 px-4 text-center">
        <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3 text-4xl">👤</div>
        <h1 className="text-white text-2xl font-black">{name || 'לומד'}</h1>
        <p className="text-purple-200 text-sm ltr-text">{email}</p>
      </div>

      <div className="px-4 lg:px-8 pt-6 lg:pt-8">
        {/* Desktop header */}
        <div className="hidden lg:flex items-center gap-6 mb-8">
          <div className="w-20 h-20 bg-gradient-to-br from-violet-400 to-purple-600 rounded-3xl flex items-center justify-center text-4xl shadow-lg">👤</div>
          <div>
            <h1 className="text-3xl font-black">{name || 'לומד'}</h1>
            <p className="text-muted-foreground ltr-text">{email}</p>
          </div>
        </div>

        <div className="max-w-lg lg:max-w-xl flex flex-col gap-4">
          {/* Name */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <p className="font-black mb-3">שם תצוגה</p>
            <div className="flex gap-2">
              <input
                value={name}
                onChange={e => setName(e.target.value)}
                className="flex-1 border border-border rounded-xl px-3 py-2.5 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary text-right"
              />
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={saveName}
                disabled={saving}
                className="px-5 py-2.5 bg-primary text-primary-foreground rounded-xl text-sm font-black disabled:opacity-60"
              >
                {saving ? '...' : 'שמור'}
              </motion.button>
            </div>
          </div>

          {/* Dark mode */}
          <div className="bg-card rounded-2xl p-5 border border-border shadow-sm">
            <p className="font-black mb-3">מצב תצוגה</p>
            <div className="flex gap-2">
              {[
                { value: 'light',  label: '☀️ בהיר' },
                { value: 'dark',   label: '🌙 כהה' },
                { value: 'system', label: '🖥️ מערכת' },
              ].map(opt => (
                <button
                  key={opt.value}
                  onClick={() => setTheme(opt.value)}
                  className={`flex-1 py-2.5 rounded-xl text-sm font-bold transition-all
                    ${theme === opt.value ? 'bg-primary text-primary-foreground shadow-sm' : 'bg-muted text-muted-foreground hover:bg-muted/80'}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={() => router.push('/languages')}
            className="w-full py-3.5 bg-card border border-border rounded-2xl font-bold text-sm hover:bg-muted transition-colors flex items-center justify-between px-5 shadow-sm"
          >
            <span>🌐 החלף שפה</span>
            <span className="text-muted-foreground">←</span>
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={signOut}
            className="w-full py-3.5 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-900 rounded-2xl font-bold text-sm text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-950/40 transition-colors"
          >
            🚪 התנתק
          </motion.button>
        </div>
      </div>
    </DashboardLayout>
  );
}
