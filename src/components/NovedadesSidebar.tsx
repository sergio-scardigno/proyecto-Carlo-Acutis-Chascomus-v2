import Link from "next/link";
import { getNovedades, type Novedad } from "@/lib/content";

function formatDate(value: string) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    return new Intl.DateTimeFormat("es-AR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
    }).format(date);
}

export async function NovedadesSidebar() {
    let novedades: Novedad[] = [];
    try {
        novedades = await getNovedades();
    } catch (error) {
        console.error("Error fetching novedades for sidebar:", error);
        novedades = [];
    }

    return (
        <aside className="lg:sticky lg:top-28 lg:self-start">
            <div className="surface-card rounded-2xl p-5 shadow-sm border border-primary-600/10">
                <div className="flex items-center justify-between gap-3 mb-6">
                    <div className="flex items-center gap-2">
                        <div className="w-1.5 h-6 bg-primary-600 rounded-full" />
                        <h2 className="text-lg font-bold text-primary-800 tracking-tight">Novedades</h2>
                    </div>
                    <Link
                        href="/blog"
                        className="text-xs font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-wider"
                    >
                        Ver todas
                    </Link>
                </div>

                {novedades.length === 0 ? (
                    <div className="py-8 text-center bg-primary-50/50 rounded-xl border border-dashed border-primary-200">
                        <p className="text-sm text-primary-600/70 italic">
                            Pronto publicaremos nuevas novedades.
                        </p>
                    </div>
                ) : (
                    <div className="space-y-4">
                        {novedades.map((item) => (
                            <Link
                                key={item.id}
                                href={`/blog#${item.slug}`}
                                className="group block rounded-xl border border-transparent bg-white/50 p-3.5 transition-all hover:bg-white hover:border-primary-600/20 hover:shadow-md hover:shadow-primary-600/5 active:scale-[0.98]"
                            >
                                <div className="flex flex-col gap-1.5">
                                    <p className="line-clamp-2 text-[15px] font-semibold text-primary-700 leading-snug group-hover:text-primary-800 transition-colors">
                                        {item.titulo}
                                    </p>
                                    {item.fecha ? (
                                        <div className="flex items-center gap-1.5 opacity-60">
                                            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                            </svg>
                                            <p className="text-[11px] font-medium tracking-wide">{formatDate(item.fecha)}</p>
                                        </div>
                                    ) : null}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </aside>
    );
}
