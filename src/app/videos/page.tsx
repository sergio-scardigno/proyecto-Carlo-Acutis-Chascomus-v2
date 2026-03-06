import { EmptyState } from "@/components/EmptyState";
import { getVideos } from "@/lib/content";
import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";

export const revalidate = 300;

export default async function VideosPage() {
	let videos: Awaited<ReturnType<typeof getVideos>> = [];
	let hasError = false;

	try {
		videos = await getVideos();
	} catch {
		hasError = true;
	}

	return (
		<main className="page-shell">
			<div className="page-content">
				<PageHeader
					title="Videos"
					description="Colección de videos relacionados con Carlo Acutis y la misión del proyecto."
				/>

				<div className="mt-10">
					{hasError ? (
						<EmptyState message="No pudimos cargar los videos en este momento." />
					) : videos.length === 0 ? (
						<EmptyState message="Aún no hay videos cargados." />
					) : (
						<div className="grid gap-6 md:grid-cols-2">
							{videos.map((item) => (
								<SurfaceCard key={item.id}>
									<h2 className="text-xl font-semibold text-primary-700">{item.titulo}</h2>
									<p className="mt-3 text-sm text-primary-600/90">{item.descripcion}</p>

									<div className="mt-4 overflow-hidden rounded-xl">
										<iframe
											className="aspect-video w-full"
											src={item.youtubeEmbedUrl}
											title={`Video de YouTube: ${item.titulo}`}
											loading="lazy"
											referrerPolicy="strict-origin-when-cross-origin"
											allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
											allowFullScreen
										/>
									</div>
								</SurfaceCard>
							))}
						</div>
					)}
				</div>
			</div>
		</main>
	);
}


