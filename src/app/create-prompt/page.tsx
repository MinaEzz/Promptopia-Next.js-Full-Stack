import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import CreatePrompt from "@/components/create-prompt/CreatePrompt.page";

export default async function page() {
  const session = await getServerSession();
  console.log("session", session);

  if (!session?.user) {
    redirect("/");
  }
  return <CreatePrompt />;
}
