import "server-only";
import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/connectDB";

export const POST = async (request: Request) => {
  try {
    const { creator, prompt, tag } = await request.json();
    if (!creator || !prompt || !tag) {
      throw new Error("Missing Fields!");
    }
    await connectDB();
    const newPrompt = new Prompt({ creator, prompt, tag });
    await newPrompt.save();
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        data: newPrompt,
      }),
      {
        headers: {
          "Content-Type": "application/json",
        },
        status: 201,
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

export const GET = async () => {
  try {
    await connectDB();
    const prompts = await Prompt.find()
      .sort({ createdAt: -1 })
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
