'use client';

import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';
import { LevelRoadmap } from '@/components/LevelRoadmap';
import { LessonClient } from '@/app/lesson/[levelId]/LessonClient';
import { createClient } from '@/lib/supabase/client';
import { buildLesson } from '@/lib/lesson-builder';
import type { Category, Level, UserLevelProgress, Language, Profile, UserLanguageProgress, VocabularyItem, Exercise } from '@/lib/types';

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

  // Inline lesson state (desktop only)
  const [selectedLevelId, setSelectedLevelId] = useState<string | null>(null);
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [loadingLesson, setLoadingLesson] = useState(false);
  const [lessonKey, setLessonKey] = useState(0); // force remount on restart
  const [localProgress, setLocalProgress] = useState<UserLevelProgress[]>(userProgress);

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

  const loadLesson = useCallback(async (levelId: string) => {
    setSelectedLevelId(levelId);
    setExercises(null);
    setLoadingLesson(true);
    const supabase = createClient();
    const { data: vocab } = await supabase
      .from('vocabulary')
      .select('*')
      .eq('level_id', levelId)
      .order('sort_order');
    if (vocab && vocab.length > 0) {
      setExercises(buildLesson(vocab as VocabularyItem[]));
    }
    setLoadingLesson(false);
  }, []);

  const handleSelectLevel = useCallback((levelId: string) => {
    if (typeof window !== 'undefined' && window.innerWidth < 1024) {
      router.push(`/lesson/${levelId}`);
      return;
    }
    setLessonKey(k => k + 1);
    loadLesson(levelId);
  }, [router, loadLesson]);

  const handleLessonClose = useCallback(() => {
    setSelectedLevelId(null);
    setExercises(null);
  }, []);

  const handleLessonRestart = useCallback(() => {
    if (!selectedLevelId) return;
    setLessonKey(k => k + 1);
    loadLesson(selectedLevelId);
  }, [selectedLevelId, loadLesson]);

  const handleLessonFinish = useCallback((score: number) => {
    if (!selectedLevelId) return;
    setLocalProgress(prev => {
      const existing = prev.find(p => p.level_id === selectedLevelId);
      if (existing) {
        return prev.map(p =>
          p.level_id === selectedLevelId
            ? { ...p, best_score: Math.max(p.best_score, score), completed: p.completed || score >= 60, attempts: p.attempts + 1 }
            : p
        );
      }
      return [...prev, {
        id: crypto.randomUUID(),
        user_id: userId,
        level_id: selectedLevelId,
        best_score: score,
        attempts: 1,
        completed: score >= 60,
        last_attempt_at: new Date().toISOString(),
      }];
    });
  }, [selectedLevelId, userId]);

  if (!category || !profile) return <div className="p-4 text-center">קטגוריה לא נמצאה</div>;

  const color = category.color;
  const completedCount = localProgress.filter(p => p.completed).length;
  const pct = levels.length > 0 ? Math.round((completedCount / levels.length) * 100) : 0;
  const selectedLevel = levels.find(l => l.id === selectedLevelId);

  return (
    <DashboardLayout profile={profile} langProgress={langProgress} languages={languages}>

      {/* ── Mobile header ── */}
      <div className="lg:hidden sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border">
        <div className="px-4 py-4 flex items-center justify-between">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg hover:bg-muted/80 transition-colors"
            aria-label="חזרה"
          >
            ←
          </button>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.emoji}</span>
            <h1 className="text-lg font-black">{category.name_he}</h1>
          </div>
          <div className="w-9" />
        </div>
      </div>

      {/* ── Desktop 3-panel layout ──
           RTL flex order: DOM[0]=rightmost → DOM[1]=middle → DOM[2]=leftmost
           Visual: [Menu nav fixed] | [Category sidebar] | [Roadmap sidebar] | [Main lesson]
           DOM:                                              [0]                  [1]              [2 flex-1]
      ── */}
      <div className="lg:flex lg:h-screen lg:overflow-hidden">

        {/* ── [0] Category sidebar — DOM first = rightmost (next to purple nav) ── */}
        <div
          className="relative hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:h-full overflow-hidden border-l border-white/10"
          style={{ background: `linear-gradient(170deg, ${color} 0%, ${color}cc 60%, ${color}99 100%)` }}
        >
          {/* Decorative circles */}
          <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-white/10 pointer-events-none" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-black/10 pointer-events-none" />

          <div className="relative z-10 flex flex-col h-full p-6">
            <button
              onClick={() => router.back()}
              className="w-10 h-10 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-lg hover:bg-white/30 transition-colors mb-6 self-start"
              aria-label="חזרה"
            >
              ←
            </button>

            <div className="w-20 h-20 rounded-3xl flex items-center justify-center text-4xl bg-white/20 backdrop-blur-sm shadow-2xl mb-5">
              {category.emoji}
            </div>

            <h1 className="text-2xl font-black text-white leading-tight mb-1">
              {category.name_he}
            </h1>
            <p className="text-white/60 text-sm mb-6">
              {language?.name_he ?? 'רומנית'}
            </p>

            <div className="grid grid-cols-3 gap-2 mb-5">
              {[
                { label: 'רמות', value: levels.length },
                { label: 'הושלמו', value: completedCount },
                { label: 'התקדמות', value: `${pct}%` },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-2.5 text-center bg-white/20 backdrop-blur-sm"
                >
                  <p className="text-lg font-black text-white leading-none">{stat.value}</p>
                  <p className="text-white/70 text-[10px] mt-1 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <div className="h-2 rounded-full overflow-hidden bg-white/20">
                <motion.div
                  initial={false}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
                  className="h-full rounded-full bg-white"
                />
              </div>
              <p className="text-white/50 text-xs mt-2 text-center">{pct}% הושלם</p>
            </div>

            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={generateAILesson}
              disabled={generatingAI}
              className="mt-auto w-full py-3.5 rounded-2xl font-black text-sm text-white bg-white/20 backdrop-blur-sm border border-white/30 shadow-lg disabled:opacity-60 flex items-center justify-center gap-2 transition-colors hover:bg-white/30"
            >
              {generatingAI ? (
                <>
                  <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>⚙️</motion.span>
                  מייצר שיעור...
                </>
              ) : <>✨ שיעור עם AI</>}
            </motion.button>
          </div>
        </div>

        {/* ── [1] Roadmap sidebar ── */}
        <div className="hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0 lg:h-full lg:overflow-y-auto bg-muted/40 border-l border-border/50">
          <div className="px-5 pt-6 pb-4 border-b border-border/40 bg-background/60">
            <h2 className="text-sm font-black text-foreground">מסלול הלמידה</h2>
            <p className="text-xs text-muted-foreground mt-0.5">בחר רמה להתחיל</p>
          </div>
          <div className="flex-1 overflow-y-auto px-3 py-3">
            <LevelRoadmap
              levels={levels}
              progress={localProgress}
              categoryColor={color}
              onSelectLevel={handleSelectLevel}
              activeLevelId={selectedLevelId}
            />
          </div>
        </div>

        {/* ── [2] Main lesson area (flex-1 = leftmost, largest) ── */}
        <div className="flex-1 lg:h-full overflow-hidden bg-background">

          {/* Mobile: AI button + roadmap */}
          <div className="lg:hidden">
            <div className="px-4 pt-5 pb-3">
              <motion.button
                whileTap={{ scale: 0.97 }}
                onClick={generateAILesson}
                disabled={generatingAI}
                className="w-full py-3.5 bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-2xl font-black text-base shadow-lg disabled:opacity-70 flex items-center justify-center gap-2"
              >
                {generatingAI ? (
                  <>
                    <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}>⚙️</motion.span>
                    מייצר שיעור...
                  </>
                ) : '✨ שיעור חדש עם AI'}
              </motion.button>
            </div>
            <div className="px-4 pb-8">
              <LevelRoadmap
                levels={levels}
                progress={localProgress}
                categoryColor={color}
                onSelectLevel={handleSelectLevel}
              />
            </div>
          </div>

          {/* Desktop: lesson or welcome */}
          <div className="hidden lg:flex lg:h-full">
            <AnimatePresence mode="wait">
              {loadingLesson ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-4 text-muted-foreground"
                >
                  <div className="w-10 h-10 rounded-full border-4 border-muted border-t-primary animate-spin" />
                  <p className="text-sm font-medium">טוען שיעור...</p>
                </motion.div>
              ) : exercises && selectedLevelId ? (
                <motion.div
                  key={`lesson-${lessonKey}`}
                  initial={{ opacity: 0, scale: 0.97 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.97 }}
                  transition={{ duration: 0.18 }}
                  className="w-full h-full"
                >
                  <LessonClient
                    key={lessonKey}
                    exercises={exercises}
                    levelId={selectedLevelId}
                    userId={userId}
                    languageId={language?.id ?? ''}
                    ttsLocale={language?.tts_locale ?? 'ro-RO'}
                    levelLabel={selectedLevel?.label_he ?? ''}
                    categoryName={category.name_he}
                    categoryEmoji={category.emoji}
                    inline
                    onClose={handleLessonClose}
                    onRestart={handleLessonRestart}
                    onFinish={handleLessonFinish}
                  />
                </motion.div>
              ) : (
                <motion.div
                  key="welcome"
                  initial={false}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -14 }}
                  transition={{ duration: 0.25 }}
                  className="w-full h-full flex flex-col items-center justify-center gap-5 text-center px-10"
                >
                  <motion.div
                    animate={{ scale: [1, 1.06, 1], rotate: [0, 4, -4, 0] }}
                    transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
                    className="text-7xl select-none"
                  >
                    {category.emoji}
                  </motion.div>
                  <div>
                    <h2 className="text-2xl font-black text-foreground mb-2">בחר רמה להתחיל</h2>
                    <p className="text-muted-foreground text-sm">לחץ על אחת הרמות כדי להתחיל שיעור</p>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-full bg-muted text-muted-foreground">
                    <span>בחר רמה מהרשימה ←</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
