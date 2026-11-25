import { useCallback, useSyncExternalStore } from "react";

export const BOOKMARKS_KEY = "kalikalom:bookmarks";

const EMPTY: number[] = [];
const listeners = new Set<() => void>();
let cache: number[] | null = null;

/** Add the id if missing, remove it if present. Newest bookmark goes first. */
export function toggleBookmarkId(ids: number[], id: number): number[] {
  return ids.includes(id) ? ids.filter((x) => x !== id) : [id, ...ids];
}

export function readBookmarks(): number[] {
  if (typeof window === "undefined") return EMPTY;
  if (cache) return cache;
  try {
    const parsed: unknown = JSON.parse(window.localStorage.getItem(BOOKMARKS_KEY) ?? "[]");
    cache = Array.isArray(parsed) ? parsed.filter((x): x is number => Number.isInteger(x)) : [];
  } catch {
    cache = [];
  }
  return cache;
}

function write(ids: number[]) {
  cache = ids;
  try {
    window.localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(ids));
  } catch {
    /* storage full or blocked — keep in memory */
  }
  listeners.forEach((l) => l());
}

export function toggleBookmark(id: number) {
  write(toggleBookmarkId(readBookmarks(), id));
}

export function clearBookmarks() {
  write([]);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === BOOKMARKS_KEY) {
      cache = null;
      listener();
    }
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

/** Bookmarked post ids; empty during SSR/hydration, then the saved list. */
export function useBookmarks() {
  const ids = useSyncExternalStore(subscribe, readBookmarks, () => EMPTY);
  const isBookmarked = useCallback((id: number) => ids.includes(id), [ids]);
  return { ids, isBookmarked, toggle: toggleBookmark, clear: clearBookmarks };
}

const noopSubscribe = () => () => {};
/** False during SSR and hydration, true once running in the browser. */
export function useIsClient() {
  return useSyncExternalStore(noopSubscribe, () => true, () => false);
}
