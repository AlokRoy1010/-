import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Building2, Clock, Globe, Mail, MessageCircle } from "lucide-react";
import { BookmarkButton } from "@/components/blog/bookmark-button";
import { ErrorMessage, LoadingMessage } from "@/components/blog/states";
import { BLOG_NAME, capitalize, commentsQuery, postQuery, readingMinutes, userQuery } from "@/lib/blog";

export const Route = createFileRoute("/posts/$postId")({
  head: ({ params }) => ({
    meta: [
      { title: `লেখা #${params.postId} — ${BLOG_NAME}` },
      { name: "description", content: `${BLOG_NAME} ব্লগের লেখা #${params.postId}-এর সম্পূর্ণ বিবরণ, লেখক ও মন্তব্য।` },
      { property: "og:title", content: `লেখা #${params.postId} — ${BLOG_NAME}` },
      { property: "og:description", content: `${BLOG_NAME} ব্লগের লেখা #${params.postId}-এর সম্পূর্ণ বিবরণ, লেখক ও মন্তব্য।` },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PostDetailsPage,
});

function PostDetailsPage() {
  const { postId } = Route.useParams();
  const post = useQuery(postQuery(postId));
  const author = useQuery({ ...userQuery(post.data?.userId ?? 0), enabled: !!post.data });
  const comments = useQuery({ ...commentsQuery(postId), enabled: !!post.data });
  const id = Number(postId);

  return (
    <div className="mx-auto max-w-3xl px-4 pt-10 sm:px-6">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="size-4" /> সব লেখায় ফিরে যান
      </Link>

      {post.isPending ? (
        <div className="mt-10 animate-pulse space-y-4">
          <LoadingMessage label="লেখাটি লোড হচ্ছে…" />
          <div className="h-10 w-4/5 rounded bg-muted" />
          <div className="h-10 w-3/5 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 rounded bg-muted" />
          <div className="h-4 w-2/3 rounded bg-muted" />
        </div>
      ) : post.isError ? (
        <div className="mt-10">
          <ErrorMessage
            message={post.error instanceof Error ? post.error.message : "আবার চেষ্টা করুন।"}
            onRetry={() => void post.refetch()}
          />
        </div>
      ) : (
        <article className="fade-up mt-8">
          <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
            <span className="font-display text-lg italic text-primary">№ {String(post.data.id).padStart(3, "0")}</span>
            <span aria-hidden>·</span>
            <span className="inline-flex items-center gap-1"><Clock className="size-4" /> {readingMinutes(post.data.body)} মিনিটের পাঠ</span>
            <span aria-hidden>·</span>
            <span>লেখক #{post.data.userId}</span>
          </div>

          <h1 className="mt-4 text-3xl font-semibold leading-tight sm:text-5xl">{capitalize(post.data.title)}</h1>
          <div className="mt-6">
            <BookmarkButton postId={post.data.id} withLabel />
          </div>

          <div className="mt-8 rounded-2xl border border-border bg-card p-6 shadow-card sm:p-10">
            <p className="text-lg leading-relaxed text-card-foreground first-letter:float-left first-letter:mr-2 first-letter:font-display first-letter:text-6xl first-letter:leading-none first-letter:text-primary">
              {post.data.body.split("\n").map((line) => capitalize(line)).join(". ")}.
            </p>
          </div>

          {/* Author */}
          <section className="mt-8 rounded-2xl bg-ink p-6 text-ink-foreground sm:p-8">
            <p className="text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">লেখক পরিচিতি</p>
            {author.isPending ? (
              <p className="mt-3 text-sm text-ink-foreground/70">লেখকের তথ্য লোড হচ্ছে…</p>
            ) : author.isError ? (
              <p className="mt-3 text-sm text-ink-foreground/70">লেখকের তথ্য আনা যায়নি।</p>
            ) : (
              <div className="mt-4 flex flex-col gap-5 sm:flex-row sm:items-center">
                <span className="grid size-16 shrink-0 place-items-center rounded-full bg-primary font-display text-2xl font-semibold text-primary-foreground">
                  {author.data.name.charAt(0)}
                </span>
                <div className="min-w-0">
                  <h2 className="text-2xl font-semibold">{author.data.name}</h2>
                  <p className="text-sm text-ink-foreground/60">@{author.data.username}</p>
                  <div className="mt-3 flex flex-wrap gap-x-5 gap-y-2 text-sm text-ink-foreground/80">
                    <span className="inline-flex items-center gap-1.5"><Mail className="size-4" />{author.data.email.toLowerCase()}</span>
                    <span className="inline-flex items-center gap-1.5"><Globe className="size-4" />{author.data.website}</span>
                    <span className="inline-flex items-center gap-1.5"><Building2 className="size-4" />{author.data.company.name}</span>
                  </div>
                </div>
              </div>
            )}
          </section>

          {/* Comments */}
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-2xl font-semibold">
              <MessageCircle className="size-6 text-primary" />
              মন্তব্য {comments.data ? `(${comments.data.length})` : ""}
            </h2>
            {comments.isPending ? (
              <LoadingMessage label="মন্তব্য লোড হচ্ছে…" />
            ) : comments.isError ? (
              <p className="mt-4 text-sm text-destructive">মন্তব্যগুলো আনা যায়নি।</p>
            ) : (
              <ul className="mt-6 space-y-4">
                {comments.data.map((c) => (
                  <li key={c.id} className="rounded-xl border border-border bg-card p-5">
                    <div className="flex flex-wrap items-baseline justify-between gap-2">
                      <h3 className="font-sans text-base font-semibold">{capitalize(c.name)}</h3>
                      <span className="text-xs text-muted-foreground">{c.email.toLowerCase()}</span>
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{capitalize(c.body.replace(/\n/g, " "))}</p>
                  </li>
                ))}
              </ul>
            )}
          </section>

          {/* Prev / next */}
          <nav className="mt-12 flex justify-between gap-4 border-t border-border pt-6">
            {id > 1 ? (
              <Link to="/posts/$postId" params={{ postId: String(id - 1) }} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">
                <ArrowLeft className="size-4" /> আগের লেখা
              </Link>
            ) : <span />}
            {id < 100 && (
              <Link to="/posts/$postId" params={{ postId: String(id + 1) }} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium hover:border-primary hover:text-primary">
                পরের লেখা <ArrowRight className="size-4" />
              </Link>
            )}
          </nav>
        </article>
      )}
    </div>
  );
}
