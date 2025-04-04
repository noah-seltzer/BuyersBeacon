"use client";
import { useTheme } from "next-themes";

import Link from "next/link";

import { Button } from "./atoms/button";

import { Moon, Sun, Search, Menu, X, User, Loader2, MessageCircle } from "lucide-react";

import Lighthouse from "./atoms/icons/light-house";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { cn } from "@/lib/utils";

import { useState, useEffect, FormEvent, KeyboardEvent } from "react";

import {
  SignedOut,
  SignedIn,
  UserButton,
  SignInButton,
  SignUpButton,
  useUser,
  useAuth,
} from "@clerk/nextjs";

import { useGetUserByClerkIdQuery } from "@/redux/api";

import { UserMenu } from "./molecules/user-menu";
import { useChatModal } from "./providers/chat-provider";

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

  const { openChat, isOpen } = useChatModal()


  // Only show theme toggle after component is mounted to prevent hydration mismatch

  useEffect(() => {
    setMounted(true);
  }, []);

  const query = searchParams.get("query") || "";

  const [inputValue, setInputValue] = useState(query);

  const { data: beaconUser, isLoading: isBeaconUserLoading } =
    useGetUserByClerkIdQuery(clerkUser?.id ?? "", {
      skip: !clerkUser?.id,
    });

  useEffect(() => {
    if (isAuthLoaded && isUserLoaded) {
      if (!userId || (userId && !isBeaconUserLoading)) {
        setIsLoading(false);
      }
    }
  }, [isAuthLoaded, isUserLoaded, userId, isBeaconUserLoading]);

  useEffect(() => {
    setInputValue(query);
  }, [query]);

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
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-b border-border/50 shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
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
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={handleKeyDown}
                  placeholder="Search beacons..."
                  className="bg-transparent text-sm py-1 border-none focus:outline-none w-full max-w-[140px] focus:max-w-[200px] transition-all duration-200"
                />

                {isFocused && inputValue && (
                  <button
                    type="submit"
                    className="absolute right-1.5 text-primary hover:text-primary/80 rounded-full p-1"
                  >
                    <Search className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </form>

            {mounted ? (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                className="text-foreground/80 rounded-full"
              >
                {theme === "dark" ? (
                  <Sun className="h-5 w-5" />
                ) : (
                  <Moon className="h-5 w-5" />
                )}
              </Button>
            ) : (
              <div className="w-9 h-9 flex items-center justify-center">
                <div className="h-5 w-5 rounded-full bg-muted/60 animate-pulse"></div>
              </div>
            )}

            {/* Show loading skeleton while authentication loads */}

            {isLoading ? (
              <div className="flex items-center gap-3">
                <div className="h-8 w-24 rounded-full bg-muted animate-pulse hidden lg:flex"></div>

                <div className="h-8 w-24 rounded-full bg-primary/20 animate-pulse hidden lg:flex"></div>

                <div className="h-9 w-9 rounded-full bg-muted/60 animate-pulse"></div>
              </div>
            ) : (
              <>
                <SignedOut>
                  <div className="hidden lg:flex gap-3">
                    <SignInButton mode="modal">
                      <Button
                        variant="outline"
                        className="rounded-full px-5"
                        size="sm"
                      >
                        Sign In
                      </Button>
                    </SignInButton>

                    <SignUpButton mode="modal">
                      <Button
                        variant="default"
                        className="bg-primary hover:bg-primary/90 text-white rounded-full px-5"
                        size="sm"
                      >
                        Sign Up
                      </Button>
                    </SignUpButton>
                  </div>
                </SignedOut>

                <SignedIn>
                  <Button
                    variant='ghost'
                    size='icon'
                    onClick={() => {
                      openChat()
                    }}
                    className='text-foreground/80'
                  >
                    <MessageCircle className={`h-5 w-5 ${isOpen ? 'text-primary' : 'text-grey'}`} />
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button
                      asChild
                      variant="default"
                      className="bg-primary hover:bg-primary/90 text-white rounded-full hidden lg:flex"
                      size="sm"
                    >
                      <Link href="/beacons/create">
                        <span className="flex items-center">Create Beacon</span>
                      </Link>
                    </Button>

                    <UserMenu />
                  </div>
                </SignedIn>
              </>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
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
          "lg:hidden fixed inset-x-0 bg-background/95 backdrop-blur-md border-b shadow-lg transition-all duration-300 ease-in-out",

          isMenuOpen
            ? "top-16 opacity-100"
            : "-top-96 opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-5 flex flex-col gap-5">
          <form onSubmit={handleSearch} className="w-full">
            <div className="relative rounded-full bg-muted flex items-center p-2 mb-2">
              <Search className="h-4 w-4 text-muted-foreground mx-2" />

              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search beacons..."
                className="bg-transparent text-sm border-none focus:outline-none w-full"
              />

              {inputValue.trim() && (
                <button
                  type="submit"
                  className="absolute right-2 text-primary hover:text-primary/80 rounded-full p-1"
                >
                  <Search className="h-4 w-4" />
                </button>
              )}
            </div>
          </form>

          <NavLink href="/beacons/browse" onClick={() => setIsMenuOpen(false)}>
            Browse Beacons
          </NavLink>

          <NavLink href="/about" onClick={() => setIsMenuOpen(false)}>
            About Us
          </NavLink>

          <NavLink href="/help" onClick={() => setIsMenuOpen(false)}>
            Help Center
          </NavLink>

          <Button
            variant="default"
            className="bg-primary hover:bg-primary/90 text-white w-full mt-2 rounded-full"
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
