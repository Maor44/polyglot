'use client';

import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useRouter } from 'next/navigation';
import { HeartDisplay } from '@/components/HeartDisplay';
import { XpPopup } from '@/components/XpPopup';
import { ConfettiCelebration } from '@/components/ConfettiCelebration';
import { MultipleChoice } from '@/components/exercises/MultipleChoice';
import { MatchingPairs } from '@/components/exercises/MatchingPairs';
import { FillBlank } from '@/components/exercises/FillBlank';
import { SentenceBuilder } from '@/components/exercises/SentenceBuilder';
import { upsertLevelProgress, updateLanguageXp, getUserLanguageProgress } from '@/lib/supabase/queries';
import { calculateStreak, getTodayDate } from '@/lib/streak';
import { prefetch } from '@/lib/audio';
import type { Exercise } from '@/lib/types';

interface Props {
  exercises: Exercise[];
  levelId: string;
  userId: string;
  languageId: string;
  ttsLocale: string;
  levelLabel: string;
  categoryName: string;
  categoryEmoji: string;
}

const XP_PER_CORRECT = 10;
const MAX_HEARTS = 3;

export function LessonClient({ exercises, levelId, userId, languageId, ttsLocale, levelLabel, categoryName, categoryEmoji }: Props) {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hearts, setHearts] = useState(MAX_HEARTS);
  const [xp, setXp] = useState(0);

  // Prefetch all target-language texts in the background on mount
  useEffect(() => {
    const texts = exercises.flatMap(ex => {
      if (ex.type === 'mc') return [ex.item.target_text];
      if (ex.type === 'matching') return ex.pairs.map(p => p.target);
      if (ex.type === 'fill') return [ex.item.target_text];
      if (ex.type === 'build') return [ex.item.target_text];
      return [];
    });
    prefetch(texts);
  }, [exercises]);
  const [correctCount, setCorrectCount] = useState(0);
  const [showXpPopup, setShowXpPopup] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [finished, setFinished] = useState(false);
  const [finalScore, setFinalScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const total = exercises.length;
  const progress = (currentIndex / total) * 100;

  const advance = useCallback(() => {
    const next = currentIndex + 1;
    if (next >= total) {
      finishLesson();
    } else {
      setCurrentIndex(next);
    }
  }, [currentIndex, total]);

  const handleCorrect = useCallback(() => {
    const newXp = xp + XP_PER_CORRECT;
    const newCorrect = correctCount + 1;
    setXp(newXp);
    setCorrectCount(newCorrect);
    setShowXpPopup(true);
    setTimeout(() => setShowXpPopup(false), 900);
    setTimeout(advance, 700);
  }, [xp, correctCount, advance]);

  const handleWrong = useCallback(() => {
    const newHearts = hearts - 1;
    setHearts(newHearts);
    if (newHearts <= 0) {
      setGameOver(true);
      return;
    }
    setTimeout(advance, 900);
  }, [hearts, advance]);

  const finishLesson = useCallback(async () => {
    const score = Math.round((correctCount / total) * 100);
    setFinalScore(score);
    if (score >= 70) setShowConfetti(true);
    setFinished(true);

    if (userId && levelId !== 'ai') {
      try {
        const existing = await getUserLanguageProgress(userId, languageId);
        const newStreak = calculateStreak(existing?.streak ?? 0, existing?.last_played_date ?? null);
        await Promise.all([
          upsertLevelProgress(userId, levelId, score),
          updateLanguageXp(userId, languageId, xp, newStreak, getTodayDate()),
        ]);
      } catch {}
    }
  }, [correctCount, total, userId, levelId, languageId, xp]);

  const getStars = (score: number) => score >= 90 ? 3 : score >= 80 ? 2 : score >= 60 ? 1 : 0;

  if (gameOver) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="bg-card rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
        >
          <div className="text-6xl mb-4">💔</div>
          <h2 className="text-2xl font-black mb-2">אוי לא!</h2>
          <p className="text-muted-foreground mb-6">נגמרו הלבבות. נסה שוב!</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.refresh()}
            className="w-full py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white rounded-2xl font-black text-lg shadow-lg mb-3"
          >
            🔄 נסה שוב
          </motion.button>
          <button onClick={() => router.push('/home')} className="text-sm text-muted-foreground hover:text-foreground">
            חזרה הביתה
          </button>
        </motion.div>
      </div>
    );
  }

  if (finished) {
    const stars = getStars(finalScore);
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <ConfettiCelebration trigger={showConfetti} intensity="full" />
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-card rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
        >
          <div className="text-6xl mb-2">{finalScore >= 70 ? '🎉' : '💪'}</div>
          <div className="flex justify-center gap-1 mb-3">
            {[1, 2, 3].map(s => (
              <motion.span
                key={s}
                initial={{ scale: 0 }}
                animate={{ scale: s <= stars ? 1 : 0.5 }}
                transition={{ delay: s * 0.15, type: 'spring' }}
                className={`text-4xl ${s <= stars ? '' : 'opacity-20'}`}
              >⭐</motion.span>
            ))}
          </div>
          <h2 className="text-2xl font-black mb-1">{finalScore >= 90 ? 'מושלם!' : finalScore >= 70 ? 'כל הכבוד!' : 'כמעט!'}</h2>
          <p className="text-muted-foreground mb-1">ציון: <strong className="text-foreground">{finalScore}%</strong></p>
          <p className="text-yellow-600 font-bold mb-6">+{xp} XP ⭐</p>
          <div className="flex flex-col gap-3">
            {finalScore < 60 && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => router.refresh()}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-2xl font-black shadow-lg"
              >
                🔄 שחק שוב
              </motion.button>
            )}
            {finalScore >= 60 && (
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={() => router.back()}
                className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-black shadow-lg"
              >
                ➡️ שיעור הבא
              </motion.button>
            )}
            <button
              onClick={() => router.push('/home')}
              className="w-full py-3 border-2 border-border rounded-2xl font-bold text-sm hover:bg-muted transition-colors"
            >
              🏠 חזרה הביתה
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  const exercise = exercises[currentIndex];

  return (
    <div className="min-h-screen flex flex-col pb-6">
      <XpPopup show={showXpPopup} amount={XP_PER_CORRECT} />

      {/* Header */}
      <div className="sticky top-0 z-10 bg-card/95 backdrop-blur border-b border-border px-4 py-3">
        <div className="max-w-lg mx-auto">
          <div className="flex items-center justify-between mb-2">
            <button onClick={() => router.back()} className="w-9 h-9 rounded-full bg-muted flex items-center justify-center text-lg" aria-label="חזרה">
              ✕
            </button>
            <div className="text-center">
              <p className="text-xs text-muted-foreground font-medium">{categoryEmoji} {categoryName}</p>
              <p className="text-xs text-muted-foreground">{currentIndex + 1} / {total}</p>
            </div>
            <HeartDisplay hearts={hearts} maxHearts={MAX_HEARTS} />
          </div>
          <div className="h-2.5 bg-muted rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
              className="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"
            />
          </div>
        </div>
      </div>

      {/* Exercise */}
      <div className="flex-1 max-w-lg mx-auto w-full px-4 pt-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.2 }}
          >
            {exercise.type === 'mc' && (
              <MultipleChoice exercise={exercise} ttsLocale={ttsLocale} onCorrect={handleCorrect} onWrong={handleWrong} />
            )}
            {exercise.type === 'matching' && (
              <MatchingPairs exercise={exercise} ttsLocale={ttsLocale} onComplete={handleCorrect} onWrong={handleWrong} />
            )}
            {exercise.type === 'fill' && (
              <FillBlank exercise={exercise} ttsLocale={ttsLocale} onCorrect={handleCorrect} onWrong={handleWrong} />
            )}
            {exercise.type === 'build' && (
              <SentenceBuilder exercise={exercise} ttsLocale={ttsLocale} onCorrect={handleCorrect} onWrong={handleWrong} />
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* XP counter */}
      <div className="max-w-lg mx-auto w-full px-4 pt-4 flex justify-center">
        <span className="text-sm font-bold text-yellow-600">{xp} XP ⭐</span>
      </div>
    </div>
  );
}
