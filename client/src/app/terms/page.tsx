import { FC } from "react";
import { Card } from "@/components/atoms/card";

const TermsOfService: FC = () => (
  <div className="min-h-screen container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-primary mb-8">Terms of Service</h1>

    <Card className="p-6 max-w-4xl">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
        <p className="text-foreground/60 mb-6">
          By accessing and using BuyersBeacon, you accept and agree to be bound
          by the terms and provisions of this agreement.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          2. User Responsibilities
        </h2>
        <p className="text-foreground/60 mb-6">
          Users are responsible for maintaining the confidentiality of their
          account information and for all activities that occur under their
          account.
        </p>

        <h2 className="text-2xl font-semibold mb-4">3. Acceptable Use</h2>
        <p className="text-foreground/60 mb-6">
          Users agree not to use BuyersBeacon for any unlawful purpose or in any
          way that could damage, disable, or impair the service.
        </p>

        <h2 className="text-2xl font-semibold mb-4">4. Content Guidelines</h2>
        <p className="text-foreground/60 mb-6">
          Users must ensure all content posted through Beacons is accurate,
          legal, and does not infringe on any third-party rights.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          5. Modifications to Service
        </h2>
        <p className="text-foreground/60 mb-6">
          BuyersBeacon reserves the right to modify or discontinue the service
          at any time without notice.
        </p>

        <p className="text-sm text-foreground/40 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </Card>
  </div>
);

export default TermsOfService;
