'use client';

import { motion } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { Language, Profile } from '@/lib/types';

interface Props {
  languages: Language[];
  profile: Profile | null;
}

export function LanguagesClient({ languages, profile }: Props) {
  const router = useRouter();
  const supabase = createClient();

  const selectLanguage = async (lang: Language) => {
    if (!lang.is_active) return;
    const supabaseClient = createClient();
    if (profile?.id) {
      await supabaseClient.from('profiles').update({ active_language_id: lang.id }).eq('id', profile.id);
      const { data: existing } = await supabaseClient
        .from('user_language_progress')
        .select('placement_done')
        .eq('user_id', profile.id)
        .eq('language_id', lang.id)
        .single();

      if (!existing) {
        await supabaseClient.from('user_language_progress').insert({
          user_id: profile.id,
          language_id: lang.id,
        });
        router.push('/placement');
      } else if (!existing.placement_done) {
        router.push('/placement');
      } else {
        router.push('/home');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <h1 className="text-3xl font-black text-white mb-2">בחר שפה</h1>
          <p className="text-purple-200">איזו שפה תלמד היום?</p>
        </div>
        <div className="flex flex-col gap-3">
          {languages.map((lang, i) => (
            <motion.button
              key={lang.id}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1, type: 'spring' }}
              whileHover={lang.is_active ? { scale: 1.02 } : {}}
              whileTap={lang.is_active ? { scale: 0.98 } : {}}
              onClick={() => selectLanguage(lang)}
              disabled={!lang.is_active}
              className={`flex items-center gap-4 bg-white/95 dark:bg-gray-900/95 rounded-2xl p-4 shadow-lg transition-all
                ${lang.is_active ? 'cursor-pointer hover:shadow-xl' : 'opacity-60 cursor-not-allowed'}`}
            >
              <span className="text-5xl">{lang.flag_emoji}</span>
              <div className="text-right flex-1">
                <p className="font-black text-xl text-foreground">{lang.name_he}</p>
                <p className="text-muted-foreground text-sm ltr-text">{lang.name_native}</p>
              </div>
              {!lang.is_active && (
                <span className="text-xs bg-muted rounded-full px-2 py-1 text-muted-foreground font-medium">בקרוב 🔜</span>
              )}
              {lang.id === profile?.active_language_id && lang.is_active && (
                <span className="text-xs bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300 rounded-full px-2 py-1 font-bold">פעיל ✓</span>
              )}
            </motion.button>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
