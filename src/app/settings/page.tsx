"use client";

import { useAppSelector } from "@/GlobalRedux/hooks";
import { Loader } from "@/components/Loader";
import { EditIcon } from "@/svgComponents/EditIcon";
import Image from "next/image";
import Link from "next/link";

export default function AccountSettings() {
  const { nickname, avatarUrl } = useAppSelector((state) => state.user);

  if (!nickname || !avatarUrl) {
    return null;
  }

  const isLoading = false;

  return (
    <div className="flex flex-col mx-auto justify-between w-[70%] h-[400px] p-4 border-4 border-[#B4B4B8] rounded-lg">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-[20px] relative">
          <div className="absolute top-[120px] left-[120px] rounded-md p-1 transition-all hover:bg-[#B4B4B8] cursor-pointer">
            <EditIcon />
          </div>
          <Image
            src={avatarUrl}
            width={150}
            height={150}
            alt={nickname}
            className="rounded-[50%]"
          />
          <div className="flex items-center gap-4 border-b">
            <span className="font-semibold text-xl">{nickname}</span>
            <div className="rounded-md p-1 transition-all hover:bg-[#B4B4B8] cursor-pointer">
              <EditIcon />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-4 [&>label]:flex [&>label]:flex-col [&>label]:text-[#B4B4B8] [&>label>input]:p-3 [&>label>input]:text-black [&>label>input]:border [&>label>input]:rounded-xl [&>label>input]:border-color-[#B4B4B8]">
          <label>
            Old Password
            <input type="text" placeholder="Enter old password" />
          </label>
          <label>
            New Password
            <input type="text" placeholder="Enter new password" />
          </label>
          <button className="p-2 text-center bg-[#1976d2] text-white font-semibold rounded-md hover-scale">
            Change Password
          </button>
        </div>
      </div>

      <div className="flex justify-center gap-4 [&>button]:p-4 [&>button]:w-[20%] [&>button]:text-center [&>button]:text-white [&>button]:font-bold [&>button]:rounded-md">
        <button className="bg-[#DC004E] hover-scale">
          <Link href="/company">Cancel</Link>
        </button>
        <button className="flex items-center justify-center bg-[#1976d2] hover-scale">
          {isLoading ? <Loader /> : "Update"}
        </button>
      </div>
    </div>
  );
}
