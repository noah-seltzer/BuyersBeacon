import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { User2, MapPin, DollarSign, ArrowLeft } from "lucide-react";
import ImagePreview from "@/components/molecules/image-preview";
import { BeaconImage } from "@/types/beacon";
import { BeatLoader } from "react-spinners";
import Title from "@/components/atoms/text/title";
import { useUser } from "@clerk/nextjs";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import { useGetUserByClerkIdQuery, useGetUserByIdQuery } from "@/redux/api";
import { useState, useEffect } from "react";

interface BeaconPreviewProps {
  beacon: {
    ItemName: string;
    ItemDescription: string;
    ItemPrice?: number;
    Images?: BeaconImage[];
    Category?: {
      CategoryName: string;
    };
    LocCity?: string;
    LocRegion?: string;
    LocCountry?: string;
  };
}

export function BeaconPreview({ beacon }: BeaconPreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const { user: clerkUser } = useUser();
  
  const { data: beaconUser, isLoading: isBeaconUserLoading } = useGetUserByClerkIdQuery(clerkUser?.id || "", {
    skip: !clerkUser?.id,
  });
  
  const { data: fullProfile, isLoading: isProfileLoading } = useGetUserByIdQuery(beaconUser?.id || "", {
    skip: !beaconUser?.id,
  });

  useEffect(() => {
    if (!clerkUser || (beaconUser && !isProfileLoading)) {
      setIsLoading(false);
    }
  }, [clerkUser, beaconUser, isProfileLoading]);

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number") return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  const location = [beacon.LocCity, beacon.LocRegion, beacon.LocCountry]
    .filter(Boolean)
    .join(", ");

  const displayName = fullProfile?.displayName || beaconUser?.displayName || clerkUser?.fullName || "Anonymous User";
  const avatarUrl = fullProfile?.avatarUrl || beaconUser?.avatarUrl || clerkUser?.imageUrl || "/default-avatar.png";

  return (
    <div>
      {/* Preview Header */}
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-foreground/80">Preview</h2>
      </div>

      {/* Title and Category */}
      <div className="flex items-center gap-3 mb-8">
        <Title>{beacon.ItemName || "Your beacon title"}</Title>
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
          {beacon.Category?.CategoryName || "Category"}
        </span>
      </div>

      {/* Cover Photo Section */}
      <div className="relative">
        <div className="aspect-[16/9] w-full overflow-hidden rounded-xl border bg-background">
          {beacon.Images ? (
            <ImagePreview
              images={beacon.Images}
              alt={beacon.ItemName}
              emptyStatePrimaryText="No images found"
              showCoverPhotoLabel={true}
            />
          ) : (
            <div className="flex items-center justify-center h-full">
              <BeatLoader size={35} color="#24dbb7" />
            </div>
          )}
        </div>
      </div>

      {/* Preview Card */}
      <Card className="mt-8">
        <div className="p-6">
          {/* Author Info */}
          <div className="flex items-center gap-3 mb-4">
            {isLoading ? (
              <>
                <div className="h-8 w-8 rounded-full bg-primary/20 animate-pulse"></div>
                <div className="h-4 w-32 bg-muted animate-pulse rounded"></div>
              </>
            ) : (
              <>
                <div className="h-8 w-8 rounded-full overflow-hidden bg-primary/10">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="Profile"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/default-avatar.png";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <User2 className="h-4 w-4 text-primary/70" />
                    </div>
                  )}
                </div>
                <span className="text-sm">Posted by {displayName}</span>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">About this Beacon</h3>
            <p className="text-muted-foreground">
              {beacon.ItemDescription ||
                "Your beacon description will appear here..."}
            </p>
          </div>

          {/* Price */}
          <div className="mb-4">
            <p className="text-sm text-muted-foreground mb-1">Price</p>
            <div className="flex items-center gap-2">
              <span className="text-4xl font-bold text-primary">
                {formatPrice(beacon.ItemPrice)}
              </span>
            </div>
          </div>

          {/* Location */}
          {location && (
            <div className="mb-6">
              <p className="text-sm text-muted-foreground mb-1">Location</p>
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span className="text-lg">{location}</span>
              </div>
            </div>
          )}

          {/* Get in Touch Button */}
          <Button size="lg" className="w-full">
            Get in Touch
          </Button>
        </div>
      </Card>
    </div>
  );
}
