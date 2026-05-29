export default function CategoryLoading() {
  return (
    <div className="min-h-screen flex animate-pulse">
      {/* Sidebar placeholder (desktop) */}
      <div className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-72 bg-violet-800/60" />

      <main className="flex-1 lg:mr-72 lg:flex lg:h-screen lg:overflow-hidden">
        {/* Hero panel */}
        <div className="lg:w-80 lg:shrink-0 bg-muted/40 lg:h-full p-8 flex flex-col gap-4">
          <div className="w-10 h-10 rounded-2xl bg-muted" />
          <div className="w-24 h-24 rounded-3xl bg-muted mx-auto" />
          <div className="h-8 w-40 bg-muted rounded-xl mx-auto" />
          <div className="grid grid-cols-3 gap-2 mt-4">
            {[0, 1, 2].map(i => <div key={i} className="h-14 rounded-2xl bg-muted" />)}
          </div>
          <div className="h-2 rounded-full bg-muted mt-2" />
        </div>

        {/* Roadmap panel */}
        <div className="flex-1 p-8 flex flex-col gap-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="h-20 rounded-2xl bg-muted" />
          ))}
        </div>
      </main>
    </div>
  );
}
