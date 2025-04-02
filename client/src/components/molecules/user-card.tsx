import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { User } from "@/types/user";
import { Calendar, MapPin, User2 } from "lucide-react";
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

  const hasValidUserId = userData?.UserId && userData.UserId.length > 0;
  const userDisplayName = userData?.displayName || "Anonymous User";
  const joinDate = userData?.joinedDate 
    ? new Date(userData.joinedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short' })
    : null;
  
  return (
    <Card className="overflow-hidden">
      {/* Card Header */}
      <div className="p-4 border-b bg-accent/10">
        <h3 className="font-medium text-sm flex items-center gap-1.5">
          <User2 className="h-4 w-4 text-primary/70" />
          <span>Posted by</span>
        </h3>
      </div>
      
      {/* Card Body */}
      <div className="p-5">
        <Link
          href={hasValidUserId ? `/profile/${userData.UserId}` : "#"}
          className="flex items-center gap-4 hover:opacity-90 transition-opacity duration-200"
        >
          {/* Avatar */}
          <div className="relative h-16 w-16 flex-shrink-0">
            <div className="rounded-full overflow-hidden border-4 border-primary/10 shadow-sm h-full w-full">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={userData?.displayName || "User"}
                  fill
                  className="object-cover rounded-full"
                  sizes="64px"
                  onError={(e) => {
                    const img = e.target as HTMLImageElement;
                    img.src = "/default-avatar.webp";
                  }}
                />
              ) : (
                <User2 className="h-full w-full p-3 text-muted-foreground" />
              )}
            </div>
          </div>
          
          {/* User Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{userDisplayName}</h3>
            
            <div className="flex flex-col gap-1 mt-1 text-sm text-muted-foreground">
              {userData.location && (
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-3.5 w-3.5 text-primary/60" />
                  <span>{userData.location}</span>
                </div>
              )}
              
              {joinDate && (
                <div className="flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5 text-primary/60" />
                  <span>Member since {joinDate}</span>
                </div>
              )}
              
              {/* User Rating integrated with other info */}
              {hasValidUserId && (
                <div className="flex items-center gap-1.5 mt-1">
                  <UserRatingSummary userId={userData.UserId} showTags={false} />
                </div>
              )}
            </div>
          </div>
        </Link>
        
        {/* View Profile Button */}
        {hasValidUserId && (
          <Button 
            variant="outline" 
            asChild 
            className="w-full mt-2 rounded-full border-primary/20 hover:bg-primary/5 hover:text-primary"
          >
            <Link href={`/profile/${userData.UserId}`}>
              <User2 className="mr-2 h-4 w-4" />
              View Full Profile
            </Link>
          </Button>
        )}
      </div>
    </Card>
  );
};

export default UserCard;