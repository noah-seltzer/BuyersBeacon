"use client";
import { Suspense } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";
import { useGetBeaconQuery } from "@/redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";


const BeaconDetailsPage = () => {
    const { id } = useParams();
    const {
        data: beacon,
        isLoading,
    } = useGetBeaconQuery(id?.toString() ?? skipToken);

    return <Suspense fallback={<div>Loading</div>}>
        <BeaconDetailsPageTemplate
            isLoading={isLoading}
            beacon={beacon}
        />;
    </Suspense>
};

export default BeaconDetailsPage;
