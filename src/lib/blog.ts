import { queryOptions } from "@tanstack/react-query";

export const API_BASE = "https://jsonplaceholder.typicode.com";
export const BLOG_NAME = "কালিকলম";

export type Post = { userId: number; id: number; title: string; body: string };
export type User = {
  id: number;
  name: string;
  username: string;
  email: string;
  website: string;
  company: { name: string; catchPhrase: string };
};
export type Comment = { postId: number; id: number; name: string; email: string; body: string };

async function getJson<T>(path: string): Promise<T> {
  let res: Response;
  try {
    res = await fetch(`${API_BASE}${path}`);
  } catch {
    throw new Error("সার্ভারের সাথে যোগাযোগ করা যায়নি। ইন্টারনেট সংযোগ পরীক্ষা করে আবার চেষ্টা করুন।");
  }
  if (!res.ok) {
    throw new Error(res.status === 404 ? "পোস্টটি খুঁজে পাওয়া যায়নি।" : `সার্ভার থেকে সমস্যা হয়েছে (${res.status})।`);
  }
  return (await res.json()) as T;
}

export const postsQuery = () =>
  queryOptions({ queryKey: ["posts"], queryFn: () => getJson<Post[]>("/posts"), retry: 1 });

export const postQuery = (id: string) =>
  queryOptions({ queryKey: ["posts", id], queryFn: () => getJson<Post>(`/posts/${id}`), retry: 1 });

export const userQuery = (id: number) =>
  queryOptions({ queryKey: ["users", id], queryFn: () => getJson<User>(`/users/${id}`), retry: 1 });

export const commentsQuery = (postId: string) =>
  queryOptions({
    queryKey: ["posts", postId, "comments"],
    queryFn: () => getJson<Comment[]>(`/posts/${postId}/comments`),
    retry: 1,
  });

/** JSONPlaceholder text is all lowercase — capitalise the first letter for display. */
export function capitalize(text: string) {
  const t = text.trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

/** Rough reading time in minutes (at least 1). */
export function readingMinutes(text: string) {
  return Math.max(1, Math.round(text.split(/\s+/).length / 200));
}
