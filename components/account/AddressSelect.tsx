/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fetcherProvince } from "@/services/utils";
import { useEffect, useState } from "react";
import { Controller, UseFormRegister } from "react-hook-form";
import useSWR from "swr";

interface IProps {
  register: UseFormRegister<any>;
  control: any;
  provinceId?: string;
  districtId?: string;
  wardId?: string;
  setAddress?: (key: string, value: string) => void;
}

function AddressSelect({
  control,
  provinceId,
  districtId,
  wardId,
  setAddress,
}: IProps) {
  const [province, setProvince] = useState<any>([]);
  const [selectedProvinceId, setSelectedProvinceId] = useState<string>(
    provinceId || ""
  );
  const [district, setDistrict] = useState<any>([]);
  const [selectedDistrictId, setSelectedDistrictId] = useState<string>(
    districtId || ""
  );
  const [ward, setWard] = useState<any>([]);
  const [selectWardId, setSelectedWardId] = useState<string>(wardId || "");

  const { data, isLoading, error } = useSWR(`/province`, fetcherProvince);
  const {
    data: districtRes,
    isLoading: loadingDistrict,
    error: errorDistrict,
  } = useSWR(
    selectedProvinceId ? `/province/district/${selectedProvinceId}` : "",
    fetcherProvince
  );
  const {
    data: wardRes,
    isLoading: loadingWard,
    error: errorWard,
  } = useSWR(
    selectedDistrictId ? `/province/ward/${selectedDistrictId}` : "",
    fetcherProvince
  );

  useEffect(() => {
    if (data) {
      data.results.sort((a: any, b: any) => +a.province_id - +b.province_id);
      setProvince(data.results);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (districtRes) {
      districtRes.results.sort(
        (a: any, b: any) => +a.district_id - +b.district_id
      );
      setDistrict(districtRes.results);
    }
  }, [districtRes, loadingDistrict]);

  useEffect(() => {
    if (wardRes) {
      wardRes.results.sort((a: any, b: any) => +a.ward_id - +b.ward_id);
      setWard(wardRes.results);
    }
  }, [loadingDistrict, wardRes]);

  useEffect(() => {
    if (!setAddress) return;
    if (data) {
      data.results.forEach((item: any) => {
        if (item.province_id === selectedProvinceId) {
          setAddress("province", item.province_name);
        }
      });
    }

    if (districtRes) {
      districtRes.results.forEach((item: any) => {
        if (item.district_id === selectedDistrictId) {
          setAddress("district", item.district_name);
        }
      });
    }

    if (wardRes) {
      wardRes.results.forEach((item: any) => {
        if (item.ward_id === selectWardId) {
          setAddress("ward", item.ward_name);
        }
      });
    }
  }, [
    data,
    districtRes,
    wardRes,
    selectedProvinceId,
    selectedDistrictId,
    selectWardId,
  ]);
  return (
    <div className="flex gap-5">
      <Controller
        control={control}
        name="provinceId"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 basis-1/3">
            <Select
              {...field}
              onValueChange={(provinceId) => {
                setSelectedProvinceId(provinceId);
                field.onChange(provinceId);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Tỉnh/Thành phố" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {province.map((item: any) => (
                    <SelectItem
                      onClick={() =>
                        setAddress && setAddress("province", item.province_name)
                      }
                      value={item.province_id}
                      key={item.province_id}
                    >
                      {item.province_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span className="text-red-500 text-sm">{error?.message}</span>
          </div>
        )}
      ></Controller>

      <Controller
        control={control}
        name="districtId"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 basis-1/3">
            <Select
              {...field}
              onValueChange={(districtId) => {
                setSelectedDistrictId(districtId);
                field.onChange(districtId);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Quận/Huyện" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {district.map((item: any) => (
                    <SelectItem
                      onClick={() =>
                        setAddress && setAddress("district", item.district_name)
                      }
                      value={item.district_id}
                      key={item.district_id}
                    >
                      {item.district_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <span className="text-red-500 text-sm">{error?.message}</span>
          </div>
        )}
      ></Controller>

      <Controller
        control={control}
        name="wardId"
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col gap-1 basis-1/3">
            <Select
              {...field}
              onValueChange={(wardId) => {
                setSelectedWardId(wardId);
                field.onChange(wardId);
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Phường/Xã" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {ward.map((item: any) => (
                    <SelectItem
                      onClick={() =>
                        setAddress && setAddress("ward", item.ward_name)
                      }
                      value={item.ward_id}
                      key={item.ward_id}
                    >
                      {item.ward_name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <span className="text-red-500 text-sm">{error?.message}</span>
          </div>
        )}
      ></Controller>
    </div>
  );
}

export default AddressSelect;
