import { cn } from "@/lib/utils";
import React from "react";

interface IProps {
  width: string;
  height: string;
  className: string;
}

const Skeleton = ({ width, height, className }: IProps) => (
  <div
    className={cn("bg-gray-200 animate-pulse", className)}
    style={{ width, height }}
  />
);

export default function ProductDetailLoading() {
  return (
    <>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <Skeleton
          width="100%"
          height="100%"
          className="absolute inset-0 z-[0]"
        />
        <Skeleton width="60%" height="32px" className="relative z-[1]" />
      </div>
      <div className="p-[30px] flex items-start max-w-[1200px] mx-auto">
        <div className="basis-1/3 w-[33.333333%] border border-[#ddd] bg-white rounded-[10px] p-3">
          <Skeleton
            width="100%"
            height="0"
            className="size-full pt-[100%] relative rounded-[10px]"
          />
        </div>
        <div className="basis-2/3 p-7 ml-7 rounded-[10px] border border-[#ddd] bg-white">
          <Skeleton width="50%" height="18px" className="mb-2" />
          <Skeleton width="30%" height="14px" className="mb-6" />
          <Skeleton width="80%" height="18px" className="mb-2" />
          <Skeleton width="100%" height="24px" className="my-6" />
          <Skeleton width="60%" height="18px" className="mb-2" />
          <Skeleton width="100%" height="36px" className="mt-5" />
          <Skeleton width="40%" height="36px" className="mt-5" />
        </div>
      </div>
      <div className="p-[30px] max-w-[1200px] mx-auto bg-white">
        <Skeleton
          width="100%"
          height="100px"
          className="rounded-[10px] border-[#ddd]"
        />
      </div>
      <div className="p-[30px] mb-[30px] max-w-[1200px] mx-auto">
        <Skeleton width="30%" height="32px" className="text-center mb-2" />
        <Skeleton width="50%" height="18px" className="text-center" />
      </div>
    </>
  );
}
