import Collection from "@/components/collections/Collection";
import "@/components/products/styles.css";
import { getCategoryByName } from "@/services/categoryService";

interface IProps {
  params: { cname: string | string[] };
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
