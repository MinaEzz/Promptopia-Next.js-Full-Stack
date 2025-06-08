"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export function useCreatePrompt() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    prompt: "",
    tag: "",
  });

  //TODO: zod validation

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreatePrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!session?.user?.id) {
        toast.error("User session not found");
        throw new Error("User session not found");
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + "/api/prompt",
        {
          method: "POST",
          body: JSON.stringify({
            creator: session?.user.id,
            ...formData,
          }),
        }
      );
      const responseData = await response.json();
      console.log("response", responseData);
      if (!response.ok) {
        toast.error(responseData.message || "Network response was not ok");
        throw new Error(responseData.message || "Network response was not ok");
      }
      toast.success("Prompt created successfully");
      router.push("/");
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while creating prompt");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleCreatePrompt, onChange, formData };
}
