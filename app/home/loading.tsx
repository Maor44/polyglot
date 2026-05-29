export default function HomeLoading() {
  return (
    <div className="min-h-screen flex animate-pulse">
      {/* Sidebar placeholder (desktop) */}
      <div className="hidden lg:flex flex-col fixed right-0 top-0 h-screen w-72 bg-violet-800/60" />

      <main className="flex-1 lg:mr-72">
        {/* Mobile header */}
        <div className="lg:hidden h-36 bg-violet-700/40 rounded-b-3xl" />
        {/* Desktop hero */}
        <div className="hidden lg:block h-28 border-b border-border/40 bg-muted/30" />

        <div className="px-4 lg:px-8 pt-6 lg:pt-8">
          <div className="h-6 w-32 bg-muted rounded-lg mb-5" />
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 lg:gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="aspect-square rounded-3xl bg-muted" />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
