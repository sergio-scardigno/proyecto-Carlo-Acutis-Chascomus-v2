"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState } from "react";

const navItems = [
	{ href: "/", label: "Home" },
	{ href: "/novena", label: "Novena" },
	{ href: "/blog", label: "Novedades" },
	{ href: "/entronizaciones", label: "Entronizaciones" },
	{ href: "/videos", label: "Videos" },
	{ href: "/contacto", label: "Contacto" },
];

export function Navbar() {
	const pathname = usePathname();
	const isHome = pathname === "/";
	const [mobileOpen, setMobileOpen] = useState(false);

	const items = useMemo(
		() =>
			navItems.map((item) => ({
				...item,
				active: pathname === item.href,
			})),
		[pathname]
	);

	const mobileButtonClass = isHome
		? "text-white border-white/30 bg-black/10 hover:bg-black/25 focus-visible:outline-white"
		: "text-primary-700 border-primary-500/20 bg-primary-500/10 hover:bg-primary-500/15 focus-visible:outline-primary-500";

	const mobileMenuClass = isHome
		? "bg-primary-700/90 text-white border-white/15 shadow-lg shadow-black/30"
		: "bg-surface/95 text-primary-700 border-primary-700/10 shadow-lg shadow-primary-500/20";

	return (
		<header
			className={`${
				isHome
					? "absolute top-0 left-0 right-0 z-50 bg-transparent"
					: "sticky top-0 z-50 w-full border-b border-primary-700/10 bg-surface/95 backdrop-blur-md"
			}`}
		>
			<div
				className={`${
					isHome ? "bg-black/35 text-white backdrop-blur-[2px]" : "bg-primary-700 text-white"
				}`}
			>
				<div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-2 text-xs md:text-sm">
					<p className="font-medium tracking-wide">Comunidad Carlo Acutis Argentina</p>
					<div className="flex items-center gap-3">
						<a href="#" className="hover:text-white/80">
							YouTube
						</a>
						<a href="#" className="hover:text-white/80">
							Instagram
						</a>
						<a href="#" className="hover:text-white/80">
							WhatsApp
						</a>
					</div>
				</div>
			</div>

			<div className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
				<Link
					href="/"
					className={`hidden text-sm font-semibold md:inline-block ${
						isHome ? "text-white drop-shadow-[0_1px_3px_rgba(0,0,0,0.8)]" : "text-primary-700"
					}`}
				>
					Proyecto Carlo Acutis
				</Link>
				<button
					type="button"
					onClick={() => setMobileOpen((prev) => !prev)}
					className={`inline-flex h-10 w-10 items-center justify-center rounded-full border text-base transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 md:hidden ${mobileButtonClass}`}
					aria-expanded={mobileOpen}
					aria-controls="mobile-nav"
				>
					<span className="sr-only">{mobileOpen ? "Cerrar menú" : "Abrir menú"}</span>
					<svg
						className="h-5 w-5"
						viewBox="0 0 24 24"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						{mobileOpen ? (
							<path
								d="M6 6L18 18M6 18L18 6"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						) : (
							<path
								d="M4 7H20M4 12H20M4 17H20"
								stroke="currentColor"
								strokeWidth="1.8"
								strokeLinecap="round"
							/>
						)}
					</svg>
				</button>
				<nav className="hidden items-center gap-1 md:flex md:gap-2">
					{items.map((item) => (
						<Link
							key={item.href}
							href={item.href}
							className={`rounded-full px-3 py-2 text-sm font-medium transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500 ${
								item.active
									? "bg-primary-500 text-white shadow shadow-primary-500/40"
									: isHome
									? "text-white/95 hover:bg-black/20 drop-shadow-[0_1px_2px_rgba(0,0,0,0.75)]"
									: "text-primary-700 hover:bg-primary-500/10"
							}`}
						>
							{item.label}
						</Link>
					))}
				</nav>
				<div
					id="mobile-nav"
					className={`absolute top-full mt-2 w-[calc(100vw-2.5rem)] max-w-sm -translate-x-1/2 origin-top overflow-hidden rounded-2xl border p-3 transition-all duration-200 ease-out md:hidden ${mobileMenuClass} ${
						mobileOpen
							? "pointer-events-auto opacity-100 backdrop-blur-md"
							: "pointer-events-none -translate-y-2 scale-95 opacity-0"
					}`}
					style={{ left: "50%" }}
				>
					<nav className="flex flex-col gap-1.5">
						{items.map((item) => (
							<Link
								key={item.href}
								href={item.href}
								onClick={() => setMobileOpen(false)}
								className={`rounded-xl px-3 py-2 text-sm font-medium transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
									item.active ? "bg-primary-500/25" : "hover:bg-primary-500/15"
								}`}
							>
								{item.label}
							</Link>
						))}
					</nav>
				</div>
			</div>
		</header>
	);
}
