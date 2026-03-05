"use client";
import { useEffect, useMemo, useRef, useState } from "react";

type ParallaxLayer = {
	src: string;
	speed?: number;
	opacity?: number;
	className?: string;
	offsetX?: number;
	mobileOffsetX?: number;
	offsetY?: number;
	mobileOffsetY?: number;
	scale?: number;
	mobileScale?: number;
	size?: "cover" | "contain";
	position?: string;
};

type HeroParallaxProps = {
	title: string;
	subtitle?: string;
	/**
	 * Imagen única de fondo (fallback si no se proveen layers).
	 */
	backgroundUrl?: string;
	/**
	 * Capas para parallax. Orden: de fondo (index 0) a frente (último).
	 */
	layers?: ParallaxLayer[];
	/**
	 * Capas alternativas para móviles (<= 768px). Si existen, sustituyen a `layers`.
	 */
	mobileLayers?: ParallaxLayer[];
	ctaText?: string;
	scrollToId?: string;
};

export function HeroParallax({
	title,
	subtitle = "",
	backgroundUrl = "/hero.jpg",
	layers = [],
	mobileLayers = [],
	ctaText = "Explorar",
	scrollToId = "sections",
}: HeroParallaxProps) {
	const sectionRef = useRef<HTMLDivElement>(null);
	const layerRefs = useRef<Array<HTMLDivElement | null>>([]);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		if (typeof window === "undefined") return;
		const media = window.matchMedia("(max-width: 768px)");
		const update = () => setIsMobile(media.matches);
		update();
		media.addEventListener("change", update);
		return () => media.removeEventListener("change", update);
	}, []);

	// Normalizamos capas con defaults; si no hay, usamos el fondo único
	const normalizedLayers = useMemo(() => {
		const sourceLayers = (isMobile && mobileLayers.length > 0 ? mobileLayers : layers) ?? [];
		if (!sourceLayers || sourceLayers.length === 0) return [];
		return sourceLayers.map((l) => ({
			src: l.src,
			speed: l.speed ?? 0.2,
			opacity: l.opacity ?? 1,
			className: l.className ?? "",
			offsetX: l.offsetX,
			mobileOffsetX: l.mobileOffsetX,
			offsetY: l.offsetY,
			mobileOffsetY: l.mobileOffsetY,
			scale: l.scale,
			mobileScale: l.mobileScale,
			size: l.size,
			position: l.position,
		}));
	}, [isMobile, layers, mobileLayers]);

	useEffect(() => {
		const el = sectionRef.current;
		if (!el) return;
		let frame = 0;
		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = requestAnimationFrame(() => {
				// Fallback: variable CSS para el modo de una sola imagen
				const y = window.scrollY * 0.4;
				el.style.setProperty("--parallax-y", `${y}px`);

				// Modo multicapas
				if (normalizedLayers.length > 0) {
					if (layerRefs.current.length !== normalizedLayers.length) {
						layerRefs.current = new Array(normalizedLayers.length);
					}
					for (let i = 0; i < layerRefs.current.length; i += 1) {
						const layerEl = layerRefs.current[i];
						if (!layerEl) continue;
						const speed = normalizedLayers[i]?.speed ?? 0.2;
						const isMobile = window.innerWidth < 768;
						const baseOffsetX =
							(isMobile
								? normalizedLayers[i]?.mobileOffsetX ?? normalizedLayers[i]?.offsetX
								: normalizedLayers[i]?.offsetX) ?? 0;
						const baseOffset =
							(isMobile
								? normalizedLayers[i]?.mobileOffsetY ?? normalizedLayers[i]?.offsetY
								: normalizedLayers[i]?.offsetY) ?? 0;
						const translateY = window.scrollY * speed + baseOffset;
						const translateX = baseOffsetX;
						const scale =
							(isMobile
								? normalizedLayers[i]?.mobileScale ?? normalizedLayers[i]?.scale
								: normalizedLayers[i]?.scale) ?? 1;
						layerEl.style.transform = `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`;
					}
				}
			});
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		onScroll();
		return () => window.removeEventListener("scroll", onScroll);
	}, [normalizedLayers]);

	return (
		<section
			ref={sectionRef}
			className="relative flex min-h-screen items-center justify-center overflow-hidden"
			style={{
				// CSS var used by inline transform for smoother parallax
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-ignore
				"--parallax-y": "0px",
			}}
		>
			{normalizedLayers.length === 0 ? (
				<div
					className="pointer-events-none absolute inset-0 -z-10 will-change-transform"
					style={{
						backgroundImage: `url('${backgroundUrl}')`,
						backgroundSize: "cover",
						backgroundPosition: "center",
						backgroundRepeat: "no-repeat",
						transform: "translate3d(0, calc(var(--parallax-y) * 1), 0)",
					}}
				/>
			) : (
				// Render multicapas
				normalizedLayers.map((layer, idx) => {
					const backgroundSize = layer.size ?? (idx === 0 ? "cover" : "contain");
					const backgroundPosition = layer.position ?? (idx === 0 ? "center" : "center bottom");
					return (
						<div
							// eslint-disable-next-line react/no-array-index-key
							key={idx}
							ref={(el) => {
								layerRefs.current[idx] = el;
							}}
							className={`pointer-events-none absolute inset-0 -z-10 will-change-transform ${layer.className}`}
							style={{
								backgroundImage: `url('${layer.src}')`,
								backgroundSize,
								backgroundPosition,
								backgroundRepeat: "no-repeat",
								opacity: layer.opacity,
								transform: "translate3d(0, 0, 0) scale(1)",
							}}
						/>
					);
				})
			)}
			<div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-black/40 via-black/15 to-transparent" />
			<div className="relative mx-auto w-full max-w-6xl px-4 pt-2 pb-24 md:py-0">
				<div className="grid items-start gap-3 md:grid-cols-2 md:items-center">
					{/* Columna izquierda vacía para el layout en 2 columnas */}
					<div className="hidden md:block" />
					{/* Columna derecha con contenido */}
					<div className="-mt-[250px] space-y-2 text-center md:mt-0 md:space-y-6 md:text-left">
						<h1 className="text-balance text-2xl font-bold tracking-tight text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:text-6xl">
							{title}
						</h1>
						{subtitle ? (
							<p className="mt-2 text-pretty text-base text-white drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)] md:mt-4 md:text-xl">
								{subtitle}
							</p>
						) : null}
						<div className="pt-2 md:pt-6">
							<a
								href={`#${scrollToId}`}
								className="inline-block rounded-full bg-accent-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-accent-500/40 transition hover:shadow-accent-500/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent-500"
							>
								{ctaText}
							</a>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}


