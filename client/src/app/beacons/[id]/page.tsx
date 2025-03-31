"use client";
import { Suspense, useCallback } from "react";
import BeaconDetailsPageTemplate from "@/components/templates/beacon-deatails.template";
import { useGetBeaconQuery, useGetUserByClerkIdQuery } from "@/redux/api";
import { skipToken } from "@reduxjs/toolkit/query";
import { useParams } from "next/navigation";
import { useChatModal } from "@/components/providers/chat-provider";
import { useUser } from "@clerk/nextjs";
import PageContainer from "@/components/ui/page-container";


const BeaconDetailsPage = () => {
    const { id } = useParams();
    const { user: clerkUser } = useUser();
    const { openChat } = useChatModal();
    const {
        data: beacon,
        isLoading: isLoadingBeacon,
    } = useGetBeaconQuery(id?.toString() ?? skipToken);
    const {
        data: user,
        isLoading: isLoadingUser
    } = useGetUserByClerkIdQuery(beacon?.User?.ClerkId ?? skipToken)


    const handleOnChat = useCallback((beaconId: string) => {
        openChat(beaconId);
    }, [])


    return <Suspense fallback={<div>Loading</div>}>
        <PageContainer>
            <BeaconDetailsPageTemplate
                isOwner={beacon?.User?.ClerkId === clerkUser?.id}
                isLoading={isLoadingBeacon || isLoadingUser}
                beacon={beacon}
                handleOnChat={() => id && handleOnChat(id.toString())}
                loading={isLoadingBeacon || isLoadingUser}
                user={user ?? null}
                userIcon={user?.avatarUrl ?? clerkUser?.imageUrl ?? "/default-avatar.png"}
            />;
        </PageContainer>
    </Suspense>
};

export default BeaconDetailsPage;