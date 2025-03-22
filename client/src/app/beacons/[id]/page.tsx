import { Suspense } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";

interface BeaconDetailsPageProps {
    params: Promise<{ id: string }>
}

const BeaconDetailsPage = async (props: BeaconDetailsPageProps) => {
    const { id } = await props.params;


    return <Suspense fallback={<div>Loading</div>}>
        <div className="container mx-auto px-4 py-4">
            <BeaconDetailsPageTemplate
                beaconId={id}
            />
        </div>
    </Suspense>
};

export default BeaconDetailsPage;
