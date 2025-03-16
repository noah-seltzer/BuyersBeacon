"use client";

import { Card } from "@/components/atoms/card";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/atoms/button";

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-primary mb-6">
          About BuyersBeacon
        </h1>

        <div className="grid gap-8 md:grid-cols-2">
          {/* Main Content */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
            <p className="text-muted-foreground mb-4">
              BuyersBeacon connects buyers with local sellers, making it easier
              to find exactly what you're looking for. Instead of endless
              scrolling through listings, simply create a beacon for what you
              want and let sellers come to you.
            </p>
            <p className="text-muted-foreground mb-6">
              We believe in creating meaningful connections in your local
              community, making buying and selling a more personal experience.
            </p>
            <Button asChild>
              <Link href="/beacons/create">
                Create Your First Beacon
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </Card>

          {/* How It Works */}
          <Card className="p-6">
            <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-medium mb-2">1. Create a Beacon</h3>
                <p className="text-muted-foreground">
                  Describe what you're looking for, set your price range, and
                  add any specific requirements.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">
                  2. Connect with Sellers
                </h3>
                <p className="text-muted-foreground">
                  Local sellers will see your beacon and can reach out if they
                  have what you're looking for.
                </p>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">3. Make the Deal</h3>
                <p className="text-muted-foreground">
                  Review offers, communicate with sellers, and find the perfect
                  match for your needs.
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
