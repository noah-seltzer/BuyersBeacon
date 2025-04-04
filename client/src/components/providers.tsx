"use client";
import { FC, PropsWithChildren, Suspense } from "react";
import { Navbar } from "@/components/navbar";
import { Provider } from "react-redux";
import { store } from "@/redux/store";
import { ClerkProvider } from "@clerk/nextjs";
import { ToastContainer } from "react-toastify";
import { dark } from "@clerk/themes";
import { useTheme } from "next-themes";
import { ChatModalEngine, ChatModalProvider } from "./providers/chat-provider";

const Providers: FC<PropsWithChildren> = ({ children }) => {
  const { theme } = useTheme();

  return (
    <Provider store={store}>
      <ClerkProvider
        appearance={{
          baseTheme: theme === "dark" ? dark : undefined,
          variables: {
            colorPrimary: "hsl(168 72% 43%)",
            colorTextOnPrimaryBackground: "hsl(210 40% 98%)",
            colorBackground:
              theme === "dark" ? "hsl(0 0% 4%)" : "hsl(210 40% 98%)",
            colorText: theme === "dark" ? "hsl(0 0% 93%)" : "hsl(222 47% 11%)",
            colorInputBackground:
              theme === "dark" ? "hsl(0 0% 3.9%)" : "hsl(0 0% 100%)",
            colorInputText:
              theme === "dark" ? "hsl(0 0% 93%)" : "hsl(222 47% 11%)",
            colorTextSecondary:
              theme === "dark" ? "hsl(215 20.2% 65.1%)" : "hsl(215 25% 27%)",
            // colorAlphaShade:
            //   theme === "dark" ? "hsl(215 28% 17%)" : "hsl(210 40% 96.1%)",
            borderRadius: "0.5rem",
          },
          elements: {
            card: "bg-background",
            rootBox: "bg-background",
            formButtonPrimary: "bg-primary hover:bg-primary/90",
          }
        }}
        signInUrl="/auth/login"
        signUpUrl="/auth/register"
      >
        <ChatModalProvider>
          <ChatModalEngine />
          <ToastContainer />
          <Suspense>
            <Navbar />
          </Suspense>
          <main className="pt-16">{children}</main>
        </ChatModalProvider>
      </ClerkProvider>
    </Provider>
  );
};

export default Providers;
