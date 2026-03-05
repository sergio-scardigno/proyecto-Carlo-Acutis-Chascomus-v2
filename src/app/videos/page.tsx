import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";

export default function VideosPage() {
	return (
		<main className="page-shell">
			<div className="page-content">
				<PageHeader
					title="Videos"
					description="Colección de videos relacionados con Carlo Acutis y la misión del proyecto."
				/>
				<SurfaceCard className="mx-auto mt-10 max-w-4xl">
					<p className="text-primary-600/90">
						Estamos preparando una selección de videos con testimonios, celebraciones y material
						formativo para la comunidad.
					</p>
				</SurfaceCard>
			</div>
		</main>
	);
}


