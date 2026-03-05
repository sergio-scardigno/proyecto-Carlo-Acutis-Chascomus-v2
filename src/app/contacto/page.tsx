import { PageHeader } from "@/components/PageHeader";
import { SurfaceCard } from "@/components/SurfaceCard";

export default function ContactoPage() {
	return (
		<main className="page-shell">
			<div className="page-content max-w-4xl">
				<PageHeader
					title="Contacto"
					description="Escríbenos para consultas, colaboraciones o más información."
				/>
				<SurfaceCard className="mx-auto mt-10 max-w-3xl">
					<form className="grid grid-cols-1 gap-4 md:grid-cols-2">
						<input
							className="rounded-xl border border-primary-600/25 bg-white/90 px-4 py-2.5 text-primary-700 outline-none transition focus:border-primary-500 focus:bg-white"
							placeholder="Nombre"
						/>
						<input
							className="rounded-xl border border-primary-600/25 bg-white/90 px-4 py-2.5 text-primary-700 outline-none transition focus:border-primary-500 focus:bg-white"
							placeholder="Email"
							type="email"
						/>
						<textarea
							className="h-32 rounded-xl border border-primary-600/25 bg-white/90 px-4 py-2.5 text-primary-700 outline-none transition focus:border-primary-500 focus:bg-white md:col-span-2"
							placeholder="Mensaje"
						/>
						<button className="rounded-full bg-accent-500 px-6 py-3 font-semibold text-white transition hover:shadow-lg hover:shadow-accent-500/40 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500 md:col-span-2">
							Enviar
						</button>
					</form>
				</SurfaceCard>
			</div>
		</main>
	);
}


