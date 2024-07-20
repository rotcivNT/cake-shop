import SignInWrapper from "@/components/sign-in/SignInWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Đăng nhập",
  openGraph: {
    images: [],
  },
  description: "Đăng nhập vào hệ thống của chúng tôi để sử dụng các dịch vụ.",
  keywords: ["đăng nhập", "đăng ký", "quên mật khẩu", "tài khoản"],
};

export default function Page() {
  return <SignInWrapper />;
}
