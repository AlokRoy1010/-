import { AlertTriangle, Loader2, RotateCw } from "lucide-react";

export function LoadingMessage({ label = "লেখাগুলো লোড হচ্ছে…" }: { label?: string }) {
  return (
    <div role="status" className="flex items-center justify-center gap-3 py-6 text-muted-foreground">
      <Loader2 className="size-5 animate-spin text-primary" />
      <span className="text-sm font-medium">{label}</span>
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }: { count?: number }) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" aria-hidden>
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="animate-pulse rounded-2xl border border-border bg-card p-6">
          <div className="h-4 w-16 rounded bg-muted" />
          <div className="mt-5 h-5 w-11/12 rounded bg-muted" />
          <div className="mt-2 h-5 w-2/3 rounded bg-muted" />
          <div className="mt-5 space-y-2">
            <div className="h-3 rounded bg-muted" />
            <div className="h-3 rounded bg-muted" />
            <div className="h-3 w-4/5 rounded bg-muted" />
          </div>
          <div className="mt-6 flex justify-between border-t border-dashed border-border pt-4">
            <div className="h-6 w-20 rounded-full bg-muted" />
            <div className="h-8 w-24 rounded-full bg-muted" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function ErrorMessage({ message, onRetry }: { message: string; onRetry?: () => void }) {
  return (
    <div
      role="alert"
      className="mx-auto flex max-w-lg flex-col items-center rounded-2xl border border-destructive/30 bg-destructive/5 px-6 py-10 text-center"
    >
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-6" />
      </span>
      <h2 className="mt-4 text-xl font-semibold">দুঃখিত, ডেটা আনা যায়নি</h2>
      <p className="mt-2 text-sm text-muted-foreground">{message}</p>
      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-destructive px-5 py-2 text-sm font-medium text-destructive-foreground transition-opacity hover:opacity-90"
        >
          <RotateCw className="size-4" /> আবার চেষ্টা করুন
        </button>
      )}
    </div>
  );
}
