"use client";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export const useEditPrompt = (id: string) => {
  const promptId = id || undefined;
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ prompt: "", tag: "" });
  const router = useRouter();

  // handle set the form data by the existing post data
  useEffect(() => {
    const fetchPrompt = async () => {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/prompt/${promptId}`
      );
      const responseData = await response.json();
      console.log("response", responseData);
      if (!response.ok) {
        toast.error(responseData.message || "Network response was not ok");
        throw new Error(responseData.message || "Network response was not ok");
      }
      setFormData({
        prompt: responseData.data.prompt,
        tag: responseData.data.tag,
      });
    };

    if (promptId) fetchPrompt();
  }, [promptId]);

  //handle on change
  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // handle update prompt
  const handleEditPrompt = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      if (!promptId) {
        toast.error("Prompt id not found");
        throw new Error("Prompt id not found");
      }
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/prompt/${promptId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const responseData = await response.json();
      console.log("response", responseData);
      if (!response.ok) {
        toast.error(responseData.message || "Network response was not ok");
        throw new Error(responseData.message || "Network response was not ok");
      }
      toast.success("Prompt updated successfully");
      router.back();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while updating prompt");
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, formData, handleEditPrompt, onChange };
};
