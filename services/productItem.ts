import request from "../utils/request";

export type IProductItem = {
  title: string;
  content: string;
  price: string;
  img: string;
  sku: ISkuItem[];
  id: string;
};

type ISkuItem = {
  skuId: string;
  name: string;
};

export async function getProductList() {
  return request<IProductItem[]>({
    url: "/products",
    method: "GET",
  });
}
