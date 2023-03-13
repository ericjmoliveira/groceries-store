import { useState, useEffect } from 'react';

import ProductsContext from './ProductsContext';
import Product from '../../types/Product';
import useApi from '../../hooks/useApi';

const ProductsProvider = ({ children }: { children: JSX.Element }) => {
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [isLoadingProductsData, setIsLoadingProductsData] = useState(true);

  const api = useApi();

  useEffect(() => {
    const getProductsData = async () => {
      const data = await api.getProductsList();

      setProductsList(data);
      setIsLoadingProductsData(false);
    };

    getProductsData();
  }, []);

  const getProduct = (id: string) => {
    const product = productsList.find((item) => item.id === id);

    return product!;
  };

  const searchProducts = (keywords: string[]) => {
    const searchResults = productsList.filter((item) => {
      for (const keyword of keywords) {
        if (item.name.toLowerCase().includes(keyword.toLowerCase())) return item;
      }
    });

    return searchResults;
  };

  return (
    <ProductsContext.Provider
      value={{ productsList, isLoadingProductsData, getProduct, searchProducts }}
    >
      {children}
    </ProductsContext.Provider>
  );
};

export default ProductsProvider;
