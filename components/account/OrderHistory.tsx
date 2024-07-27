"use client";
import { getOrderByUser } from "@/services/shoppingService";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { useUser } from "@clerk/nextjs";
import Link from "next/link";
import useSWR from "swr";

const paymentStatus = {
  PENDING: "Chờ xử lý",
  SUCCESS: "Thành công",
  FAILED: "Thất bại",
  PAID: "Đã thanh toán",
};

const LoadingSkeleton = () => (
  <tr className="animate-pulse hover:bg-gray-50">
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-16"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="h-4 bg-gray-200 rounded w-24"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-right">
      <div className="h-4 bg-gray-200 rounded w-20 ml-auto"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center">
      <div className="h-4 bg-gray-200 rounded w-16 mx-auto"></div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap text-center">
      <div className="h-4 bg-gray-200 rounded w-20 mx-auto"></div>
    </td>
  </tr>
);

export default function OrderHistory() {
  const { user } = useUser();
  const { data, isLoading } = useSWR(user?.id, getOrderByUser);
  console.log(data);

  return (
    <div className="space-y-5">
      <hr />
      <div>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Mã đơn hàng
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-left text-gray-500 uppercase">
                Ngày đặt
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-right text-gray-500 uppercase">
                Thành tiền
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                Thanh toán
              </th>
              <th className="px-6 py-3 text-xs font-medium tracking-wider text-center text-gray-500 uppercase">
                Trạng thái
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <>
                <LoadingSkeleton />
                <LoadingSkeleton />
                <LoadingSkeleton />
              </>
            ) : data && Array.isArray(data) && data.length > 0 ? (
              data.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                    <Link href={`/account/order/${item.id}`} target="_blank">
                      #{item.id}
                    </Link>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-left">
                    {new Date(item.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 text-right font-medium">
                    {formatNumberToVND(item.total)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {
                        paymentStatus[
                          item.paymentDetail
                            .status as keyof typeof paymentStatus
                        ]
                      }
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                      {item.status === null ? "Chờ thanh toán" : item.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="">
                <td colSpan={5} className="text-center py-5">
                  Bạn chưa có đơn hàng nào
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
