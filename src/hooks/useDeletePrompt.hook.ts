"use client";
import { useState } from "react";
import toast from "react-hot-toast";

export const useDeletePrompt = (promtId: string) => {
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  const handleDelete = async () => {
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    );
    if (!hasConfirmed) return;
    setIsDeleting(true);
    try {
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + `/api/prompt/${promtId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log("response", responseData);
      if (!response.ok) {
        toast.error(responseData.message || "Network response was not ok");
        throw new Error(responseData.message || "Network response was not ok");
      }
      toast.success("Prompt deleted successfully");
      window.location.reload();
    } catch (error) {
      console.error(error);
      if (error instanceof Error) {
        throw new Error(error.message);
      }
      throw new Error("Error while creating prompt");
    } finally {
      setIsDeleting(false);
    }
  };

  return { isDeleting, handleDelete };
};
