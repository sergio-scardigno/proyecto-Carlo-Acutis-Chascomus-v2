type SocialIconsProps = {
	className?: string;
	iconClassName?: string;
};

const socialLinks = [
	{
		name: "Facebook",
		href: "https://www.facebook.com/people/CARLO-Acutis-Chascomus-Argentina/61573008124011/",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
				<path d="M13.5 22v-8h2.7l.4-3.1h-3.1V9c0-.9.3-1.5 1.6-1.5h1.7V4.7c-.3 0-1.3-.1-2.4-.1-2.4 0-4 1.4-4 4.1v2.2H8v3.1h2.7v8h2.8Z" />
			</svg>
		),
	},
	{
		name: "Instagram",
		href: "https://www.instagram.com/sancarloacutischascomus/",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
				<path d="M12 3.2c2.9 0 3.2 0 4.3.1 1 .1 1.6.2 2 .4.5.2.9.4 1.3.8.4.4.6.8.8 1.3.2.4.3 1 .4 2 .1 1.1.1 1.4.1 4.3s0 3.2-.1 4.3c-.1 1-.2 1.6-.4 2-.2.5-.4.9-.8 1.3-.4.4-.8.6-1.3.8-.4.2-1 .3-2 .4-1.1.1-1.4.1-4.3.1s-3.2 0-4.3-.1c-1-.1-1.6-.2-2-.4a3.3 3.3 0 0 1-2.1-2.1c-.2-.4-.3-1-.4-2-.1-1.1-.1-1.4-.1-4.3s0-3.2.1-4.3c.1-1 .2-1.6.4-2 .2-.5.4-.9.8-1.3.4-.4.8-.6 1.3-.8.4-.2 1-.3 2-.4 1.1-.1 1.4-.1 4.3-.1Zm0-2.2C9 1 8.7 1 7.5 1.1 6.2 1.1 5.3 1.3 4.6 1.6a5.5 5.5 0 0 0-2 1.3 5.5 5.5 0 0 0-1.3 2c-.3.7-.5 1.6-.5 2.9C.7 8.9.7 9.2.7 12c0 2.8 0 3.1.1 4.2.1 1.3.2 2.2.5 2.9.3.7.7 1.4 1.3 2a5.5 5.5 0 0 0 2 1.3c.7.3 1.6.5 2.9.5 1.1.1 1.4.1 4.2.1s3.1 0 4.2-.1c1.3-.1 2.2-.2 2.9-.5.7-.3 1.4-.7 2-1.3a5.5 5.5 0 0 0 1.3-2c.3-.7.5-1.6.5-2.9.1-1.1.1-1.4.1-4.2s0-3.1-.1-4.2c-.1-1.3-.2-2.2-.5-2.9-.3-.7-.7-1.4-1.3-2a5.5 5.5 0 0 0-2-1.3c-.7-.3-1.6-.5-2.9-.5C15.1 1 14.8 1 12 1Z" />
				<path d="M12 6.9A5.1 5.1 0 1 0 12 17a5.1 5.1 0 0 0 0-10.1Zm0 8A2.9 2.9 0 1 1 12 9a2.9 2.9 0 0 1 0 5.9Z" />
				<circle cx="17.3" cy="6.7" r="1.2" />
			</svg>
		),
	},
	{
		name: "TikTok",
		href: "https://www.tiktok.com/@sancarloacutischascomus",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
				<path d="M16.9 3c.4 2 1.5 3.2 3.1 3.7v3.1a6.7 6.7 0 0 1-3.1-1V14a6 6 0 1 1-6-6h.1V11h-.1a3 3 0 1 0 3 3V3h3Z" />
			</svg>
		),
	},
	{
		name: "WhatsApp",
		href: "https://wa.me/+5492241699557",
		icon: (
			<svg viewBox="0 0 24 24" aria-hidden="true" className="h-full w-full fill-current">
				<path d="M20.5 3.5A11 11 0 0 0 3.9 17.3L2.5 22l4.8-1.3A11 11 0 1 0 20.5 3.5ZM12 20a8.7 8.7 0 0 1-4.4-1.2l-.3-.2-2.8.8.8-2.7-.2-.3A8.8 8.8 0 1 1 12 20Zm4.8-6.5c-.3-.2-1.6-.8-1.9-.8-.2-.1-.4-.1-.6.2l-.8 1c-.2.2-.3.2-.5.1a7 7 0 0 1-2-1.2 7.8 7.8 0 0 1-1.4-1.8c-.1-.2 0-.3.1-.4l.4-.5.3-.5c.1-.1.1-.3 0-.4l-.8-1.9c-.2-.5-.5-.4-.7-.4H8a1.1 1.1 0 0 0-.8.4 3.2 3.2 0 0 0-1 2.4c0 1.4 1 2.7 1.1 2.9.2.2 2 3 4.8 4.2.7.3 1.2.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.6-.7 1.8-1.4.2-.7.2-1.2.1-1.4 0-.1-.2-.2-.5-.4Z" />
			</svg>
		),
	},
];

export function SocialIcons({ className = "", iconClassName = "" }: SocialIconsProps) {
	return (
		<div className={`flex items-center gap-3 ${className}`.trim()}>
			{socialLinks.map((socialLink) => (
				<a
					key={socialLink.name}
					href={socialLink.href}
					target="_blank"
					rel="noreferrer noopener"
					aria-label={socialLink.name}
					className="text-white transition hover:text-white/80"
				>
					<span className={`block h-5 w-5 ${iconClassName}`.trim()}>{socialLink.icon}</span>
				</a>
			))}
		</div>
	);
}
