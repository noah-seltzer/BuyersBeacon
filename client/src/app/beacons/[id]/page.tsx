"use client";
import { Suspense, useCallback } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";
import { useGetBeaconQuery } from "@/redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import useChat from "@/services/chat";
import { useChatModal } from "@/components/providers/chat-provider";


const BeaconDetailsPage = () => {
    const { id } = useParams();
    const { openChat } = useChatModal();
    const {
        data: beacon,
        isLoading,
    } = useGetBeaconQuery(id?.toString() ?? skipToken);


    const handleOnChat = useCallback((beaconId: string) => {
        console.log('HANDLE ON CHAT')
        openChat();
    }, [])

    return <Suspense fallback={<div>Loading</div>}>
        <BeaconDetailsPageTemplate
            isLoading={isLoading}
            beacon={beacon}
            handleOnChat={() => id && handleOnChat(id.toString())}
        />;
    </Suspense>
};

export default BeaconDetailsPage;
