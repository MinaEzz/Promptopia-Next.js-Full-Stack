import Image from "next/image";
import Link from "next/link";
import { BiCopyAlt } from "react-icons/bi";

export default function CardHeader({
  creatorId,
  src,
  username,
  email,
  handleCopy,
}: {
  creatorId: string;
  src: string;
  username: string;
  email: string;
  handleCopy: () => void;
}) {
  return (
    <div className="flex items-start justify-between gap-5">
      <Link
        href={`/profile/${creatorId}`}
        className="w-fit flex justify-start items-center gap-3 cursor-pointer"
      >
        <Image
          src={src}
          alt={username}
          width={40}
          height={40}
          className="rounded-full object-contain"
        />
        <div className="flex flex-col">
          <h3 className="text-base font-semibold text-gray-900">{username}</h3>
          <p className="font-inter text-sm text-gray-500">{email}</p>
        </div>
      </Link>

      <button
        className="w-7 h-7 rounded-full bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur flex justify-center items-center cursor-pointer"
        onClick={handleCopy}
      >
        <BiCopyAlt className="w-4 h-4" />
      </button>
    </div>
  );
}
