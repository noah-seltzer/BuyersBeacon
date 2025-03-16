import { Button } from "@/components/atoms/button";
import { ArrowRight, Search, MessageSquare, Bell } from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

const Home: FC = () => (
  <div className="flex flex-col">
    {/* Hero Section */}
    <section className="container mx-auto px-4 min-h-[70vh] flex items-center">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        <div className="space-y-8">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
              Find What You Need, <span className="text-primary">Connect</span>{" "}
              With Sellers
            </h1>
            <p className="text-xl text-foreground/80 leading-relaxed">
              {`BuyersBeacon helps you discover local sellers and
                            find exactly what you\'re looking for. Post your
                            needs and let sellers come to you.`}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="bg-primary hover:bg-primary/90 h-14 px-8 text-base"
              asChild
            >
              <Link href="/beacons/create">
                Create a Beacon
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="h-14 px-8 text-base group hover:border-primary/50"
              asChild
            >
              <Link href="/beacons/browse">
                <Search className="mr-2 h-5 w-5 group-hover:text-primary" />
                Browse Beacons
              </Link>
            </Button>
          </div>

          <div className="flex items-center gap-8 text-sm text-foreground/60 pt-4">
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Verified sellers
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
              Local connections
            </div>
          </div>
        </div>

        <div className="relative hidden md:block">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-secondary/5 to-transparent rounded-3xl" />
          <div className="aspect-square rounded-3xl border border-foreground/5 backdrop-blur-sm p-8 relative overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full bg-primary/10 animate-pulse" />
              <div className="absolute w-48 h-48 rounded-full border border-primary/20 animate-ping [animation-duration:3s]" />
              <div className="absolute w-64 h-64 rounded-full border border-secondary/10 animate-ping [animation-duration:4s]" />
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* How It Works Section*/}
    <section className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          How It Works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
              <Search className="h-10 w-10 text-primary" />
            </div>
            <h3 className="text-xl font-semibold">Post Your Need</h3>
            <p className="text-foreground/60 text-base">
              {`Tell us what you\'re looking for and let sellers know
                            what you need`}
            </p>
          </div>
          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-secondary/10 flex items-center justify-center">
              <MessageSquare className="h-10 w-10 text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Connect with Sellers</h3>
            <p className="text-foreground/60 text-base">
              Get responses from local sellers who have what you need
            </p>
          </div>

          <div className="flex flex-col items-center text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center">
              <Bell className="h-10 w-10 text-tertiary" />
            </div>
            <h3 className="text-xl font-semibold">Stay Updated</h3>
            <p className="text-foreground/60 text-base">
              Receive notifications when new matches and responses arrive
            </p>
          </div>
        </div>

        <div className="mt-32 text-center space-y-8">
          <h2 className="text-2xl font-medium text-foreground/80">
            Join thousands of buyers and sellers already connecting on
            BuyersBeacon
          </h2>
          <div className="flex items-center justify-center gap-4">
            <SignInButton>
              <Button
                size="lg"
                variant="outline"
                className="h-14 px-8 text-base group hover:border-primary/50"
              >
                Log In
              </Button>
            </SignInButton>
            <SignUpButton>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 h-14 px-8 text-base"
              >
                Sign Up
              </Button>
            </SignUpButton>
          </div>
        </div>
      </div>
    </section>

    {/* Footer */}
    <footer className="border-t border-surface/10 mt-16">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">BuyersBeacon</h3>
            <p className="text-sm text-foreground/60">
              Connecting local buyers and sellers for better deals.
            </p>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Product</h3>
            <div className="space-y-2">
              <Link
                href="/beacons/browse"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                Browse Beacons
              </Link>
              <Link
                href="/beacons/create"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                Create a Beacon
              </Link>
              <Link
                href="/about"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                About Us
              </Link>
            </div>
          </div>

          <div className="space-y-4 text-center">
            <h3 className="text-lg font-semibold">Support</h3>
            <div className="space-y-2">
              <Link
                href="/help"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                Help Center
              </Link>
              <Link
                href="/terms"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                Terms of Service
              </Link>
              <Link
                href="/privacy"
                className="block text-sm text-foreground/60 hover:text-foreground"
              >
                Privacy Policy
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-surface/10">
          <p className="text-center text-sm text-foreground/60">
            © {new Date().getFullYear()} BuyersBeacon. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  </div>
);

export default Home;
