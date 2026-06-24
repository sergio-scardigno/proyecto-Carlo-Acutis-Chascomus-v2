"use client";

import { useState } from "react";
import type { InstagramPost } from "@/lib/instagram";
import { InstagramPostCard } from "@/components/InstagramPostCard";
import { InstagramEmbedModal } from "@/components/InstagramEmbedModal";

type InstagramFeedProps = {
  posts: InstagramPost[];
  className?: string;
};

const DEFAULT_GRID =
  "grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4";

export function InstagramFeed({ posts, className }: InstagramFeedProps) {
  const [selected, setSelected] = useState<InstagramPost | null>(null);

  return (
    <>
      <div className={className ?? DEFAULT_GRID}>
        {posts.map((post) => (
          <InstagramPostCard key={post.code} post={post} onOpen={setSelected} />
        ))}
      </div>

      <InstagramEmbedModal post={selected} onClose={() => setSelected(null)} />
    </>
  );
}
