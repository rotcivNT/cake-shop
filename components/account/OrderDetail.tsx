"use client";

import { getAllOrders } from "@/services/shoppingService";
import { Order } from "@/types/order";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { Button } from "../ui/button";
import Link from "next/link";

const OrderDetailSkeleton = () => (
  <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md animate-pulse">
    <div className="h-8 bg-gray-200 rounded w-1/2 mb-4"></div>
    <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
    <table className="w-full border-collapse mb-4">
      <thead>
        <tr className="bg-gray-200">
          <th className="p-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </th>
          <th className="p-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </th>
          <th className="p-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </th>
          <th className="p-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </th>
          <th className="p-3">
            <div className="h-4 bg-gray-300 rounded"></div>
          </th>
        </tr>
      </thead>
      <tbody>
        {[...Array(3)].map((_, index) => (
          <tr key={index} className="border-t border-gray-200">
            <td className="p-3">
              <div className="h-12 w-12 bg-gray-200 rounded"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-200 rounded w-3/4"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            </td>
            <td className="p-3">
              <div className="h-4 bg-gray-200 rounded w-1/4"></div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <div className="mb-4">
      <div className="h-6 bg-gray-200 rounded w-1/4 mb-2"></div>
      <div className="h-6 bg-gray-200 rounded w-1/3"></div>
    </div>
    <div className="mb-4">
      <div className="h-6 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
    </div>
    <div className="mb-4">
      <div className="h-4 bg-gray-200 rounded w-full"></div>
    </div>
    <div className="text-center">
      <div className="h-4 bg-gray-200 rounded w-1/2 mx-auto"></div>
    </div>
  </div>
);

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState<Order[]>([]);
  const { data, isLoading } = useSWR(id, getAllOrders);
  useEffect(() => {
    if (data && data.data) {
      data.data.map((order) =>
        order.orderDetailsFull.map(
          (item: any) => (item.product = JSON.parse(item.productJson))
        )
      );
      setOrder(data.data);
    }
  }, [data]);

  return (
    <>
      <div className="bg-gray-100 p-4">
        <Button
          variant="link"
          className="text-[#3D3D1A] basis-1/3 justify-start px-0"
        >
          <Link href="/account">Trở về tài khoản</Link>
        </Button>
        {isLoading ? (
          <OrderDetailSkeleton />
        ) : (
          <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-blue-600">
              Thông tin hóa đơn
            </h2>
            <h3 className="text-xl font-bold mb-2 text-gray-700">
              Danh sách sản phẩm
            </h3>
            <table className="w-full border-collapse mb-4">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-3 text-left text-gray-500">Ảnh</th>
                  <th className="p-3 text-left text-gray-500">Tên sản phẩm</th>
                  <th className="p-3 text-left text-gray-500">Size</th>
                  <th className="p-3 text-left text-gray-500">Giá</th>
                  <th className="p-3 text-left text-gray-500">Số lượng</th>
                </tr>
              </thead>
              <tbody>
                {order &&
                  order.length > 0 &&
                  order[0].orderDetailsFull.map((item, index) => (
                    <tr key={item.id} className="border-t border-gray-200">
                      <td className="p-3">
                        <Image
                          src={item.product?.thumbnail || ""}
                          alt={item.product?.name || ""}
                          width={50}
                          height={50}
                          className="object-cover rounded-lg"
                        />
                      </td>
                      <td className="p-3 text-gray-700">
                        {item.product?.name}
                      </td>
                      <td className="p-3 text-gray-700">
                        {
                          item.product?.productVariants.find(
                            (pv) => pv.variant.id === item.variantId
                          )?.variant.variantValue
                        }
                      </td>
                      <td className="p-3 text-green-500">
                        {formatNumberToVND(item.price)}
                      </td>
                      <td className="p-3 text-gray-700">{item.quantity}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
            <div>
              <h3 className="text-xl font-bold mb-2 text-gray-700">
                Tổng tiền
              </h3>
              <p className="text-lg font-bold text-red-500">
                {order.length > 0 && formatNumberToVND(order[0].total)}
              </p>
            </div>
            <div className="mb-4 text-gray-700">
              <h3 className="text-xl font-bold mb-2 text-gray-700">
                Địa chỉ giao hàng
              </h3>
              <p>{order.length > 0 && order[0].shippingAddress}</p>
            </div>
            <div className="mb-4 text-gray-700">
              <p className="font-bold text-inherit">
                Ghi chú:{" "}
                {order.length > 0 && order[0].description !== "null"
                  ? order[0].description
                  : "Không có ghi chú."}
              </p>
            </div>
            <div className="text-center text-gray-400 text-sm">
              <p>Cảm ơn bạn đã mua hàng!</p>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
