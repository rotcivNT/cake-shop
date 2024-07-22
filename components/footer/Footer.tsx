import Image from "next/image";
import logo from "@/components/images/logo.png";
import bct from "@/components/images/bct.webp";
import "./style.css";
import { Home, Mail, Phone } from "lucide-react";
import Link from "next/link";
function Footer() {
  return (
    <>
      <footer className="footer relative flex flex-wrap p-[30px]">
        <div className="w-[1200px] max-w-full mx-auto flex flex-col gap-3 sm:gap-0 sm:flex-row flex-wrap">
          <div className="absolute z-[1] inset-0 bg-[rgba(0,0,0,0.6)]" />
          <div className="relative z-[2] sm:basis-1/4">
            <Image src={logo} alt="" />
            <p className="text-white flex gap-2 pb-1 hover:text-[#c0c906] transition-all duration-200 cursor-pointer">
              <Home size={18} color="#fff" />
              <span className="flex-1 text-sm">
                Số 09 Trần Thái Tông, P. Dịch Vọng, Q. Cầu Giấy, TP. Hà Nội
              </span>
            </p>
            <a
              href="tel:0961452578"
              className="text-white flex gap-2 pb-1 hover:text-[#c0c906] transition-all duration-200"
            >
              <Phone size={18} color="#fff" />
              <span className="flex-1 text-sm">0961452578</span>
            </a>
            <a
              href="mailto:anhhpabakery1@gmail.com"
              className="text-white flex gap-2 pb-1 hover:text-[#c0c906] transition-all duration-200"
            >
              <Mail size={18} color="#fff" />
              <span className="flex-1 text-sm">anhhpabakery1@gmail.com</span>
            </a>
          </div>

          <div className="relative z-[2] sm:basis-1/4">
            <p className="font-bold text-white pb-5">CHÍNH SÁCH</p>
            <ul>
              <li>
                <Link
                  href="#"
                  className="text-white flex gap-2 p-1 hover:text-[#c0c906] transition-all duration-200 text-sm"
                >
                  Chính sách và qui định chung
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white flex gap-2 p-1 hover:text-[#c0c906] transition-all duration-200 text-sm"
                >
                  Chính sách giao dịch và thanh toán
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white flex gap-2 p-1 hover:text-[#c0c906] transition-all duration-200 text-sm"
                >
                  Chính sách đổi trả
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="text-white flex gap-2 p-1 hover:text-[#c0c906] transition-all duration-200 text-sm"
                >
                  Chính sách bảo mật
                </Link>
              </li>
            </ul>
          </div>

          <div className="relative z-[2] sm:basis-1/4">
            <p className="font-bold text-white pb-5">
              CÔNG TY CỔ PHẦN BÁNH NGỌT ANH HÒA
            </p>
            <p className="text-white flex gap-2 p-1 hover:text-[#c0c906] transition-all leading-[1.5] duration-200 text-sm cursor-default">
              Địa chỉ tên miền: anhhoabakery.vn Tên miền phụ: banhngotphap.vn
              Tên Doanh nghiệp: Công ty Cổ phần Bánh ngọt Anh Hòa MST/ĐKKD/QLTL:
              0104802706 Trụ sở Doanh Nghiệp: Số 09 Trần Thái Tông, P. Dịch
              Vọng, Q. Cầu Giấy, TP. Hà Nội Quốc gia: Việt Nam Điện thoại:
              0961452578 Ngày cấp: 21/07/2010 Nơi cấp: Sở Kế hoạch và Đầu tư Tp.
              Hà Nội
            </p>
          </div>

          <div className="relative z-[2] sm:basis-1/4">
            <p className="font-bold text-white pb-5">
              MỖI THÁNG CHÚNG TÔI ĐỀU CÓ NHỮNG ĐỢT GIẢM GIÁ DỊCH VỤ VÀ SẢN PHẨM
              NHẰM TRI ÂN KHÁCH HÀNG. ĐỂ CÓ THỂ CẬP NHẬT KỊP THỜI NHỮNG ĐỢT GIẢM
              GIÁ NÀY, VUI LÒNG NHẬP ĐỊA CHỈ EMAIL CỦA BẠN VÀO Ô DƯỚI ĐÂY
            </p>
            <Image src={bct} alt="bo cong thuong" />
          </div>
        </div>
      </footer>

      <p className="px-[30px] py-[15px] bg-[#421a1f] text-white">
        Copyrights © 2018 by Anhhoa Bakery.
      </p>
    </>
  );
}

export default Footer;
