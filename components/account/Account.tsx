"use client";

import { useClerk, useUser } from "@clerk/nextjs";
import Link from "next/link";
import { Button } from "../ui/button";

function Account() {
  const { user } = useUser();
  const { signOut } = useClerk();
  return (
    <div className="py-[50px] px-[30px] text-[#333]">
      <h3 className="text-[24px] text-inherit font-bold">TÀI KHOẢN CỦA BẠN</h3>
      <hr className="mt-5" />
      <hr className="my-5" />

      <div className="flex">
        <div className="basis-7/12">
          <p className="text-[20px] text-inherit font-[600] mb-3">
            Lịch sử giao dịch
          </p>
          <p className="text-sm text-inherit">Bạn chưa có đơn hàng nào</p>
        </div>
        <div className="basis-5/12">
          <p className="text-[20px] text-inherit font-[600]">
            Thông tin tài khoản
          </p>
          <p className="font-[600] text-inherit my-3">
            {user?.emailAddresses[0].emailAddress}
          </p>
          <div className="flex items-center justify-between">
            <Link
              href="/account/address"
              className="text-sm text-[#3D3D1A] hover:text-[#733131]"
            >
              Xem địa chỉ
            </Link>
            <Button
              variant="primary"
              onClick={() => signOut({ redirectUrl: "/" })}
            >
              Đăng xuất
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
