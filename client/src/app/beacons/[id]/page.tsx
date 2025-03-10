import { Suspense } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";

interface BeaconDetailsPageProps {
    params: Promise<{ id: string }>
}

const BeaconDetailsPage = async (props: BeaconDetailsPageProps) => {
    const { id } = await props.params;


    return <Suspense fallback={<div>Fallback</div>}>
        <BeaconDetailsPageTemplate
            beaconId={id}
        />;
    </Suspense>
};

export default BeaconDetailsPage;
