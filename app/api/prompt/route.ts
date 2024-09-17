import Prompt from "@/models/prompt";
import { NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

export const GET = async (): Promise<NextResponse> => {
  try {
    await connectToDB();
    const prompts = await Prompt.find({}).populate("creator");

    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
};
