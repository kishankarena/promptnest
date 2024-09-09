"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Form from "@/components/Form";
import { Session } from "inspector";

type Prompt = {
  prompt: string;
  tag: string;
};

const createPrompt: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();

  const [submitting, setSubmitting] = useState<boolean>(false);
  const [newPost, setNewPost] = useState<Prompt>({ prompt: "", tag: "" });

  const createPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/prompt/new", {
        method: "POST",
        body: JSON.stringify({
          userId: session?.user.id,
          prompt: newPost.prompt,
          tag: newPost.tag,
        }),
      });
      if (response.ok) {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Form
      type="Create"
      post={newPost}
      setPost={setNewPost}
      submitting={submitting}
      handleSubmit={createPrompt}
    />
  );
};

export default createPrompt;
