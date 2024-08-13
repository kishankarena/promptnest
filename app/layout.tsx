import Nav from "@/components/Nav";
import Provider from "@/components/Provider";
import "@/styles/global.css";
import React, { ReactNode } from "react";

export const metadata: { title: string; description: string } = {
  title: "PromptNest",
  description: "Explore & Nestle AI Prompts Together",
};

interface RootLayoutProps {
  children: ReactNode;
}

const RootLayout: React.FC<RootLayoutProps> = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <Provider session={undefined}>
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
