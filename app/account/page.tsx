import Account from "@/components/account/Account";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tài khoản",
  description:
    "Quản lý tài khoản cá nhân và thông tin người dùng trên hệ thống của chúng tôi.",
  keywords:
    "tài khoản, đăng nhập, đăng ký, thông tin cá nhân, bảo mật, quản lý hồ sơ",
};

function AccountPage() {
  return <Account />;
}

export default AccountPage;
