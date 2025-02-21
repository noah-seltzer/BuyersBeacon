import { Beacon } from "@/types/beacon";
import { Card } from "@/components/atoms/card";
import { Badge } from "@/components/atoms/badge";
import { User2 } from "lucide-react";

interface BeaconPreviewProps {
  beacon: Beacon;
}

export function BeaconPreview({ beacon }: BeaconPreviewProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Preview</h2>
      <Card>
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <h3 className="text-xl font-semibold line-clamp-2">
                {beacon.title || "Your beacon title"}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User2 className="h-4 w-4" />
                <span>Your Name</span>
              </div>
            </div>
            <Badge variant="secondary" className="capitalize">
              {beacon.category || "Category"}
            </Badge>
          </div>
          <p className="text-muted-foreground">
            {beacon.description ||
              "Your beacon description will appear here..."}
          </p>
        </div>
      </Card>
    </div>
  );
}
