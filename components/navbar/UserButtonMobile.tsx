"use client";

import { useUser } from "@clerk/nextjs";
import Link from "next/link";

export default function UserButtonMobile() {
  // const { user } = useUser();
  return (
    <div>
      <Link className="block" href={"#"}>
        Chào,
      </Link>
      <hr />
      <p className="py-4">Đăng xuất</p>
    </div>
  );
}
