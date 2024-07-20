import Collection from "@/components/collections/Collection";
import "@/components/products/styles.css";
import { getCategoryByName } from "@/services/categoryService";
import { Metadata, ResolvingMetadata } from "next";

interface IProps {
  params: { cname: string | string[] };
}

export async function generateMetadata(
  { params }: IProps,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { cname } = params;

  const res = await getCategoryByName(cname[0]);

  const previousImages = (await parent).openGraph?.images || [];

  if (res && res?.data) {
    return {
      title: res.data.name,
      openGraph: {
        images: [...previousImages],
      },
      description: `Khám phá các sản phẩm ${res.data.name.toLowerCase()} của chúng tôi.`,
      keywords: [
        res.data.name.toLowerCase(),
        "đặt hàng online",
        "giao hàng tận nơi",
        "chất lượng cao",
        "giá tốt",
      ],
    };
  } else {
    return {
      title: "Not found",
      openGraph: {
        images: [],
      },
    };
  }
}

export default async function CollectionPage({ params }: IProps) {
  const { cname } = params;
  const res = await getCategoryByName(cname[0]);
  const displayName = cname[cname.length - 1] as string;
  return (
    <div>
      <div className="heading-wrapper relative h-[300px] py-[50px] flex justify-center items-center">
        <div className="absolute inset-0 bg-[rgba(0,0,0,0.6)] z-[0]" />
        <p className="text-white text-[32px] font-bold relative z-[1] uppercase">
          {decodeURIComponent(displayName)}
        </p>
      </div>
      <Collection
        categoryName={displayName}
        categoryId={res.data ? res.data.id : ""}
        rootCategoryName={res.data?.name || ""}
      />
    </div>
  );
}
