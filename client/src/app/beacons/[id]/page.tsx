import { Suspense } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";
import PageContainer from "@/components/ui/page-container";

interface BeaconDetailsPageProps {
    params: Promise<{ id: string }>
}

const BeaconDetailsPage = async (props: BeaconDetailsPageProps) => {
    const { id } = await props.params;

    return (
        <Suspense fallback={<div>Loading</div>}>
            <PageContainer>
                <BeaconDetailsPageTemplate beaconId={id} />
            </PageContainer>
        </Suspense>
    );
};

export default BeaconDetailsPage;