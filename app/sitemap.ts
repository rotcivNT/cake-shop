import { getAllCategory } from '@/services/categoryService'
import { getAllProduct } from '@/services/productServices'
import { MetadataRoute } from 'next'
 
export default async function sitemap(): Promise<MetadataRoute.Sitemap >{
    const baseUrl = "https://tcake.vercel.app"
    let productsSitemap: any = []
    let categoryStiemap: any = []
    const resP = getAllProduct("?page=0&size=1000")
    const resC = getAllCategory()
    await Promise.allSettled([resP, resC]).then((res) => {
        if (res[0].status === "fulfilled") {
            productsSitemap = res[0].value.data.map((item: any) => ({
                url: `${baseUrl}/products/${item.product.id}`,
                lastModified: new Date(item.product.updatedAt),
            }))
        }
        if (res[1].status === "fulfilled") {
            categoryStiemap = res[1].value.data.map((item: any) => {
                if (item.parent === null) {
                    return {
                        url: `${baseUrl}/collections/${encodeURIComponent(item.name)}`,
                        lastModified: new Date(item.updatedAt),
                    }
                } else {
                    return {
                        url: `${baseUrl}/collections/${encodeURIComponent(item.parent.name)}/${encodeURIComponent(item.name)}`,
                        lastModified: new Date(item.updatedAt),
                    }
                
                }
            })
        }
    })
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...categoryStiemap,
    ...productsSitemap
  ]
}