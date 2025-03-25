"use client";
import { Suspense, useCallback } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";
import { useGetBeaconQuery } from "@/redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import useChat from "@/services/chat";
import { useChatModal } from "@/components/providers/chat-provider";
import { useUser } from "@clerk/nextjs";


const BeaconDetailsPage = () => {
    const { id } = useParams();
    const { user } = useUser();
    const { openChat } = useChatModal();
    const {
        data: beacon,
        isLoading,
    } = useGetBeaconQuery(id?.toString() ?? skipToken);


    const handleOnChat = useCallback((beaconId: string) => {
        console.log('HANDLE ON CHAT')
        openChat();
    }, [])

    console.log(user?.id, beacon?.User?.ClerkId)

    return <Suspense fallback={<div>Loading</div>}>
        <BeaconDetailsPageTemplate
            isOwner={beacon?.User?.ClerkId === user?.id}
            isLoading={isLoading}
            beacon={beacon}
            handleOnChat={() => id && handleOnChat(id.toString())}
        />;
    </Suspense>
};

export default BeaconDetailsPage;
