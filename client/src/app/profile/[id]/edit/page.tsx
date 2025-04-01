'use client';

import { useGetUserByIdQuery } from '@/redux/api';
import { ProfileEditForm } from '@/components/organisms/profile/profile-edit-form';
import { useParams } from 'next/navigation';
import { ClimbingBoxLoader } from "react-spinners";
import Title from '@/components/atoms/text/title';
import PageHeading from '@/components/atoms/text/page-heading';

export default function EditProfilePage() {
  const params = useParams();
  const userId = params.id as string;
  const { data: profile, isLoading } = useGetUserByIdQuery(userId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <ClimbingBoxLoader size={35} color="#24dbb7" className="mb-10" />
        <PageHeading title="Loading Profile..." className="mt-10 text-center" />
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <PageHeading title="Profile not found" subtitle="We couldn't find the profile you're looking for" className="text-center" />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <PageHeading 
        title="Edit Profile"
        subtitle="Update your personal information and preferences"
      />
      <ProfileEditForm user={profile} />
    </div>
  );
} 