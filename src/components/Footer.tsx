import Image from "next/image";
import { SocialIcons } from "./SocialIcons";

export function Footer() {
	return (
		<footer className="border-t border-primary-700/20 bg-primary-700 text-blue-100">
			<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
				<div>
					<Image
						src="/img/logo/logo.png"
						alt="Misión San Carlo Acutis"
						width={400}
						height={400}
						className="h-28 w-auto object-contain"
					/>
					<p className="mt-3 text-sm leading-relaxed text-blue-100/90">
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
							<a className="transition hover:text-white" href="/novena">
								Novena
							</a>
						</li>
						<li>
							<a className="transition hover:text-white" href="/blog">
								Novedades
							</a>
						</li>
						<li>
							<a className="transition hover:text-white" href="/entronizaciones">
								Entronizaciones
							</a>
						</li>
						<li>
							<a className="transition hover:text-white" href="/misiones">
								Misiones
							</a>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="text-sm font-semibold uppercase tracking-wider text-blue-100/85">
						Comunidad
					</h4>
					<ul className="mt-3 space-y-2 text-sm">
						<li>
							<a className="transition hover:text-white" href="/videos">
								Videos
							</a>
						</li>
						<li>
							<a className="transition hover:text-white" href="/contacto">
								Contacto
							</a>
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
				<div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 md:flex-row md:items-center md:justify-between">
					<div className="flex items-center">
						<a
							href="https://cv-sergio-scardigno.vercel.app/"
							target="_blank"
							rel="noopener noreferrer"
							aria-label="Diseño y desarrollo por Sergio Scardigno"
							className="rounded-lg p-1 transition hover:bg-primary-700/10"
						>
							<span className="block">
								<Image
									src="/img/programmer.png"
									alt="Ilustración de programador: desarrollado por Sergio Scardigno"
									width={40}
									height={40}
									className="rounded-lg"
								/>
							</span>
						</a>
					</div>
					<div className="flex items-center gap-2">
						<Image
							src="/img/fibra.png"
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
