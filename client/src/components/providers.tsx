"use client";
import { FC, PropsWithChildren } from "react";
import { Navbar } from "@/components/navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { dark } from "@clerk/themes";
import { useTheme } from 'next-themes'

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme()

  return (
    <Provider store={store}>
      <ClerkProvider
        signInFallbackRedirectUrl="/auth"
        publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
        appearance={{
          baseTheme: theme === 'dark' ? dark : undefined,
          variables: {
            colorPrimary: "hsl(168 72% 43%)",
            colorTextOnPrimaryBackground: "hsl(210 40% 98%)",
            colorBackground: theme === 'dark' ? 'hsl(0 0% 4%)' : 'hsl(210 40% 98%)',
            colorText: theme === 'dark' ? 'hsl(0 0% 93%)' : 'hsl(222 47% 11%)',
            colorInputBackground: theme === 'dark' ? 'hsl(0 0% 3.9%)' : 'hsl(0 0% 100%)',
            colorInputText: theme === 'dark' ? 'hsl(0 0% 93%)' : 'hsl(222 47% 11%)',
            colorTextSecondary: theme === 'dark' ? 'hsl(215 20.2% 65.1%)' : 'hsl(215 25% 27%)',
            colorAlphaShade: theme === 'dark' ? 'hsl(215 28% 17%)' : 'hsl(210 40% 96.1%)',
            borderRadius: "0.5rem",
          },
          elements: {
            formButtonPrimary:
              "bg-primary hover:bg-primary/90 text-primary-foreground transition-colors",
            card: theme === 'dark' ? 'bg-background border-surface/10' : 'bg-background border-surface/10',
            socialButtonsIconButton:
              "border border-surface/10 hover:bg-surface/5",
            formFieldInput:
              "bg-background border border-surface/10 focus:border-primary/50",
            dividerLine: "bg-surface/10",
            dividerText: "text-foreground/60",
            footer: theme === 'dark' ? 'text-foreground/60' : 'text-foreground/60',
            headerTitle: "text-foreground font-bold",
            headerSubtitle: "text-foreground/60",
            rootBox: "bg-background text-foreground",
            navbar: "bg-background",
            main: "bg-background",
            formField: "text-foreground",
            formFieldLabel: "text-foreground",
            formFieldHintText: "text-foreground/60",
            formFieldSuccessText: "text-primary",
            formFieldErrorText: "text-destructive",
            identityPreviewText: "text-foreground",
            identityPreviewEditButtonIcon: "text-primary",
          },
          layout: {
            socialButtonsIconButton: "w-full",
            socialButtonsBlockButton: "w-full",
          },
        }}
      >
        <ToastContainer />
        <Navbar />
        <main className="pt-16">{children}</main>
      </ClerkProvider>
    </Provider>
  );
};

export default Providers;
