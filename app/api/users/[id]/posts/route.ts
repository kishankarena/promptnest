import { NextRequest, NextResponse } from "next/server";
import Prompt from "@/models/prompt";
import { connectToDB } from "@/utils/database";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connectToDB();

    if (!params.id) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const prompts = await Prompt.find({ creator: params.id }).populate(
      "creator"
    );

    return NextResponse.json(prompts);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch prompts" },
      { status: 500 }
    );
  }
}
