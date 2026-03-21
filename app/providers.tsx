"use client";

import dynamic from "next/dynamic";

const PrivyProvider = dynamic(
  () => import("@privy-io/react-auth").then((m) => m.PrivyProvider),
  { ssr: false }
);

export function Providers({ children }: { children: React.ReactNode }) {
  const appId = process.env.NEXT_PUBLIC_PRIVY_APP_ID ?? "";

  if (typeof window !== "undefined" && !appId) {
    console.error(
      "[Providers] Missing required environment variable: NEXT_PUBLIC_PRIVY_APP_ID"
    );
  }

  return (
    <PrivyProvider
      appId={appId}
      config={{
        loginMethods: ["email"],
        embeddedWallets: {
          createOnLogin: "all-users",
        },
      }}
    >
      {children}
    </PrivyProvider>
  );
}
