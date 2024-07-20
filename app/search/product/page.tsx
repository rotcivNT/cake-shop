import "@/components/products/styles.css";
import SearchResultWrapper from "@/components/search-result/SearchResultWrapper";
import { Metadata, ResolvingMetadata } from "next";

export async function generateMetadata({
  searchParams,
}: IProps): Promise<Metadata> {
  const query = searchParams.q;
  return {
    title: `Kết quả tìm kiếm "${query}"`,
    description: `Kết quả tìm kiếm "${query}" trên TCAKE`,
  };
}

interface IProps {
  searchParams: { [key: string]: string | string[] | undefined };
}
export default function SearchProductPage({ searchParams }: IProps) {
  const query = searchParams.q;
  return (
    <div>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1] uppercase">
          KẾT QUẢ TÌM KIẾM &quot;{query}&quot; - TCAKE
        </p>
      </div>
      <SearchResultWrapper />
    </div>
  );
}
