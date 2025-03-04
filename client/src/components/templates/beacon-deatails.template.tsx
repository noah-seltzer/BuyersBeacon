import { Beacon } from "@/types/beacon";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import Title from "../atoms/text/title";
import DetailedBeacon from "../organisms/beacons/detailed-beacon";


interface BeaconDetailsPageTemplate {
    beacon?: Beacon,
    isLoading: boolean,
}


const BeaconDetailsPageTemplate = ({ beacon, isLoading }: BeaconDetailsPageTemplate) => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-8">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto">
                    {
                        (isLoading || !beacon || !beacon?.Category) ?
                            <div className="flex flex-col items-center justify-center">
                                <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
                                <Title className="mt-10">Loading Beacon....</Title>
                            </div>
                            :
                            <DetailedBeacon
                                beacon={beacon}
                                category={beacon.Category}
                            />
                    }
                </div>
            </div>
        </div>
    );
};

export default BeaconDetailsPageTemplate;
