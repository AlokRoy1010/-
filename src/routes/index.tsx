import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { PostCard } from "@/components/blog/post-card";
import { CardSkeletonGrid, ErrorMessage, LoadingMessage } from "@/components/blog/states";
import { BLOG_NAME, postsQuery } from "@/lib/blog";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: `${BLOG_NAME} — ভাবনা ও গল্পের ব্লগ` },
      { name: "description", content: "কালিকলম ব্লগের সব লেখা এক জায়গায় — পড়ুন, খুঁজুন এবং বিস্তারিত জানুন।" },
      { property: "og:title", content: `${BLOG_NAME} — ভাবনা ও গল্পের ব্লগ` },
      { property: "og:description", content: "কালিকলম ব্লগের সব লেখা এক জায়গায় — পড়ুন, খুঁজুন এবং বিস্তারিত জানুন।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const { data, isPending, isError, error, refetch, isFetching } = useQuery(postsQuery());
  const [search, setSearch] = useState("");

  const posts = useMemo(() => {
    const q = search.trim().toLowerCase();
    if (!data) return [];
    if (!q) return data;
    return data.filter((p) => p.title.toLowerCase().includes(q) || p.body.toLowerCase().includes(q));
  }, [data, search]);

  return (
    <>
      <section className="paper-lines border-b border-border">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-24">
          <p className="fade-up text-sm font-semibold uppercase tracking-[0.2em] text-primary">ব্লগ · সংকলন</p>
          <h1 className="fade-up mt-4 max-w-3xl text-4xl font-semibold leading-[1.1] sm:text-6xl">
            শব্দে আঁকা <em className="text-primary">ভাবনা</em>, পাতায় পাতায় গল্প।
          </h1>
          <p className="fade-up mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            {BLOG_NAME}-এ স্বাগতম। নিচের যেকোনো লেখার "বিস্তারিত" বোতামে চাপ দিয়ে পুরো লেখা, লেখকের পরিচয় ও মন্তব্য দেখুন।
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pt-12 sm:px-6">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-semibold">সাম্প্রতিক লেখা</h2>
            <p className="mt-1 text-sm text-muted-foreground">
              {data ? `মোট ${posts.length}টি লেখা` : "লেখাগুলো আনা হচ্ছে"}
            </p>
          </div>
          <label className="relative w-full sm:w-72">
            <span className="sr-only">লেখা খুঁজুন</span>
            <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="শিরোনাম বা লেখা খুঁজুন…"
              disabled={!data}
              className="h-11 w-full rounded-full border border-input bg-card pl-10 pr-4 text-sm outline-none transition focus:border-ring focus:ring-2 focus:ring-ring/20 disabled:opacity-60"
            />
          </label>
        </div>

        {isPending ? (
          <>
            <LoadingMessage />
            <CardSkeletonGrid />
          </>
        ) : isError ? (
          <ErrorMessage
            message={error instanceof Error ? error.message : "ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।"}
            onRetry={() => void refetch()}
          />
        ) : posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border py-16 text-center text-muted-foreground">
            "{search}" এর সাথে মেলে এমন কোনো লেখা পাওয়া যায়নি।
          </p>
        ) : (
          <div className={`grid gap-6 sm:grid-cols-2 lg:grid-cols-3 ${isFetching ? "opacity-80" : ""}`}>
            {posts.map((post, i) => (
              <PostCard key={post.id} post={post} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}
