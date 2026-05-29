'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import type { Language } from '@/lib/types';

interface LanguageSwitcherProps {
  languages: Language[];
  activeLanguageId: string;
  userId: string;
}

export function LanguageSwitcher({ languages, activeLanguageId, userId }: LanguageSwitcherProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const active = languages.find(l => l.id === activeLanguageId);

  const switchLanguage = async (langId: string) => {
    setOpen(false);
    document.cookie = `active_lang=${langId}; path=/; max-age=31536000; SameSite=Lax`;
    const supabase = createClient();
    await supabase.from('profiles').update({ active_language_id: langId }).eq('id', userId);
    router.refresh();
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 bg-card border border-border rounded-xl px-3 py-1.5 text-sm font-bold shadow-sm hover:bg-muted transition-colors"
      >
        <span className="text-lg">{active?.flag_emoji}</span>
        <span>{active?.name_he}</span>
        <span className="text-xs text-muted-foreground">▼</span>
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: -8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.15 }}
              className="absolute right-0 top-full mt-2 w-52 bg-card border border-border rounded-2xl shadow-xl z-50 overflow-hidden"
            >
              {languages.map(lang => (
                <button
                  key={lang.id}
                  onClick={() => lang.is_active ? switchLanguage(lang.id) : null}
                  disabled={!lang.is_active}
                  className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium transition-colors text-right
                    ${lang.id === activeLanguageId ? 'bg-primary/10 text-primary' : 'hover:bg-muted'}
                    ${!lang.is_active ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span className="text-xl">{lang.flag_emoji}</span>
                  <div className="text-right">
                    <p className="font-bold">{lang.name_he}</p>
                    <p className="text-xs text-muted-foreground">{lang.is_active ? lang.name_native : 'בקרוב 🔜'}</p>
                  </div>
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
