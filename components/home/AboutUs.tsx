import Image from "next/image";

function AboutUs() {
  return (
    <div className="mt-10">
      <h3 className="text-[32px] text-[#c0c906] font-bold text-center">
        VỀ CHÚNG TÔI
      </h3>
      <p className="text-[18px] text-[#3d1a1a] text-center font-bold">
        CHÀO MỪNG BẠN ĐẾN VỚI ANHHOA BAKERY
      </p>
      <div className="flex flex-col gap-3 sm:gap-0 sm:flex-row p-[30px]">
        <div className="sm:basis-1/2 h-[266px] relative rounded-[10px] overflow-hidden">
          <Image
            src="https://theme.hstatic.net/1000313040/1000406925/14/intro.png?v=2102"
            alt=""
            fill
          />
        </div>
        <p className="basis-1/2 text-[#333] text-justify ml-4">
          Anh Hòa Bakery là thương hiệu bánh ngọt Pháp của công ty cổ phần bánh
          ngọt Anh Hòa. Được thành lập từ năm 2004 tại con phố Ngõ Trạm, quận
          Hoàn Kiếm, Hà Nội. Trải qua hơn 15 năm phát triển, đến nay Anh Hòa
          Bakery đã có 13 cơ sở kinh doanh đặt trên những tuyến phố đông dân cư
          ở Hà Nội. Các sản phẩm Anh Hòa Bakery được làm từ các nguyên liệu nhập
          khẩu của các nước có truyền thống làm bánh như: Newzeland, Mỹ, Pháp,
          Bỉ. Với hương vị thơm ngon đặc trưng của các loại kem, bơ, sữa, phô
          mai, hạt hạnh nhân, chocolate... dưới bàn tay khéo léo của những người
          thợ làm bánh giàu kinh nghiệm. Quy mô xưởng sản xuất rộng hơn 2000m2
          với các thiết bị tiên tiến hiện đại theo tiêu chuẩn ISO 2018, toàn bộ
          nhà máy được sơn phủ bởi sơn EPOXY đặc biệt. Anh Hòa Bakery luôn mang
          đến cho khách hàng những sản phẩm chất lượng nhất, đảm bảo tuyệt đối
          về an toàn vệ sinh thực phẩm.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
