"use client";
import Image from "next/image";
import Link from "next/link";
import { signIn, signOut } from "next-auth/react";
import { TUser } from "@/types/user.type";
import type { ClientSafeProvider } from "next-auth/react";

export default function DesktopNavigation({
  isUserLoggedIn,
  providers,
  user,
}: {
  isUserLoggedIn: boolean;
  providers: Record<string, ClientSafeProvider> | null;
  user: TUser | undefined;
}) {
  return (
    <div className="sm:flex hidden">
      {isUserLoggedIn ? (
        <div className="flex gap-3 md:gap-5">
          <Link href={"/create-prompt"} className="black_btn capitalize">
            Create Post
          </Link>
          <button className="outline_btn capitalize" onClick={() => signOut()}>
            Sign Out
          </button>
          <Link href={`/profile/${user?.id}`}>
            <Image
              src={user?.image || ""}
              alt={`${user?.name} profile`}
              width={37}
              height={37}
              className="rounded-full"
            />
          </Link>
        </div>
      ) : (
        <>
          {providers &&
            Object.values(providers).map((provider) => (
              <button
                type="button"
                key={provider.name}
                onClick={() => signIn(provider.id)}
                className="black_btn capitalize"
              >
                Sign In With {provider.name}
              </button>
            ))}
        </>
      )}
    </div>
  );
}
