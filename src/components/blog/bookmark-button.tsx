import { Bookmark, BookmarkCheck } from "lucide-react";
import { useBookmarks } from "@/lib/bookmarks";

export function BookmarkButton({ postId, withLabel = false }: { postId: number; withLabel?: boolean }) {
  const { isBookmarked, toggle } = useBookmarks();
  const saved = isBookmarked(postId);
  const label = saved ? "বুকমার্ক থেকে সরান" : "পরে পড়ার জন্য বুকমার্ক করুন";

  return (
    <button
      type="button"
      onClick={() => toggle(postId)}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={`inline-flex items-center justify-center gap-2 rounded-full border text-sm font-medium transition-colors ${
        withLabel ? "h-10 px-4" : "size-9"
      } ${
        saved
          ? "border-primary bg-primary text-primary-foreground hover:opacity-90"
          : "border-border bg-card text-muted-foreground hover:border-primary hover:text-primary"
      }`}
    >
      {saved ? <BookmarkCheck className="size-4" /> : <Bookmark className="size-4" />}
      {withLabel && <span>{saved ? "বুকমার্ক করা হয়েছে" : "বুকমার্ক করুন"}</span>}
    </button>
  );
}
