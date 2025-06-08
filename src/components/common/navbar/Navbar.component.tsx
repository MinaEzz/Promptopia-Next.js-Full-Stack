"use client";
import type { ClientSafeProvider } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import DesktopNavigation from "./desktop-navigation/DesktopNavigation.component";
import MobileNavigation from "./mobile-navigation/MobileNavigation.component";
import { useSession, getProviders } from "next-auth/react";
import { useEffect, useState } from "react";

export default function Navbar() {
  const { data: session } = useSession();
  const isUserLoggedIn = !!session?.user;
  const [providers, setProviders] = useState<Record<
    string,
    ClientSafeProvider
  > | null>(null);
  console.log("providers", providers);
  console.log("user", session?.user);
  useEffect(() => {
    const setUpProviders = async () => {
      const response = await getProviders();
      console.log("response", response);
      setProviders(response);
    };
    setUpProviders();
  }, []);
  return (
    <nav className="w-full flex justify-between items-center py-4 sticky top-0 z-50 gap-5 flex-wrap">
      <Link href={"/"} className="">
        <Image
          src={"/assets/images/logo.svg"}
          alt="promptopia logo"
          width={100}
          height={100}
          className="md:hidden w-10 h-10"
        />
        <Image
          src={"/assets/images/logo-text.svg"}
          alt="promptopia logo"
          width={160}
          height={100}
          className="max-md:hidden"
        />
      </Link>
      <DesktopNavigation
        isUserLoggedIn={isUserLoggedIn}
        providers={providers}
        user={session?.user}
      />
      <MobileNavigation
        isUserLoggedIn={isUserLoggedIn}
        providers={providers}
        user={session?.user}
      />
    </nav>
  );
}
