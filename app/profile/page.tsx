"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { Prompt } from "@/app/types/commonTypes";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [allPosts, setAllPosts] = useState<Prompt[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (response.ok) {
        const data = await response.json();
        setAllPosts(data);
      }
    };
    session?.user.id && fetchPosts();
  }, [session]);

  const handleEdit = (post: Prompt) => {
    router.push(`/updatePrompt?id=${post._id}`);
  };

  const handleDelete = async () => {};
  return (
    <Profile
      name={"My"}
      desc="Welcome to your personalized profile page"
      data={allPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default ProfilePage;
