/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { cn } from "@/lib/utils";
import { updateUser } from "@/services/authServices";
import { yupResolver } from "@hookform/resolvers/yup";
import { Loader2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { useSWRConfig } from "swr";
import * as yup from "yup";
import { Button } from "../ui/button";
import AddressSelect from "./AddressSelect";

const formControlStyles = "pl-8 flex flex-col gap-1 mb-2";

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
});

interface IProps {
  data: any;
  email: string;
  clerkUserId: string;
}

function AcconutAddress({ data, email, clerkUserId }: IProps) {
  const initialValue = {
    firstName: data?.fullName?.split(" ")[0] || "",
    lastName: data?.fullName?.split(" ")[1] || "",
    phoneNumber: data?.phoneNumber || "",
    detailAddress: data?.addressDetail || "",
    provinceId: data?.province || "",
    districtId: data?.district || "",
    wardId: data?.ward || "",
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
  const [isPending, startTransition] = useTransition();
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const onSubmit = async (data: any) => {
    startTransition(async () => {
      const payload = {
        fullName: data.firstName + " " + data.lastName,
        phoneNumber: data.phoneNumber,
        district: data.districtId,
        province: data.provinceId,
        ward: data.wardId,
        addressDetail: data.detailAddress,
        email,
        clerkUserId,
      };

      const res = await updateUser(payload);
      if (res?.code === 1) {
        mutate(email);
        router.push("/account");
      }
    });
  };

  return (
    <div className="py-[50px] px-[30px] text-[#333]">
      <div className="flex items-center justify-between">
        <h3 className="text-[24px] text-inherit font-bold">
          TÀI KHOẢN CỦA BẠN
        </h3>
      </div>
      <hr className="mt-5" />
      <hr className="my-5" />

      <div className="flex">
        <Button
          variant="link"
          className="text-[#3D3D1A] basis-1/3 justify-start px-0"
        >
          <Link href="/account">Trở về tài khoản</Link>
        </Button>

        <div className="basis-2/3">
          <p className="text-[28px] text-[#333] font-[600] pl-8 mb-2">
            Địa chỉ của bạn
          </p>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="flex">
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
            <Button
              disabled={!isDirty}
              className="ml-8 mt-5 w-[calc(100%-32px)]"
              type="submit"
            >
              {isPending ? (
                <Loader2 size={20} className="animate-spin" />
              ) : (
                "Lưu"
              )}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AcconutAddress;
