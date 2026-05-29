export const dynamic = 'force-dynamic';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { DashboardLayout } from '@/components/DashboardLayout';

export default async function ProgressPage() {
  const [supabase, cookieStore] = await Promise.all([createClient(), cookies()]);
  const cookieLangId = cookieStore.get('active_lang')?.value ?? 'ro';

  const { data: { session } } = await supabase.auth.getSession();
  const user = session?.user;
  if (!user) redirect('/onboarding');

  const [{ data: profile }, { data: langProgress }, { data: categories }, { data: levels }, { data: userProgress }, { data: languages }] = await Promise.all([
    supabase.from('profiles').select('*').eq('id', user.id).single(),
    supabase.from('user_language_progress').select('*').eq('user_id', user.id).eq('language_id', cookieLangId).single(),
    supabase.from('categories').select('*').order('sort_order'),
    supabase.from('levels').select('*').eq('language_id', cookieLangId),
    supabase.from('user_level_progress').select('*').eq('user_id', user.id),
    supabase.from('languages').select('*').order('sort_order'),
  ]);

  const totalLevels     = (levels ?? []).length;
  const completedLevels = (userProgress ?? []).filter(p => p.completed).length;
  const totalXp         = langProgress?.total_xp ?? 0;
  const streak          = langProgress?.streak ?? 0;

  const catStats = (categories ?? []).map(cat => {
    const catLevels   = (levels ?? []).filter((l: { category_id: string }) => l.category_id === cat.id);
    const catProgress = catLevels.map((l: { id: string }) => (userProgress ?? []).find(p => p.level_id === l.id));
    const completed   = catProgress.filter((p: { completed?: boolean } | undefined) => p?.completed).length;
    return { ...cat, completed, total: catLevels.length };
  });

  return (
    <DashboardLayout profile={profile} langProgress={langProgress} languages={languages ?? []}>
      {/* Mobile header */}
      <div className="lg:hidden bg-gradient-to-br from-violet-600 to-purple-700 pt-12 pb-6 px-4">
        <h1 className="text-2xl font-black text-white mb-4">ההתקדמות שלי 📊</h1>
        <div className="grid grid-cols-3 gap-3">
          {[
            { label: 'XP סה״כ', value: totalXp, icon: '⭐' },
            { label: 'Streak',  value: streak,   icon: '🔥' },
            { label: 'רמות',    value: `${completedLevels}/${totalLevels}`, icon: '🏆' },
          ].map(stat => (
            <div key={stat.label} className="bg-white/20 rounded-2xl p-3 text-center">
              <p className="text-2xl">{stat.icon}</p>
              <p className="text-white font-black text-xl">{stat.value}</p>
              <p className="text-purple-200 text-xs">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 lg:px-8 pt-6 lg:pt-8">
        {/* Desktop header */}
        <div className="hidden lg:flex items-center justify-between mb-8">
          <h1 className="text-3xl font-black">ההתקדמות שלי 📊</h1>
          <div className="flex gap-6">
            {[
              { label: 'XP סה״כ', value: totalXp, icon: '⭐', color: 'text-yellow-500' },
              { label: 'Streak',  value: streak,   icon: '🔥', color: 'text-orange-500' },
              { label: 'רמות',    value: `${completedLevels}/${totalLevels}`, icon: '🏆', color: 'text-violet-600' },
            ].map(s => (
              <div key={s.label} className="bg-card border border-border rounded-2xl px-5 py-3 text-center shadow-sm">
                <p className={`text-2xl font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-muted-foreground">{s.icon} {s.label}</p>
              </div>
            ))}
          </div>
        </div>

        <h2 className="font-black text-lg mb-4 lg:hidden">פירוט לפי קטגוריה</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-4">
          {catStats.map(cat => (
            <div key={cat.id} className="bg-card rounded-2xl p-4 shadow-sm border border-border">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{cat.emoji}</span>
                  <span className="font-bold">{cat.name_he}</span>
                </div>
                <span className="text-sm font-black" style={{ color: cat.color }}>{cat.completed}/{cat.total}</span>
              </div>
              <div className="h-2.5 bg-muted rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{ width: `${cat.total > 0 ? (cat.completed / cat.total) * 100 : 0}%`, background: cat.color }}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 text-left">
                {cat.total > 0 ? Math.round((cat.completed / cat.total) * 100) : 0}%
              </p>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
