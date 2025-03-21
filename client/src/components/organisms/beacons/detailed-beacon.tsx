import { Button } from "@/components/atoms/button";
import BodyText from "@/components/atoms/text/body";
import SubTitle from "@/components/atoms/text/sub-title";
import Title from "@/components/atoms/text/title";
import ImagePreview from "@/components/molecules/image-preview";
import { Beacon, Category } from "@/types/beacon";
import { MapPin, DollarSign, ArrowLeft, User2 } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/atoms/card";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import { useGetUserByIdQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";

interface DetailedBeaconProps {
  beacon: Beacon;
  category: Category;
}

const DetailedBeacon = ({ beacon, category }: DetailedBeaconProps) => {
  // Update the userId extraction
  const userId = beacon.userId || beacon.User?.userId;

  const { user: clerkUser } = useUser();
  const { data: userData, isLoading } = useGetUserByIdQuery(userId || "", {
    skip: !userId,
  });

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

  const avatarUrl = userData?.avatarUrl
    ? userData.avatarUrl
    : clerkUser?.imageUrl
    ? clerkUser.imageUrl
    : "/default-avatar.png";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
        <Title className="mt-10">Loading...</Title>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {/* Back Button and Title Row */}
      <div className="flex flex-col gap-4">
        <Button
          variant="ghost"
          asChild
          className="self-start flex items-center gap-2 text-foreground/80 hover:text-foreground px-4 py-2"
        >
          <Link href="/beacons/browse">
            <ArrowLeft className="h-5 w-5" />
            <span className="text-base">Return to Browse</span>
          </Link>
        </Button>

        {/* Title and Category */}
        <div className="flex items-center gap-3">
          <Title>{beacon.ItemName}</Title>
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {category.CategoryName}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-8">
          {/* Image Gallery */}
          <div className="overflow-hidden rounded-xl border bg-background">
            <ImagePreview
              images={beacon.imageSet?.images || []}
              alt={beacon.ItemName}
              emptyStatePrimaryText="No images available"
            />
          </div>

          {/* Description Section */}
          <div className="space-y-6">
            <SubTitle>About this Beacon</SubTitle>
            <div className="prose prose-gray max-w-none">
              <BodyText>{beacon.ItemDescription}</BodyText>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          {/* Author Card */}
          <Card className="p-6">
            <div className="flex flex-col gap-4">
              {/* User Info - Make the whole section clickable */}
              <Link
                href={`/profile/${userData?.id}`}
                className="flex items-center gap-4 hover:opacity-80"
              >
                <div className="relative h-12 w-12">
                  <Image
                    src={avatarUrl}
                    alt={userData?.displayName || "User"}
                    fill
                    className="rounded-full object-cover border-4 border-background"
                    sizes="48px"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement;
                      img.src = "/default-avatar.png";
                    }}
                  />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Posted by</p>
                  <p className="font-medium">
                    {userData?.displayName || "Anonymous User"}
                  </p>
                </div>
              </Link>

              {/* View Profile Button */}
              {userData?.id && (
                <Button variant="outline" asChild className="w-full">
                  <Link href={`/profile/${userData.id}`}>
                    <User2 className="mr-2 h-4 w-4" />
                    View Profile
                  </Link>
                </Button>
              )}
            </div>
          </Card>

          {/* Beacon Details Card - Now without the title */}
          <Card className="p-6">
            <div className="space-y-6">
              {/* Price */}
              <div>
                <p className="text-sm text-muted-foreground mb-1">Price</p>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-6 w-6 text-primary" />
                  <span className="text-4xl font-bold text-primary">
                    {formatPrice(beacon.ItemPrice)}
                  </span>
                </div>
              </div>

              {/* Location */}
              {location && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Location</p>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground" />
                    <span className="text-lg">{location}</span>
                  </div>
                </div>
              )}

              {/* Contact Button */}
              <Button size="lg" className="w-full">
                Get in Touch
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default DetailedBeacon;
