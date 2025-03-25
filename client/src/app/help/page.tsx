import { FC } from "react";
import { Card } from "@/components/atoms/card";

const HelpCenter: FC = () => (
  <div className="min-h-screen container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-primary mb-8">Help Center</h1>

    <div className="space-y-8 max-w-4xl">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">
          Frequently Asked Questions
        </h2>

        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-2">What is a Beacon?</h3>
            <p className="text-foreground/60">
              A Beacon is a request you create to find specific items or
              services. It helps sellers understand exactly what you&#39;re looking
              for and allows them to contact you if they can help.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              How do I create a Beacon?
            </h3>
            <p className="text-foreground/60">
              Click the &quot;Create Beacon&quot; button in the navigation bar, fill in
              the details about what you&#39;re looking for, including any specific
              requirements or price range, and submit your Beacon.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-2">
              Is BuyersBeacon free to use?
            </h3>
            <p className="text-foreground/60">
              Yes, BuyersBeacon is free for both buyers and sellers. We believe
              in connecting people without barriers.
            </p>
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Contact Support</h2>
        <p className="text-foreground/60 mb-4">
          Need help with something specific? Our support team is here to help.
        </p>
        <p className="text-foreground/60">
          Email us at: support@buyersbeacon.com
        </p>
      </Card>
    </div>
  </div>
);

export default HelpCenter;
