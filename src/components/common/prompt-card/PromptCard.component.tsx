import CardHeader from "./card-header/CardHeader.component";
import CardFooter from "./card-footer/CardFooter.component";
import toast from "react-hot-toast";
import { TPrompt } from "@/types/prompt.type";

export default function PromptCard({ prompt }: { prompt: TPrompt }) {
  console.log("prompt", prompt);
  const handleCopy = () => {
    navigator.clipboard.writeText(prompt.prompt);
    toast.success("Copied to clipboard!");
  };
  return (
    <div className="flex-1 flex flex-col gap-4 justify-between break-inside-avoid rounded-lg border border-gray-300 bg-white/20 bg-clip-padding p-6 pb-4 backdrop-blur-lg backdrop-filter md:w-[360px] w-full h-fit">
      <CardHeader
        creatorId={prompt.creator._id}
        src={prompt.creator.image}
        username={prompt.creator.username}
        email={prompt.creator.email}
        handleCopy={handleCopy}
      />
      <div className="w-full flex flex-col gap-4 text-sm">
        <p className="text-gray-700">{prompt.prompt}</p>
        <p className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent cursor-pointer">
          {prompt.tag}
        </p>
      </div>
      <CardFooter promptId={prompt._id} postCreatorId={prompt.creator._id} />
    </div>
  );
}
