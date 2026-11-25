import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Clock } from "lucide-react";
import { BookmarkButton } from "@/components/blog/bookmark-button";
import { capitalize, readingMinutes, type Post } from "@/lib/blog";

export function PostCard({ post, index }: { post: Post; index: number }) {
  return (
    <article
      className="fade-up group flex flex-col rounded-2xl border border-border bg-card p-6 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lift"
      style={{ animationDelay: `${Math.min(index, 12) * 40}ms` }}
    >
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="font-display text-base italic text-primary">№ {String(post.id).padStart(3, "0")}</span>
        <span className="inline-flex items-center gap-1">
          <Clock className="size-3.5" /> {readingMinutes(post.body)} মিনিট
        </span>
      </div>

      <h2 className="mt-4 line-clamp-2 text-xl font-semibold leading-snug text-card-foreground">
        {capitalize(post.title)}
      </h2>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-relaxed text-muted-foreground">
        {capitalize(post.body)}
      </p>

      <div className="mt-6 flex items-center justify-between border-t border-dashed border-border pt-4">
        <span className="rounded-full bg-secondary px-3 py-1 text-xs font-medium text-secondary-foreground">
          লেখক #{post.userId}
        </span>
        <div className="flex items-center gap-2">
        <BookmarkButton postId={post.id} />
        <Link
          to="/posts/$postId"
          params={{ postId: String(post.id) }}
          className="inline-flex items-center gap-1.5 rounded-full bg-ink px-4 py-2 text-sm font-medium text-ink-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          বিস্তারিত
          <ArrowUpRight className="size-4 transition-transform group-hover:rotate-45" />
        </Link>
        </div>
      </div>
    </article>
  );
}
