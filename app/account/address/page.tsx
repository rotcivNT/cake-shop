import AccountAddressWrapper from "@/components/account/AccountAddressWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Địa chỉ cá nhân",
  description:
    "Quản lý tài khoản cá nhân và thông tin người dùng trên hệ thống của chúng tôi.",
};
function AccountAddressPage() {
  return <AccountAddressWrapper />;
}

export default AccountAddressPage;
