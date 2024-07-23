/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { PostPaymentDto } from "@/services/payloadType";
import { handlePostPayment } from "@/services/shoppingService";
import sendEmail from "@/utils/email";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
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
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-green-500 px-4 py-8 text-center">
              <svg
                className="w-24 h-24 text-white mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h1 className="text-4xl font-bold text-white mt-4">
                Cảm ơn bạn!
              </h1>
              <p className="text-white text-xl mt-2">
                Đơn hàng của bạn đã được xác nhận
              </p>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-10 text-center">
              <p className="text-gray-700 text-lg">
                Chúng tôi đã nhận được đơn hàng của bạn và đang xử lý. Bạn sẽ
                nhận được email xác nhận trong thời gian sớm nhất.
              </p>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-green-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-green-600 transition duration-300"
                >
                  Tiếp tục mua sắm
                </Link>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center px-4">
          <div className="max-w-md w-full bg-white shadow-lg rounded-lg overflow-hidden">
            <div className="bg-red-500 px-4 py-8 text-center">
              <svg
                className="w-24 h-24 text-white mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
              <h1 className="text-4xl font-bold text-white mt-4">Rất tiếc!</h1>
              <p className="text-white text-xl mt-2">
                Đã có lỗi xảy ra khi xử lý đơn hàng của bạn
              </p>
            </div>

            <div className="px-4 py-6 sm:px-8 sm:py-10 text-center">
              <p className="text-gray-700 text-lg">
                Chúng tôi không thể xử lý đơn hàng của bạn tại thời điểm này.
                Vui lòng thử lại sau hoặc liên hệ với bộ phận hỗ trợ khách hàng
                của chúng tôi.
              </p>

              <div className="mt-8">
                <Link
                  href="/"
                  className="inline-block bg-red-500 text-white font-semibold py-3 px-6 rounded-md hover:bg-red-600 transition duration-300"
                >
                  Quay lại trang chủ
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutStatus;
