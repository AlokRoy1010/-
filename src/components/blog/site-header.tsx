import { Link } from "@tanstack/react-router";
import { Feather, Menu, X } from "lucide-react";
import { useState } from "react";
import { BLOG_NAME } from "@/lib/blog";
import { useBookmarks } from "@/lib/bookmarks";

const links = [
  { to: "/", label: "হোম" },
  { to: "/bookmarks", label: "বুকমার্ক" },
  { to: "/about", label: "আমাদের কথা" },
] as const;

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const { ids } = useBookmarks();
  const badge = (to: string) =>
    to === "/bookmarks" && ids.length > 0 ? (
      <span className="ml-1.5 inline-grid min-w-5 place-items-center rounded-full bg-primary px-1.5 text-xs leading-5 text-primary-foreground">
        {ids.length}
      </span>
    ) : null;
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-full bg-ink text-ink-foreground transition-transform group-hover:-rotate-12">
            <Feather className="size-4" />
          </span>
          <span className="font-display text-2xl font-semibold tracking-tight">{BLOG_NAME}</span>
        </Link>

        <nav className="hidden items-center gap-1 sm:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeOptions={{ exact: true }}
              className="inline-flex items-center rounded-full px-4 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground data-[status=active]:bg-ink data-[status=active]:text-ink-foreground"
            >
              {l.label}
              {badge(l.to)}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          aria-label={open ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
          onClick={() => setOpen((v) => !v)}
          className="grid size-10 place-items-center rounded-full border border-border sm:hidden"
        >
          {open ? <X className="size-5" /> : <Menu className="size-5" />}
        </button>
      </div>

      {open && (
        <nav className="border-t border-border px-4 py-3 sm:hidden">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: true }}
              className="block rounded-lg px-3 py-2.5 font-medium text-muted-foreground data-[status=active]:bg-muted data-[status=active]:text-foreground"
            >
              {l.label}
              {badge(l.to)}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
