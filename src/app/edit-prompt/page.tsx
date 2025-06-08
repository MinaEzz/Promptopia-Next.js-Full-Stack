import EditPrompt from "@/components/edit-prompt/EditPrompt.page";

export default async function page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;
  return <EditPrompt id={id} />;
}
