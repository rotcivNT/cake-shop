"use client";
import { useUser } from "@clerk/nextjs";
import AcconutAddress from "./AccountAddress";
import useSWR from "swr";
import { getUserByEmail } from "@/services/authServices";

function AccountAddressWrapper() {
  const { user } = useUser();
  const { data, isLoading } = useSWR(
    user?.emailAddresses[0].emailAddress,
    getUserByEmail
  );

  if (isLoading || !user) return <div>LOADING ...</div>;
  return (
    <AcconutAddress
      data={data}
      email={user?.emailAddresses[0].emailAddress as string}
    />
  );
}

export default AccountAddressWrapper;
