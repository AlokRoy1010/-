import { createFileRoute, Link } from "@tanstack/react-router";
import { BookOpen, Feather, Smartphone } from "lucide-react";
import { BLOG_NAME } from "@/lib/blog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: `আমাদের কথা — ${BLOG_NAME}` },
      { name: "description", content: "কালিকলম ব্লগ সম্পর্কে জানুন — আমরা কারা এবং কেন লিখি।" },
      { property: "og:title", content: `আমাদের কথা — ${BLOG_NAME}` },
      { property: "og:description", content: "কালিকলম ব্লগ সম্পর্কে জানুন — আমরা কারা এবং কেন লিখি।" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AboutPage,
});

const features = [
  { icon: BookOpen, title: "পড়ার আনন্দ", text: "পরিষ্কার, আরামদায়ক লেআউটে প্রতিটি লেখা।" },
  { icon: Smartphone, title: "যেকোনো ডিভাইসে", text: "মোবাইল, ট্যাবলেট বা কম্পিউটার — সবখানে সুন্দর।" },
  { icon: Feather, title: "নতুন ভাবনা", text: "নানা লেখকের নানা রঙের গল্প এক জায়গায়।" },
];

function AboutPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 pt-16 sm:px-6">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">আমাদের কথা</p>
      <h1 className="mt-4 text-4xl font-semibold leading-tight sm:text-5xl">
        {BLOG_NAME} — কালি আর কলমের মতো সহজ, আন্তরিক লেখার জায়গা।
      </h1>
      <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
        এই ব্লগের সব লেখা JSONPlaceholder API থেকে আনা হয়। হোম পাতায় সব লেখা কার্ড আকারে দেখা যায়, আর
        "বিস্তারিত" বোতামে চাপ দিলে পুরো লেখা, লেখকের পরিচয় ও পাঠকের মন্তব্য পড়া যায়।
      </p>
      <div className="mt-12 grid gap-5 sm:grid-cols-3">
        {features.map((f) => (
          <div key={f.title} className="rounded-2xl border border-border bg-card p-6 shadow-card">
            <f.icon className="size-6 text-primary" />
            <h2 className="mt-4 text-lg font-semibold">{f.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
          </div>
        ))}
      </div>
      <Link to="/" className="mt-12 inline-flex rounded-full bg-ink px-6 py-3 font-medium text-ink-foreground hover:bg-primary hover:text-primary-foreground">
        লেখাগুলো পড়ুন
      </Link>
    </div>
  );
}
