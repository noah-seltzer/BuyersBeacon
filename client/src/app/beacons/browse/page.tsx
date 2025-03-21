"use client";
import { useGetBeaconsQuery } from "@/redux/api";
import { FC } from "react";
import { Beacon } from "@/types/beacon";
import { MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import ImagePreview from "@/components/molecules/image-preview";
import { BeaconThumbnail } from "@/components/molecules/beacon-thumbnail";

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
