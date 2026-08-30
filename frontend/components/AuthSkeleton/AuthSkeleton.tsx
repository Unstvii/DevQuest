export default function AuthSkeleton() {
  return (
    <div className="min-h-screen bg-[var(--color-bg-base)] animate-pulse px-6 py-8 ">
      <div className="mx-auto max-w-7xl">
        {/* Title */}
        <div className="mb-6">
          <div className="h-8 w-48 rounded-lg bg-[var(--color-surface-raised)]" />
          <div className="mt-2 h-4 w-72 rounded bg-[var(--color-surface-raised)]" />
        </div>

        {/* Content */}
        <div className="grid gap-4 md:grid-cols-3">
          <div className="h-40 rounded-2xl bg-[var(--color-surface-raised)]" />
          <div className="h-40 rounded-2xl bg-[var(--color-surface-raised)]" />
          <div className="h-40 rounded-2xl bg-[var(--color-surface-raised)]" />
        </div>
      </div>
    </div>
  );
}
