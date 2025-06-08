"use client";
import { useRouter } from "next/navigation";

export default function PromptForm({
  type,
  method = "post",
  isLoading,
  formData,
  handleSubmit,
  onChange,
}: {
  type: "create" | "edit";
  isLoading: boolean;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  method?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  formData: { prompt: string; tag: string };
}) {
  const router = useRouter();
  return (
    <section className="w-full py-8 flex flex-col gap-10 items-center">
      <div className="w-full space-y-2">
        <h1 className="head_text text-start capitalize">
          <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
            {type} Post
          </span>
        </h1>
        <p className="desc text-start max-w-md">
          {type} and share amazing prompts with the world, and let your
          imagination run wild with any AI-powered platform.
        </p>
      </div>
      <form
        className="w-full max-w-2xl flex flex-col gap-4 rounded-xl border border-gray-200 bg-white/20 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur p-5"
        method={method}
        onSubmit={handleSubmit}
      >
        <label>
          <span className="font-semibold text-base text-gray-700">
            Your AI Prompt
          </span>
          <textarea
            name="prompt"
            className="w-full flex rounded-lg h-[200px] mt-2 p-3 text-sm text-gray-500 outline-0 bg-white"
            placeholder="Write your prompt here..."
            value={formData.prompt}
            onChange={onChange}
          />
        </label>
        <label>
          <span className="font-semibold text-base text-gray-700">
            Tag{" "}
            <span className="font-normal">
              (#product, #webdevelopment, #idea)
            </span>
          </span>
          <input
            name="tag"
            type="text"
            className="w-full flex rounded-lg mt-2 p-3 text-sm text-gray-500 outline-0 bg-white"
            placeholder="#tag"
            value={formData.tag}
            onChange={onChange}
          />
        </label>
        <div className="w-full flex items-center justify-end gap-4">
          <button
            type="button"
            className="px-5 py-1.5 text-sm capitalize text-gray-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              router.back();
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-5 py-1.5 text-sm capitalize bg-orange-500 hover:bg-orange-700 rounded-full text-white cursor-pointer disabled:cursor-not-allowed disabled:bg-gray-400"
          >
            {isLoading ? `${type} post...` : type}
          </button>
        </div>
      </form>
    </section>
  );
}
