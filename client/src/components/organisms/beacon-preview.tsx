import { Beacon, BeaconImage } from "@/types/beacon";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { User2 } from "lucide-react";
import ImagePreview from "../molecules/image-preview";
import BeatLoader from "react-spinners/BeatLoader";


interface BeaconPreviewProps {
  beacon: Beacon
}

export function BeaconPreview({ beacon }: BeaconPreviewProps) {

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preview</h2>
      {beacon.Images ? <ImagePreview
        images={beacon.Images}
        alt={beacon.ItemName}
        emptyStatePrimaryText={"No images found"}
      />
        :
        <BeatLoader
          size={35}
          color="#24dbb7"
          className="mb-10"
        />}

      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold line-clamp-2">
                {beacon.ItemName || "Your beacon title"}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User2 className="h-4 w-4" />
                <span>Your Name</span>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {beacon.Category?.CategoryName || "Category"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {beacon.ItemDescription ||
              "Your beacon description will appear here..."}
          </p>
        </div>
      </Card>
    </div>
  );
}
