import { readFile } from "node:fs/promises";
import path from "node:path";

export type InstagramMediaType = "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";

export type InstagramPost = {
  code: string;
  permalink: string;
  dateUtc: string;
  mediaType: InstagramMediaType;
  title: string;
  summary: string;
  caption: string;
  likeCount: number;
  commentCount: number;
  playCount: number | null;
  thumbnailUrl: string;
  imageUrls: string[];
  embedUrl: string;
};

export type InstagramProfile = {
  username: string;
  fullName: string;
  biography: string;
  profileUrl: string;
  profilePicUrl: string;
  isVerified: boolean;
  followers: number;
  following: number;
  totalPosts: number;
};

export type InstagramData = {
  profile: InstagramProfile;
  availablePosts: number;
  generatedAt: string;
  posts: InstagramPost[];
};

const DATA_PATH = path.join(process.cwd(), "public", "instagram", "instagram.json");

let cachedData: Promise<InstagramData> | null = null;

export async function getInstagramData(): Promise<InstagramData> {
  if (!cachedData) {
    cachedData = readFile(DATA_PATH, "utf8").then((raw) => JSON.parse(raw) as InstagramData);
  }
  return cachedData;
}

export async function getInstagramProfile(): Promise<InstagramProfile> {
  const data = await getInstagramData();
  return data.profile;
}

export async function getInstagramPosts(): Promise<InstagramPost[]> {
  const data = await getInstagramData();
  return data.posts;
}

export async function getInstagramPostsPreview(limit = 6): Promise<InstagramPost[]> {
  const posts = await getInstagramPosts();
  return posts.slice(0, limit);
}
