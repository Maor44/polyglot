'use client';

import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { createClient } from '@/lib/supabase/client';
import { useRouter, useSearchParams } from 'next/navigation';

export function OnboardingClient() {
  const [mode, setMode] = useState<'signin' | 'signup'>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const searchParams = useSearchParams();
  const supabase = createClient();

  useEffect(() => {
    const urlError = searchParams.get('error');
    if (urlError) setError(urlError.replace(/\+/g, ' '));
  }, [searchParams]);

  const callbackUrl = typeof window !== 'undefined'
    ? `${window.location.origin}/auth/callback`
    : '/auth/callback';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (mode === 'signup') {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { display_name: name || 'לומד חדש' },
          emailRedirectTo: callbackUrl,
        },
      });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push('/languages');
    } else {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) { setError(error.message); setLoading(false); return; }
      router.push('/home');
    }
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    setError('');
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: callbackUrl },
    });
    if (error) {
      console.error('Google OAuth error:', error);
      setError(error.message || 'שגיאה בהתחברות עם Google, נסה שוב');
      setGoogleLoading(false);
    }
    // on success the browser navigates away — no need to setGoogleLoading(false)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-500 via-purple-600 to-indigo-700 flex flex-col items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200 }}
        className="w-full max-w-sm"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
            className="text-7xl mb-3"
          >
            🌍
          </motion.div>
          <h1 className="text-4xl font-black text-white mb-1">Polyglot</h1>
          <p className="text-purple-200 text-lg">למד שפות בצורה כיפית</p>
        </div>

        {/* Auth card */}
        <div className="bg-white/95 dark:bg-gray-900/95 backdrop-blur rounded-3xl p-6 shadow-2xl">
          {/* Google button — prominent at top */}
          <motion.button
            whileTap={{ scale: 0.97 }}
            onClick={handleGoogle}
            disabled={googleLoading || loading}
            className="w-full py-3 mb-5 flex items-center justify-center gap-3 bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-600 rounded-xl font-bold text-sm text-gray-700 dark:text-gray-200 shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-gray-500 transition-all disabled:opacity-60"
          >
            {googleLoading ? (
              <motion.span animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} className="text-lg">⚙️</motion.span>
            ) : (
              <GoogleIcon />
            )}
            {googleLoading ? 'מתחבר...' : 'המשך עם Google'}
          </motion.button>

          <div className="relative mb-5">
            <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-border" /></div>
            <div className="relative flex justify-center"><span className="bg-white dark:bg-gray-900 px-3 text-xs text-muted-foreground">או עם אימייל</span></div>
          </div>

          <div className="flex bg-muted rounded-xl p-1 mb-4">
            {(['signin', 'signup'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${mode === m ? 'bg-white dark:bg-gray-800 shadow-sm text-foreground' : 'text-muted-foreground'}`}
              >
                {m === 'signin' ? 'כניסה' : 'הרשמה'}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            {mode === 'signup' && (
              <input
                type="text"
                placeholder="שם מלא"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary text-right"
              />
            )}
            <input
              type="email"
              placeholder="כתובת אימייל"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary ltr-text"
              dir="ltr"
            />
            <input
              type="password"
              placeholder="סיסמה"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="w-full border border-border rounded-xl px-4 py-3 text-sm bg-background focus:outline-none focus:ring-2 focus:ring-primary"
              dir="ltr"
            />
            {error && <p className="text-red-500 text-xs text-center">{error}</p>}
            <motion.button
              whileTap={{ scale: 0.97 }}
              type="submit"
              disabled={loading || googleLoading}
              className="w-full py-3 bg-gradient-to-r from-violet-600 to-purple-600 text-white rounded-xl font-black text-base shadow-lg disabled:opacity-60"
            >
              {loading ? '...' : mode === 'signin' ? '🚀 כניסה' : '🎉 הצטרף'}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/>
      <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z" fill="#34A853"/>
      <path d="M3.964 10.707A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05"/>
      <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.961L3.964 7.293C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/>
    </svg>
  );
}
