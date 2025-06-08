"use client";
import PageLoadingSpinner from "@/components/common/page-loading-spinner/PageLoadingSpinner.component";
import PromptCard from "@/components/common/prompt-card/PromptCard.component";
import { useGetPrompts } from "@/hooks/useGetPrompts.hook";

export default function PostsSection({ userId }: { userId: string }) {
  const { prompts, isLoading } = useGetPrompts(userId);
  console.log("user-prompts", prompts);
  return (
    <>
      {isLoading && <PageLoadingSpinner />}

      {!isLoading && prompts.length === 0 ? (
        <p className="mt-16 font-inter text-base text-center capitalize text-gray-500">
          No prompts found.
        </p>
      ) : (
        <div className="mt-10 space-y-6 py-8 sm:columns-2 sm:gap-6 xl:columns-3">
          {prompts.map((prompt, index) => {
            return <PromptCard key={index} prompt={prompt} />;
          })}
        </div>
      )}
    </>
  );
}
