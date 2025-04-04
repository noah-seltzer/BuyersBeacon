"use client";

import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, FormEvent, KeyboardEvent } from "react";
import {
  SignedOut,
  SignedIn,
  SignInButton,
  SignUpButton,
  useUser,
  useAuth,
} from "@clerk/nextjs";
import {
  Moon,
  Sun,
  Search,
  Menu,
  X,
  User,
  Loader2,
  MessageCircle,
} from "lucide-react";

import { Button } from "./atoms/button";
import Lighthouse from "./atoms/icons/light-house";
import { cn } from "@/lib/utils";
import { useGetUserByClerkIdQuery } from "@/redux/api";
import { UserMenu } from "./molecules/user-menu";
import { useChatModal } from "./providers/chat-provider";

// Helper component for Navigation Links
const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (href !== "/" && pathname?.startsWith(href));

  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        "relative py-1.5 px-1 text-sm font-medium transition-colors duration-200",
        "after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:rounded-full after:content-['']",
        "after:bg-primary after:transition-transform after:duration-300",
        isActive
          ? "text-foreground after:scale-x-100"
          : "text-foreground/70 after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
      )}
    >
      {children}
    </Link>
  );
};

export function Navbar() {
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isFocused, setIsFocused] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isLoaded: isAuthLoaded, userId } = useAuth();
  const { user: clerkUser, isLoaded: isUserLoaded } = useUser();
  const { openChat, isOpen } = useChatModal();

  useEffect(() => {
    setMounted(true);
  }, []);

  const query = searchParams.get("query") || "";
  const [inputValue, setInputValue] = useState(query);

  // Fetch Beacon user data
  const { data: beaconUser, isLoading: isBeaconUserLoading } =
    useGetUserByClerkIdQuery(clerkUser?.id ?? "", {
      skip: !clerkUser?.id, // Skip query if clerkUser.id is not available
    });

  // Effect to handle mounting state for theme toggle (prevents hydration mismatch)
  useEffect(() => {
    setMounted(true);
  }, []);

  // Effect to determine overall loading state
  useEffect(() => {
    // Considered loaded if auth is loaded AND either user is not logged in OR user is logged in and their beacon data is loaded/finished loading
    if (isAuthLoaded && isUserLoaded) {
      if (!userId || (userId && !isBeaconUserLoading)) {
        setIsLoading(false);
      } else {
        // Keep loading if auth is loaded but beacon user data is still pending
        setIsLoading(true);
      }
    } else {
      // Keep loading if auth/user haven't loaded yet
      setIsLoading(true);
    }
  }, [isAuthLoaded, isUserLoaded, userId, isBeaconUserLoading]);

  // Effect to sync input value with URL query param
  useEffect(() => {
    setInputValue(query);
  }, [query]);

  // Handlers
  const handleSearch = (e?: FormEvent) => {
    e?.preventDefault();
    if (inputValue.trim()) {
      router.push(
        `/beacons/browse?query=${encodeURIComponent(inputValue.trim())}`
      );
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const NavLink = ({
    href,
    children,
    onClick,
  }: {
    href: string;
    children: React.ReactNode;
    onClick?: () => void;
  }) => {
    const isActive =
      pathname === href || (href !== "/" && pathname?.startsWith(href));

    return (
      <Link
        href={href}
        onClick={onClick}
        className={cn(
          "text-sm font-medium relative py-1.5 px-1 transition-colors duration-200",
          "after:content-[''] after:absolute after:left-0 after:right-0 after:bottom-0 after:h-0.5 after:rounded-full",
          "after:bg-primary after:transition-transform after:duration-300",
          isActive
            ? "text-foreground after:scale-x-100"
            : "text-foreground/70 after:scale-x-0 hover:text-foreground hover:after:scale-x-100"
        )}
      >
        {children}
      </Link>
    );
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 bg-background/90 shadow-sm backdrop-blur-md">
      {/* Desktop Navbar */}
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Left Section: Logo & Nav Links */}
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <Lighthouse className="h-8 w-8 text-primary" />
              <span className="text-xl font-bold tracking-tight text-primary">
                BuyersBeacon
              </span>
            </Link>
            <nav className="hidden lg:flex items-center gap-8">
              <NavLink href="/beacons/browse">Browse Beacons</NavLink>
              <NavLink href="/about">About Us</NavLink>
              <NavLink href="/help">Help Center</NavLink>
            </nav>
          </div>

          {/* Right Section: Search, Theme, Auth */}
          <div className="flex items-center gap-3">
            <form onSubmit={handleSearch} className="hidden lg:block">
              <div
                className={cn(
                  "relative rounded-full transition-all duration-200 flex items-center",
                  isFocused
                    ? "bg-muted border border-primary/40 pr-8"
                    : "bg-muted/70 hover:bg-muted pr-3"
                )}
              >
                <Search className="h-4 w-4 text-muted-foreground mx-2" />
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)} // Consider delay or focus-within if needed
                  onKeyDown={handleKeyDown}
                  placeholder="Search beacons..."
                  className={cn(
                    "w-full max-w-[140px] border-none bg-transparent py-1 text-sm transition-all duration-200 focus:outline-none",
                    isSearchFocused && "focus:max-w-[200px]" // Expand input on focus
                  )}
                />
                {isFocused && inputValue && (
                  <button
                    type="submit"
                    aria-label="Submit search"
                    className="absolute right-1.5 rounded-full p-1 text-primary hover:text-primary/80"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </form>

            {/* Theme Toggle */}
            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="rounded-full text-foreground/80"
                aria-label={`Switch to ${
                  theme === "dark" ? "light" : "dark"
                } mode`}
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            ) : (
              // Skeleton for Theme Toggle
              <div className="flex h-9 w-9 items-center justify-center">
                <div className="h-5 w-5 animate-pulse rounded-full bg-muted/60"></div>
              </div>
            )}

            {isLoading ? (
              // Skeleton for Auth Buttons
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 rounded-full bg-muted animate-pulse hidden lg:flex"></div>
                <div className="h-8 w-24 rounded-full bg-primary/20 animate-pulse hidden lg:flex"></div>
                <div className="h-9 w-9 rounded-full bg-muted/60 animate-pulse"></div>
              </div>
            ) : (
              // Actual Auth Buttons
              <>
                <SignedOut>
                  <div className="hidden lg:flex gap-3">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        size="sm"
                        className="rounded-full px-5"
                      >
                        Sign In
                      </Button>
                    </SignInButton>
                    <SignUpButton mode="modal">
                      <Button
                        variant="default"
                        size="sm"
                        className="rounded-full bg-primary px-5 text-white hover:bg-primary/90"
                      >
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      openChat();
                    }}
                    className="text-foreground/80"
                  >
                    <MessageCircle
                      className={`h-5 w-5 ${
                        isOpen ? "text-primary" : "text-grey"
                      }`}
                    />
                  </Button>
                  <div className="flex items-center gap-3">
                    {/* Chat Icon Button */}
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={openChat}
                      className={cn(
                        "rounded-full text-foreground/80 relative",
                        isChatOpen && "bg-muted text-primary" // Indicate active state
                      )}
                      aria-label={isChatOpen ? "Close chat" : "Open chat"}
                    >
                      <MessageCircle className="h-5 w-5" />
                      {/* Optional: Add a badge for unread messages here */}
                    </Button>

                    {/* Desktop Create Beacon Button */}
                    <Button
                      asChild
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full hidden lg:flex"
                      size="sm"
                      className="hidden rounded-full bg-primary text-white hover:bg-primary/90 lg:flex"
                    >
                      <Link href="/beacons/create">Create Beacon</Link>
                    </Button>
                    <UserMenu />
                  </div>
                </SignedIn>
              </>
            )}

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
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
          "lg:hidden fixed inset-x-0 bg-background/95 backdrop-blur-md border-b shadow-lg transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "top-16 opacity-100" // Height of the navbar
            : "-top-full opacity-0 pointer-events-none" // Smooth slide up
        )}
        // Optional: Add focus trap logic if needed for accessibility
      >
        <div className="container mx-auto flex flex-col gap-5 px-4 py-5">
          {/* Mobile Search */}
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative rounded-full bg-muted flex items-center p-2 mb-2">
              <Search className="h-4 w-4 text-muted-foreground mx-2" />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search beacons..."
                className="w-full border-none bg-transparent text-sm focus:outline-none"
              />
              {inputValue.trim() && (
                <button
                  type="submit"
                  aria-label="Submit search"
                  className="absolute right-2 rounded-full p-1 text-primary hover:text-primary/80"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          {/* Mobile Nav Links */}
          <NavLink href="/beacons/browse" onClick={closeMobileMenu}>
            Browse Beacons
          </NavLink>
          <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </NavLink>
          <NavLink href="/help" onClick={() => setIsMenuOpen(false)}>
            Help Center
          </NavLink>

          <SignedOut>
            <div className="flex gap-3 mt-2">
              <SignInButton mode="modal">
                <Button
                  variant="outline"
                  className="rounded-full px-5 flex-1"
                  size="sm"
                >
                  Sign In
                </Button>
              </SignInButton>
              <SignUpButton mode="modal">
                <Button
                  variant="default"
                  className="bg-primary hover:bg-primary/90 text-white rounded-full px-5 flex-1"
                  size="sm"
                >
                  Sign Up
                </Button>
              </SignUpButton>
            </div>
          </SignedOut>

          <SignedIn>
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white w-full mt-2 rounded-full"
              asChild
            >
              <Link href="/beacons/create" onClick={() => setIsMenuOpen(false)}>
                Create Beacon
              </Link>
            </Button>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
