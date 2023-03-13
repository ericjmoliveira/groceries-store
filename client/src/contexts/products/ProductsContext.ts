import { createContext } from 'react';

import Product from '../../types/Product';

interface ProductsInterface {
  productsList: Product[];
  isLoadingProductsData: boolean;
  getProduct(productId: string): Product;
  searchProducts(keywords: string[]): Product[];
}

const ProductsContext = createContext<ProductsInterface>(null!);

export default ProductsContext;
