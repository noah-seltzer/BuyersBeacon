import { FC } from "react";
import { Card } from "@/components/atoms/card";

const PrivacyPolicy: FC = () => (
  <div className="min-h-screen container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-primary mb-8">Privacy Policy</h1>

    <Card className="p-6 max-w-4xl">
      <div className="prose prose-invert max-w-none">
        <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
        <p className="text-foreground/60 mb-6">
          We collect information you provide directly to us when you create an
          account, create a Beacon, or communicate with other users.
        </p>

        <h2 className="text-2xl font-semibold mb-4">
          How We Use Your Information
        </h2>
        <p className="text-foreground/60 mb-6">
          We use the information we collect to provide, maintain, and improve
          our services, communicate with you, and protect our users.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Information Sharing</h2>
        <p className="text-foreground/60 mb-6">
          We do not sell or share your personal information with third parties
          except as described in this policy or with your consent.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
        <p className="text-foreground/60 mb-6">
          We implement appropriate security measures to protect your personal
          information from unauthorized access, alteration, or destruction.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
        <p className="text-foreground/60 mb-6">
          You have the right to access, correct, or delete your personal
          information. Contact us to exercise these rights.
        </p>

        <h2 className="text-2xl font-semibold mb-4">Cookies</h2>
        <p className="text-foreground/60 mb-6">
          We use cookies and similar technologies to provide and improve our
          services and understand how you use BuyersBeacon.
        </p>

        <p className="text-sm text-foreground/40 mt-8">
          Last updated: {new Date().toLocaleDateString()}
        </p>
      </div>
    </Card>
  </div>
);

export default PrivacyPolicy;
