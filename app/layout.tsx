import React, { ReactNode } from "react";
import { Metadata } from "next";
import { getServerSession } from "next-auth";

import "@/styles/global.css"; 
import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import { options } from "@/utils/authOptions";

export const metadata: Metadata = {
  title: "PromptNest",
  description: "Explore & Nestle AI Prompts Together",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = async ({ children }) => {
  const session = await getServerSession(options);
  return (
    <html lang="en">
      <body>
        <Provider session={session}>
          <div className="main">
            <div className="gradient" />
          </div>

          <main className="app">
            <Nav />
            {children}
          </main>
        </Provider>
      </body>
    </html>
  );
};

export default RootLayout;
