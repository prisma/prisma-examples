export function QuotesLoading() {
  return (
    <div className="w-full max-w-6xl mx-auto space-y-12">
      <div className="text-center mb-8">
        <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-md w-64 mx-auto animate-pulse"></div>
      </div>

      {/* Loading Opinions */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-32 animate-pulse"></div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-1/2"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-16 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Loading Facts */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-slate-200 dark:bg-slate-700 animate-pulse"></div>
          <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded-md w-24 animate-pulse"></div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="p-6 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800"
            >
              <div className="space-y-3">
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-4/5"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded animate-pulse w-2/3"></div>
                <div className="flex justify-between items-center pt-2">
                  <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded-full w-12 animate-pulse"></div>
                  <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-8 animate-pulse"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
