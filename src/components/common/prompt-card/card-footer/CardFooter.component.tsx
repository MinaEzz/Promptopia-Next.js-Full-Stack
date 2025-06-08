import { useDeletePrompt } from "@/hooks/useDeletePrompt.hook";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CardFooter({
  promptId,
  postCreatorId,
}: {
  promptId: string;
  postCreatorId?: string;
}) {
  const { isDeleting, handleDelete } = useDeletePrompt(promptId);
  const { data: session } = useSession();
  const pathName = usePathname();

  if (
    session &&
    postCreatorId === session?.user.id &&
    pathName.includes("profile")
  ) {
    return (
      <div className="w-full flex items-center gap-6 justify-end border-t border-gray-200 pt-4">
        <Link
          href={`/edit-prompt?id=${promptId}`}
          className="text-sm capitalize bg-gradient-to-r from-green-400 to-green-500 bg-clip-text text-transparent cursor-pointer"
        >
          Edit
        </Link>
        <button
          className="text-sm capitalize bg-gradient-to-r from-amber-500 via-orange-600 to-yellow-500 bg-clip-text text-transparent cursor-pointer"
          onClick={handleDelete}
          disabled={isDeleting}
        >
          {isDeleting ? "Deleting..." : "Delete"}
        </button>
      </div>
    );
  } else return null;
}
