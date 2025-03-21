"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { Button } from "./atoms/button";
import { Moon, Sun, Search, Menu, X, Bell, User } from "lucide-react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
} from "@clerk/nextjs";
import { useGetUserByClerkIdQuery } from "@/redux/api";
import { UserMenu } from "./molecules/user-menu";

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user: clerkUser } = useUser();

  // Get the BuyersBeacon user ID if user is signed in
  const { data: beaconUser } = useGetUserByClerkIdQuery(clerkUser?.id ?? "", {
    skip: !clerkUser?.id,
  });

  const NavLink = ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive = pathname === href;
    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-sm text-foreground/80 hover:text-foreground relative py-1",
          "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:rounded-full",
          "after:bg-primary after:transition-transform after:duration-200",
          isActive
            ? "text-foreground after:scale-x-100"
            : "after:scale-x-0 hover:after:scale-x-100"
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="text-2xl font-bold text-primary">
              BuyersBeacon
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <NavLink href="/beacons/browse">Browse</NavLink>
              <NavLink href="/about">About</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="text-foreground/80">
              <Search className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="text-foreground/80">
              <Bell className="h-5 w-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="text-foreground/80"
            >
              {theme === "dark" ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
            <SignedOut>
              <div className="hidden md:flex gap-4">
                <SignInButton mode="modal">
                  <Button
                    variant="default"
                    className="bg-tertiary hover:bg-primary/90 text-white"
                  >
                    Sign In
                  </Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button
                    variant="default"
                    className="bg-secondary hover:bg-primary/90 text-white"
                  >
                    Sign Up
                  </Button>
                </SignUpButton>
              </div>
            </SignedOut>

            <SignedIn>
              <div className="flex items-center gap-4">
                <Button asChild variant="default" className="bg-primary hover:bg-primary/90 text-white hidden md:flex">
                  <Link href="/beacons/create">
                    Create Beacon
                  </Link>
                </Button>
                <UserMenu />
              </div>
            </SignedIn>
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? (
                <X className="h-5 w-5" />
              ) : (
                <Menu className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 bg-background border-b border-surface/10 transition-all duration-300 ease-in-out",
          isMenuOpen ? "top-16 opacity-100" : "-top-96 opacity-0"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col gap-4">
          <NavLink href="/" onClick={() => setIsMenuOpen(false)}>
            Browse
          </NavLink>
          <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>
            About
          </NavLink>
          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white w-full mt-2"
            asChild
          >
            <Link href="/beacons/create" onClick={() => setIsMenuOpen(false)}>
              Create Beacon
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
