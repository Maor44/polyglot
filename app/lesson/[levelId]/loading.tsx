export default function LessonLoading() {
  return (
    <div className="min-h-screen flex flex-col animate-pulse">
      {/* Header */}
      <div className="sticky top-0 border-b border-border bg-card/95 px-4 py-3">
        <div className="max-w-lg mx-auto flex items-center justify-between mb-2">
          <div className="w-9 h-9 rounded-full bg-muted" />
          <div className="h-4 w-24 bg-muted rounded" />
          <div className="flex gap-1">
            {[0, 1, 2].map(i => <div key={i} className="w-6 h-6 rounded-full bg-muted" />)}
          </div>
        </div>
        <div className="h-2.5 bg-muted rounded-full max-w-lg mx-auto" />
      </div>

      {/* Exercise placeholder */}
      <div className="flex-1 flex items-center justify-center px-4">
        <div className="max-w-lg w-full space-y-4">
          <div className="h-24 rounded-3xl bg-muted" />
          <div className="grid grid-cols-2 gap-3">
            {[0, 1, 2, 3].map(i => <div key={i} className="h-16 rounded-2xl bg-muted" />)}
          </div>
        </div>
      </div>
    </div>
  );
}
