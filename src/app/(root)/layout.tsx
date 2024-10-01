import StreamVideoProvider from "@/providers/StreamClientProvider";
import React from "react";

interface RootProps {
  children: React.ReactNode;
}

const RootLayout = ({ children }: RootProps) => {
  return (
    <main>
      <StreamVideoProvider>
        {children}
        </StreamVideoProvider>
    </main>
  );
};

export default RootLayout;
