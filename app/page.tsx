import React, { FC } from "react";
import Feed from "@/components/Feed";

const Home: React.FC = () => {
  return (
    <section className="w-full flex-center flex-col">
      <h1 className="head_text text-center">
        Explore & Nestle
        <br className="max-md:hidden" />
        <span className="orange_gradient text-center">AI Prompts Together</span>
      </h1>
      <p className="desc text-center">
        PromptNest is an innovative platform designed to foster creativity and
        collaboration in the digital age. It empowers users to unearth, craft,
        and disseminate imaginative prompts, harnessing the power of AI to
        inspire new ideas.
      </p>
      <Feed />
    </section>
  );
};

export default Home;
