export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { LanguagesClient } from './LanguagesClient';

export default async function LanguagesPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/onboarding');

  const { data: languages } = await supabase.from('languages').select('*').order('sort_order');
  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single();

  return <LanguagesClient languages={languages ?? []} profile={profile} />;
}
