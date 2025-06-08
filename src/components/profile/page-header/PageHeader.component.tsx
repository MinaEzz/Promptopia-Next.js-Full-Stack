"use client";
import { useSession } from "next-auth/react";

export default function PageHeader({ userId }: { userId: string }) {
  const { data: session } = useSession();
  return (
    <div className="w-full flex flex-col items-start gap-1">
      <h1 className="head_text">
        <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
          {userId === session?.user.id ? "My" : "User"} Profile
        </span>
      </h1>
      <p className="desc">
        {userId === session?.user.id
          ? "Welcome to your profile, where you can view and manage your prompts"
          : "Explore the prompts shared by this user and get inspired by their creativity"}
      </p>
    </div>
  );
}
