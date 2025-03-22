import { FC } from "react";
import { Beacon } from "@/types/beacon";
import { Card } from "@/components/atoms/card";
import Link from "next/link";
import { MapPin, User } from "lucide-react";
import ImagePreview from "@/components/molecules/image-preview";
import { formatPrice } from "@/lib/format";
import StarRating from "@/components/molecules/star-rating";
import { useGetUserByIdQuery, useGetUserRatingQuery } from "@/redux/api";

interface BeaconThumbnailProps {
  beacon: Beacon;
}

const UserInfoWithRating: FC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  const { data: userRating } = useGetUserRatingQuery(userId);

  if (isLoading || !user) {
    return null;
  }

  // Get the avatar URL or use default
  const avatarUrl = user.avatarUrl || user.imageUrl || "/default-avatar.png";

  return (
    <Link
      href={`/profile/${userId}`}
      className="flex items-center gap-2 hover:text-primary transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {/* User avatar */}
      <div className="relative w-6 h-6 rounded-full overflow-hidden border border-primary/10">
        {avatarUrl ? (
          <div className="w-full h-full relative">
            <img 
              src={avatarUrl} 
              alt={user.displayName} 
              className="object-cover w-full h-full"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                img.parentElement!.innerHTML = '<div class="w-full h-full flex items-center justify-center bg-muted"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-foreground/70"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg></div>';
              }}
            />
          </div>
        ) : (
          <div className="flex items-center justify-center w-full h-full bg-muted">
            <User className="w-3.5 h-3.5 text-foreground/70" />
          </div>
        )}
      </div>
      <div className="flex flex-col">
        <span className="text-xs font-medium truncate">{user.displayName}</span>
        {userRating?.averageRating ? (
          <div className="flex items-center gap-1">
            <StarRating value={userRating.averageRating} size="sm" />
            <span className="text-[10px] text-muted-foreground">
              ({userRating.totalReviews || 0})
            </span>
          </div>
        ) : user.averageRating ? (
          <div className="flex items-center gap-1">
            <StarRating value={user.averageRating} size="sm" />
            <span className="text-[10px] text-muted-foreground">
              ({user.totalReviews || 0})
            </span>
          </div>
        ) : (
          <span className="text-[10px] text-muted-foreground">
            No ratings yet
          </span>
        )}
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
