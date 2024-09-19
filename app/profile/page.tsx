"use client";

import { useState, useEffect, useCallback } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@/components/Profile";
import { Prompt } from "@/app/types/commonTypes";

const ProfilePage = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const [allPosts, setAllPosts] = useState<Prompt[]>([]);

  const fetchPosts = useCallback(async () => {
    if (session?.user.id) {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);
      if (response.ok) {
        const data = await response.json();
        setAllPosts(data);
      }
    }
  }, [session]);

  useEffect(() => {
    fetchPosts();
  }, [session]);

  const handleEdit = (post: Prompt) => {
    router.push(`/updatePrompt?id=${post._id}`);
  };

  const handleDelete = async (post: Prompt) => {
    const hasConfirmed = confirm("Are you sure want to delete this prompt ?");
    if (hasConfirmed) {
      try {
        const response = await fetch(`/api/prompt/${post._id.toString()}`, {
          method: "DELETE",
        });
        if (response.ok) {
          const data = await response.json();
          alert(data.message);
          fetchPosts();
        }
      } catch (error) {
        console.log("error :>> ", error);
        alert(error);
      }
    }
  };
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
