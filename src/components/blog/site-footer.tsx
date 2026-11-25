import { Link } from "@tanstack/react-router";
import { Feather } from "lucide-react";
import { BLOG_NAME } from "@/lib/blog";

export function SiteFooter() {
  return (
    <footer className="mt-24 bg-ink text-ink-foreground">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[2fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-full bg-primary text-primary-foreground">
              <Feather className="size-4" />
            </span>
            <span className="font-display text-2xl font-semibold">{BLOG_NAME}</span>
          </div>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-ink-foreground/70">
            ভাবনা, গল্প আর অভিজ্ঞতার এক ছোট্ট খাতা। প্রতিটি লেখা ধীরে পড়ার জন্য।
          </p>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">পাতা</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/" className="hover:text-primary">হোম</Link></li>
            <li><Link to="/bookmarks" className="hover:text-primary">বুকমার্ক</Link></li>
            <li><Link to="/about" className="hover:text-primary">আমাদের কথা</Link></li>
          </ul>
        </div>
        <div>
          <h3 className="font-sans text-xs font-semibold uppercase tracking-widest text-ink-foreground/50">তথ্যসূত্র</h3>
          <ul className="mt-4 space-y-2 text-sm">
            <li>
              <a href="https://jsonplaceholder.typicode.com" target="_blank" rel="noreferrer" className="hover:text-primary">
                JSONPlaceholder API
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-ink-foreground/10">
        <p className="mx-auto max-w-6xl px-4 py-5 text-xs text-ink-foreground/50 sm:px-6">
          © {new Date().getFullYear()} {BLOG_NAME} · সর্বস্বত্ব সংরক্ষিত
        </p>
      </div>
    </footer>
  );
}
