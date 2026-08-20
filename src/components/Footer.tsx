import Image from "next/image";
import Link from "next/link";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
	return (
		<footer className="border-t border-primary-700/20 bg-primary-700 text-blue-100">
			<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
				<div>
					<Image
						src="/img/logo/logo.webp"
						alt="Misión San Carlo Acutis"
						width={400}
						height={400}
						className="h-28 w-auto object-contain"
					/>
					<p className="mt-3 text-sm leading-relaxed text-blue-100/95">
						Espacio de evangelización y encuentro para compartir devociones, testimonios y
						recursos inspirados en la vida de Carlo Acutis.
					</p>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase tracking-wider text-blue-100/85">
						Secciones
					</h4>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/novena">
								Novena
							</Link>
						</li>
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/blog">
								Novedades
							</Link>
						</li>
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/entronizaciones">
								Entronizaciones
							</Link>
						</li>
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/misiones">
								Misiones
							</Link>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase tracking-wider text-blue-100/85">
						Comunidad
					</h4>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/videos">
								Videos
							</Link>
						</li>
						<li>
							<Link className="cursor-pointer rounded-sm transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white" href="/contacto">
								Contacto
							</Link>
						</li>
					</ul>
					<div className="mt-5">
						<h5 className="text-xs font-semibold uppercase tracking-wider text-blue-100/80">
							Redes sociales
						</h5>
						<SocialIcons className="mt-3" />
					</div>
				</div>
			</div>
			<div className="border-t border-white/15 bg-white/95 text-primary-700">
				<div className="mx-auto flex max-w-6xl items-center px-4 py-5">
					<div className="flex items-center gap-2">
						<Image
							src="/img/fibra.webp"
							width={100}
							height={100}
							alt="Logo de Fibra TV, impulsor de Misión San Carlo Acutis Chascomús"
							className="rounded-lg shadow-lg"
						/>
						<div className="text-sm text-primary-700/85">
							<p>Impulsado por Fibra TV</p>
							<p className="text-xs text-primary-700/70">
								&copy; {new Date().getFullYear()} Misión San Carlo Acutis Chascomús
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
