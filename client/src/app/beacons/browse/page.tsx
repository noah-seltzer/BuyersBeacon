"use client";
import { useGetBeaconsQuery } from "@/redux/api";
import { FC } from "react";
import { Beacon } from "@/types/beacon";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ImagePreview from "@/components/molecules/image-preview";

const BeaconThumbnail: FC<{ beacon: Beacon }> = ({ beacon }) => {
  const location = [beacon.LocCity, beacon.LocRegion, beacon.LocCountry]
    .filter(Boolean)
    .join(", ");

  const formatPrice = (price: number | undefined) => {
    if (typeof price !== "number") return "$0.00";
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <Link href={`/beacons/${beacon.BeaconId}`} className="block group">
      <Card className="h-full overflow-hidden hover:shadow-lg transition-shadow duration-200">
        {/* Image Container */}
        <div className="aspect-[4/3] relative overflow-hidden">
          <ImagePreview
            images={beacon.imageSet?.images || []}
            alt={beacon.ItemName}
            emptyStatePrimaryText="No image"
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
          </div>
        </div>
      </Card>
    </Link>
  );
};

const BrowseBeaconsPage: FC = () => {
  const { data: beacons } = useGetBeaconsQuery();
  const publishedBeacons = beacons?.filter((beacon) => !beacon.IsDraft) || [];

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-2">Browse Beacons</h1>
        <p className="text-muted-foreground text-lg">
          {publishedBeacons.length} Beacons available
        </p>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Search Placeholder */}
        <Card className="p-4 mb-8 bg-card/50 border-dashed">
          <p className="text-center text-muted-foreground">
            SEARCH TO BE IMPLEMENTED HERE
          </p>
        </Card>

        {/* Beacons Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {publishedBeacons.map((beacon) => (
            <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BrowseBeaconsPage;
