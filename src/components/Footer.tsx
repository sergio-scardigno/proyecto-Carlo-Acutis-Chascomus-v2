export function Footer() {
	return (
		<footer className="border-t border-primary-700/20 bg-primary-700 text-blue-100">
			<div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
				<div>
					<h3 className="text-lg font-semibold text-white">Proyecto Carlo Acutis</h3>
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
						<li>
							<a className="transition hover:text-white" href="#">
								Canal de YouTube
							</a>
						</li>
					</ul>
				</div>
			</div>
			<div className="border-t border-white/15">
				<div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-blue-100/80 md:flex-row md:items-center md:justify-between">
					<p>&copy; {new Date().getFullYear()} Proyecto Carlo Acutis. Todos los derechos reservados.</p>
					<p>Construido con Next.js y Tailwind CSS</p>
				</div>
			</div>
		</footer>
	);
}
