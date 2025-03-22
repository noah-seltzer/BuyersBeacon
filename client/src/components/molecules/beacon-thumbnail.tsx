import { FC } from 'react';
import { Beacon } from '@/types/beacon';
import { Card } from '@/components/atoms/card';
import Link from 'next/link';
import { MapPin, User } from 'lucide-react';
import ImagePreview from '@/components/molecules/image-preview';
import { formatPrice } from '@/lib/format';
import StarRating from '@/components/molecules/star-rating';
import { useGetUserByIdQuery } from '@/redux/api';

interface BeaconThumbnailProps {
  beacon: Beacon;
}

// Component to display user info with rating
const UserInfoWithRating: FC<{ userId: string }> = ({ userId }) => {
  const { data: user, isLoading } = useGetUserByIdQuery(userId);
  
  if (isLoading || !user) {
    return null;
  }
  
  return (
    <Link 
      href={`/profile/${userId}`} 
      className="flex items-center gap-2 mt-2 pt-2 border-t border-border hover:text-primary"
      onClick={(e) => e.stopPropagation()}
    >
      <User className="w-3 h-3" />
      <span className="text-xs truncate">{user.displayName}</span>
      <div className="ml-auto">
        <StarRating value={user.averageRating || 0} size="sm" />
      </div>
    </Link>
  );
};

export const BeaconThumbnail: FC<BeaconThumbnailProps> = ({ beacon }) => {
  const location = beacon.LocCity && beacon.LocRegion 
    ? `${beacon.LocCity}, ${beacon.LocRegion}`
    : beacon.LocCity || beacon.LocRegion;

  return (
    <Link href={`/beacons/${beacon.BeaconId}`} className="block group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <ImagePreview
            images={beacon.imageSet?.images || []}
            alt={beacon.ItemName}
            emptyStatePrimaryText="No image"
            showCoverPhotoLabel={false}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
          />
        </div>

        {/* Content Container */}
        <div className="p-4">
          {/* Category Badge */}
          <div className="mb-2">
            <span className="text-xs font-medium text-primary/80 bg-primary/10 px-2 py-1 rounded-full">
              {beacon.Category?.CategoryName || "Uncategorized"}
            </span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-lg mb-1 line-clamp-1 group-hover:text-primary transition-colors">
            {beacon.ItemName}
          </h3>

          {/* Description */}
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {beacon.ItemDescription}
          </p>

          <div className="flex flex-col gap-2">
            {/* Price */}
            <p className="text-xl font-bold text-primary">
              {formatPrice(beacon.ItemPrice)}
            </p>

            {/* Location */}
            {location && (
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <MapPin className="w-4 h-4 flex-shrink-0" />
                <span className="line-clamp-1">{location}</span>
              </div>
            )}
            
            {/* User info with rating - show only if user ID exists */}
            {beacon.userId && (
              <UserInfoWithRating userId={beacon.userId} />
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}; 