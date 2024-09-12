"use client";

import { useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Prompt } from "@/app/types/commonTypes";

interface PromptCardProps {
  post: Prompt;
  handleTagClick: (tag: string) => void;
}

const PromptCard: React.FC<PromptCardProps> = ({ post, handleTagClick }) => {
  const [copied, setCopied] = useState<string>();

  const handleCopyClick = () => {
    setCopied(post.prompt);
    navigator.clipboard.writeText(post.prompt);
    setTimeout(() => setCopied(""), 3000);
  };
  return (
    <div className="prompt_card">
      <div className="flex justify-between items-start gap-5">
        <div className="flex-1 flex justify-start items-start gap-3 cursor-pointer">
          {post.creator?.image && (
            <Image
              src={post.creator.image}
              alt="user_image"
              width={40}
              height={40}
              className="rouded-full object-contain"
            />
          )}

          <div className="flex flex-col">
            <h3 className="font-satoshi font-semibold text-gray-900">
              {post.creator?.username}
            </h3>
            <p className="font-inter text-sm text-gray-500">
              {post.creator?.email}
            </p>
          </div>
        </div>
        <div className="copy_btn" onClick={() => handleCopyClick()}>
          <Image
            src={
              copied === post.prompt
                ? "/assets/icons/tick.svg"
                : "/assets/icons/copy.svg"
            }
            alt="Copy_Icon"
            width={12}
            height={12}
          />
        </div>
      </div>
      <p className="my-4 font-satoshi text-sm text-gray-800">{post.prompt}</p>
      <p
        className="font-inter text-sm blue_gradient cursor-pointer"
        onClick={() => handleTagClick(post.tag)}
      >
        {post.tag}
      </p>
    </div>
  );
};

export default PromptCard;
