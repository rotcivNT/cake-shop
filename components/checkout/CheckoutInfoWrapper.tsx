"use client";
import { getUserByEmail } from "@/services/authServices";
import { useUser } from "@clerk/nextjs";
import useSWR from "swr";
import CheckoutInfo from "./CheckoutInfo";
import { CartProductProps } from "../cart/Cart";

interface IProps {
  products: CartProductProps[];
}

function CheckoutInfoWrapper({ products }: IProps) {
  const { user } = useUser();
  const { data, isLoading } = useSWR(
    user?.emailAddresses[0].emailAddress,
    getUserByEmail
  );

  if (isLoading || !user) return <div>LOADING ...</div>;
  return (
    <CheckoutInfo
      data={data}
      email={user.emailAddresses[0].emailAddress}
      userId={user.id}
      products={products}
    />
  );
}

export default CheckoutInfoWrapper;
