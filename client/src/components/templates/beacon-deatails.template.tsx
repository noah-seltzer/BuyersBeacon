"use client";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Title from "@/components/atoms/text/title";
import DetailedBeacon from "@/components/organisms/beacons/detailed-beacon";
import { Beacon } from "@/types/beacon";
import { User } from "@/types/user";

interface BeaconDetailsPageTemplateProps {
  beacon: Beacon | undefined,
  isLoading: boolean,
  handleOnChat: () => any,
  isOwner: boolean,
  loading: boolean;
  userIcon?: string,
  user: User | null
}

const BeaconDetailsPageTemplate = ({ beacon, isLoading, handleOnChat, isOwner, loading, user, userIcon }: BeaconDetailsPageTemplateProps) => {

  return (
    <div className="flex flex-col items-center py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {isLoading || !beacon || !beacon?.Category ? (
            <div className="flex flex-col items-center justify-center">
              <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
              <Title className="mt-10">Loading Beacon....</Title>
            </div>
          ) : (
            <DetailedBeacon
              handleOnChat={handleOnChat}
              beacon={beacon}
              category={beacon.Category}
              isOwner={isOwner}
              loading={loading}
              user={user}
              userIcon={userIcon}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default BeaconDetailsPageTemplate;
