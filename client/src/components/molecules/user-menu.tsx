import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/atoms/dropdown-menu";
import { useClerk, useUser } from "@clerk/nextjs";
import {
  User,
  Settings,
  Shield,
  LogOut,
  FileEdit,
  PenSquare,
  Boxes,
  User2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetUserByClerkIdQuery, useGetUserByIdQuery } from "@/redux/api";
import { Button } from "../atoms/button";

export function UserMenu() {
  const { signOut, openUserProfile } = useClerk();
  const { user: clerkUser } = useUser();

  const { data: beaconUser } = useGetUserByClerkIdQuery(clerkUser?.id || "", {
    skip: !clerkUser?.id,
  });

  const { data: fullProfile } = useGetUserByIdQuery(beaconUser?.UserId || "", {
    skip: !beaconUser?.UserId,
  });

  const displayName =
    fullProfile?.displayName ||
    beaconUser?.displayName ||
    "Update your profile";
  
  // Prioritize the user's stored avatarUrl over Clerk's imageUrl
  const avatarUrl = fullProfile?.avatarUrl || beaconUser?.avatarUrl || clerkUser?.imageUrl || "/default-avatar.png";

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-9 w-9 rounded-full p-0 overflow-hidden border-2 border-primary/20 hover:border-primary/40 transition-all"
        >
          {avatarUrl ? (
            <Image
              src={avatarUrl}
              alt="Profile"
              fill
              className="rounded-full object-cover"
              sizes="36px"
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.src = "/default-avatar.png";
              }}
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary/10">
              <User className="h-5 w-5 text-primary/80" />
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-72 bg-background border-border shadow-xl rounded-xl p-1 font-sans"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1 p-2">
            <p className="text-base font-medium leading-none text-primary">
              {displayName}
            </p>
            <p className="text-xs leading-none text-muted-foreground pt-1">
              {clerkUser?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuGroup>
          {beaconUser && (
            <>
              <DropdownMenuItem asChild>
                <Link
                  href={`/profile/${beaconUser.UserId}`}
                  className="flex items-center w-full cursor-pointer rounded-lg p-2.5 hover:bg-primary/10 focus:bg-primary/10"
                >
                  <User2 className="mr-3 h-4 w-4 text-primary/80" />
                  <span className="font-medium">View Profile</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href={`/profile/${beaconUser.UserId}`}
                  className="flex items-center w-full cursor-pointer rounded-lg p-2.5 hover:bg-primary/10 focus:bg-primary/10"
                >
                  <Boxes className="mr-3 h-4 w-4 text-primary/80" />
                  <span className="font-medium">My Beacons</span>
                </Link>
              </DropdownMenuItem>

              <DropdownMenuItem asChild>
                <Link
                  href="/beacons/drafts"
                  className="flex items-center w-full cursor-pointer rounded-lg p-2.5 hover:bg-primary/10 focus:bg-primary/10"
                >
                  <FileEdit className="mr-3 h-4 w-4 text-primary/80" />
                  <span className="font-medium">My Drafts</span>
                </Link>
              </DropdownMenuItem>
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuGroup>
          <DropdownMenuItem
            onClick={() => openUserProfile()}
            className="flex items-center cursor-pointer rounded-lg p-2.5 hover:bg-primary/10 focus:bg-primary/10"
          >
            <Settings className="mr-3 h-4 w-4 text-primary/80" />
            <span className="font-medium">Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => openUserProfile()}
            className="flex items-center cursor-pointer rounded-lg p-2.5 hover:bg-primary/10 focus:bg-primary/10"
          >
            <Shield className="mr-3 h-4 w-4 text-primary/80" />
            <span className="font-medium">Security</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator className="my-1" />
        <DropdownMenuItem
          onClick={() => signOut()}
          className="text-red-500 focus:text-red-500 flex items-center cursor-pointer rounded-lg p-2.5 hover:bg-red-600/10 focus:bg-red-600/10 mt-1"
        >
          <LogOut className="mr-3 h-4 w-4" />
          <span className="font-medium">Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
