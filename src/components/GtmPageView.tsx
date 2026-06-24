"use client";

import { gaMeasurementId } from "@/components/Ga4";
import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

declare global {
	interface Window {
		dataLayer?: unknown[];
		gtag?: (...args: unknown[]) => void;
	}
}

export function GtmPageView() {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	useEffect(() => {
		if (!pathname) return;

		const query = searchParams.toString();
		const pagePath = query ? `${pathname}?${query}` : pathname;

		window.dataLayer = window.dataLayer ?? [];
		window.dataLayer.push({
			event: "page_view",
			page_path: pagePath,
			page_title: document.title,
			page_location: window.location.href,
		});

		window.gtag?.("config", gaMeasurementId, {
			page_path: pagePath,
			page_title: document.title,
			page_location: window.location.href,
		});
	}, [pathname, searchParams]);

	return null;
}
