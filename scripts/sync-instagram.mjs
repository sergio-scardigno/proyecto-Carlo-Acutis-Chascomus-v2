// Sincroniza los datos scrapeados de Instagram hacia `public/instagram/`.
//
// - Combina profile.json + posts_latest.json en un unico public/instagram/instagram.json
// - Copia las imagenes ya convertidas (images_webp) a public/instagram/images
// - Reescribe las rutas locales de imagen a /instagram/images/<archivo>.webp
//
// Uso: node scripts/sync-instagram.mjs [usuario]

import { cp, mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");

const USERNAME = process.argv[2] ?? "sancarloacutischascomus";
const SOURCE_DIR = path.join(ROOT, "python", "output", USERNAME);
const SOURCE_PROFILE = path.join(SOURCE_DIR, "profile.json");
const SOURCE_POSTS = path.join(SOURCE_DIR, "posts_latest.json");
const SOURCE_IMAGES = path.join(SOURCE_DIR, "images_webp");

const PUBLIC_DIR = path.join(ROOT, "public", "instagram");
const PUBLIC_IMAGES = path.join(PUBLIC_DIR, "images");
const PUBLIC_JSON = path.join(PUBLIC_DIR, "instagram.json");

const PUBLIC_IMAGE_PREFIX = "/instagram/images";

async function readJson(filePath) {
  const raw = await readFile(filePath, "utf8");
  return JSON.parse(raw);
}

function toWebpPublicPath(localPath) {
  if (!localPath) return "";
  const base = path.basename(localPath, path.extname(localPath));
  return `${PUBLIC_IMAGE_PREFIX}/${base}.webp`;
}

function mapProfile(profile) {
  const counts = profile.counts ?? {};
  return {
    username: profile.username ?? USERNAME,
    fullName: profile.full_name ?? "",
    biography: profile.biography ?? "",
    profileUrl: profile.profile_url ?? `https://www.instagram.com/${USERNAME}/`,
    profilePicUrl: profile.profile_pic_url ?? "",
    isVerified: Boolean(profile.is_verified),
    followers: counts.followers ?? 0,
    following: counts.following ?? 0,
    totalPosts: counts.posts ?? 0,
  };
}

function mapPost(post) {
  const localImages = Array.isArray(post.local_images) ? post.local_images : [];
  const imageUrls = localImages.map(toWebpPublicPath).filter(Boolean);
  const code = post.code ?? "";

  return {
    code,
    permalink: post.permalink ?? (code ? `https://www.instagram.com/p/${code}/` : ""),
    dateUtc: post.date_utc ?? "",
    mediaType: post.media_type ?? "IMAGE",
    title: post.title ?? "",
    summary: post.summary ?? "",
    caption: post.caption ?? "",
    likeCount: post.like_count ?? 0,
    commentCount: post.comment_count ?? 0,
    playCount: post.play_count ?? null,
    thumbnailUrl: imageUrls[0] ?? "",
    imageUrls,
    embedUrl: code ? `https://www.instagram.com/p/${code}/embed` : "",
  };
}

async function main() {
  const [profileRaw, postsRaw] = await Promise.all([
    readJson(SOURCE_PROFILE),
    readJson(SOURCE_POSTS),
  ]);

  const posts = (Array.isArray(postsRaw) ? postsRaw : [])
    .map(mapPost)
    .filter((post) => post.code)
    .sort((a, b) => (a.dateUtc < b.dateUtc ? 1 : a.dateUtc > b.dateUtc ? -1 : 0));

  const data = {
    profile: mapProfile(profileRaw),
    availablePosts: posts.length,
    generatedAt: new Date().toISOString(),
    posts,
  };

  await rm(PUBLIC_IMAGES, { recursive: true, force: true });
  await mkdir(PUBLIC_IMAGES, { recursive: true });
  await cp(SOURCE_IMAGES, PUBLIC_IMAGES, { recursive: true });

  await writeFile(PUBLIC_JSON, `${JSON.stringify(data, null, 2)}\n`, "utf8");

  const imageCount = (await readdir(PUBLIC_IMAGES)).length;
  console.log(
    `Sync OK: ${posts.length} posts, ${imageCount} imagenes -> public/instagram/ ` +
      `(perfil: ${data.profile.totalPosts} publicaciones)`,
  );
}

main().catch((error) => {
  console.error("Error sincronizando Instagram:", error.message);
  process.exitCode = 1;
});
