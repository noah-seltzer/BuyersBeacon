import { getUserSS } from "@/lib/user";
import { Suspense } from "react";
import { Button } from "@/components/atoms/button";
import Link from "next/link";
import CreateBeaconPage from "@/components/organisms/beacons/create-beacon-page";
import { SignInButton } from "@clerk/nextjs";

export default async function CreateBeaconRoute() {
  try {
    const user = await getUserSS();
    return (
      <Suspense>
        <CreateBeaconPage user={user} />
      </Suspense>
    );
  } catch {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl font-bold mb-4">Sign in Required</h1>
          <p className="text-muted-foreground mb-6">
            Please sign in to create a beacon
          </p>
          <SignInButton mode="modal">
            <Button
              variant="default"
              className="bg-primary hover:bg-primary/90 text-white"
            >
              Sign In
            </Button>
          </SignInButton>
        </div>
      </div>
    );
  }
}
