import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { User } from "@/types/user";
import { User2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import UserRatingSummary from "./user-rating-summary";

interface UserCardProps {
  userData?: User;
  avatarUrl?: string;
}

/**
 * A reusable user card component showing avatar, name, and rating
 */
const UserCard = ({ userData, avatarUrl }: UserCardProps) => {
  if (!userData) {
    return null;
  }

  return (
    <Card className="p-6">
      <div className="flex flex-col gap-4">
        {/* User Info */}
        <Link
          href={`/profile/${userData?.id}`}
          className="flex items-center gap-4 hover:opacity-80"
        >
          <div className="relative h-12 w-12">
            {avatarUrl ? (
              <Image
                src={avatarUrl}
                alt={userData?.displayName || "User"}
                fill
                className="rounded-full object-cover border-4 border-background"
                sizes="48px"
                onError={(e) => {
                  const img = e.target as HTMLImageElement;
                  img.style.display = "none";
                }}
              />
            ) : (
              <User2 className="h-12 w-12 text-muted-foreground" />
            )}
          </div>
          <div>
            <p className="text-sm text-muted-foreground">Posted by</p>
            <p className="font-medium">
              {userData?.displayName || "Anonymous User"}
            </p>
            {userData?.id && (
              <div className="mt-1">
                <UserRatingSummary userId={userData.id} showTags={false} />
              </div>
            )}
          </div>
        </Link>

        {/* View Profile Button */}
        {userData?.id && (
          <Button variant="outline" asChild className="w-full">
            <Link href={`/profile/${userData.id}`}>
              <User2 className="mr-2 h-4 w-4" />
              View Profile
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserCard;