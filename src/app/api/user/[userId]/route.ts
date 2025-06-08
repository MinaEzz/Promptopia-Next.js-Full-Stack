import "server-only";
import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/connectDB";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ userId: string }> }
) => {
  const { userId } = await params;
  try {
    connectDB();
    const prompts = await Prompt.find({ creator: userId })
      .sort({
        createdAt: -1,
      })
      .populate("creator");
    if (!prompts || prompts.length === 0) {
      return new Response(
        JSON.stringify({
          status: "SUCCESS",
          data: [],
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 200,
        }
      );
    }
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        data: prompts,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 200,
      }
    );
  } catch (error) {
    if (error instanceof Error) {
      return new Response(
        JSON.stringify({
          status: "ERROR",
          message: error.message || "Unknown Error Occurred!",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 500,
        }
      );
    }
    return new Response(
      JSON.stringify({
        status: "ERROR",
        message: "Unknown Error Occurred!",
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 500,
      }
    );
  }
};
