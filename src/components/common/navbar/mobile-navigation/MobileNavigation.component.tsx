import { signIn } from "next-auth/react";
import { useState } from "react";
import { BiMenu } from "react-icons/bi";
import NavDropdown from "./nav-dropdown/NavDropdown.component";
import { TUser } from "@/types/user.type";
import type { ClientSafeProvider } from "next-auth/react";

export default function MobileNavigation({
  isUserLoggedIn,
  providers,
  user,
}: {
  isUserLoggedIn: boolean;
  providers: Record<string, ClientSafeProvider> | null;
  user: TUser | undefined;
}) {
  const [toggleDropdown, setToggleDropdown] = useState<boolean>(false);
  return (
    <div className="max-sm:flex hidden relative">
      {isUserLoggedIn ? (
        <button
          className="flex cursor-pointer text-black"
          onClick={() => {
            setToggleDropdown((prev) => !prev);
          }}
        >
          <BiMenu className="w-9 h-9" />
        </button>
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
      {toggleDropdown && (
        <NavDropdown setToggleDropdown={setToggleDropdown} userId={user?.id} />
      )}
    </div>
  );
}
