"use client";
import React, { useState, useEffect, useRef, ChangeEvent } from "react";
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
  const [searchedPosts, setSearchedPosts] = useState<Prompt[]>([]);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();
      setAllPosts(data);
    };
    fetchPosts();
    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, []);
  // To filter prompts by userName,tag and prompt
  const filterPrompts = (searchText: string) => {
    const regex = new RegExp(searchText, "i"); // 'i' flag for case-insensitive search
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);

    searchTimeout.current = setTimeout(() => {
      const searchedResults = filterPrompts(e.target.value);
      setSearchedPosts(searchedResults);
    }, 500);
  };
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
      {searchText ? (
        <PromptCardList data={searchedPosts} handleTagClick={handleTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;
