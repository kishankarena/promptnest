import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/global.css";
import { getServerSession } from "next-auth";
import React, { ReactNode } from "react";
import { options } from "@/utils/authOptions";

export const metadata: { title: string; description: string } = {
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
