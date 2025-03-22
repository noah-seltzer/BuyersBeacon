import { FC } from "react";
import { Beacon } from "@/types/beacon";
import { Card } from "@/components/atoms/card";
import Link from "next/link";
import { MapPin, User, User2 } from "lucide-react";
import ImagePreview from "@/components/molecules/image-preview";
import { formatPrice } from "@/lib/format";
import StarRating from "@/components/molecules/star-rating";
import { useGetUserByIdQuery } from "@/redux/api";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import UserRatingSummary from "@/components/molecules/user-rating-summary";

interface BeaconThumbnailProps {
  beacon: Beacon;
}

const UserInfoWithRating: FC<{ userId: string }> = ({ userId }) => {
  const { data: userData, isLoading } = useGetUserByIdQuery(userId);
  const { user: clerkUser } = useUser();

  if (isLoading || !userData) {
    return null;
  }

  // Get the avatar URL using the same approach as detailed-beacon.tsx
  const avatarUrl = userData?.avatarUrl || clerkUser?.imageUrl || "/default-avatar.png";

  return (
    <Link
      href={`/profile/${userId}`}
      className="flex items-center gap-2 hover:text-primary transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User avatar - Matching the approach in detailed-beacon.tsx */}
      <div className="relative h-6 w-6">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={userData?.displayName || "User"}
            fill
            className="rounded-full object-cover border border-background"
            sizes="24px"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.style.display = "none"; // Hide the image on error
            }}
          />
        ) : (
          <User2 className="h-6 w-6 text-muted-foreground" />
        )}
      </div>
      
      <div className="flex flex-col">
        <span className="text-xs font-medium truncate">{userData.displayName}</span>
        {/* Use the UserRatingSummary component instead of manually building the rating display */}
        <div className="scale-75 origin-left -ml-1 -mt-1">
          <UserRatingSummary userId={userId} showTags={false} />
        </div>
      </div>
    </Link>
  );
};

export const BeaconThumbnail: FC<BeaconThumbnailProps> = ({ beacon }) => {
  const location =
    beacon.LocCity && beacon.LocRegion
      ? `${beacon.LocCity}, ${beacon.LocRegion}`
      : beacon.LocCity || beacon.LocRegion;

  return (
    <Link href={`/beacons/${beacon.BeaconId}`} className="block group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-all duration-300 border-border/50 hover:border-primary/30 bg-background/80 backdrop-blur-sm group-hover:translate-y-[-2px]">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden bg-muted/50">
          <ImagePreview
            images={beacon.imageSet?.images || []}
            alt={beacon.ItemName}
            emptyStatePrimaryText="No image"
            showCoverPhotoLabel={false}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />

          {/* Category Badge - Floating over image */}
          <div className="absolute top-3 left-3 z-10">
            <span
              className="text-xs font-medium px-2.5 py-1 rounded-full shadow-sm
                bg-background/80 backdrop-blur-sm border border-primary/20 text-foreground/90"
            >
              {beacon.Category?.CategoryName || "Uncategorized"}
            </span>
          </div>

          {/* Price - Floating over image */}
          <div className="absolute bottom-3 right-3 z-10">
            <span
              className="text-sm font-bold px-3 py-1.5 rounded-full shadow-sm
                bg-primary text-white"
            >
              {formatPrice(beacon.ItemPrice)}
            </span>
          </div>
        </div>

        {/* Content Container */}
        <div className="p-5">
          <div className="space-y-3">
            {/* Title */}
            <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
              {beacon.ItemName}
            </h3>

            {/* Description */}
            <p className="text-sm text-muted-foreground line-clamp-2">
              {beacon.ItemDescription}
            </p>

            <div className="flex justify-between items-center pt-1">
              {/* Location */}
              {location && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5 flex-shrink-0" />
                  <span className="line-clamp-1">{location}</span>
                </div>
              )}

              {/* Created date could go here if available */}
              <div className="text-xs text-muted-foreground">
                {/* Could add posted date here */}
              </div>
            </div>

            {/* User info with rating - show only if user ID exists */}
            {beacon.userId && (
              <div className="pt-2 mt-2 border-t border-border/40">
                <UserInfoWithRating userId={beacon.userId} />
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
};
