const GA_MEASUREMENT_ID =
	process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID ?? "G-6VL9W034FS";

export const gaMeasurementId = GA_MEASUREMENT_ID;

export function Ga4Script() {
	return (
		<>
			<script
				async
				src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
			/>
			<script
				dangerouslySetInnerHTML={{
					__html: `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${GA_MEASUREMENT_ID}');`,
				}}
			/>
		</>
	);
}
