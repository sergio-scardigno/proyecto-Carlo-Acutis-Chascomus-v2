import Link from "next/link";
import { Section } from "@/components/Section";
import { InstagramFeed } from "@/components/InstagramFeed";
import type { InstagramPost, InstagramProfile } from "@/lib/instagram";

type InstagramHomeSectionProps = {
  profile: InstagramProfile;
  posts: InstagramPost[];
};

function formatNumber(value: number) {
  return value.toLocaleString("es-AR");
}

export function InstagramHomeSection({ profile, posts }: InstagramHomeSectionProps) {
  if (posts.length === 0) return null;

  return (
    <Section
      id="instagram"
      title="Instagram"
      description="Seguí nuestra misión día a día en Instagram. Estas son las últimas publicaciones."
      background="alt"
    >
      <div className="mb-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center text-primary-700">
        <span className="text-sm">
          <strong className="text-lg font-bold text-primary-700">{formatNumber(profile.totalPosts)}</strong>{" "}
          publicaciones
        </span>
        <span className="text-sm">
          <strong className="text-lg font-bold text-primary-700">{formatNumber(profile.followers)}</strong>{" "}
          seguidores
        </span>
        <a
          href={profile.profileUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
        >
          @{profile.username}
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5m0-5L10 14M5 7v12h12" />
          </svg>
        </a>
      </div>

      <InstagramFeed
        posts={posts}
        className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3"
      />

      <div className="mt-10 text-center">
        <Link
          href="/instagram"
          className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow shadow-primary-500/40 transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
        >
          Ver todas las publicaciones
        </Link>
      </div>
    </Section>
  );
}
