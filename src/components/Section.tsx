type SectionProps = {
	id?: string;
	title: string;
	description?: string;
	children?: React.ReactNode;
	background?: "none" | "subtle" | "alt";
};

export function Section({
	id,
	title,
	description,
	children,
	background = "none",
}: SectionProps) {
	const bg =
		background === "subtle"
			? "bg-white/45"
			: background === "alt"
			? "bg-primary-500/8"
			: "";
	return (
		<section id={id} className={`${bg} py-16 md:py-24`}>
			<div className="mx-auto max-w-6xl px-4">
				<div className="mx-auto max-w-3xl text-center">
					<h2 className="text-balance text-3xl font-semibold tracking-tight text-primary-700 md:text-4xl">
						{title}
					</h2>
					{description ? (
						<p className="mt-4 text-pretty text-primary-600/80">{description}</p>
					) : null}
				</div>
				{children ? <div className="mt-12">{children}</div> : null}
			</div>
		</section>
	);
}


