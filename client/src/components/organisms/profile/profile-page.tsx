import { FC, useState } from "react";
import { User } from "@/types/user";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import {
  Pencil,
  MapPin,
  Calendar,
  User as UserIcon,
  Info,
  User2,
  Star,
} from "lucide-react";
import Link from "next/link";
import { BeaconThumbnail } from "@/components/molecules/beacon-thumbnail";
import { useGetBeaconsQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";
import Title from "@/components/atoms/text/title";
import { useUser } from "@clerk/nextjs";
import Image from "next/image";
import UserRatingSummary from "@/components/molecules/user-rating-summary";
import ReviewForm from "@/components/molecules/review-form";
import ReviewsList from "@/components/molecules/reviews-list";

interface ProfilePageProps {
  profile: User;
  isOwnProfile?: boolean;
}

export const ProfilePage: FC<ProfilePageProps> = ({
  profile,
  isOwnProfile,
}) => {
  const { data: beacons, isLoading: beaconsLoading } = useGetBeaconsQuery({
    userId: profile.id,
    drafts: false,
  });

  const { user: clerkUser } = useUser();

  const avatarUrl = isOwnProfile && clerkUser?.imageUrl 
    ? clerkUser.imageUrl
    : profile.avatarUrl 
    ? profile.avatarUrl
    : clerkUser?.imageUrl 
    ? clerkUser.imageUrl 
    : "/default-avatar.png";

  const formattedJoinDate = profile.joinedDate
    ? new Date(profile.joinedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";

  const possessiveName = profile.displayName.endsWith("s")
    ? `${profile.displayName}'`
    : `${profile.displayName}'s`;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Profile Header Card */}
      <Card className="mb-8">
        <div className="p-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            {/* User Info */}
            <div className="flex items-center gap-6">
              <div className="relative w-20 h-20">
                {avatarUrl ? (
                  <Image
                    src={avatarUrl}
                    alt={profile.displayName}
                    fill
                    className="rounded-full object-cover border-4 border-background"
                    sizes="80px"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.style.display = "none";
                    }}
                  />
                ) : (
                  <User2 className="w-20 h-20 text-muted-foreground" />
                )}
              </div>
              <div>
                <h1 className="text-2xl font-bold mb-1">
                  {profile.displayName}
                </h1>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1.5" />
                    {formattedJoinDate}
                  </div>
                  <div className="flex items-center">
                    <MapPin className="w-4 h-4 mr-1.5" />
                    {profile.location}
                  </div>
                </div>
                {/* User Rating Summary */}
                <div className="mt-2">
                  <UserRatingSummary userId={profile.id} />
                </div>
              </div>
            </div>

            {/* Edit Button */}
            {isOwnProfile && (
              <Button asChild variant="outline" className="shrink-0">
                <Link href={`/profile/${profile.id}/edit`}>
                  <Pencil className="w-4 h-4 mr-2" />
                  Edit Profile
                </Link>
              </Button>
            )}
          </div>

          {/* Bio Section */}
          {profile.bio && (
            <div className="mt-6 pt-6 border-t">
              <p className="text-muted-foreground">{profile.bio}</p>
            </div>
          )}
        </div>
      </Card>

      {/* Reviews Section */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5" />
              {isOwnProfile ? "Your Reviews" : `${possessiveName} Reviews`}
            </div>
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <ReviewsList userId={profile.id} />
          </div>

          {/* Leave a Review (only show if not own profile) */}
          {!isOwnProfile && (
            <div className="lg:col-span-1">
              <ReviewForm userId={profile.id} />
            </div>
          )}
        </div>
      </div>

      {/* Beacons Section */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {isOwnProfile ? "Your Beacons" : `${possessiveName} Beacons`}
          </h2>
          <div className="text-sm text-muted-foreground">
            {beacons?.length || 0} beacon
            {(beacons?.length || 0) !== 1 ? "s" : ""} posted
          </div>
        </div>

        {beaconsLoading ? (
          <div className="flex justify-center py-12">
            <ClimbingBoxLoader size={15} color="#24dbb7" />
          </div>
        ) : beacons && beacons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beacons.map((beacon) => (
              <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
            ))}
          </div>
        ) : (
          <Card className="p-12 text-center bg-background/50">
            <p className="text-muted-foreground">No beacons posted yet</p>
          </Card>
        )}
      </div>
    </div>
  );
};
