import { beforeEach, describe, expect, it, vi } from "vitest";

beforeEach(() => {
  window.localStorage.clear();
  vi.resetModules();
});

describe("bookmarks", () => {
  it("bookmarking a post adds it, bookmarking again removes it", async () => {
    const { toggleBookmarkId } = await import("@/lib/bookmarks");
    expect(toggleBookmarkId([], 5)).toEqual([5]);
    expect(toggleBookmarkId([5, 2], 5)).toEqual([2]);
  });

  it("keeps bookmarks after reload (saved on this device)", async () => {
    const first = await import("@/lib/bookmarks");
    first.toggleBookmark(3);
    first.toggleBookmark(7);

    vi.resetModules();
    const reloaded = await import("@/lib/bookmarks");
    expect(reloaded.readBookmarks()).toEqual([7, 3]);
  });

  it("clearing removes every bookmark", async () => {
    const m = await import("@/lib/bookmarks");
    m.toggleBookmark(1);
    m.clearBookmarks();
    vi.resetModules();
    expect((await import("@/lib/bookmarks")).readBookmarks()).toEqual([]);
  });
});
