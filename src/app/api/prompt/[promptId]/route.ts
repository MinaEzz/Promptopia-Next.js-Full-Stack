import "server-only";
import Prompt from "@/models/prompt.model";
import { connectDB } from "@/utils/connectDB";

export const GET = async (
  _request: Request,
  { params }: { params: Promise<{ promptId: string }> }
) => {
  const { promptId } = await params;
  try {
    connectDB();
    const prompt = await Prompt.findById(promptId);
    if (!prompt) {
      return new Response(
        JSON.stringify({
          status: "FAILED",
          message: "Prompt not found",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 404,
        }
      );
    }
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        data: prompt,
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

export const DELETE = async (
  _request: Request,
  { params }: { params: Promise<{ promptId: string }> }
) => {
  const { promptId } = await params;
  try {
    await connectDB();
    await Prompt.findByIdAndDelete(promptId);
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        message: "Prompt deleted successfully",
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

export const PUT = async (
  request: Request,
  { params }: { params: Promise<{ promptId: string }> }
) => {
  const { promptId } = await params;
  const body = await request.json();
  try {
    await connectDB();
    const existingPrompt = await Prompt.findById(promptId);
    if (!existingPrompt) {
      return new Response(
        JSON.stringify({
          status: "FAILED",
          message: "Prompt not found",
        }),
        {
          headers: {
            "Content-Type": "application/json",
          },
          status: 404,
        }
      );
    }
    existingPrompt.prompt = body.prompt || existingPrompt.prompt;
    existingPrompt.tag = body.tag || existingPrompt.tag;
    await existingPrompt.save();
    return new Response(
      JSON.stringify({
        status: "SUCCESS",
        data: existingPrompt,
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
