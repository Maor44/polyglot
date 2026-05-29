'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LevelRoadmap } from '@/components/LevelRoadmap';
import type { Category, Level, UserLevelProgress, Language, Profile, UserLanguageProgress } from '@/lib/types';

interface Props {
  category: Category | null;
  levels: Level[];
  userProgress: UserLevelProgress[];
  language: Language | null;
  userId: string;
  profile: Profile | null;
  langProgress: UserLanguageProgress | null;
  languages: Language[];
}

export function CategoryClient({ category, levels, userProgress, language, userId, profile, langProgress, languages }: Props) {
  const router = useRouter();
  const [generatingAI, setGeneratingAI] = useState(false);

  const generateAILesson = async () => {
    if (!language || !category) return;
    setGeneratingAI(true);
    try {
      const res = await fetch('/api/generate-lesson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          languageId: language.id,
          languageName: language.name_he,
          categoryId: category.id,
          categoryNameHe: category.name_he,
          levelNumber: 1,
          ttsLocale: language.tts_locale,
        }),
      });
      const data = await res.json();
      if (data.items) {
        sessionStorage.setItem('ai-lesson', JSON.stringify({ items: data.items, categoryId: category.id, ttsLocale: language.tts_locale }));
        router.push('/lesson/ai');
      } else {
        alert('🤖 ה-AI יצא להפסקת קפה ☕ נסה שוב עוד רגע');
      }
    } catch {
      alert('🤖 ה-AI יצא להפסקת קפה ☕ נסה שוב עוד רגע');
    } finally {
      setGeneratingAI(false);
    }
  };

  if (!category || !profile) return <div className="p-4 text-center">קטגוריה לא נמצאה</div>;

  return (
    <DashboardLayout profile={profile} langProgress={langProgress} languages={languages}>
      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border">
        <div className="px-4 lg:px-8 py-4 flex items-center justify-between max-w-4xl">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg hover:bg-muted/80 transition-colors"
            aria-label="חזרה"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{category.emoji}</span>
            <h1 className="text-xl font-black">{category.name_he}</h1>
          </div>
          <div className="w-9" />
        </div>
      </div>

      <div className="px-4 lg:px-8 pt-6 lg:pt-8">
        <div className="lg:flex lg:gap-12 max-w-4xl">
          {/* AI Button + roadmap */}
          <div className="flex-1">
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={generateAILesson}
              disabled={generatingAI}
              className="w-full py-3.5 mb-8 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-black text-base shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {generatingAI ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1 }}>⚙️</motion.span>
                  מייצר שיעור...
                </>
              ) : '✨ שיעור חדש עם AI'}
            </motion.button>

            <LevelRoadmap levels={levels} progress={userProgress} categoryColor={category.color} />
          </div>

          {/* Desktop: category stats panel */}
          <div className="hidden lg:block w-64 shrink-0">
            <div
              className="rounded-3xl p-6 text-white"
              style={{ background: `linear-gradient(145deg, ${category.color}cc, ${category.color})` }}
            >
              <div className="text-6xl mb-4 text-center">{category.emoji}</div>
              <h2 className="text-xl font-black text-center mb-4">{category.name_he}</h2>
              <div className="space-y-3">
                <div className="bg-white/20 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black">{levels.length}</p>
                  <p className="text-sm text-white/80">רמות</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black">{userProgress.filter(p => p.completed).length}</p>
                  <p className="text-sm text-white/80">הושלמו</p>
                </div>
                <div className="bg-white/20 rounded-2xl p-3 text-center">
                  <p className="text-2xl font-black">
                    {levels.length > 0 ? Math.round((userProgress.filter(p => p.completed).length / levels.length) * 100) : 0}%
                  </p>
                  <p className="text-sm text-white/80">התקדמות</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
