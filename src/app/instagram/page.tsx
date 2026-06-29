import { PageHeader } from "@/components/PageHeader";
import { EmptyState } from "@/components/EmptyState";
import { InstagramFeed } from "@/components/InstagramFeed";
import {
  getInstagramPosts,
  getInstagramProfile,
  type InstagramPost,
  type InstagramProfile,
} from "@/lib/instagram";

export const revalidate = 300;

export const metadata = {
  title: "Instagram | San Carlo Acutis Chascomús",
  description:
    "Publicaciones de Instagram de la Misión San Carlo Acutis Chascomús Argentina.",
};

function formatNumber(value: number) {
  return value.toLocaleString("es-AR");
}

export default async function InstagramPage() {
  let profile: InstagramProfile | null = null;
  let posts: InstagramPost[] = [];
  let hasError = false;

  try {
    [profile, posts] = await Promise.all([getInstagramProfile(), getInstagramPosts()]);
  } catch {
    hasError = true;
    profile = null;
    posts = [];
  }

  return (
    <main className="page-shell">
      <div className="page-content">
        <PageHeader
          title="Instagram"
          description={profile?.biography || "Seguí nuestra misión en Instagram."}
        />

        {hasError ? (
          <div className="mt-10">
            <EmptyState message="No pudimos cargar las publicaciones de Instagram en este momento." />
          </div>
        ) : (
          <>
            {profile ? (
              <div className="mt-8 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center">
                <Stat value={formatNumber(profile.totalPosts)} label="Publicaciones" />
                <Stat value={formatNumber(profile.followers)} label="Seguidores" />
                <Stat value={formatNumber(posts.length)} label="En esta web" />
              </div>
            ) : null}

            {profile ? (
              <div className="mt-6 flex justify-center">
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="inline-flex items-center gap-2 rounded-full bg-primary-500 px-6 py-3 text-sm font-semibold text-white shadow shadow-primary-500/40 transition-colors hover:bg-primary-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500"
                >
                  Seguir @{profile.username}
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5h5v5m0-5L10 14M5 7v12h12" />
                  </svg>
                </a>
              </div>
            ) : null}

            <div className="mt-12">
              {posts.length === 0 ? (
                <EmptyState message="Aún no hay publicaciones disponibles." />
              ) : (
                <InstagramFeed posts={posts} />
              )}
            </div>

            {profile && posts.length < profile.totalPosts ? (
              <p className="mt-10 text-center text-sm text-primary-600/70">
                Mostrando {formatNumber(posts.length)} de {formatNumber(profile.totalPosts)} publicaciones.
                Encontrá el archivo completo en{" "}
                <a
                  href={profile.profileUrl}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-semibold text-primary-600 hover:text-primary-700"
                >
                  nuestro Instagram
                </a>
                .
              </p>
            ) : null}
          </>
        )}
      </div>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-primary-700 md:text-3xl">{value}</span>
      <span className="text-xs font-medium uppercase tracking-wider text-primary-600/80">
        {label}
      </span>
    </div>
  );
}
