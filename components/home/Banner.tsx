"use client";
import Autoplay from "embla-carousel-autoplay";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useRef } from "react";
import Image from "next/image";
import banner1 from "@/components/images/banner_1.webp";
import banner2 from "@/components/images/banner_2.webp";
import banner3 from "@/components/images/banner_3.webp";
import banner4 from "@/components/images/banner_4.webp";

function Banner() {
  const plugin = useRef(Autoplay({ delay: 3000, stopOnInteraction: true }));
  return (
    <Carousel
      plugins={[plugin.current]}
      className="w-full"
      onMouseEnter={plugin.current.stop}
      onMouseLeave={plugin.current.reset}
    >
      <CarouselContent>
        <CarouselItem className="relative w-full pt-[24%]">
          <Image src={banner1} alt="banner 1" fill />
        </CarouselItem>
        <CarouselItem className="relative w-full pt-[24%]">
          l
          <Image src={banner2} alt="banner 2" fill />
        </CarouselItem>
        <CarouselItem className="relative w-full pt-[24%]">
          <Image src={banner3} alt="banner 3" fill />
        </CarouselItem>
        <CarouselItem className="relative w-full pt-[24%]">
          <Image src={banner4} alt="banner 4" fill />
        </CarouselItem>
      </CarouselContent>
    </Carousel>
  );
}

export default Banner;
