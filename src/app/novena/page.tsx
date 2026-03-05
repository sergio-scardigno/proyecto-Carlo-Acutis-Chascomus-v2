import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";

export default function NovenaPage() {
	return (
		<main className="page-shell">
			<div className="page-content max-w-4xl">
				<PageHeader
					title="Novena"
					description="Contenido de la novena a Carlo Acutis. Próximamente agregaremos el texto completo y la guía diaria."
				/>
				<SurfaceCard className="mx-auto mt-10 max-w-3xl">
					<p className="text-primary-600/90">
						Muy pronto publicaremos aquí la novena completa con meditaciones y oraciones para cada
						día.
					</p>
				</SurfaceCard>
			</div>
		</main>
	);
}


