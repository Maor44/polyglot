export interface Language {
  id: string;
  name_he: string;
  name_native: string;
  flag_emoji: string;
  tts_locale: string;
  is_active: boolean;
  sort_order: number;
}

export interface Profile {
  id: string;
  display_name: string;
  active_language_id: string;
  created_at: string;
  updated_at: string;
}

export interface UserLanguageProgress {
  id: string;
  user_id: string;
  language_id: string;
  proficiency: 1 | 2 | 3;
  placement_done: boolean;
  total_xp: number;
  streak: number;
  last_played_date: string | null;
}

export interface Category {
  id: string;
  name_he: string;
  emoji: string;
  sort_order: number;
  color: string;
}

export interface Level {
  id: string;
  language_id: string;
  category_id: string;
  level_number: 1 | 2 | 3;
  label_he: string;
  required_xp: number;
}

export interface VocabularyItem {
  id: string;
  level_id: string;
  target_text: string;
  he: string;
  translit: string | null;
  is_phrase: boolean;
  audio_url: string | null;
  sort_order: number;
}

export interface UserLevelProgress {
  id: string;
  user_id: string;
  level_id: string;
  best_score: number;
  attempts: number;
  completed: boolean;
  last_attempt_at: string | null;
}

// Exercise types
export type ExerciseType = 'mc' | 'matching' | 'fill' | 'build';

export interface MCExercise {
  type: 'mc';
  item: VocabularyItem;
  options: string[];
  direction: 'target2he' | 'he2target';
  correctAnswer: string;
}

export interface MatchingExercise {
  type: 'matching';
  pairs: Array<{ target: string; he: string; id: string }>;
  reversed?: boolean; // when true: left=Hebrew, right=target language
}

export interface FillExercise {
  type: 'fill';
  item: VocabularyItem;
  blankedText: string;
  missingWord: string;
  options: string[];
}

export interface BuildExercise {
  type: 'build';
  item: VocabularyItem;
  words: string[];
  correctOrder: string[];
}

export type Exercise = MCExercise | MatchingExercise | FillExercise | BuildExercise;

export interface LessonState {
  exercises: Exercise[];
  currentIndex: number;
  hearts: number;
  xp: number;
  correctCount: number;
  levelId: string;
  ttsLocale: string;
}
