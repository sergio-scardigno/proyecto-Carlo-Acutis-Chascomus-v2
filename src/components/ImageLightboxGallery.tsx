"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type ImageLightboxGalleryProps = {
  images: string[];
  title: string;
};

export function ImageLightboxGallery({ images, title }: ImageLightboxGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => {
    if (selectedIndex === null) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedIndex(null);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [selectedIndex]);

  const selectedImage = selectedIndex !== null ? images[selectedIndex] : null;

  return (
    <>
      <div className="space-y-6">
        {images.map((imageUrl, index) => (
          <button
            key={`${imageUrl}-${index}`}
            type="button"
            onClick={() => setSelectedIndex(index)}
            className="group block w-full overflow-hidden rounded-xl text-left"
            aria-label={`Ampliar imagen ${index + 1} de ${images.length}`}
          >
            <div className="relative h-72 w-full md:h-[32rem]">
              <Image
                src={encodeURI(imageUrl)}
                alt={title}
                fill
                className="object-cover transition group-hover:scale-[1.01]"
                sizes="100vw"
                unoptimized
              />
            </div>
          </button>
        ))}
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[100] bg-black/90 p-4 md:p-8"
          role="dialog"
          aria-modal="true"
          aria-label="Imagen ampliada"
          onClick={() => setSelectedIndex(null)}
        >
          <button
            type="button"
            onClick={() => setSelectedIndex(null)}
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white hover:bg-white/25"
          >
            Cerrar
          </button>
          <div className="relative h-full w-full">
            <Image
              src={encodeURI(selectedImage)}
              alt={title}
              fill
              className="object-contain"
              sizes="100vw"
              unoptimized
            />
          </div>
        </div>
      ) : null}
    </>
  );
}
