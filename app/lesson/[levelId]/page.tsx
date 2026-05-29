export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LessonClient } from './LessonClient';
import { buildLesson } from '@/lib/lesson-builder';

export default async function LessonPage({ params }: { params: Promise<{ levelId: string }> }) {
  const { levelId } = await params;

  // AI lesson is handled client-side
  if (levelId === 'ai') {
    const { LessonAIClient } = await import('./LessonAIClient');
    return <LessonAIClient />;
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/onboarding');

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();
  const langId = profile?.active_language_id ?? 'ro';

  const [{ data: level }, { data: vocab }, { data: language }] = await Promise.all([
    supabase.from('levels').select('*, categories(*)').eq('id', levelId).single(),
    supabase.from('vocabulary').select('*').eq('level_id', levelId).order('sort_order'),
    supabase.from('languages').select('*').eq('id', langId).single(),
  ]);

  if (!vocab || vocab.length === 0) redirect('/home');

  const exercises = buildLesson(vocab);

  return (
    <LessonClient
      exercises={exercises}
      levelId={levelId}
      userId={user.id}
      languageId={langId}
      ttsLocale={language?.tts_locale ?? 'ro-RO'}
      levelLabel={(level as Record<string, unknown> & { label_he?: string })?.label_he ?? ''}
      categoryName={(level as Record<string, unknown> & { categories?: { name_he: string; emoji: string } })?.categories?.name_he ?? ''}
      categoryEmoji={(level as Record<string, unknown> & { categories?: { emoji: string } })?.categories?.emoji ?? ''}
    />
  );
}
