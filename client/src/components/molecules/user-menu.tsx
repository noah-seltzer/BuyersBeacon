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
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useGetUserByClerkIdQuery } from "@/redux/api";
import { Button } from "../atoms/button";

export function UserMenu() {
  const { signOut, openUserProfile } = useClerk();
  const { user: clerkUser } = useUser();
  const { data: beaconUser } = useGetUserByClerkIdQuery(clerkUser?.id || "", {
    skip: !clerkUser?.id,
  });

  const avatarUrl = clerkUser?.imageUrl;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Image
            src={avatarUrl}
            alt="Profile"
            fill
            className="rounded-full object-cover"
            sizes="32px"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent 
        className="w-56 bg-background border-border shadow-lg font-sans"
        align="end"
        side="bottom"
        sideOffset={8}
      >
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {clerkUser?.fullName || "Anonymous User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {clerkUser?.primaryEmailAddress?.emailAddress}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {beaconUser && (
            <DropdownMenuItem asChild>
              <Link 
                href={`/profile/${beaconUser.id}`} 
                className="flex items-center w-full cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
              >
                <Boxes className="mr-2 h-4 w-4" />
                <span>My Beacons</span>
              </Link>
            </DropdownMenuItem>
          )}
          {beaconUser && (
            <DropdownMenuItem asChild>
              <Link 
                href={`/profile/${beaconUser.id}/edit`} 
                className="flex items-center w-full cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
              >
                <User className="mr-2 h-4 w-4" />
                <span>Edit Public Profile</span>
              </Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem asChild>
            <Link 
              href="/beacons/drafts" 
              className="flex items-center w-full cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
            >
              <PenSquare className="mr-2 h-4 w-4" />
              <span>My Drafts</span>
            </Link>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem 
            onClick={() => openUserProfile()} 
            className="flex items-center cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
          >
            <Settings className="mr-2 h-4 w-4" />
            <span>Account Settings</span>
          </DropdownMenuItem>
          <DropdownMenuItem 
            onClick={() => openUserProfile({ tab: "security" })} 
            className="flex items-center cursor-pointer hover:bg-primary/10 focus:bg-primary/10"
          >
            <Shield className="mr-2 h-4 w-4" />
            <span>Security</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem 
          onClick={() => signOut()}
          className="text-red-600 focus:text-red-600 flex items-center cursor-pointer hover:bg-red-600/10 focus:bg-red-600/10"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign Out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
