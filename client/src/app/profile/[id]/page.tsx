'use client';

import { useGetUserByIdQuery, useGetBeaconsQuery } from '@/redux/api';
import { ProfilePage } from '@/components/organisms/profile/profile-page';
import { useParams } from 'next/navigation';
import { ClimbingBoxLoader } from "react-spinners";
import Title from '@/components/atoms/text/title';
import { useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { useAuth, useUser } from '@clerk/nextjs';
import { useEffect, useState, useCallback } from 'react';
import { useChatModal } from '@/components/providers/chat-provider';

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: profile, isLoading } = useGetUserByIdQuery(userId);
  const currentUserId = useSelector((state: RootState) => state.auth.userId);
  const { openChat } = useChatModal();
  
  const { data: beacons } = useGetBeaconsQuery({ userId: userId, drafts: false });
  const firstBeacon = beacons?.[0];
  
  const { userId: clerkUserId } = useAuth();
  const { user: clerkUser } = useUser();
  const [isOwnProfile, setIsOwnProfile] = useState(false);
  
  const handleOnChat = useCallback(() => {
    if (!firstBeacon || !firstBeacon.BeaconId) return
    openChat(firstBeacon.BeaconId);
  }, [firstBeacon, openChat]);
  
  useEffect(() => {
    if (profile && clerkUser) {
      // Check if the profile belongs to the current user by comparing with Clerk userId
      setIsOwnProfile(profile.ClerkId === clerkUser.id);
    }
  }, [profile, clerkUser]);
  
  console.log('Profile page debug:', { userId, currentUserId, clerkUserId, isOwnProfile });

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
        <Title className="mt-10">Loading Profile...</Title>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <Title>Profile not found</Title>
      </div>
    );
  }

  return <ProfilePage profile={profile} isOwnProfile={isOwnProfile} handleOnChat={handleOnChat} />;
} 