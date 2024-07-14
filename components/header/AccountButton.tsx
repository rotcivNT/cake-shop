"use client";
import { useUser } from "@clerk/nextjs";
import { User2 } from "lucide-react";
import Link from "next/link";

function AccountButton() {
  const { user } = useUser();
  return (
    <div>
      {user ? (
        <Link href="/account" className="inline-flex gap-3 items-center">
          <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
            <User2 color="#3D1A1A" size={16} />
          </p>
          <p className="text-sm text-white truncate w-[80px]">
            {user.emailAddresses[0].emailAddress}
          </p>
        </Link>
      ) : (
        <Link className="inline-flex gap-3 items-center" href="/sign-in">
          <p className="size-9 flex justify-center items-center bg-[#fff] rounded-full">
            <User2 color="#3D1A1A" size={16} />
          </p>
          <span className="text-sm text-white">Tài khoản</span>
        </Link>
      )}
    </div>
  );
}

export default AccountButton;
