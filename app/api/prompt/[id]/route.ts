import Prompt from "@/models/prompt";
import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/utils/database";

// GET (read)
export const GET = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectToDB();
    const prompt = await Prompt.findById(params.id).populate("creator");
    if (!prompt) return NextResponse.json("Prompt not found", { status: 404 });
    return NextResponse.json(prompt);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch prompt" },
      { status: 500 }
    );
  }
};

// PATCH (update)
export const PATCH = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  const { prompt, tag } = await request.json();
  try {
    await connectToDB();
    // Find the exiting prompt by id
    const existingPrompt = await Prompt.findById(params.id);
    if (!existingPrompt) {
      return NextResponse.json({ error: "Prompt not found" }, { status: 404 });
    }
    //   update the prompt with new data
    existingPrompt.prompt = prompt;
    existingPrompt.tag = tag;
    await existingPrompt.save();

    return NextResponse.json(
      { message: "Prompt updated successfully", data: existingPrompt },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error updating prompt" },
      { status: 500 }
    );
  }
};

// DELETE (delete)
export const DELETE = async (
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    await connectToDB();

    // Find the prompt by ID and remove it
    await Prompt.findByIdAndDelete(params.id);

    return NextResponse.json(
      { message: "Prompt deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Error deleting prompt" },
      { status: 500 }
    );
  }
};
