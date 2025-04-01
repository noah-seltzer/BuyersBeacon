import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { DollarSign, MapPin } from "lucide-react";

interface BeaconInfoCardProps {
  price: number | undefined;
  location?: string;
}

/**
 * A reusable card component for displaying beacon price and location info
 */
const BeaconInfoCard = ({ price, location }: BeaconInfoCardProps) => {
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
    <Card className="p-6">
      <div className="space-y-6">
        {/* Price */}
        <div>
          <p className="text-sm text-muted-foreground mb-1">Price</p>
          <div className="flex items-center gap-2">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-4xl font-bold text-primary">
              {formatPrice(price)}
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
  );
};

export default BeaconInfoCard;