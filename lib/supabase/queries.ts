import { createClient } from './client';
import type { Category, Level, VocabularyItem, UserLevelProgress, UserLanguageProgress } from '../types';

export async function getCategoriesWithProgress(userId: string, languageId: string) {
  const supabase = createClient();

  const [catRes, levelsRes, progressRes] = await Promise.all([
    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('levels').select('*').eq('language_id', languageId),
    supabase.from('user_level_progress').select('*').eq('user_id', userId),
  ]);

  const categories = catRes.data as Category[];
  const levels = levelsRes.data as Level[];
  const progress = progressRes.data as UserLevelProgress[];

  return categories.map(cat => {
    const catLevels = levels.filter(l => l.category_id === cat.id);
    const catProgress = catLevels.map(l =>
      progress.find(p => p.level_id === l.id)
    );
    const completedCount = catProgress.filter(p => p?.completed).length;
    const totalXp = catProgress.reduce((sum, p) => sum + (p?.best_score ?? 0), 0);
    return { ...cat, levels: catLevels, completedCount, totalLevels: catLevels.length, totalXp };
  });
}

export async function getLevelsForCategory(categoryId: string, languageId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from('levels')
    .select('*')
    .eq('category_id', categoryId)
    .eq('language_id', languageId)
    .order('level_number');
  return (data ?? []) as Level[];
}

export async function getVocabForLevel(levelId: string): Promise<VocabularyItem[]> {
  const supabase = createClient();
  const { data } = await supabase
    .from('vocabulary')
    .select('*')
    .eq('level_id', levelId)
    .order('sort_order');
  return (data ?? []) as VocabularyItem[];
}

export async function upsertLevelProgress(
  userId: string,
  levelId: string,
  score: number
): Promise<void> {
  const supabase = createClient();
  const completed = score >= 60;
  await supabase.from('user_level_progress').upsert(
    {
      user_id: userId,
      level_id: levelId,
      best_score: score,
      completed,
      last_attempt_at: new Date().toISOString(),
    },
    {
      onConflict: 'user_id,level_id',
      ignoreDuplicates: false,
    }
  );
}

export async function updateLanguageXp(
  userId: string,
  languageId: string,
  xpToAdd: number,
  newStreak: number,
  today: string
): Promise<void> {
  const supabase = createClient();
  const { data: existing } = await supabase
    .from('user_language_progress')
    .select('total_xp')
    .eq('user_id', userId)
    .eq('language_id', languageId)
    .single();

  const currentXp = existing?.total_xp ?? 0;
  await supabase.from('user_language_progress').upsert(
    {
      user_id: userId,
      language_id: languageId,
      total_xp: currentXp + xpToAdd,
      streak: newStreak,
      last_played_date: today,
    },
    { onConflict: 'user_id,language_id' }
  );
}

export async function getUserLanguageProgress(
  userId: string,
  languageId: string
): Promise<UserLanguageProgress | null> {
  const supabase = createClient();
  const { data } = await supabase
    .from('user_language_progress')
    .select('*')
    .eq('user_id', userId)
    .eq('language_id', languageId)
    .single();
  return data as UserLanguageProgress | null;
}

export async function getLevelProgressForCategory(
  userId: string,
  levelIds: string[]
): Promise<UserLevelProgress[]> {
  if (levelIds.length === 0) return [];
  const supabase = createClient();
  const { data } = await supabase
    .from('user_level_progress')
    .select('*')
    .eq('user_id', userId)
    .in('level_id', levelIds);
  return (data ?? []) as UserLevelProgress[];
}
