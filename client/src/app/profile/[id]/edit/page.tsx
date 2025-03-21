'use client';

import { useGetUserByIdQuery } from '@/redux/api';
import { ProfileEditForm } from '@/components/organisms/profile/profile-edit-form';
import { useParams } from 'next/navigation';
import { ClimbingBoxLoader } from "react-spinners";
import Title from '@/components/atoms/text/title';

export default function EditProfilePage() {
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

  return (
    <div className="container mx-auto px-4 py-8">
      <Title className="mb-6">Edit Profile</Title>
      <ProfileEditForm user={profile} />
    </div>
  );
} 