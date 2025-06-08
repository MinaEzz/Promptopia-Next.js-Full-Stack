"use client";

import { TPrompt } from "@/types/prompt.type";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";

export function useGetPrompts(userId?: string) {
  const [prompts, setPrompts] = useState([]);
  const [filteredPrompts, setFilteredPrompts] = useState([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [searchText, setSearchText] = useState<string>("");
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const API_Route = userId ? `/api/user/${userId}` : "/api/prompt";

  useEffect(() => {
    async function fetchPrompts() {
      setIsLoading(true);
      const response = await fetch(
        process.env.NEXT_PUBLIC_BASE_URL + API_Route,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      console.log("response", responseData);
      if (!response.ok) {
        setIsLoading(false);
        toast.error(responseData.message || "Network response was not ok");
        throw new Error(responseData.message || "Network response was not ok");
      }
      setPrompts(responseData.data);
      setIsLoading(false);
    }
    fetchPrompts();
  }, [API_Route]);

  useEffect(() => {
    if (!searchText) {
      setFilteredPrompts(prompts);
      return;
    }

    const filtered = prompts.filter(
      (p: TPrompt) =>
        p.creator.username.toLowerCase().includes(searchText.toLowerCase()) ||
        p.tag.toLowerCase().includes(searchText.toLowerCase())
    );

    setFilteredPrompts(filtered);
  }, [searchText, prompts]);

  return { prompts: filteredPrompts, isLoading, handleSearchChange };
}
