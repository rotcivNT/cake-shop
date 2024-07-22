import { cn } from "@/lib/utils";
import {
  CreateOrderDto,
  OrderDetailDto,
  OrderDto,
  PaymentDetailDto,
  PaymentStatus,
  PostPaymentDto,
} from "@/services/payloadType";
import { createOrder, handlePostPayment } from "@/services/shoppingService";
import { formatNumberToVND } from "@/utils/formatNumberToVND";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as yup from "yup";
import AddressSelect from "../account/AddressSelect";
import { CartProductProps } from "../cart/Cart";
import { Cod } from "../images/Cod";
import { VnPay } from "../images/VnPay";
import { Button } from "../ui/button";
const schema = yup.object({
  firstName: yup.string().required("Họ và tên đệm không được để trống"),
  lastName: yup.string().required("Tên không được để trống"),
  phoneNumber: yup
    .string()
    .required("Số điện thoại không được để trống")
    .matches(/^0[35789]\d{8}$/, "Số điện thoại không hợp lệ"),
  detailAddress: yup.string().required("Địa chỉ cụ thể không được để trống"),
  provinceId: yup.string().required("Vui lòng chọn tỉnh thành"),
  districtId: yup.string().required("Vui lòng chọn quận huyện"),
  wardId: yup.string().required("Vui lòng chọn phường xã"),
  paymentMethod: yup.string().required("Vui lòng chọn phương thức thanh toán"),
});
interface IProps {
  data: any;
  email: string;
  userId: string;
  products: CartProductProps[];
}
const formControlStyles = "pl-8 flex flex-col gap-1 mb-2";
function CheckoutInfo({ data, email, userId, products }: IProps) {
  const [isPending, startTransition] = useTransition();

  const searchParams = useSearchParams();
  const [address, setAddress] = useState({
    province: "",
    district: "",
    ward: "",
  });
  const initialValue = {
    firstName: data?.fullName?.split(" ")[0] || "",
    lastName: data?.fullName?.split(" ")[1] || "",
    phoneNumber: data?.phoneNumber || "",
    detailAddress: data?.addressDetail || "",
    provinceId: data?.province || "",
    districtId: data?.district || "",
    wardId: data?.ward || "",
    paymentMethod: "cod",
  };
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: data?.code === 0 ? {} : schema.cast(initialValue),
  });
  const handleSetAddress = (key: string, value: string) => {
    setAddress({
      ...address,
      [key]: value,
    });
  };
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const onSubmit = (data: any) => {
    startTransition(async () => {
      const totalPrice = products.reduce((acc, item) => {
        return (
          acc +
          item.product.productVariants[item.selectedPrice].price * item.quantity
        );
      }, 0);
      const order: OrderDto = {
        id: "",
        description: searchParams.get("description") as string,
        paymentId: "",
        total: totalPrice,
        userId,
        shippingAddress: `${address.province} - ${address.district} - ${address.ward} - ${data.detailAddress}`,
      };
      const paymentDetail: PaymentDetailDto = {
        id: "",
        amount: totalPrice,
        status: PaymentStatus.PENDING,
        type: data.paymentMethod,
      };
      const orderDetails: OrderDetailDto[] = [];
      products.forEach((product) => {
        orderDetails.push({
          productId: product.product.id,
          quantity: product.quantity,
          orderId: "",
          variantId:
            product.product.productVariants[product.selectedPrice].variant.id,
          price: product.product.productVariants[product.selectedPrice].price,
        });
      });
      const payload: CreateOrderDto = {
        order,
        orderDetails,
        paymentDetail,
      };
      const res = await createOrder(payload);

      if (res && res?.code === 1) {
        const emailPayload = {
          email,
          title: "Thông tin đơn hàng !",
          content: `<div style="background-color: #f3f4f6; padding: 16px; font-family: Arial, sans-serif;">
      <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; padding: 24px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
          <h2 style="font-size: 24px; font-weight: bold; margin-bottom: 16px; color: #2563eb;">Thông tin hóa đơn</h2>
          <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px; color: #374151;">Danh sách sản phẩm</h3>
          <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
              <thead>
                  <tr>
                      <th style="padding: 12px; text-align: left; background-color: #e5e7eb; color: #6b7280;">Ảnh</th>
                      <th style="padding: 12px; text-align: left; background-color: #e5e7eb; color: #6b7280;">Tên sản phẩm</th>
                      <th style="padding: 12px; text-align: left; background-color: #e5e7eb; color: #6b7280;">Size</th>
                      <th style="padding: 12px; text-align: left; background-color: #e5e7eb; color: #6b7280;">Giá</th>
                      <th style="padding: 12px; text-align: left; background-color: #e5e7eb; color: #6b7280;">Số lượng</th>
                  </tr>
              </thead>
              <tbody>
                  <!-- Sản phẩm 1 -->
                  ${products.map(
                    (product) =>
                      `<tr style="border-top: 1px solid #e5e7eb;">
                      <td style="padding: 12px;"><img src=${
                        product.product.thumbnail
                      } alt=${
                        product.product.name
                      } style="width: 50px; height: 50px; object-fit: cover; border-radius: 8px;"></td>
                      <td style="padding: 12px; color: #374151;">${
                        product.product.name
                      }</td>
                      <td style="padding: 12px; color: #374151;">${
                        product.product.productVariants[product.selectedPrice]
                          .variant.variantValue
                      }</td>
                      <td style="padding: 12px; color: #10b981;">${formatNumberToVND(
                        product.product.productVariants[product.selectedPrice]
                          .price
                      )}</td>
                      <td style="padding: 12px; color: #374151;">${
                        product.quantity
                      }</td>
                  </tr>`
                  )}
                  <!-- Thêm sản phẩm khác tại đây -->
              </tbody>
          </table>
          <div>
              <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px; color: #374151;">Tổng tiền</h3>
              <p style="font-size: 18px; font-weight: bold; color: #ef4444;">${formatNumberToVND(
                totalPrice
              )}</p>
          </div>
          <div style="margin-bottom: 16px; color: #374151;">
              <h3 style="font-size: 20px; font-weight: bold; margin-bottom: 8px; color: #374151;">Địa chỉ giao hàng</h3>
              <p>${address.province} - ${address.district} - ${
            address.ward
          } - ${data.detailAddress}</p>
          </div>
          <div style="margin-bottom: 16px; color: #374151;">
              <p><strong>Ghi chú:</strong> ${
                searchParams.get("description") as string
              }</p>
          </div>
          <div style="text-align: center; color: #9ca3af; font-size: 14px;">
              <p>Cảm ơn bạn đã mua hàng!</p>
          </div>
      </div>
  </div>`,
        };

        fetch("/api/email", {
          method: "POST",
          body: JSON.stringify(emailPayload),
        });
        if (data.paymentMethod === "vnpay") {
          window.location.href = res.data.data;
        } else {
          const postPaymentPayload: PostPaymentDto = {
            orderId: "",
            paymentId: "",
            resVnPayCode: "",
            userId,
          };
          const resPostPayment = await handlePostPayment(postPaymentPayload);
          if (resPostPayment?.code === 1) {
            mutate(`/get-cart/${userId}`);
            router.push("/thank-you");
          }
        }
      }
    });
  };
  return (
    <div className="pb-10">
      <h3 className="px-8">Thông tin thanh toán</h3>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col sm:flex-row">
            <div className={cn(formControlStyles, "basis-1/2")}>
              <label htmlFor="firstName">Họ và tên đệm</label>
              <input
                type="text"
                id="firstName"
                {...register("firstName")}
                className="py-2 px-3 border border-[#e6e6e6] focus:border-[#cdcdcd] rounded-[4px]"
              />
              <span className="text-red-500 text-sm">
                {errors.firstName?.message}
              </span>
            </div>
            <div className={cn(formControlStyles, "basis-1/2")}>
              <label htmlFor="lastName">Tên</label>
              <input
                type="text"
                id="lastName"
                {...register("lastName")}
                className="py-2 px-3 border border-[#e6e6e6] focus:border-[#cdcdcd] rounded-[4px]"
              />
              <span className="text-red-500 text-sm">
                {errors.lastName?.message}
              </span>
            </div>
          </div>

          <div className={cn(formControlStyles, "")}>
            <label htmlFor="lastName">Số điện thoại</label>
            <input
              type="text"
              id="phoneNumber"
              {...register("phoneNumber")}
              className="py-2 px-3 border border-[#e6e6e6] focus:border-[#cdcdcd] rounded-[4px]"
            />
            <span className="text-red-500 text-sm">
              {errors.phoneNumber?.message}
            </span>
          </div>

          <div className={cn(formControlStyles, "")}>
            <label htmlFor="address">Địa chỉ</label>
            <AddressSelect
              register={register}
              control={control}
              districtId={data?.district}
              provinceId={data?.province}
              wardId={data?.ward}
              setAddress={handleSetAddress}
            />
          </div>

          <div className={cn(formControlStyles, "")}>
            <label htmlFor="detailAddress">Địa chỉ cụ thể</label>
            <input
              type="text"
              id="detailAddress"
              {...register("detailAddress")}
              className="py-2 px-3 border border-[#e6e6e6] focus:border-[#cdcdcd] rounded-[4px]"
            />
          </div>

          <div className="pl-8 mt-5">
            <p className="text-[18px] text-[#333] font-[600] mb-4">
              Phương thức thanh toán
            </p>
            <div className="border border-[#d9d9d9] rounded-[4px]">
              <div className="p-4 border-b border-[#d9d9d9]">
                <label className="flex items-center gap-3 w-full cursor-pointer">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    name="paymentMethod"
                    value="cod"
                  />
                  <Cod />
                  <span className="ml-2 text-[#737373] font-[600]">
                    Thanh toán khi nhận hàng
                  </span>
                </label>
              </div>
              <div className="p-4">
                <label className="flex items-center gap-3 w-full cursor-pointer">
                  <input
                    {...register("paymentMethod")}
                    type="radio"
                    name="paymentMethod"
                    value="vnpay"
                  />
                  <VnPay />
                  <span className="ml-2 text-[#737373] font-[600]">
                    Thanh toán qua VNPAY
                  </span>
                </label>
              </div>
            </div>
          </div>
          <Button className="ml-8 mt-5 w-[calc(100%-32px)]" type="submit">
            {isPending ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              "Hoàn tất thanh toán"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default CheckoutInfo;
