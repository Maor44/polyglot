export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { ProfileClient } from './ProfileClient';

export default async function ProfilePage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/onboarding');

  const [{ data: profile }, { data: langProgress }, { data: languages }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).limit(1).single(),
    supabase.from('languages').select('*').order('sort_order'),
  ]);

  return (
    <ProfileClient
      profile={profile}
      email={user.email ?? ''}
      langProgress={langProgress}
      languages={languages ?? []}
    />
  );
}
