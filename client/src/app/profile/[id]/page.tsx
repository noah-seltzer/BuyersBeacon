'use client';

import { useGetUserByIdQuery } from '@/redux/api';
import { ProfilePage } from '@/components/organisms/profile/profile-page';
import { useParams } from 'next/navigation';
import { ClimbingBoxLoader } from "react-spinners";
import Title from '@/components/atoms/text/title';

export default function PublicProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: profile, isLoading } = useGetUserByIdQuery(userId);

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

  return <ProfilePage profile={profile} isOwnProfile={false} />;
} 