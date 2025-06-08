import Profile from "@/components/profile/Profile.page";

export default async function page({
  params,
}: {
  params: Promise<{
    userId: string;
  }>;
}) {
  const { userId } = await params;
  return <Profile userId={userId} />;
}
