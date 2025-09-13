import EditPrompt from "@/components/edit-prompt/EditPrompt.page";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const session = await getServerSession();
  if (!session?.user) {
    redirect("/");
  }
  const { id } = await searchParams;
  return <EditPrompt id={id} />;
}
