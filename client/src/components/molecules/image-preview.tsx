"use client";
import { cn } from "@/lib/utils";
import { BeaconImage } from "@/types/beacon";
import { ChevronLeft, ChevronRight, Star, ImageIcon } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import EmptyState from "@/components/molecules/empty-state";

interface ImagePreviewProps {
  images: BeaconImage[];
  alt: string;
  emptyStatePrimaryText: string;
  className?: string;
  showCoverPhotoLabel?: boolean;
}

const ImagePreview = ({
  images,
  alt,
  emptyStatePrimaryText,
  showCoverPhotoLabel = true,
}: ImagePreviewProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const getCurrentImageSrc = () => {
    if (!images || !images[currentImageIndex]) return null;
    const image = images[currentImageIndex];

    if (image.imageUrl) {
      return image.imageUrl || null;
    }

    if (typeof image.file === "string") {
      return image.file || null;
    }

    if (image.file instanceof File) {
      return URL.createObjectURL(image.file);
    }

    return null;
  };

  const imageSrc = getCurrentImageSrc();

  return (
    <div className="relative aspect-video w-full overflow-hidden rounded-t-xl group">
      {images.length > 0 && imageSrc ? (
        <>
          <Image
            suppressHydrationWarning
            src={imageSrc}
            alt={alt ?? "Beacon Image"}
            fill
            className="object-cover"
            onError={() => {
              setCurrentImageIndex(0);
            }}
          />

          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
            {currentImageIndex + 1} / {images.length}
          </div>

          {showCoverPhotoLabel && currentImageIndex === 0 && (
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Cover Photo
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                variant="secondary"
                size="icon"
                onClick={prevImage}
                className="rounded-full bg-black/60 hover:bg-black/80"
              >
                <ChevronLeft className="h-4 w-4 text-white" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                onClick={nextImage}
                className="rounded-full bg-black/60 hover:bg-black/80"
              >
                <ChevronRight className="h-4 w-4 text-white" />
              </Button>
            </div>
          )}

          {images.length > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from({ length: images.length }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImageIndex(index)}
                  className={cn(
                    "w-2 h-2 rounded-full transition-all",
                    currentImageIndex === index
                      ? "bg-white scale-110"
                      : "bg-white/50 hover:bg-white/75"
                  )}
                />
              ))}
            </div>
          )}
        </>
      ) : (
        <EmptyState
          primaryText={emptyStatePrimaryText}
          iconH={100}
          className="h-full"
          iconW={100}
        />
      )}
    </div>
  );
};

export default ImagePreview;
