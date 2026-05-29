export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { PlacementClient } from './PlacementClient';

export default async function PlacementPage() {
  const supabase = await createClient();
  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  const { data: profile } = await supabase.from('profiles').select('*, languages(*)').eq('id', user.id).single();
  const langId = profile?.active_language_id ?? 'ro';

  // Fetch vocab from level 1 of all categories for this language
  const { data: levels } = await supabase.from('levels').select('id').eq('language_id', langId);
  const levelIds = (levels ?? []).map((l: { id: string }) => l.id);

  const { data: vocab } = await supabase
    .from('vocabulary')
    .select('*')
    .in('level_id', levelIds)
    .limit(50);

  return (
    <PlacementClient
      userId={user.id}
      languageId={langId}
      vocab={vocab ?? []}
      languageName={(profile as Record<string, unknown> & { languages?: { name_he: string } })?.languages?.name_he ?? 'רומנית'}
      flagEmoji={(profile as Record<string, unknown> & { languages?: { flag_emoji: string } })?.languages?.flag_emoji ?? '🇷🇴'}
    />
  );
}
