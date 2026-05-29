import type {
  VocabularyItem,
  Exercise,
  MCExercise,
  MatchingExercise,
  FillExercise,
  BuildExercise,
} from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n);
}

function randomChoice<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createMCExercise(
  item: VocabularyItem,
  allItems: VocabularyItem[],
  direction: 'target2he' | 'he2target' = 'target2he'
): MCExercise {
  const others = allItems.filter(i => i.id !== item.id);
  const distractors = sample(others, 3);

  if (direction === 'target2he') {
    const options = shuffle([item.he, ...distractors.map(d => d.he)]);
    return { type: 'mc', item, options, direction, correctAnswer: item.he };
  } else {
    const options = shuffle([item.target_text, ...distractors.map(d => d.target_text)]);
    return { type: 'mc', item, options, direction, correctAnswer: item.target_text };
  }
}

function createMatchingExercise(items: VocabularyItem[], reversed = false): MatchingExercise {
  return {
    type: 'matching',
    pairs: items.map(i => ({ target: i.target_text, he: i.he, id: i.id })),
    reversed,
  };
}

function createFillExercise(item: VocabularyItem, allItems: VocabularyItem[]): FillExercise {
  const words = item.target_text.split(' ');
  // Pick the longest meaningful word (not first or last if possible)
  const candidates = words.filter(w => w.length > 3);
  const missingWord = candidates.length > 0 ? candidates[Math.floor(candidates.length / 2)] : words[words.length - 1];
  const blankedText = item.target_text.replace(missingWord, '____');

  const distractors = sample(
    allItems.filter(i => i.id !== item.id),
    3
  ).map(i => {
    const ws = i.target_text.split(' ');
    return ws[Math.floor(Math.random() * ws.length)];
  });

  return {
    type: 'fill',
    item,
    blankedText,
    missingWord,
    options: shuffle([missingWord, ...distractors]),
  };
}

function createBuildExercise(item: VocabularyItem): BuildExercise {
  const correctOrder = item.target_text.split(' ');
  return {
    type: 'build',
    item,
    words: shuffle(correctOrder),
    correctOrder,
  };
}

export function buildLesson(vocabItems: VocabularyItem[]): Exercise[] {
  if (vocabItems.length === 0) return [];
  const exercises: Exercise[] = [];
  const phrases = vocabItems.filter(v => v.is_phrase);
  const shuffled = shuffle(vocabItems);
  const pairCount = Math.min(5, shuffled.length);

  // 1. Matching round — target language on left
  exercises.push(createMatchingExercise(sample(shuffled, pairCount)));

  // 2-5. Mixed exercises (first half)
  const pool1 = shuffled.slice(0, Math.min(4, shuffled.length));
  for (const item of pool1) {
    const availableTypes: Array<'mc' | 'fill' | 'build'> = ['mc'];
    if (item.is_phrase && phrases.length > 0) availableTypes.push('fill', 'build');
    const type = randomChoice(availableTypes);
    if (type === 'mc') {
      exercises.push(createMCExercise(item, vocabItems, 'target2he'));
    } else if (type === 'fill') {
      exercises.push(createFillExercise(item, vocabItems));
    } else {
      exercises.push(createBuildExercise(item));
    }
  }

  // 6. Reversed matching round — Hebrew on left, target language on right
  exercises.push(createMatchingExercise(sample(shuffled, pairCount), true));

  // 7-10. Mixed exercises (second half, lean he→target)
  const pool2 = shuffle(vocabItems).slice(0, Math.min(4, vocabItems.length));
  for (const item of pool2) {
    const availableTypes: Array<'mc' | 'fill' | 'build'> = ['mc'];
    if (item.is_phrase && phrases.length > 0) availableTypes.push('fill', 'build');
    const type = randomChoice(availableTypes);
    if (type === 'mc') {
      exercises.push(createMCExercise(item, vocabItems, 'he2target'));
    } else if (type === 'fill') {
      exercises.push(createFillExercise(item, vocabItems));
    } else {
      exercises.push(createBuildExercise(item));
    }
  }

  // 11. Final MC he→target
  exercises.push(createMCExercise(randomChoice(shuffled), vocabItems, 'he2target'));

  return exercises;
}

export function buildPlacementQuiz(vocabItems: VocabularyItem[]): MCExercise[] {
  const level1 = vocabItems.filter(v => !v.is_phrase);
  const level2 = vocabItems.filter(v => v.is_phrase && v.target_text.split(' ').length <= 4);
  const level3 = vocabItems.filter(v => v.is_phrase && v.target_text.split(' ').length > 4);

  const q1 = sample(level1.length >= 3 ? level1 : vocabItems, 3);
  const q2 = sample(level2.length >= 3 ? level2 : vocabItems, 3);
  const q3 = sample(level3.length >= 2 ? level3 : vocabItems, 2);

  return [...q1, ...q2, ...q3].map(item =>
    createMCExercise(item, vocabItems, 'target2he')
  );
}
