'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { buildPlacementQuiz } from '@/lib/lesson-builder';
import type { VocabularyItem, MCExercise } from '@/lib/types';

interface Props {
  userId: string;
  languageId: string;
  vocab: VocabularyItem[];
  languageName: string;
  flagEmoji: string;
}

export function PlacementClient({ userId, languageId, vocab, languageName, flagEmoji }: Props) {
  const [questions] = useState<MCExercise[]>(() => buildPlacementQuiz(vocab));
  const [currentQ, setCurrentQ] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [answered, setAnswered] = useState(false);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const [proficiency, setProficiency] = useState<1 | 2 | 3>(1);
  const router = useRouter();

  const handleSelect = (option: string) => {
    if (answered || questions.length === 0) return;
    setSelected(option);
    setAnswered(true);
    const isCorrect = option === questions[currentQ].correctAnswer;
    if (isCorrect) setCorrectCount(c => c + 1);
    setTimeout(() => {
      if (currentQ + 1 >= questions.length) {
        finishQuiz(correctCount + (isCorrect ? 1 : 0));
      } else {
        setCurrentQ(c => c + 1);
        setSelected(null);
        setAnswered(false);
      }
    }, 700);
  };

  const finishQuiz = async (correct: number) => {
    const p: 1 | 2 | 3 = correct <= 3 ? 1 : correct <= 6 ? 2 : 3;
    setProficiency(p);
    setDone(true);
    const supabase = createClient();
    await supabase.from('user_language_progress').upsert(
      { user_id: userId, language_id: languageId, proficiency: p, placement_done: true },
      { onConflict: 'user_id,language_id' }
    );
  };

  const proficiencyLabels = { 1: 'מתחיל 🌱', 2: 'בינוני 🌿', 3: 'מתקדם 🌳' };

  if (questions.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-muted-foreground">טוען שאלות...</p>
        </div>
      </div>
    );
  }

  if (done) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          className="bg-white dark:bg-gray-900 rounded-3xl p-8 text-center max-w-sm w-full shadow-2xl"
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2 className="text-2xl font-black mb-2">הרמה שלך ב{languageName}</h2>
          <div className="text-5xl font-black text-purple-600 my-4">{proficiencyLabels[proficiency]}</div>
          <p className="text-muted-foreground mb-2">ענית נכון על {correctCount}/{questions.length} שאלות</p>
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => router.push('/home')}
            className="w-full py-4 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-2xl font-black text-lg shadow-lg mt-4"
          >
            🚀 בוא נתחיל!
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const q = questions[currentQ];
  const progress = ((currentQ) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 to-purple-700 flex items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-6">
          <p className="text-white/80 text-sm font-medium mb-2">שאלה {currentQ + 1} מתוך {questions.length}</p>
          <div className="h-2 bg-white/30 rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${progress}%` }}
              className="h-full bg-white rounded-full"
              transition={{ duration: 0.4 }}
            />
          </div>
        </div>

        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
          <p className="text-center text-sm text-muted-foreground mb-4">מה המשמעות?</p>
          <p className="text-center text-3xl font-black ltr-text mb-6">{q.item.target_text}</p>
          {q.item.translit && (
            <p className="text-center text-sm text-muted-foreground mb-4 ltr-text">[{q.item.translit}]</p>
          )}
          <div className="grid grid-cols-2 gap-3">
            {q.options.map(option => {
              const isCorrect = option === q.correctAnswer;
              const isSelected = option === selected;
              let style = 'bg-muted border-2 border-transparent hover:border-primary';
              if (answered && isSelected && isCorrect) style = 'bg-green-100 border-green-500 dark:bg-green-950/40';
              if (answered && isSelected && !isCorrect) style = 'bg-red-100 border-red-500 dark:bg-red-950/40';
              if (answered && !isSelected && isCorrect) style = 'bg-green-100 border-green-500 dark:bg-green-950/40';
              return (
                <motion.button
                  key={option}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleSelect(option)}
                  disabled={answered}
                  className={`${style} rounded-xl p-3 text-sm font-bold transition-all min-h-[52px]`}
                >
                  {option}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
