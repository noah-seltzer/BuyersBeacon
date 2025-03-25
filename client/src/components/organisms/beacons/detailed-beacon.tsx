import { Button } from "@/components/atoms/button";
import BodyText from "@/components/atoms/text/body";
import SubTitle from "@/components/atoms/text/sub-title";
import Title from "@/components/atoms/text/title";
import ImagePreview from "@/components/molecules/image-preview";
import { Beacon, Category } from "@/types/beacon";
import { MapPin, DollarSign, ArrowLeft } from "lucide-react";
import Link from "next/link";

interface DetailedBeaconProps {
  beacon: Beacon;
  category: Category;
  handleOnChat: () => any
}

const DetailedBeacon = ({ beacon, category, handleOnChat }: DetailedBeaconProps) => {
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
    <div className="flex flex-col gap-8">
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

      {/* Header Section */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
            {category.CategoryName}
          </span>
        </div>
        <Title>{beacon.ItemName}</Title>

        {/* Price and Location Row */}
        <div className="flex flex-wrap items-center gap-6 mt-2">
          {/* Price */}
          <div className="flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-primary" />
            <span className="text-3xl font-bold text-primary">
              {formatPrice(beacon.ItemPrice)}
            </span>
          </div>

          {/* Location */}
          {location && (
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-5 h-5" />
              <span className="text-lg">{location}</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Gallery */}
      <div className="w-full overflow-hidden rounded-lg border">
        <ImagePreview
          images={beacon.imageSet?.images || []}
          alt={beacon.ItemName}
          emptyStatePrimaryText="No images available"
        />
      </div>

      {/* Description Section */}
      <div className="space-y-4">
        <SubTitle>About this Beacon</SubTitle>
        <div className="prose prose-gray max-w-none">
          <BodyText>{beacon.ItemDescription}</BodyText>
        </div>
      </div>

      {/* Contact Section */}
      <div className="flex justify-end mt-4">
        <Button variant="default" size="lg" className="px-8" onClick={handleOnChat}>
          Get in Touch
        </Button>
      </div>
    </div>
  );
};

export default DetailedBeacon;
