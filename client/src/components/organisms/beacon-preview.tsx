import { Beacon } from "@/types/beacon";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { User2 } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { Button } from "@/components/atoms/button";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { cn } from "@/lib/utils";

interface BeaconPreviewProps {
  beacon: Beacon;
}

export function BeaconPreview({ beacon }: BeaconPreviewProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const hasImages = beacon.Images && beacon.Images.length > 0;
  const currentImage = beacon.Images?.[currentImageIndex];
  const totalImages = beacon.Images?.length || 0;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % totalImages);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + totalImages) % totalImages);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preview</h2>
      {hasImages && (
        <div className="relative aspect-video w-full overflow-hidden rounded-t-xl group">
          <Image
            src={
              typeof currentImage.file === "string"
                ? currentImage.file
                : URL.createObjectURL(currentImage.file)
            }
            alt={beacon.ItemName || "Beacon image"}
            fill
            className="object-cover"
          />

          <div className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm">
            {currentImageIndex + 1} / {totalImages}
          </div>

          {currentImage.isCover && (
            <div className="absolute top-2 left-2 bg-black/60 text-white px-2 py-1 rounded-md text-sm flex items-center">
              <Star className="h-4 w-4 mr-1" />
              Cover Photo
            </div>
          )}

          {totalImages > 1 && (
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

          {totalImages > 1 && (
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
              {Array.from({ length: totalImages }).map((_, index) => (
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
        </div>
      )}
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold line-clamp-2">
                {beacon.ItemName || "Your beacon title"}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User2 className="h-4 w-4" />
                <span>Your Name</span>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {beacon.Category?.CategoryName || "Category"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {beacon.ItemDescription ||
              "Your beacon description will appear here..."}
          </p>
        </div>
      </Card>
    </div>
  );
}
