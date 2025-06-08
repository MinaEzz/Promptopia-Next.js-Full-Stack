"use client";

import { useGetPrompts } from "@/hooks/useGetPrompts.hook";
import Searchbar from "./searchbar/Searchbar.component";
import PageLoadingSpinner from "@/components/common/page-loading-spinner/PageLoadingSpinner.component";
import PromptCard from "@/components/common/prompt-card/PromptCard.component";

export default function Feed() {
  const { prompts, isLoading, handleSearchChange } = useGetPrompts();
  return (
    <section className="mt-16 mx-auto w-full max-w-xl flex justify-center items-center flex-col gap-2">
      <Searchbar handleSearchChange={handleSearchChange} />
      {isLoading && <PageLoadingSpinner />}
      {!isLoading && prompts.length === 0 ? (
        <p className="mt-16 font-inter text-base text-center capitalize text-gray-500">
          No prompts found.
        </p>
      ) : (
        <div className="mt-16 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
          {prompts.map((prompt, index) => {
            return <PromptCard key={index} prompt={prompt} />;
          })}
        </div>
      )}
    </section>
  );
}
