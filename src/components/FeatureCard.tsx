import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";

type FeatureCardProps = {
  title: string;
  desc: string;
  href: string;
  image: string;
  imageAlt: string;
  icon: ReactNode;
  cta?: string;
};

export function FeatureCard({
  title,
  desc,
  href,
  image,
  imageAlt,
  icon,
  cta = "Ver más",
}: FeatureCardProps) {
  return (
    <Link
      href={href}
      className="surface-card surface-card-interactive group flex cursor-pointer flex-col overflow-hidden rounded-2xl hover:bg-primary-500/5 focus-visible:outline-primary-500"
    >
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={image}
          alt={imageAlt}
          width={1200}
          height={750}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary-700/45 via-primary-700/5 to-transparent" />
        <span className="absolute left-4 top-4 inline-flex h-11 w-11 items-center justify-center rounded-xl bg-white/90 text-primary-600 shadow-sm shadow-primary-700/20 backdrop-blur">
          {icon}
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="text-lg font-semibold text-primary-700">{title}</h3>
        <p className="mt-2 flex-1 text-sm text-primary-600">{desc}</p>
        <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-primary-600 transition-colors group-hover:text-primary-700">
          {cta}
          <svg
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
