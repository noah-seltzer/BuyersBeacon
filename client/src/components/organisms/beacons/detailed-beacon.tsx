import { Button } from "@/components/atoms/button";
import BodyText from "@/components/atoms/text/body";
import SubTitle from "@/components/atoms/text/sub-title";
import Title from "@/components/atoms/text/title";
import BeaconInfoCard from "@/components/molecules/beacon-info-card";
import ImagePreview from "@/components/molecules/image-preview";
import UserCard from "@/components/molecules/user-card";
import { Beacon, Category } from "@/types/beacon";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useGetUserByIdQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";

interface DetailedBeaconProps {
  beacon: Beacon;
  category: Category;
}

const DetailedBeacon = ({ beacon, category }: DetailedBeaconProps) => {
  const userId = beacon.userId;

  const { user: clerkUser } = useUser();
  const { data: userData, isLoading } = useGetUserByIdQuery(userId || "", {
    skip: !userId,
  });

  const location = [beacon.LocCity, beacon.LocRegion, beacon.LocCountry]
    .filter(Boolean)
    .join(", ");

  const avatarUrl = userData?.avatarUrl || clerkUser?.imageUrl || "/default-avatar.png";

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
        <Title className="mt-10">Loading...</Title>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8 pt-4">
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
              showCoverPhotoLabel={false}
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
          {/* Author Card*/}
          <UserCard userData={userData} avatarUrl={avatarUrl} />

          {/* Beacon Details Card */}
          <BeaconInfoCard price={beacon.ItemPrice} location={location} />
        </div>
      </div>
    </div>
  );
};

export default DetailedBeacon;
