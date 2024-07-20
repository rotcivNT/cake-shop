import ProductDetail from "@/components/products/ProductDetail";
import { getProductById } from "@/services/productServices";
import { Metadata, ResolvingMetadata } from "next";
import Script from "next/script";

type Props = {
  params: { id: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id;

  const res = await getProductById(id);

  const previousImages = (await parent).openGraph?.images || [];

  if (res) {
    return {
      title: res.name,
      openGraph: {
        images: [res.thumbnail, ...previousImages],
      },
      description: res.description,
      keywords: [
        res.name.toLowerCase(),
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

async function ProductDetailPage({ params }: Props) {
  const { id } = params;
  const product = await getProductById(id);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    image: {
      "@type": "ImageObject",
      url: product.image,
      width: 1080,
      height: 1080,
    },
    telephone: "0704462651",
    name: product.name,
    description: product.description,
  };
  return (
    <div className="max-w-full">
      <ProductDetail />
      <Script
        id="app-p-ld-json"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd, null, "\t"),
        }}
      />
    </div>
  );
}

export default ProductDetailPage;
