"use client";

import { useState } from "react";
import Image from "next/image";

interface ImageGalleryProps {
    images: string[];
    lugar: string;
    slug: string;
}

export function ImageGallery({ images, lugar, slug }: ImageGalleryProps) {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    // Cerrar el modal al presionar Escape
    if (typeof window !== "undefined") {
        window.onkeydown = (e) => {
            if (e.key === "Escape") {
                setSelectedImage(null);
            }
        };
    }

    return (
        <>
            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
                {images.map((imagePath) => (
                    <button
                        key={`${slug}-${imagePath}`}
                        onClick={() => setSelectedImage(imagePath)}
                        className="group relative h-72 w-full overflow-hidden rounded-xl cursor-pointer block text-left"
                    >
                        <Image
                            src={encodeURI(imagePath)}
                            alt={`Entronización en ${lugar}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, 50vw"
                            unoptimized
                        />
                        <div className="absolute inset-0 bg-black/0 transition-colors duration-500 group-hover:bg-black/20 flex items-center justify-center">
                            <span className="sr-only">Expandir imagen</span>
                            <svg
                                className="w-10 h-10 text-white opacity-0 transition-opacity duration-500 group-hover:opacity-100 drop-shadow-lg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                            </svg>
                        </div>
                    </button>
                ))}
            </div>

            {/* Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm"
                    onClick={() => setSelectedImage(null)}
                >
                    <button
                        className="absolute top-4 right-4 text-white/70 hover:text-white z-50 p-2 transition-colors"
                        onClick={(e) => {
                            e.stopPropagation();
                            setSelectedImage(null);
                        }}
                    >
                        <span className="sr-only">Cerrar modal</span>
                        <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div
                        className="relative w-full h-full max-w-5xl max-h-[90vh] flex items-center justify-center p-4 md:p-8"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-full flex items-center justify-center">
                            <Image
                                src={encodeURI(selectedImage)}
                                alt={`Imagen ampliada de ${lugar}`}
                                fill
                                className="object-contain"
                                sizes="100vw"
                                unoptimized
                            />
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
