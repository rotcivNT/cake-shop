/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PostPaymentDto } from "@/services/payloadType";
import { handlePostPayment } from "@/services/shoppingService";
import sendEmail from "@/utils/email";
import { useUser } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";

function CheckoutStatus() {
  const searchParams = useSearchParams();
  const { user } = useUser();
  const resCode = searchParams.get("vnp_ResponseCode") as string;
  useEffect(() => {
    if (!user) return;
    const handleUpdatePayment = async () => {
      const payload: PostPaymentDto = {
        orderId: searchParams.get("orderId") as string,
        paymentId: searchParams.get("paymentId") as string,
        resVnPayCode: resCode,
        userId: user.id,
      };
      const res = handlePostPayment(payload);
      console.log(res);
    };
    handleUpdatePayment();
  }, [user]);
  return (
    <div className="flex flex-col items-center justify-center bg-gray-100 p-4 h-[200px]">
      {resCode === "00" ? (
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative w-full max-w-md mb-4"
          role="alert"
        >
          <strong className="font-bold">Cảm ơn bạn!</strong>
          <span className="block sm:inline">
            {" "}
            Đơn hàng của bạn đã được đặt thành công. <br /> Thông tin hóa đơn sẽ
            được gửi qua email của bạn.
          </span>
        </div>
      ) : (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative w-full max-w-md mb-4"
          role="alert"
        >
          <strong className="font-bold">Xin lỗi!</strong>
          <span className="block sm:inline">
            {" "}
            Thanh toán thất bại. Đơn hàng của bạn đã bị hủy !
          </span>
        </div>
      )}
    </div>
  );
}

export default CheckoutStatus;
