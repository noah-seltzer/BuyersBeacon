import { ChangeEvent, useState, DragEvent } from "react";
import { Input } from "@/components/atoms/input";
import { ImagePlus, X, Upload } from "lucide-react";
import Image from "next/image";
import { BeaconImage } from "@/types/beacon";

interface ImageUploadProps {
  onChange: (images: BeaconImage[]) => void;
  value: BeaconImage[];
  className?: string;
  maxImages?: number;
}

export function ImageUpload({
  onChange,
  value = [],
  className,
  maxImages = 6,
}: ImageUploadProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleFiles = (files: File[]) => {
    if (value.length + files.length > maxImages) {
      alert(`You can only upload up to ${maxImages} images`);
      return;
    }

    const newImages: BeaconImage[] = files.map((file) => ({
      file,
    }));

    onChange([...value, ...newImages]);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    handleFiles(files);
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );

    handleFiles(files);
  };

  const handleRemove = (index: number) => {
    const newImages = value.filter((_, i) => i !== index);
    onChange(newImages);
  };

  return (
    <div className={className}>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {value.map((image, index) => (
          <div key={index} className="relative aspect-video">
            <div className="relative w-full h-full rounded-lg border overflow-hidden">
              <Image
                src={
                  !!image.file && typeof image.file === "string"
                    ? image.file
                    : image.imageUrl 
                      ? image.imageUrl
                      : URL.createObjectURL(image.file as Blob)
                }
                alt={`Image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute top-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-md">
                {index === 0 ? "Cover Photo" : `Photo ${index + 1}`}
              </div>
              <button
                onClick={() => handleRemove(index)}
                className="absolute top-2 right-2 p-1 bg-black/60 text-white rounded-full hover:bg-black/80 transition-colors"
                type="button"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}

        {value.length < maxImages && (
          <div
            className={`
            relative 
            ${
              value.length === 0
                ? "col-span-2 md:col-span-3 aspect-[2/1] md:aspect-[3/1]"
                : "aspect-video"
            }
          `}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Input
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileChange}
              className="hidden"
              id="image-upload"
            />
            <label
              htmlFor="image-upload"
              className={`
                flex h-full cursor-pointer flex-col items-center justify-center gap-4 
                rounded-lg border-2 border-dashed border-primary/50 transition-all
                ${
                  isDragging
                    ? "bg-primary/5 scale-[0.98] border-primary"
                    : "hover:border-primary hover:bg-primary/5"
                }
                ${value.length === 0 ? "p-8 md:p-12" : "p-4"}
              `}
            >
              {isDragging ? (
                <>
                  <Upload
                    className={`
                    text-primary animate-bounce
                    ${
                      value.length === 0
                        ? "h-12 w-12 md:h-16 md:w-16"
                        : "h-8 w-8"
                    }
                  `}
                  />
                  <span
                    className={`
                    text-primary text-center
                    ${value.length === 0 ? "text-base md:text-lg" : "text-sm"}
                  `}
                  >
                    Drop images here
                  </span>
                </>
              ) : (
                <>
                  <ImagePlus
                    className={`
                    text-primary/50
                    ${
                      value.length === 0
                        ? "h-12 w-12 md:h-16 md:w-16"
                        : "h-8 w-8"
                    }
                  `}
                  />
                  <p
                    className={`
                    text-primary/50
                    ${value.length === 0 ? "text-base md:text-lg" : "text-sm"}
                  `}
                  >
                    <span className="hidden md:inline">Drag & drop or </span>
                    click to upload
                  </p>
                </>
              )}
            </label>
          </div>
        )}
      </div>
    </div>
  );
}
