import { FC, useState } from "react";
import { User } from "@/types/user";
import { Card } from "@/components/atoms/card";
import { Button } from "@/components/atoms/button";
import {
  Pencil,
  MapPin,
  Calendar,
  User as UserIcon,
  Info,
  User2,
  Star,
  ArrowRight,
  Boxes,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { BeaconThumbnail } from "@/components/molecules/beacon-thumbnail";
import { useGetBeaconsQuery } from "@/redux/api";
import { ClimbingBoxLoader } from "react-spinners";
import Title from "@/components/atoms/text/title";
import { useUser } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import UserRatingSummary from "@/components/molecules/user-rating-summary";
import ReviewForm from "@/components/molecules/review-form";
import ReviewsList from "@/components/molecules/reviews-list";
import SectionHeading from "@/components/atoms/text/section-heading";
import PageHeading from "@/components/atoms/text/page-heading";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/atoms/alert-dialog";
import { useDeleteUserMutation } from "@/redux/api";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/atoms/use-toast";

interface ProfilePageProps {
  profile: User;
  isOwnProfile?: boolean;
  handleOnChat?: () => void;
}

export const ProfilePage: FC<ProfilePageProps> = ({
  profile,
  isOwnProfile,
  handleOnChat = () => {},
}) => {
  const { data: beacons, isLoading: beaconsLoading } = useGetBeaconsQuery({
    userId: profile.UserId,
    drafts: false,
  });

  const { user: clerkUser } = useUser();
  const { signOut } = useAuth();
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserMutation();
  const router = useRouter();
  const { toast } = useToast();
  
  const handleDeleteUser = async () => {
    try {
      await deleteUser(profile.UserId).unwrap();
      toast({
        title: "Account Deleted",
        description: "Your account has been successfully deleted.",
        variant: "success",
      });
      // Sign out the user
      await signOut();
      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        title: "Deletion Failed",
        description: "Failed to delete your account. Please try again.",
        variant: "destructive",
      });
    }
  };

  // Prioritize the user's stored avatarUrl over Clerk's imageUrl
  const avatarUrl = profile.avatarUrl || (isOwnProfile && clerkUser?.imageUrl) || "/default-avatar.webp";

  const formattedJoinDate = profile.joinedDate
    ? new Date(profile.joinedDate).toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Invalid Date";

  const possessiveName = profile.displayName.endsWith("s")
    ? `${profile.displayName}'`
    : `${profile.displayName}'s`;

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
      {/* Profile Header */}
      <div className="mb-12 relative">
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-r from-primary/5 via-accent to-primary/5 rounded-xl opacity-70 blur-xl"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Avatar and Stats Column */}
          <div className="md:col-span-1">
            <Card className="overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="p-6 flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="relative w-24 h-24 mb-6">
                  <div className="relative w-24 h-24 rounded-full overflow-hidden border-4 border-primary/10 shadow-md">
                    <Image
                      src={avatarUrl}
                      alt={profile.displayName}
                      fill
                      className="object-cover"
                      sizes="96px"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement;
                        img.src = "/default-avatar.webp";
                      }}
                    />
                  </div>
                </div>

                {/* User Rating Stars */}
                <div className="mb-4">
                  <UserRatingSummary userId={profile.UserId} showTags={false} />
                </div>

                {/* Membership Info */}
                <div className="flex flex-col gap-2 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center justify-center gap-1.5">
                    <Calendar className="w-4 h-4 text-primary/60" />
                    <span>Joined {formattedJoinDate}</span>
                  </div>
                  <div className="flex items-center justify-center gap-1.5">
                    <MapPin className="w-4 h-4 text-primary/60" />
                    <span>{profile.location}</span>
                  </div>
                </div>

                {/* Edit Button */}
                {isOwnProfile && (
                  <div className="space-y-2">
                    <Button
                      asChild
                      variant="default"
                      className="w-full rounded-full text-white"
                    >
                      <Link href={`/profile/${profile.UserId}/edit`}>
                        <Pencil className="w-3.5 h-3.5 mr-1.5" />
                        Edit Profile
                      </Link>
                    </Button>

                    <AlertDialog>
                      <AlertDialogTrigger asChild>
                        <Button
                          variant="destructive"
                          className="w-full rounded-full bg-red-600 hover:bg-red-700 text-white"
                          disabled={isDeleting}
                        >
                          <Trash2 className="w-3.5 h-3.5 mr-1.5" />
                          {isDeleting ? "Deleting..." : "Delete Account"}
                        </Button>
                      </AlertDialogTrigger>
                      <AlertDialogContent className="bg-zinc-900 border-zinc-800 text-white">
                        <AlertDialogHeader>
                          <AlertDialogTitle className="text-white text-xl font-bold">Are you absolutely sure?</AlertDialogTitle>
                          <AlertDialogDescription className="text-gray-300">
                            This action cannot be undone. This will permanently delete your
                            account and transfer all your beacons to a "Deleted User" account.
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter className="flex gap-2 mt-6">
                          <AlertDialogCancel className="bg-zinc-800 hover:bg-zinc-700 text-white border-none">
                            Cancel
                          </AlertDialogCancel>
                          <AlertDialogAction
                            onClick={handleDeleteUser}
                            className="bg-red-600 hover:bg-red-700 text-white border-none"
                            disabled={isDeleting}
                          >
                            {isDeleting ? 'Deleting...' : 'Delete Account'}
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                )}
              </div>
            </Card>
          </div>

          {/* Main Content Column */}
          <div className="md:col-span-3">
            <Card className="overflow-hidden border-border/50 bg-background/50 backdrop-blur-sm shadow-sm">
              <div className="p-8">
                {/* User Info Header */}
                <PageHeading
                  title={profile.displayName}
                  rightContent={
                    !isOwnProfile && (
                      <Button 
                        className="bg-primary hover:bg-primary/90 rounded-full text-white"
                        onClick={handleOnChat}
                      >
                        Contact {profile.displayName.split(" ")[0]}
                      </Button>
                    )
                  }
                  className="mb-6"
                />

                {/* Bio Section */}
                {profile.bio && (
                  <div className="mb-6">
                    <h2 className="text-lg font-semibold mb-3 flex items-center">
                      <Info className="w-4 h-4 mr-2 text-primary/70" />
                      About
                    </h2>
                    <div className="p-4 bg-accent/30 rounded-lg border border-primary/10">
                      <p className="text-foreground/80 leading-relaxed">
                        {profile.bio}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <div className="mb-14 relative">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-12 -left-32 w-64 h-64 rounded-full bg-primary/5 blur-3xl opacity-60"></div>
        </div>

        <SectionHeading
          title={isOwnProfile ? "Your Reviews" : `${possessiveName} Reviews`}
          icon={<Star className="w-4 h-4 text-primary" />}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Reviews List */}
          <div className="lg:col-span-2">
            <div className="bg-background rounded-xl shadow-sm border border-border/50 p-1">
              <ReviewsList userId={profile.UserId} pageSize={5} />
            </div>
          </div>

          {/* Leave a Review (only show if not own profile) */}
          {!isOwnProfile && (
            <div className="lg:col-span-1">
              <div className="bg-background rounded-xl shadow-sm border border-border/50">
                <ReviewForm userId={profile.UserId} />
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Beacons Section */}
      <div className="mb-8">
        <SectionHeading
          title={isOwnProfile ? "Your Beacons" : `${possessiveName} Beacons`}
          icon={<Boxes className="w-4 h-4 text-primary" />}
          rightContent={
            <div className="text-sm bg-primary/10 px-3 py-1 rounded-full text-primary font-medium">
              {beacons?.length || 0} beacon
              {(beacons?.length || 0) !== 1 ? "s" : ""} posted
            </div>
          }
          className="mb-8"
        />

        {beaconsLoading ? (
          <div className="flex justify-center py-12">
            <ClimbingBoxLoader size={15} color="#24dbb7" />
          </div>
        ) : beacons && beacons.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {beacons.map((beacon) => (
              <BeaconThumbnail key={beacon.BeaconId} beacon={beacon} />
            ))}
          </div>
        ) : (
          <div className="bg-background rounded-xl shadow-sm border border-border/50 p-12 text-center">
            <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Boxes className="h-6 w-6 text-primary/60" />
            </div>

            <h3 className="text-lg font-medium mb-2">No Beacons Yet</h3>

            <p className="text-muted-foreground max-w-md mx-auto">
              {isOwnProfile
                ? "You haven't posted any beacons yet. Create one to start connecting with sellers."
                : `${profile.displayName} hasn't posted any beacons yet.`}
            </p>

            {isOwnProfile && (
              <Button
                asChild
                className="mt-6 bg-primary hover:bg-primary/90 text-white rounded-full"
              >
                <Link href="/beacons/create">Create Beacon</Link>
              </Button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
