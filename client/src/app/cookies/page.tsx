import { FC } from "react";
import { Card } from "@/components/atoms/card";

const CookiesPolicy: FC = () => (
  <div className="min-h-screen container mx-auto px-4 py-8">
    <h1 className="text-4xl font-bold text-primary mb-8">Cookies Policy</h1>

    <div className="space-y-8 max-w-4xl">
      <Card className="p-6">
        <h2 className="text-2xl font-semibold mb-4">What Are Cookies?</h2>
        <p className="text-foreground/60 mb-4">
          Cookies are small text files that are placed on your device when you
          visit our website. They help us provide you with a better experience
          by remembering your preferences and enabling certain features.
        </p>

        <h2 className="text-2xl font-semibold mb-4 mt-8">How We Use Cookies</h2>
        <ul className="list-disc list-inside space-y-3 text-foreground/60">
          <li>
            Essential cookies: Required for the website to function properly
          </li>
          <li>Authentication cookies: Remember your login status</li>
          <li>Preference cookies: Remember your settings and choices</li>
          <li>
            Analytics cookies: Help us understand how visitors use our site
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mb-4 mt-8">Managing Cookies</h2>
        <p className="text-foreground/60">
          You can control and/or delete cookies as you wish. You can delete all
          cookies that are already on your computer and you can set most
          browsers to prevent them from being placed. However, if you do this,
          you may have to manually adjust some preferences every time you visit
          our site.
        </p>
      </Card>
    </div>
  </div>
);

export default CookiesPolicy;
