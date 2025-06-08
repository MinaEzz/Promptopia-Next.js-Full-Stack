import Link from "next/link";
import { signOut } from "next-auth/react";

export default function NavDropdown({
  setToggleDropdown,
  userId,
}: {
  setToggleDropdown: React.Dispatch<React.SetStateAction<boolean>>;
  userId?: string;
}) {
  const navLinks = [
    {
      href: `/profile/${userId}`,
      label: "My Profile",
    },
    {
      href: "/create-prompt",
      label: "Create Prompt",
    },
  ];
  return (
    <ul className="absolute right-0 top-full mt-3 w-full p-5 rounded-lg bg-white min-w-[210px] flex flex-col gap-2 justify-end items-end">
      {navLinks.map((link, index) => {
        return (
          <li key={index} onClick={() => setToggleDropdown(false)}>
            <Link href={link.href}>{link.label}</Link>
          </li>
        );
      })}
      <button
        type="button"
        onClick={() => {
          setToggleDropdown(false);
          signOut();
        }}
        className="w-full mt-5 black_btn"
      >
        Sign Out
      </button>
    </ul>
  );
}
