"use client";
import React, { useState, useEffect } from "react";
import PromptCard from "./PromptCard";
import { Prompt } from "@/app/types/commonTypes";

interface PrompoCardListProps {
  data: Prompt[];
  handleTagClick: (tag: string) => void;
}

const PromptCardList: React.FC<PrompoCardListProps> = ({
  data,
  handleTagClick,
}) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post: Prompt) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed: React.FC = () => {
  const [searchText, setSearchText] = useState<string>("");
  const [allPosts, setAllPosts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };
    fetchPosts();
  }, []);

  const handleSearchChange = (e: React.FormEvent) => {};
  const handleTagClick = () => {};
  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input"
        />
      </form>
      <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
    </section>
  );
};

export default Feed;
