'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { buildLesson } from '@/lib/lesson-builder';
import { LessonClient } from './LessonClient';
import type { VocabularyItem, Exercise } from '@/lib/types';

export function LessonAIClient() {
  const router = useRouter();
  const [exercises, setExercises] = useState<Exercise[] | null>(null);
  const [ttsLocale, setTtsLocale] = useState('ro-RO');

  useEffect(() => {
    const raw = sessionStorage.getItem('ai-lesson');
    if (!raw) { router.push('/home'); return; }
    try {
      const { items, ttsLocale: locale } = JSON.parse(raw) as { items: VocabularyItem[]; ttsLocale: string };
      const built = buildLesson(items.map((it, i) => ({ ...it, id: `ai-${i}`, level_id: 'ai', audio_url: null, sort_order: i })));
      setExercises(built);
      if (locale) setTtsLocale(locale);
    } catch {
      router.push('/home');
    }
  }, [router]);

  if (!exercises) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-3">✨</div>
          <p className="text-muted-foreground">טוען שיעור AI...</p>
        </div>
      </div>
    );
  }

  return (
    <LessonClient
      exercises={exercises}
      levelId="ai"
      userId=""
      languageId=""
      ttsLocale={ttsLocale}
      levelLabel="AI"
      categoryName="שיעור מיוחד"
      categoryEmoji="✨"
    />
  );
}
