import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Bookmark, Trash2 } from "lucide-react";
import { useMemo } from "react";
import { PostCard } from "@/components/blog/post-card";
import { CardSkeletonGrid, ErrorMessage, LoadingMessage } from "@/components/blog/states";
import { BLOG_NAME, postsQuery } from "@/lib/blog";
import { useBookmarks, useIsClient } from "@/lib/bookmarks";

export const Route = createFileRoute("/bookmarks")({
  head: () => ({
    meta: [
      { title: `বুকমার্ক করা লেখা — ${BLOG_NAME}` },
      { name: "description", content: "পরে পড়ার জন্য সংরক্ষণ করা কালিকলমের লেখাগুলো এক জায়গায়।" },
      { property: "og:title", content: `বুকমার্ক করা লেখা — ${BLOG_NAME}` },
      { property: "og:description", content: "পরে পড়ার জন্য সংরক্ষণ করা কালিকলমের লেখাগুলো এক জায়গায়।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: BookmarksPage,
});

function BookmarksPage() {
  const { ids, clear } = useBookmarks();
  const isClient = useIsClient();
  const { data, isPending, isError, error, refetch } = useQuery(postsQuery());

  const posts = useMemo(() => {
    if (!data) return [];
    const byId = new Map(data.map((p) => [p.id, p]));
    return ids.flatMap((id) => byId.get(id) ?? []);
  }, [data, ids]);

  return (
    <div className="mx-auto max-w-6xl px-4 pt-14 sm:px-6">
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">পরে পড়ব</p>
          <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">বুকমার্ক করা লেখা</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {ids.length > 0 ? `মোট ${ids.length}টি লেখা সংরক্ষিত আছে` : "এখনো কোনো লেখা সংরক্ষণ করা হয়নি"}
          </p>
        </div>
        {ids.length > 0 && (
          <button
            type="button"
            onClick={() => {
              if (window.confirm("সব বুকমার্ক মুছে ফেলতে চান?")) clear();
            }}
            className="inline-flex items-center gap-2 self-start rounded-full border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:border-destructive hover:text-destructive sm:self-auto"
          >
            <Trash2 className="size-4" /> সব মুছে ফেলুন
          </button>
        )}
      </div>

      {!isClient ? (
        <LoadingMessage label="বুকমার্ক খোঁজা হচ্ছে…" />
      ) : ids.length === 0 ? (
        <div className="mx-auto flex max-w-md flex-col items-center rounded-2xl border border-dashed border-border px-6 py-16 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-accent text-accent-foreground">
            <Bookmark className="size-6" />
          </span>
          <h2 className="mt-5 text-xl font-semibold">বুকমার্কের তালিকা খালি</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            যেকোনো লেখার কার্ডে বা বিস্তারিত পাতায় বুকমার্ক চিহ্নে চাপ দিলে সেটি এখানে জমা হবে।
          </p>
          <Link
            to="/"
            className="mt-6 rounded-full bg-ink px-5 py-2.5 text-sm font-medium text-ink-foreground hover:bg-primary hover:text-primary-foreground"
          >
            লেখা খুঁজে দেখুন
          </Link>
        </div>
      ) : isPending ? (
        <>
          <LoadingMessage label="বুকমার্ক করা লেখাগুলো লোড হচ্ছে…" />
          <CardSkeletonGrid count={Math.min(ids.length, 6)} />
        </>
      ) : isError ? (
        <ErrorMessage
          message={error instanceof Error ? error.message : "আবার চেষ্টা করুন।"}
          onRetry={() => void refetch()}
        />
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((post, i) => (
            <PostCard key={post.id} post={post} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
