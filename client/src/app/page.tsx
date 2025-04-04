import { Button } from "@/components/atoms/button";
import {
  ArrowRight,
  Search,
  MessageSquare,
  ChevronRight,
  Star,
  Shield,
  MapPin,
  TrendingUp,
} from "lucide-react";
import { FC } from "react";
import Link from "next/link";
import { SignInButton, SignUpButton } from "@clerk/nextjs";
import { Card } from "@/components/atoms/card";
import Image from "next/image";

const Home: FC = () => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="container mx-auto px-4 min-h-[80vh] flex items-center pt-20 md:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="space-y-6">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
                Find What You Need,{" "}
                <span className="text-primary">Connect</span> With Trusted
                Sellers
              </h1>
              <p className="text-xl text-foreground/80 leading-relaxed">
                BuyersBeacon helps you discover local sellers and find exactly
                what you're looking for. Post your needs and let sellers come to
                you.
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
              <div className="flex items-center gap-2">
                <div className="h-1.5 w-1.5 rounded-full bg-primary/80" />
                Trusted reviews
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
      <section className="py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                How BuyersBeacon Works
              </h2>
              <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
                Find what you need or connect with potential buyers in just a
                few simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  icon: <ArrowRight className="h-8 w-8" />,
                  color: "bg-gradient-to-br from-primary to-primary/70",
                  title: "Create a Beacon",
                  description:
                    "Describe what you're looking for, set a budget, and add your location details",
                },
                {
                  icon: <MessageSquare className="h-8 w-8" />,
                  color: "bg-gradient-to-br from-secondary to-secondary/70",
                  title: "Connect with Sellers",
                  description:
                    "Get responses from local sellers who match your needs",
                },
                {
                  icon: <Star className="h-8 w-8" />,
                  color: "bg-gradient-to-br from-tertiary to-tertiary/70",
                  title: "Rate & Review",
                  description:
                    "Leave feedback on your experience to help build trust in the community",
                },
              ].map((step, index) => (
                <Card
                  key={index}
                  className="relative overflow-hidden border-none shadow-lg bg-background"
                >
                  <div className="p-8">
                    <div className="absolute top-0 right-0 opacity-10 -mr-6 -mt-6">
                      <div className="text-[120px] font-bold text-primary/10">
                        {index + 1}
                      </div>
                    </div>
                    <div
                      className={`w-16 h-16 rounded-2xl ${step.color} text-white flex items-center justify-center mb-6 shadow-lg`}
                    >
                      {step.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                    <p className="text-foreground/70">{step.description}</p>
                    <div className="mt-6">
                      <Link
                        href={
                          index === 0
                            ? "/beacons/create"
                            : index === 1
                              ? "/beacons/browse"
                              : "/help"
                        }
                        className="inline-flex items-center text-primary hover:text-primary/80 font-medium"
                      >
                        Learn more
                        <ChevronRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="mt-20 rounded-3xl bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-10 backdrop-blur-sm border border-border/50 shadow-xl">
              <div className="text-center space-y-6 max-w-2xl mx-auto">
                <h2 className="text-2xl md:text-3xl font-bold">
                  Join thousands of buyers and sellers already connecting on
                  BuyersBeacon
                </h2>
                <p className="text-foreground/70">
                  Create your account today and start finding exactly what you
                  need
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                  <SignInButton mode="modal">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 text-base"
                    >
                      Log In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button
                      size="lg"
                      className="bg-primary hover:bg-primary/90 rounded-full px-8 text-base"
                    >
                      Sign Up for Free
                    </Button>
                  </SignUpButton>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Why Choose BuyersBeacon
            </h2>
            <p className="text-lg text-foreground/70 max-w-2xl mx-auto">
              Our platform is designed to make buying and selling easier, safer,
              and more efficient
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: <MapPin className="h-6 w-6" />,
                title: "Local Focus",
                description:
                  "Connect with buyers and sellers in your area for convenient transactions",
              },
              {
                icon: <Shield className="h-6 w-6" />,
                title: "Trusted Community",
                description:
                  "Verified users and review system to ensure safe and reliable interactions",
              },
              {
                icon: <Star className="h-6 w-6" />,
                title: "Ratings & Reviews",
                description:
                  "Rate your experience and read what others have to say",
              },
            ].map((feature, index) => (
              <Card
                key={index}
                className="border-border/40 hover:border-primary/30 transition-all duration-300 shadow-sm hover:shadow"
              >
                <div className="p-6">
                  <div className="w-12 h-12 rounded-full bg-accent flex items-center justify-center mb-4">
                    <div className="text-primary">{feature.icon}</div>
                  </div>
                  <h3 className="text-lg font-semibold mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-foreground/70 text-sm">
                    {feature.description}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-muted/30 border-t border-border/50 pt-16 pb-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  BuyersBeacon
                </span>
              </div>
              <p className="text-sm text-foreground/70 max-w-xs">
                Connecting local buyers and sellers for safer, better deals in
                your community.
              </p>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold">Explore</h3>
              <ul className="space-y-3">
                {[
                  "Browse Beacons",
                  "Create a Beacon",
                  "Categories",
                  "Recommendations",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={
                        i === 0
                          ? "/beacons/browse"
                          : i === 1
                            ? "/beacons/create"
                            : "#"
                      }
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold">Resources</h3>
              <ul className="space-y-3">
                {[
                  "About Us",
                  "Help Center",
                  "Community Guidelines",
                  "Safety Tips",
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={i === 0 ? "/about" : i === 1 ? "/help" : "#"}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              <h3 className="text-base font-semibold">Legal</h3>
              <ul className="space-y-3">
                {[
                  { name: "Terms of Service", href: "/terms" },
                  { name: "Privacy Policy", href: "/privacy" },
                  { name: "Cookie Policy", href: "/cookies" },
                  { name: "Accessibility", href: "/accessibility" },
                ].map((item, i) => (
                  <li key={i}>
                    <Link
                      href={item.href}
                      className="text-sm text-foreground/70 hover:text-primary transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-16 pt-6 border-t border-border/30 flex justify-center items-center">
            <p className="text-sm text-foreground/60">
              © {new Date().getFullYear()} BuyersBeacon. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
