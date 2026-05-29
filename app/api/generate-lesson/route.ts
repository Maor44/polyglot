import { NextRequest, NextResponse } from 'next/server';
import Anthropic from '@anthropic-ai/sdk';

const client = new Anthropic();

export async function POST(request: NextRequest) {
  try {
    const { languageId, languageName, categoryNameHe, levelNumber, ttsLocale } = await request.json();

    if (!languageName || !categoryNameHe || !levelNumber) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const systemPrompt = `You are a language tutor creating content for Hebrew speakers learning ${languageName}.
Generate exactly 8 vocabulary/phrase items for the given category and difficulty level.
Return ONLY a valid JSON array, no markdown, no preamble, no backticks.
Each item must have these exact fields:
{"target_text": "text in ${languageName}", "he": "Hebrew translation", "translit": "Hebrew transliteration of target pronunciation", "is_phrase": true or false}
For difficulty 1: single words and very short phrases (is_phrase: false for single words).
For difficulty 2: full practical sentences (is_phrase: true).
For difficulty 3: complex sentences, mini-dialogues, idiomatic expressions (is_phrase: true).
All ${languageName} must be grammatically correct with proper diacritics.
All Hebrew translations must be natural and accurate.
Transliterations should use Hebrew letters to approximate ${languageName} pronunciation.
Focus on practical, real-life situations.`;

    const message = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      system: systemPrompt,
      messages: [
        {
          role: 'user',
          content: `Category: ${categoryNameHe}. Difficulty level: ${levelNumber}.`,
        },
      ],
    });

    const rawText = message.content[0].type === 'text' ? message.content[0].text : '';
    const cleaned = rawText.trim().replace(/^```json?\n?/, '').replace(/\n?```$/, '');
    const items = JSON.parse(cleaned);

    if (!Array.isArray(items)) {
      throw new Error('Invalid response format');
    }

    return NextResponse.json({ items, ttsLocale });
  } catch (error) {
    console.error('AI lesson generation error:', error);
    return NextResponse.json(
      { error: 'Generation failed' },
      { status: 500 }
    );
  }
}
