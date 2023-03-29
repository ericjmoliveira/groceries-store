import { create } from 'zustand';

import { getProducts } from '@/services/api';
import { Product } from '@/interfaces';

interface ProductsStore {
  productsList: Product[] | null;
  populateProductsList(): Promise<void>;
  getProduct(id: string): Product | undefined;
  searchProducts(keywords: string[]): Product[] | undefined;
}

export const useProductsStore = create<ProductsStore>((set, get) => ({
  productsList: null,

  async populateProductsList() {
    const data = await getProducts();

    if (data?.success) {
      set({ productsList: data.data?.products });
    }
  },

  getProduct(id: string) {
    const product = get().productsList?.find((product) => product.id === id);

    return product || undefined;
  },

  searchProducts(keywords: string[]) {
    const searchResults = get().productsList?.filter((item) => {
      for (const keyword of keywords) {
        if (item.name.toLowerCase().includes(keyword.toLowerCase())) return item;
      }
    });

    return searchResults;
  }
}));
