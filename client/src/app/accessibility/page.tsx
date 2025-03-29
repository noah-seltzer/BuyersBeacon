import { FC } from "react";
import { Card } from "@/components/atoms/card";

const Accessibility: FC = () => (
  <div className="min-h-screen container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-primary mb-8">Accessibility</h1>

    <div className="space-y-8 max-w-4xl">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">Our Commitment</h2>
        <p className="text-foreground/60 mb-4">
          BuyersBeacon is committed to ensuring digital accessibility for people
          of all abilities. We are continually improving the user experience for
          everyone and applying the relevant accessibility standards.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">
          Accessibility Features
        </h2>
        <ul className="list-disc list-inside space-y-3 text-foreground/60">
          <li>Keyboard navigation support</li>
          <li>Screen reader compatibility</li>
          <li>Text resizing without loss of functionality</li>
          <li>Color contrast compliance</li>
          <li>Clear and consistent navigation</li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Contact Us</h2>
        <p className="text-foreground/60">
          If you encounter any accessibility barriers on our website, please
          contact us. We welcome your feedback and suggestions for improvement.
        </p>
      </Card>
    </div>
  </div>
);

export default Accessibility;
